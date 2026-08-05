/**
 * NSS Portal Mock API
 * ───────────────────────────────────────────────────────────
 * A localStorage-backed persistence layer that simulates a
 * real backend: async methods, network latency, seed-on-first-
 * load, and full CRUD for every portal entity.
 *
 * The store (portalData.ts) consumes this API so all three
 * dashboards (Admin / Client / Partner) share a single source
 * of truth that survives page refreshes.
 */
import {
  INITIAL_DOCUMENTS,
  INITIAL_CLIENTS,
  INITIAL_PARTNERS,
  INITIAL_ORDERS,
  INITIAL_LISTINGS,
  INITIAL_BIDS,
  INITIAL_FREIGHT_REQUESTS,
  INITIAL_INVOICES,
  INITIAL_LOGS,
  calculateLevelInfo
} from '@/data/portalData';
import type {
  ClientProfile,
  VerificationDocument,
  PartnerVendor,
  MarketplaceListing,
  PartnerBid,
  OpenFreightRequest,
  LogisticsOrder,
  ClientInvoice,
  ModerationLog,
  AdminKPIStats,
  OrderStatus,
  PartnerStatus,
  DocumentType,
  ListingCategory,
  UnitPricingType,
  TransitMode,
  ClientCategory
} from '@/types/portal';

interface PortalDB {
  clients: ClientProfile[];
  documents: VerificationDocument[];
  partners: PartnerVendor[];
  orders: LogisticsOrder[];
  listings: MarketplaceListing[];
  bids: PartnerBid[];
  freightRequests: OpenFreightRequest[];
  invoices: ClientInvoice[];
  logs: ModerationLog[];
}

const STORAGE_KEY = 'nss-portal-db-v1';
const LATENCY_MS = 180;
const ADMIN = { id: 'adm-01', name: 'Samir Alemyar' };

function seedDB(): PortalDB {
  return {
    clients: [...INITIAL_CLIENTS],
    documents: [...INITIAL_DOCUMENTS],
    partners: [...INITIAL_PARTNERS],
    orders: [...INITIAL_ORDERS],
    listings: [...INITIAL_LISTINGS],
    bids: [...INITIAL_BIDS],
    freightRequests: [...INITIAL_FREIGHT_REQUESTS],
    invoices: [...INITIAL_INVOICES],
    logs: [...INITIAL_LOGS]
  };
}

function loadDB(): PortalDB {
  if (typeof window === 'undefined') return seedDB();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = seedDB();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return JSON.parse(raw) as PortalDB;
  } catch {
    return seedDB();
  }
}

function saveDB(data: PortalDB): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage full / unavailable */
  }
}

let db: PortalDB = loadDB();

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

function makeLog(action: ModerationLog['action'], target: ModerationLog['targetType'], id: string, label: string, details: string): ModerationLog {
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    adminId: ADMIN.id,
    adminName: ADMIN.name,
    action,
    targetType: target,
    targetId: id,
    targetLabel: label,
    details
  };
}

export const portalApi = {
  async getStats(): Promise<AdminKPIStats> {
    const stats: AdminKPIStats = {
      pendingDocumentsCount: db.documents.filter((d) => d.status === 'pending').length,
      totalClientsCount: db.clients.length,
      pendingClientsCount: db.clients.filter((c) => c.state === 'pending_verification' || c.state === 'under_review').length,
      activePartnersCount: db.partners.filter((p) => p.status === 'active').length,
      activeOrdersCount: db.orders.filter((o) => o.status === 'in_transit' || o.status === 'order_placed' || o.status === 'customs_clearance').length,
      delayedOrdersCount: db.orders.filter((o) => o.status === 'delayed').length,
      totalVolumeUsd: db.partners.reduce((acc, p) => acc + p.metrics.businessVolumeUsd, 0)
    };
    return delay(stats);
  },
  async getClients() { return delay([...db.clients]); },
  async getDocuments() { return delay([...db.documents]); },
  async getPartners() { return delay([...db.partners]); },
  async getOrders() { return delay([...db.orders]); },
  async getListings() { return delay([...db.listings]); },
  async getBids() { return delay([...db.bids]); },
  async getFreightRequests() { return delay([...db.freightRequests]); },
  async getInvoices() { return delay([...db.invoices]); },
  async getLogs() { return delay([...db.logs]); },

  // ── Client Actions ──
  async registerClient(data: { fullName: string; companyName: string; email: string; phone: string; country: string; category: ClientCategory; }): Promise<ClientProfile> {
    const newClient: ClientProfile = {
      id: `cli-${Date.now().toString().slice(-4)}`, fullName: data.fullName, companyName: data.companyName,
      email: data.email, phone: data.phone, country: data.country, category: data.category,
      state: 'pending_verification', registeredAt: new Date().toISOString(), documents: [], totalOrders: 0, totalSpentUsd: 0
    };
    db.clients = [newClient, ...db.clients]; saveDB(db); notify();
    return delay(newClient);
  },

  async uploadDocument(clientId: string, type: DocumentType, title: string, fileName: string, fileSize: string, fileUrl: string): Promise<VerificationDocument> {
    const client = db.clients.find((c) => c.id === clientId);
    const newDoc: VerificationDocument = {
      id: `doc-${Date.now().toString().slice(-4)}`, clientId, clientName: client ? client.companyName : 'Registered Client',
      type, title, fileName, fileSize, uploadedAt: new Date().toISOString(), status: 'pending', fileUrl
    };
    db.documents = [newDoc, ...db.documents];
    db.clients = db.clients.map((c) => c.id === clientId ? { ...c, documents: [...c.documents, newDoc], state: c.state === 'unregistered' ? 'pending_verification' : c.state } : c);
    saveDB(db); notify();
    return delay(newDoc);
  },

  async simulateAdminApproveClient(clientId: string): Promise<void> {
    db.clients = db.clients.map((c) => c.id === clientId ? { ...c, state: 'verified' as const, verifiedAt: new Date().toISOString() } : c);
    db.documents = db.documents.map((d) => d.clientId === clientId ? { ...d, status: 'approved' as const, reviewedAt: new Date().toISOString(), reviewedBy: `Admin (${ADMIN.name})` } : d);
    db.clients = db.clients.map((c) => c.id === clientId ? { ...c, documents: c.documents.map((d) => ({ ...d, status: 'approved' as const })) } : c);
    const client = db.clients.find((c) => c.id === clientId);
    db.logs = [makeLog('verify_client', 'client', clientId, client?.companyName ?? clientId, 'Client verification approved & status set to Verified'), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  async simulateAdminRejectClient(clientId: string, reason: string): Promise<void> {
    db.clients = db.clients.map((c) => c.id === clientId ? { ...c, state: 'rejected' as const, rejectionReason: reason } : c);
    const client = db.clients.find((c) => c.id === clientId);
    db.logs = [makeLog('reject_doc', 'client', clientId, client?.companyName ?? clientId, `Client verification rejected. Reason: ${reason}`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  // ── Document Moderation ──
  async approveDocument(docId: string, adminNotes?: string): Promise<void> {
    const doc = db.documents.find((d) => d.id === docId);
    if (!doc) return;
    db.documents = db.documents.map((d) => d.id === docId ? { ...d, status: 'approved' as const, reviewedAt: new Date().toISOString(), reviewedBy: `Admin (${ADMIN.name})`, rejectionNotes: adminNotes } : d);
    db.clients = db.clients.map((c) => {
      if (c.id !== doc.clientId) return c;
      const updatedDocs = c.documents.map((d) => (d.id === docId ? { ...d, status: 'approved' as const } : d));
      const hasApproved = updatedDocs.some((d) => d.status === 'approved');
      return { ...c, documents: updatedDocs, state: hasApproved ? ('verified' as const) : c.state, verifiedAt: hasApproved ? new Date().toISOString() : c.verifiedAt };
    });
    db.logs = [makeLog('approve_doc', 'document', docId, doc.title, `Approved verification document for ${doc.clientName}`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  async rejectDocument(docId: string, rejectionNotes: string): Promise<void> {
    const doc = db.documents.find((d) => d.id === docId);
    if (!doc) return;
    db.documents = db.documents.map((d) => d.id === docId ? { ...d, status: 'rejected' as const, rejectionNotes, reviewedAt: new Date().toISOString(), reviewedBy: `Admin (${ADMIN.name})` } : d);
    db.clients = db.clients.map((c) => {
      if (c.id !== doc.clientId) return c;
      const updatedDocs = c.documents.map((d) => (d.id === docId ? { ...d, status: 'rejected' as const, rejectionNotes } : d));
      return { ...c, documents: updatedDocs, state: 'rejected' as const, rejectionReason: rejectionNotes };
    });
    db.logs = [makeLog('reject_doc', 'document', docId, doc.title, `Rejected document for ${doc.clientName}. Reason: ${rejectionNotes}`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  // ── Partner Management ──
  async updatePartnerStatus(partnerId: string, status: PartnerStatus): Promise<void> {
    const partner = db.partners.find((p) => p.id === partnerId);
    if (!partner) return;
    db.partners = db.partners.map((p) => (p.id === partnerId ? { ...p, status } : p));
    db.logs = [makeLog(status === 'active' ? 'activate_partner' : 'suspend_partner', 'partner', partnerId, partner.companyName, `Updated partner operational status to ${status}`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  async updatePartnerGamification(partnerId: string, xpDelta: number, newTrustScore?: number): Promise<void> {
    db.partners = db.partners.map((p) => {
      if (p.id !== partnerId) return p;
      const updatedXp = p.levelInfo.currentXp + xpDelta;
      return { ...p, levelInfo: calculateLevelInfo(updatedXp), metrics: { ...p.metrics, trustScore: newTrustScore !== undefined ? newTrustScore : p.metrics.trustScore } };
    });
    saveDB(db); notify();
    return delay(undefined);
  },

  // ── Order & Tracking ──
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    const order = db.orders.find((o) => o.id === orderId);
    if (!order) return;
    db.orders = db.orders.map((o) => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
    db.logs = [makeLog('update_order_status', 'order', orderId, order.trackingNumber, `Updated order status to ${status}`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  async addOrderCheckpoint(orderId: string, checkpoint: { location: string; status: string; notes: string; updatedBy?: string }): Promise<void> {
    const order = db.orders.find((o) => o.id === orderId);
    if (!order) return;
    const newChk = { id: `chk-${Date.now().toString().slice(-4)}`, timestamp: new Date().toISOString(), location: checkpoint.location, status: checkpoint.status, notes: checkpoint.notes, updatedBy: checkpoint.updatedBy || `Admin (${ADMIN.name})` };
    db.orders = db.orders.map((o) => o.id === orderId ? { ...o, checkpoints: [...o.checkpoints, newChk], updatedAt: new Date().toISOString() } : o);
    db.logs = [makeLog('add_checkpoint', 'order', orderId, order.trackingNumber, `Added checkpoint: ${checkpoint.location} (${checkpoint.status})`), ...db.logs];
    saveDB(db); notify();
    return delay(undefined);
  },

  async placeClientOrder(orderData: { clientId: string; clientName: string; origin: string; destination: string; mode: TransitMode; cargoDescription: string; weightTons: number; amountUsd: number; }): Promise<LogisticsOrder> {
    const trackingNumber = `NSS-2026-${Math.floor(1000 + Math.random() * 9000)}-${orderData.mode}`;
    const newOrderId = `ord-${Date.now().toString().slice(-4)}`;
    const newOrder: LogisticsOrder = {
      id: newOrderId, trackingNumber, clientId: orderData.clientId, clientName: orderData.clientName, mode: orderData.mode,
      origin: orderData.origin, destination: orderData.destination, cargoDescription: orderData.cargoDescription,
      weightTons: orderData.weightTons, amountUsd: orderData.amountUsd, status: 'order_placed',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
      checkpoints: [{ id: `chk-${Date.now().toString().slice(-4)}`, timestamp: new Date().toISOString(), location: orderData.origin, status: 'Order Placed & Confirmed', notes: 'Freight order received in portal system.', updatedBy: 'Client Portal' }]
    };
    db.orders = [newOrder, ...db.orders];
    db.clients = db.clients.map((c) => c.id === orderData.clientId ? { ...c, totalOrders: c.totalOrders + 1, totalSpentUsd: c.totalSpentUsd + orderData.amountUsd } : c);
    const newInvoice: ClientInvoice = { id: `inv-${Date.now().toString().slice(-4)}`, invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`, orderId: newOrderId, issueDate: new Date().toISOString().split('T')[0], dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], amountUsd: orderData.amountUsd, status: 'pending', downloadUrl: '#' };
    db.invoices = [newInvoice, ...db.invoices];
    saveDB(db); notify();
    return delay(newOrder);
  },

  async addMarketplaceListing(listing: { partnerId: string; partnerName: string; title: string; category: ListingCategory; origin: string; destination: string; capacity: string; ratePerUnit: number; unitType: UnitPricingType; description?: string; }): Promise<MarketplaceListing> {
    const newListing: MarketplaceListing = {
      id: `list-${Date.now().toString().slice(-4)}`, partnerId: listing.partnerId, partnerName: listing.partnerName,
      title: listing.title, category: listing.category, origin: listing.origin, destination: listing.destination,
      capacity: listing.capacity, ratePerUnit: listing.ratePerUnit, unitType: listing.unitType,
      status: 'active', rating: 5.0, completedOrders: 0, createdAt: new Date().toISOString(), description: listing.description
    };
    db.listings = [newListing, ...db.listings];
    saveDB(db); notify();
    return delay(newListing);
  },

  async toggleListingStatus(listingId: string): Promise<void> {
    db.listings = db.listings.map((l) => l.id === listingId ? { ...l, status: l.status === 'active' ? ('paused' as const) : ('active' as const) } : l);
    saveDB(db); notify();
    return delay(undefined);
  },

  async deleteListing(listingId: string): Promise<void> {
    db.listings = db.listings.filter((l) => l.id !== listingId);
    saveDB(db); notify();
    return delay(undefined);
  },

  async submitPartnerBid(bid: { requestId: string; partnerId: string; partnerName: string; clientName: string; route: string; cargoDescription: string; proposedPriceUsd: number; estimatedTransitDays: number; }): Promise<PartnerBid> {
    const newBid: PartnerBid = {
      id: `bid-${Date.now().toString().slice(-4)}`, requestId: bid.requestId, partnerId: bid.partnerId, partnerName: bid.partnerName,
      clientName: bid.clientName, route: bid.route, cargoDescription: bid.cargoDescription,
      proposedPriceUsd: bid.proposedPriceUsd, estimatedTransitDays: bid.estimatedTransitDays, status: 'submitted', submittedAt: new Date().toISOString()
    };
    db.bids = [newBid, ...db.bids];
    db.freightRequests = db.freightRequests.map((r) => r.id === bid.requestId ? { ...r, bidsCount: r.bidsCount + 1 } : r);
    const partner = db.partners.find((p) => p.id === bid.partnerId);
    if (partner) {
      const updatedXp = partner.levelInfo.currentXp + 50;
      db.partners = db.partners.map((p) => p.id === bid.partnerId ? { ...p, levelInfo: calculateLevelInfo(updatedXp), activeBidsCount: p.activeBidsCount + 1 } : p);
    }
    saveDB(db); notify();
    return delay(newBid);
  },

  async resetDemoData(): Promise<void> {
    db = seedDB();
    saveDB(db); notify();
    return delay(undefined);
  }
};
