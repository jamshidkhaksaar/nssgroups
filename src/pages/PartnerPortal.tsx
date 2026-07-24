import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { PartnerGamification } from '@/components/portals/PartnerGamification';
import { PartnerMarketplace } from '@/components/portals/PartnerMarketplace';
import { PartnerBids } from '@/components/portals/PartnerBids';
import { StatusBadge } from '@/components/portals/StatusBadge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Award, Store, Gavel, Users } from 'lucide-react';
import DashboardShell from '@/components/layout/DashboardShell';

export default function PartnerPortal() {
  const { t } = useI18n();
  const store = usePortalStore();

  const [activePartnerId, setActivePartnerId] = useState<string>(store.partners[0]?.id || 'part-201');
  const [activeTab, setActiveTab] = useState<string>('gamification');

  const currentPartner = store.partners.find((p) => p.id === activePartnerId) || store.partners[0];

  return (
    <DashboardShell accentColor="emerald" portalLabel="Partner Portal">
    <div className="bg-[var(--bg)] text-[rgb(var(--text-rgb))] pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-8">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/50 via-slate-900 to-purple-950/60 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 end-0 -mt-8 -me-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Users className="w-4 h-4" />
              <span>{t('portal.partner.headerTag')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sora">
              {t('partner.title')}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              {t('partner.sub')}
            </p>
          </div>

          {/* Partner Selector */}
          {currentPartner && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">{t('portal.partner.switchOrg')}</span>
                <select
                  value={currentPartner.id}
                  onChange={(e) => setActivePartnerId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-amber-400 font-bold text-xs rounded px-2 py-1 mt-0.5"
                >
                  {store.partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.companyName} ({p.levelInfo.title})
                    </option>
                  ))}
                </select>
              </div>
              <StatusBadge status={currentPartner.status} />
            </div>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      {currentPartner && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b border-slate-800 pb-1">
            <TabsList className="bg-slate-900/80 border border-slate-800 p-1 rounded-xl h-auto flex flex-wrap gap-1">
              <TabsTrigger
                value="gamification"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                {t('partner.tab.gamification')}
              </TabsTrigger>

              <TabsTrigger
                value="marketplace"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                {t('partner.tab.marketplace')}
              </TabsTrigger>

              <TabsTrigger
                value="bids"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950 text-slate-300 font-medium px-4 py-2 text-xs sm:text-sm rounded-lg flex items-center gap-2"
              >
                <Gavel className="w-4 h-4" />
                {t('partner.tab.bids')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="gamification" className="mt-0">
            <PartnerGamification partner={currentPartner} />
          </TabsContent>

          <TabsContent value="marketplace" className="mt-0">
            <PartnerMarketplace
              partner={currentPartner}
              listings={store.listings}
              onAddListing={store.addMarketplaceListing}
              onToggleListingStatus={store.toggleListingStatus}
              onDeleteListing={store.deleteListing}
            />
          </TabsContent>

          <TabsContent value="bids" className="mt-0">
            <PartnerBids
              partner={currentPartner}
              bids={store.bids}
              freightRequests={store.freightRequests}
              onSubmitBid={store.submitPartnerBid}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
    </DashboardShell>
  );
}
