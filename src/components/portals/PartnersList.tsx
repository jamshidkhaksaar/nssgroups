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
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              {t('portal.partnersList.title')}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">{t('portal.partnersList.sub')}</p>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['all', 'active', 'pending', 'suspended'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filterLabels[status]}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
            <Input
              placeholder={t('portal.partnersList.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
            />
          </div>

          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800 text-slate-400 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnersList.thPartnerOrg')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnersList.thLevelTierXp')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnersList.thBusinessVolume')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnersList.thTrustScore')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.partnersList.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-slate-300">{t('portal.partnersList.thAction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                      {t('portal.partnersList.noPartners')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPartners.map((partner) => (
                    <TableRow key={partner.id} className="border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-amber-400 text-sm">{partner.companyName}</div>
                        <div className="text-xs text-slate-400">{partner.name} • {partner.country}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-medium text-slate-200 text-xs">
                          <span>{partner.levelInfo.badgeIcon}</span>
                          <span>{partner.levelInfo.title}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">{partner.levelInfo.currentXp} XP</div>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-slate-200">
                        ${partner.metrics.businessVolumeUsd.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-emerald-400">{partner.metrics.trustScore}/100</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={partner.status} />
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                          onClick={() => setSelectedPartner(partner)}
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5 me-1 text-amber-400" />
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
