import { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { usePortalStore } from '@/data/portalData';
import { getSession } from '@/lib/auth';
import { PartnerGamification } from '@/components/portals/PartnerGamification';
import { PartnerMarketplace } from '@/components/portals/PartnerMarketplace';
import { PartnerBids } from '@/components/portals/PartnerBids';
import { StatusBadge } from '@/components/portals/StatusBadge';
import { Award, Store, Gavel, Users } from 'lucide-react';
import DashboardShell from '@/components/layout/DashboardShell';

const NAV_ITEMS = [
  { id: 'gamification', labelKey: 'partner.tab.gamification', icon: Award },
  { id: 'marketplace', labelKey: 'partner.tab.marketplace', icon: Store },
  { id: 'bids', labelKey: 'partner.tab.bids', icon: Gavel },
] as const;

export default function PartnerPortal() {
  const { t } = useI18n();
  const store = usePortalStore();

  // Default to the logged-in partner if present, else the first seeded partner.
  const [activePartnerId, setActivePartnerId] = useState<string>(
    getSession()?.partnerId || store.partners[0]?.id || 'part-201'
  );
  const [activeTab, setActiveTab] = useState<string>('gamification');

  const currentPartner = store.partners.find((p) => p.id === activePartnerId) || store.partners[0];

  const sidebarFooter = currentPartner && (
    <div className="rounded-xl border border-[rgba(var(--gold-rgb),0.10)] bg-[rgba(var(--bg-rgb),0.4)] p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-2xl">{currentPartner.levelInfo.badgeIcon}</span>
        <div>
          <div className="nss-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(var(--text-rgb),0.45)]">
            {currentPartner.levelInfo.tier} · LVL {currentPartner.levelInfo.level}
          </div>
          <div className="text-xs font-bold text-[rgb(var(--gold-rgb))]">
            {currentPartner.levelInfo.title}
          </div>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(var(--gold-rgb),0.12)]">
        <div
          className="h-full rounded-full bg-[rgb(var(--gold-rgb))]"
          style={{ width: `${Math.min(100, (currentPartner.levelInfo.currentXp / currentPartner.levelInfo.nextLevelXp) * 100)}%` }}
        />
      </div>
      <div className="nss-mono mt-1.5 flex justify-between text-[9px] tracking-wider text-[rgba(var(--text-rgb),0.45)]">
        <span>{currentPartner.levelInfo.currentXp.toLocaleString()} XP</span>
        <span>{currentPartner.levelInfo.nextLevelXp.toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <DashboardShell
      accentColor="emerald"
      portalLabel="Partner Portal"
      portalIcon={<Users className="h-3.5 w-3.5" />}
      userName={getSession()?.name ?? currentPartner?.companyName ?? 'Partner Organization'}
      userRole={t('auth.partner.badge')}
      navItems={NAV_ITEMS.map((item) => ({
        id: item.id,
        label: t(item.labelKey),
        icon: item.icon,
      }))}
      activeNavId={activeTab}
      onNavChange={setActiveTab}
      sidebarFooter={sidebarFooter || undefined}
    >
    <div className="bg-[var(--bg)] text-[rgb(var(--text-rgb))] pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pt-10">
      {/* Header Banner */}
      <section className="nss-fade relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[linear-gradient(150deg,var(--panel),var(--bg-deep))] px-6 py-8 sm:px-10 sm:py-10">
        {/* gold hairline + ambient glows */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--gold-rgb),0.6),transparent)]" />
        <div className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.14),transparent_65%)]" />
        <div className="pointer-events-none absolute -bottom-32 -start-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(var(--gold-rgb),0.07),transparent_65%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <div className="nss-section-tag flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{t('portal.partner.headerTag')}</span>
            </div>
            <h1 className="nss-display text-3xl sm:text-5xl text-[rgb(var(--text-rgb))]">
              {t('partner.title')}
            </h1>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[rgba(var(--text-rgb),0.62)]">
              {t('partner.sub')}
            </p>
          </div>

          {/* Partner Selector */}
          {currentPartner && (
            <div className="flex shrink-0 flex-col gap-3 rounded-xl border border-[var(--card-border)] bg-[rgba(var(--bg-rgb),0.4)] p-4 sm:min-w-64">
              <div>
                <span className="nss-mono block text-[10px] uppercase tracking-[0.18em] text-[rgba(var(--text-rgb),0.5)]">
                  {t('portal.partner.switchOrg')}
                </span>
                <select
                  value={currentPartner.id}
                  onChange={(e) => setActivePartnerId(e.target.value)}
                  className="nss-mono mt-1.5 w-full rounded-lg border border-[rgba(var(--gold-rgb),0.25)] bg-[rgba(var(--bg-rgb),0.6)] px-2.5 py-1.5 text-xs font-bold text-[rgb(var(--gold-rgb))] transition-colors duration-200 hover:border-[rgba(var(--gold-rgb),0.5)] focus:border-[rgba(var(--gold-rgb),0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--gold-rgb),0.5)]"
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
      </section>

      {/* Main content — driven by sidebar nav */}
      {currentPartner && activeTab === 'gamification' && (
        <div className="nss-fade" key="gamification">
          <PartnerGamification partner={currentPartner} />
        </div>
      )}
      {currentPartner && activeTab === 'marketplace' && (
        <div className="nss-fade" key="marketplace">
          <PartnerMarketplace
            partner={currentPartner}
            listings={store.listings}
            onAddListing={store.addMarketplaceListing}
            onToggleListingStatus={store.toggleListingStatus}
            onDeleteListing={store.deleteListing}
          />
        </div>
      )}
      {currentPartner && activeTab === 'bids' && (
        <div className="nss-fade" key="bids">
          <PartnerBids
            partner={currentPartner}
            bids={store.bids}
            freightRequests={store.freightRequests}
            onSubmitBid={store.submitPartnerBid}
          />
        </div>
      )}
    </div>
    </DashboardShell>
  );
}
