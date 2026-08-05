import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { PartnerDetailSheet } from './PartnerDetailSheet';
import type { PartnerVendor, PartnerStatus } from '@/types/portal';
import { Users, Search, SlidersHorizontal } from 'lucide-react';

interface PartnersListProps {
  partners: PartnerVendor[];
  onUpdateStatus: (partnerId: string, status: PartnerStatus) => void;
  onUpdateGamification: (partnerId: string, xpDelta: number, trustScore?: number) => void;
}

export const PartnersList: React.FC<PartnersListProps> = ({
  partners,
  onUpdateStatus,
  onUpdateGamification
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<PartnerStatus | 'all'>('all');
  const [selectedPartner, setSelectedPartner] = useState<PartnerVendor | null>(null);

  const filteredPartners = partners.filter((partner) => {
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filterLabels: Record<'all' | 'active' | 'pending' | 'suspended', string> = {
    all: t('portal.partnersList.filterAll'),
    active: t('portal.status.active'),
    pending: t('portal.status.pending'),
    suspended: t('portal.status.suspended')
  };

  return (
    <div className="space-y-6">
      <Card className="border-[var(--card-border)] bg-[var(--panel)]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-[rgb(var(--text-rgb))] flex items-center gap-2">
              <Users className="w-5 h-5 text-[rgb(var(--gold-rgb))]" />
              {t('portal.partnersList.title')}
            </CardTitle>
            <p className="text-xs text-[rgba(var(--text-rgb),0.6)] mt-1">{t('portal.partnersList.sub')}</p>
          </div>

          <div className="flex items-center bg-[rgba(var(--text-rgb),0.03)] p-1 rounded-lg border border-[var(--card-border)] text-xs">
            {(['all', 'active', 'pending', 'suspended'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status ? 'bg-[rgb(var(--gold-rgb))] text-[#1d1233] font-bold' : 'text-[rgba(var(--text-rgb),0.6)] hover:text-[rgb(var(--text-rgb))]'
                }`}
              >
                {filterLabels[status]}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-[rgba(var(--text-rgb),0.45)]" />
            <Input
              placeholder={t('portal.partnersList.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.45)] text-sm"
            />
          </div>

          <div className="rounded-lg border border-[var(--card-border)] overflow-x-auto">
            <Table>
              <TableHeader className="bg-[rgba(var(--text-rgb),0.03)]">
                <TableRow className="border-[var(--card-border)] hover:bg-transparent">
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thPartnerOrg')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thLevelTierXp')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thBusinessVolume')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thTrustScore')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.partnersList.thAction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[rgba(var(--text-rgb),0.45)] text-sm">
                      {t('portal.partnersList.noPartners')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPartners.map((partner) => (
                    <TableRow key={partner.id} className="border-[var(--card-border)] hover:bg-[rgba(var(--text-rgb),0.03)] transition-colors">
                      <TableCell>
                        <div className="font-semibold text-[rgb(var(--gold-rgb))] text-sm">{partner.companyName}</div>
                        <div className="text-xs text-[rgba(var(--text-rgb),0.45)]">{partner.name} • {partner.country}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-medium text-[rgb(var(--text-rgb))] text-xs">
                          <span>{partner.levelInfo.badgeIcon}</span>
                          <span>{partner.levelInfo.title}</span>
                        </div>
                        <div className="text-[11px] text-[rgba(var(--text-rgb),0.45)] nss-mono mt-0.5">{partner.levelInfo.currentXp} XP</div>
                      </TableCell>
                      <TableCell className="nss-mono text-sm font-semibold text-[rgb(var(--text-rgb))]">
                        ${partner.metrics.businessVolumeUsd.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="nss-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{partner.metrics.trustScore}/100</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={partner.status} />
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-[rgb(var(--text-rgb))] hover:text-[rgb(var(--text-rgb))] hover:bg-[rgba(var(--text-rgb),0.05)]"
                          onClick={() => setSelectedPartner(partner)}
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5 me-1 text-[rgb(var(--gold-rgb))]" />
                          {t('portal.partnersList.manageBtn')}
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

      <PartnerDetailSheet
        partner={selectedPartner}
        isOpen={Boolean(selectedPartner)}
        onClose={() => setSelectedPartner(null)}
        onUpdateStatus={onUpdateStatus}
        onUpdateGamification={onUpdateGamification}
      />
    </div>
  );
};
