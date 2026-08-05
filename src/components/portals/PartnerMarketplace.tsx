import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from './StatusBadge';
import type { MarketplaceListing, ListingCategory, UnitPricingType, PartnerVendor } from '@/types/portal';
import { Store, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PartnerMarketplaceProps {
  partner: PartnerVendor;
  listings: MarketplaceListing[];
  onAddListing: (listing: {
    partnerId: string;
    partnerName: string;
    title: string;
    category: ListingCategory;
    origin: string;
    destination: string;
    capacity: string;
    ratePerUnit: number;
    unitType: UnitPricingType;
    description?: string;
  }) => void;
  onToggleListingStatus: (listingId: string) => void;
  onDeleteListing: (listingId: string) => void;
}

const inputClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border-[rgba(var(--gold-rgb),0.2)] text-[rgb(var(--text-rgb))]',
  'placeholder:text-[rgba(var(--text-rgb),0.35)]',
  'transition-colors duration-200 focus:border-[rgba(var(--gold-rgb),0.6)]',
  'focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.35)]',
].join(' ');

const selectTriggerClass = [
  'bg-[rgba(var(--bg-rgb),0.5)] border-[rgba(var(--gold-rgb),0.2)] text-[rgb(var(--text-rgb))]',
  'transition-colors duration-200 focus:border-[rgba(var(--gold-rgb),0.6)] focus:ring-2 focus:ring-[rgba(var(--gold-rgb),0.35)]',
].join(' ');

const selectContentClass = 'bg-[var(--panel)] border-[var(--card-border)] text-[rgb(var(--text-rgb))]';

const labelClass = 'nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]';

const ghostBtnClass = [
  'inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(var(--gold-rgb),0.35)]',
  'px-4 py-2 text-sm font-semibold text-[rgb(var(--gold-rgb))]',
  'transition-all duration-200 hover:border-[rgba(var(--gold-rgb),0.8)] hover:bg-[rgba(var(--gold-rgb),0.08)]',
  'hover:-translate-y-px active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]',
].join(' ');

const primaryBtnClass = [
  'nss-btn-primary inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm',
  'transition-all duration-200 active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.6)]',
].join(' ');

export const PartnerMarketplace: React.FC<PartnerMarketplaceProps> = ({
  partner,
  listings,
  onAddListing,
  onToggleListingStatus,
  onDeleteListing
}) => {
  const { t } = useI18n();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // New Listing Form State
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<ListingCategory>('RAIL_LOGISTICS');
  const [origin, setOrigin] = useState<string>('Tashkent, Uzbekistan');
  const [destination, setDestination] = useState<string>('Hairatan Port, Afghanistan');
  const [capacity, setCapacity] = useState<string>('68 Tons per Wagon');
  const [ratePerUnit, setRatePerUnit] = useState<number>(2200);
  const [unitType, setUnitType] = useState<UnitPricingType>('per_container');
  const [description, setDescription] = useState<string>('');

  const partnerListings = listings.filter((l) => l.partnerId === partner.id || l.partnerName === partner.companyName);

  const filteredListings = partnerListings.filter((listing) => {
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(t('portal.marketplace.errTitle'));
      return;
    }
    onAddListing({
      partnerId: partner.id,
      partnerName: partner.companyName,
      title,
      category,
      origin,
      destination,
      capacity,
      ratePerUnit,
      unitType,
      description
    });
    toast.success(t('portal.marketplace.createdToast'));
    setIsAddModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <section className="nss-fade overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--panel)]">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[rgba(var(--gold-rgb),0.12)] px-5 py-4">
          <div>
            <h3 className="nss-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[rgba(var(--text-rgb),0.75)]">
              <Store className="h-4 w-4 text-[rgb(var(--gold-rgb))]" />
              {t('portal.marketplace.title')}
            </h3>
            <p className="mt-1 text-xs text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.sub')}</p>
          </div>

          <button className={primaryBtnClass} onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" /> {t('portal.marketplace.addListingBtn')}
          </button>
        </header>

        <div className="space-y-4 p-5">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute start-3 top-3 h-4 w-4 text-[rgba(var(--text-rgb),0.4)]" />
              <Input
                placeholder={t('portal.marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ps-9 text-sm ${inputClass}`}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={`w-full sm:w-56 text-xs ${selectTriggerClass}`}>
                <SelectValue placeholder={t('portal.marketplace.allCategories')} />
              </SelectTrigger>
              <SelectContent className={`${selectContentClass} text-xs`}>
                <SelectItem value="all">{t('portal.marketplace.allCategories')}</SelectItem>
                <SelectItem value="RAIL_LOGISTICS">{t('portal.marketplace.catRail')}</SelectItem>
                <SelectItem value="ROAD_FREIGHT">{t('portal.marketplace.catRoad')}</SelectItem>
                <SelectItem value="WAREHOUSING">{t('portal.marketplace.catWarehousing')}</SelectItem>
                <SelectItem value="HEAVY_EQUIPMENT">{t('portal.marketplace.catHeavyEq')}</SelectItem>
                <SelectItem value="CUSTOMS_CLEARANCE">{t('portal.marketplace.catCustoms')}</SelectItem>
                <SelectItem value="AIR_CHARTER">{t('portal.marketplace.catAir')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listings Table */}
          <div className="overflow-x-auto rounded-lg border border-[var(--card-border)]">
            <Table>
              <TableHeader className="bg-[rgba(var(--bg-rgb),0.5)]">
                <TableRow className="border-[rgba(var(--gold-rgb),0.12)] hover:bg-transparent">
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thTitleCat')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thRouteScope')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thCapacity')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thRate')}</TableHead>
                  <TableHead className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thStatus')}</TableHead>
                  <TableHead className="nss-mono text-end text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.55)]">{t('portal.marketplace.thActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length === 0 ? (
                  <TableRow className="border-[rgba(var(--gold-rgb),0.08)] hover:bg-transparent">
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-[rgba(var(--text-rgb),0.5)]">
                      {t('portal.marketplace.noListings')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id} className="border-[rgba(var(--gold-rgb),0.08)] transition-colors duration-200 hover:bg-[rgba(var(--gold-rgb),0.04)]">
                      <TableCell>
                        <div className="text-sm font-semibold text-[rgb(var(--gold-rgb))]">{listing.title}</div>
                        <span className="nss-mono text-[11px] uppercase text-[rgba(var(--text-rgb),0.45)]">{listing.category.replace('_', ' ')}</span>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div className="font-medium text-[rgb(var(--text-rgb))]">{listing.origin}</div>
                        <div className="text-[rgba(var(--text-rgb),0.5)]">→ {listing.destination}</div>
                      </TableCell>
                      <TableCell className="nss-mono text-xs text-[rgba(var(--text-rgb),0.75)]">
                        {listing.capacity}
                      </TableCell>
                      <TableCell className="nss-mono text-sm font-bold text-[rgb(var(--text-rgb))]">
                        ${listing.ratePerUnit.toLocaleString()} <span className="text-[10px] font-normal text-[rgba(var(--text-rgb),0.45)]">/{listing.unitType.replace('per_', '')}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={listing.status === 'active'}
                            onCheckedChange={() => onToggleListingStatus(listing.id)}
                          />
                          <StatusBadge status={listing.status} />
                        </div>
                      </TableCell>
                      <TableCell className="text-end">
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-400 transition-all duration-200 hover:border-rose-500/50 hover:bg-rose-500/20 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)] [html[data-theme=light]_&]:border-rose-600/30 [html[data-theme=light]_&]:text-rose-600"
                          onClick={() => {
                            onDeleteListing(listing.id);
                            toast.error(t('portal.marketplace.removedToast'));
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* CREATE LISTING DIALOG MODAL */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-lg border-[var(--card-border)] bg-[var(--panel)] text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="nss-display flex items-center gap-2 text-lg text-[rgb(var(--text-rgb))]">
              <Plus className="h-5 w-5 text-[rgb(var(--gold-rgb))]" /> {t('portal.marketplace.modalTitle')}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateListing} className="space-y-4 py-2 text-sm">
            <div className="space-y-1.5">
              <Label className={labelClass}>{t('portal.marketplace.titleLabel')}</Label>
              <Input
                required
                placeholder={t('portal.marketplace.titlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.categoryLabel')}</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as ListingCategory)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="RAIL_LOGISTICS">{t('portal.marketplace.catRail')}</SelectItem>
                    <SelectItem value="ROAD_FREIGHT">{t('portal.marketplace.catRoad')}</SelectItem>
                    <SelectItem value="WAREHOUSING">{t('portal.marketplace.catWarehousing')}</SelectItem>
                    <SelectItem value="HEAVY_EQUIPMENT">{t('portal.marketplace.catHeavyEq')}</SelectItem>
                    <SelectItem value="CUSTOMS_CLEARANCE">{t('portal.marketplace.catCustoms')}</SelectItem>
                    <SelectItem value="AIR_CHARTER">{t('portal.marketplace.catAir')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.capacityLabel')}</Label>
                <Input
                  placeholder={t('portal.marketplace.capacityPlaceholder')}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.originLabel')}</Label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.destLabel')}</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.rateLabel')}</Label>
                <Input
                  type="number"
                  value={ratePerUnit}
                  onChange={(e) => setRatePerUnit(Number(e.target.value))}
                  className={`nss-mono ${inputClass}`}
                />
              </div>

              <div className="space-y-1.5">
                <Label className={labelClass}>{t('portal.marketplace.unitLabel')}</Label>
                <Select value={unitType} onValueChange={(val) => setUnitType(val as UnitPricingType)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="per_container">{t('portal.marketplace.unitContainer')}</SelectItem>
                    <SelectItem value="per_ton">{t('portal.marketplace.unitTon')}</SelectItem>
                    <SelectItem value="per_km">{t('portal.marketplace.unitKm')}</SelectItem>
                    <SelectItem value="per_sqft_month">{t('portal.marketplace.unitSqftMonth')}</SelectItem>
                    <SelectItem value="per_day">{t('portal.marketplace.unitDay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className={labelClass}>{t('portal.marketplace.descLabel')}</Label>
              <Textarea
                placeholder={t('portal.marketplace.descPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`h-16 text-sm ${inputClass}`}
              />
            </div>

            <DialogFooter className="pt-2">
              <button type="button" className={ghostBtnClass} onClick={() => setIsAddModalOpen(false)}>
                {t('portal.marketplace.cancelBtn')}
              </button>
              <button type="submit" className={primaryBtnClass}>
                {t('portal.marketplace.publishBtn')}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
