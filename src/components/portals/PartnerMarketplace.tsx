import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-500" />
              {t('portal.marketplace.title')}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">{t('portal.marketplace.sub')}</p>
          </div>

          <Button
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-lg shadow-amber-500/20"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> {t('portal.marketplace.addListingBtn')}
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
              <Input
                placeholder={t('portal.marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-56 bg-slate-950/70 border-slate-800 text-slate-200 text-xs">
                <SelectValue placeholder={t('portal.marketplace.allCategories')} />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200 text-xs">
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
          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800 text-slate-400">
                  <TableHead className="font-semibold text-slate-300">{t('portal.marketplace.thTitleCat')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.marketplace.thRouteScope')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.marketplace.thCapacity')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.marketplace.thRate')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.marketplace.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-slate-300">{t('portal.marketplace.thActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                      {t('portal.marketplace.noListings')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id} className="border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-amber-400 text-sm">{listing.title}</div>
                        <span className="text-[11px] text-slate-400 uppercase font-mono">{listing.category.replace('_', ' ')}</span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-300">
                        <div className="font-medium text-slate-200">{listing.origin}</div>
                        <div className="text-slate-400">→ {listing.destination}</div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-300 font-mono">
                        {listing.capacity}
                      </TableCell>
                      <TableCell className="font-mono text-sm font-bold text-slate-200">
                        ${listing.ratePerUnit.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/{listing.unitType.replace('per_', '')}</span>
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
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                          onClick={() => {
                            onDeleteListing(listing.id);
                            toast.error(t('portal.marketplace.removedToast'));
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* CREATE LISTING DIALOG MODAL */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-lg bg-[var(--bg)] border-slate-700/50 text-[rgb(var(--text-rgb))]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" /> {t('portal.marketplace.modalTitle')}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateListing} className="space-y-4 py-2 text-sm">
            <div className="space-y-1">
              <Label className="text-xs text-slate-400">{t('portal.marketplace.titleLabel')}</Label>
              <Input
                required
                placeholder={t('portal.marketplace.titlePlaceholder')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.categoryLabel')}</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as ListingCategory)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="RAIL_LOGISTICS">{t('portal.marketplace.catRail')}</SelectItem>
                    <SelectItem value="ROAD_FREIGHT">{t('portal.marketplace.catRoad')}</SelectItem>
                    <SelectItem value="WAREHOUSING">{t('portal.marketplace.catWarehousing')}</SelectItem>
                    <SelectItem value="HEAVY_EQUIPMENT">{t('portal.marketplace.catHeavyEq')}</SelectItem>
                    <SelectItem value="CUSTOMS_CLEARANCE">{t('portal.marketplace.catCustoms')}</SelectItem>
                    <SelectItem value="AIR_CHARTER">{t('portal.marketplace.catAir')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.capacityLabel')}</Label>
                <Input
                  placeholder={t('portal.marketplace.capacityPlaceholder')}
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.originLabel')}</Label>
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.destLabel')}</Label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.rateLabel')}</Label>
                <Input
                  type="number"
                  value={ratePerUnit}
                  onChange={(e) => setRatePerUnit(Number(e.target.value))}
                  className="bg-slate-900 border-slate-700 text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs text-slate-400">{t('portal.marketplace.unitLabel')}</Label>
                <Select value={unitType} onValueChange={(val) => setUnitType(val as UnitPricingType)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="per_container">{t('portal.marketplace.unitContainer')}</SelectItem>
                    <SelectItem value="per_ton">{t('portal.marketplace.unitTon')}</SelectItem>
                    <SelectItem value="per_km">{t('portal.marketplace.unitKm')}</SelectItem>
                    <SelectItem value="per_sqft_month">{t('portal.marketplace.unitSqftMonth')}</SelectItem>
                    <SelectItem value="per_day">{t('portal.marketplace.unitDay')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-slate-400">{t('portal.marketplace.descLabel')}</Label>
              <Textarea
                placeholder={t('portal.marketplace.descPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-200 text-sm h-16"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)}>{t('portal.marketplace.cancelBtn')}</Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                {t('portal.marketplace.publishBtn')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
