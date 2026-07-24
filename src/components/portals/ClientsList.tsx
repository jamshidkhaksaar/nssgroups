import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './StatusBadge';
import { ClientDetailSheet } from './ClientDetailSheet';
import type { ClientProfile, ClientState } from '@/types/portal';
import { Building2, Search, SlidersHorizontal } from 'lucide-react';

interface ClientsListProps {
  clients: ClientProfile[];
  onSimulateApprove: (clientId: string) => void;
  onSimulateReject: (clientId: string, reason: string) => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  onSimulateApprove,
  onSimulateReject
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterState, setFilterState] = useState<ClientState | 'all'>('all');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);

  const filteredClients = clients.filter((client) => {
    const matchesState = filterState === 'all' || client.state === filterState;
    const matchesSearch =
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  const filterLabels: Record<'all' | 'pending_verification' | 'verified' | 'rejected', string> = {
    all: t('portal.clientsList.filterAll'),
    pending_verification: t('portal.clientsList.filterPending'),
    verified: t('portal.clientsList.filterVerified'),
    rejected: t('portal.clientsList.filterRejected')
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              {t('portal.clientsList.title')}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">{t('portal.clientsList.sub')}</p>
          </div>

          <div className="flex flex-wrap items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['all', 'pending_verification', 'verified', 'rejected'] as const).map((state) => (
              <button
                key={state}
                onClick={() => setFilterState(state)}
                className={`px-3 py-1 rounded capitalize font-medium transition-colors ${
                  filterState === state ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filterLabels[state]}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
            <Input
              placeholder={t('portal.clientsList.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
            />
          </div>

          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800 text-slate-400 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-300">{t('portal.clientsList.thCompany')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.clientsList.thCategoryCountry')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.clientsList.thTotalSpent')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.clientsList.thState')}</TableHead>
                  <TableHead className="text-end font-semibold text-slate-300">{t('portal.clientsList.thAction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-400 text-sm">
                      {t('portal.clientsList.noClients')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-amber-400 text-sm">{client.companyName}</div>
                        <div className="text-xs text-slate-400">{client.fullName} ({client.email})</div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-slate-200 text-xs capitalize">{client.category.replace('_', ' ')}</span>
                        <div className="text-[11px] text-slate-400">{client.country}</div>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-semibold text-slate-200">
                        ${client.totalSpentUsd.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={client.state} />
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                          onClick={() => setSelectedClient(client)}
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5 me-1 text-amber-400" />
                          {t('portal.clientsList.viewDetailsBtn')}
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

      <ClientDetailSheet
        client={selectedClient}
        isOpen={Boolean(selectedClient)}
        onClose={() => setSelectedClient(null)}
        onSimulateApprove={onSimulateApprove}
        onSimulateReject={onSimulateReject}
      />
    </div>
  );
};
