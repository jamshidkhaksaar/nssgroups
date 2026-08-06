/**
 * NSS Multi-Portal Shared Data Architecture & Schema Definitions
 */

// ── Client Portal Models & State Machine Types ──

export type ClientState = 'unregistered' | 'pending_verification' | 'under_review' | 'rejected' | 'verified';
export type ClientCategory = 'un_agency' | 'ngo' | 'private' | 'government';
export type DocumentType = 'corporate_license' | 'tax_certificate' | 'representative_id' | 'customs_authorization';
export type DocumentStatus = 'pending' | 'approved' | 'rejected';

export interface VerificationDocument {
  id: string;
  clientId: string;
  clientName: string;
  type: DocumentType;
  title: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: DocumentStatus;
  rejectionNotes?: string;
  fileUrl: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface ClientProfile {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  category: ClientCategory;
  state: ClientState;
  registeredAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
  activationCode?: string;
  isActivated?: boolean;
  loginOtpCode?: string;
  licenseNumber?: string;
  tinNumber?: string;
  representativeIdNumber?: string;
  documents: VerificationDocument[];
  totalOrders: number;
  totalSpentUsd: number;
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  issueDate: string;
  dueDate: string;
  amountUsd: number;
  status: 'paid' | 'pending' | 'overdue';
  downloadUrl: string;
}

// ── Partner Portal Models ──

export type PartnerStatus = 'active' | 'pending' | 'suspended';
export type TransitMode = 'ROAD' | 'RAIL' | 'AIR' | 'SEA';
export type PartnerLevelTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

export interface PartnerLevelInfo {
  tier: PartnerLevelTier;
  level: number;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  badgeIcon: string;
  feePercentage: number;
  perks: string[];
}

export interface PartnerMetrics {
  businessVolumeUsd: number;
  monthlyVolumeUsd: number;
  monthlyTargetUsd: number;
  trustScore: number; // 0 to 100
  onTimeDeliveryRate: number; // e.g. 98.4
  cargoIntegrityRate: number; // e.g. 99.9
  averageResponseMins: number; // e.g. 12
  clientRating: number; // 0 to 5.0
  totalReviews: number;
  disputeRate: number; // percentage
}

export interface PartnerVendor {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  serviceTypes: TransitMode[];
  status: PartnerStatus;
  levelInfo: PartnerLevelInfo;
  metrics: PartnerMetrics;
  joinedAt: string;
  activeBidsCount: number;
  completedOrdersCount: number;
}

export type ListingCategory = 
  | 'ROAD_FREIGHT' 
  | 'RAIL_LOGISTICS' 
  | 'WAREHOUSING' 
  | 'HEAVY_EQUIPMENT' 
  | 'CUSTOMS_CLEARANCE' 
  | 'AIR_CHARTER';

export type UnitPricingType = 'per_km' | 'per_ton' | 'per_sqft_month' | 'per_container' | 'per_day';

export interface MarketplaceListing {
  id: string;
  partnerId: string;
  partnerName: string;
  title: string;
  category: ListingCategory;
  origin: string;
  destination: string;
  capacity: string;
  ratePerUnit: number;
  unitType: UnitPricingType;
  status: 'active' | 'paused' | 'draft';
  rating: number;
  completedOrders: number;
  createdAt: string;
  description?: string;
}

export interface PartnerBid {
  id: string;
  requestId: string;
  partnerId: string;
  partnerName: string;
  clientName: string;
  route: string;
  cargoDescription: string;
  proposedPriceUsd: number;
  estimatedTransitDays: number;
  status: 'submitted' | 'accepted' | 'declined' | 'under_review';
  submittedAt: string;
}

export interface OpenFreightRequest {
  id: string;
  clientName: string;
  origin: string;
  destination: string;
  mode: TransitMode;
  cargoDescription: string;
  weightTons: number;
  targetBudgetUsd: number;
  expiresAt: string;
  bidsCount: number;
}

// ── Logistics Order & Tracking Models ──

export type OrderStatus =
  | 'order_placed'
  | 'in_transit'
  | 'customs_clearance'
  | 'delivered'
  | 'delayed'
  | 'cancelled';

export interface TrackingCheckpoint {
  id: string;
  timestamp: string;
  location: string;
  status: string;
  notes: string;
  updatedBy: string;
}

export interface LogisticsOrder {
  id: string;
  trackingNumber: string;
  clientId: string;
  clientName: string;
  partnerId?: string;
  partnerName?: string;
  mode: TransitMode;
  origin: string;
  destination: string;
  cargoDescription: string;
  weightTons: number;
  amountUsd: number;
  status: OrderStatus;
  checkpoints: TrackingCheckpoint[];
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

// ── Admin Moderation & Audit Models ──

export interface ModerationLog {
  id: string;
  timestamp: string;
  adminId: string;
  adminName: string;
  action: 'approve_doc' | 'reject_doc' | 'verify_client' | 'suspend_partner' | 'activate_partner' | 'update_order_status' | 'add_checkpoint' | 'update_partner_level';
  targetType: 'document' | 'client' | 'partner' | 'order';
  targetId: string;
  targetLabel: string;
  details: string;
}

export interface AdminKPIStats {
  pendingDocumentsCount: number;
  totalClientsCount: number;
  pendingClientsCount: number;
  activePartnersCount: number;
  activeOrdersCount: number;
  delayedOrdersCount: number;
  totalVolumeUsd: number;
}
