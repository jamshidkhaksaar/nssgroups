import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from './StatusBadge';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import type { VerificationDocument, DocumentStatus } from '@/types/portal';
import { FileCheck, Search, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentModerationProps {
  documents: VerificationDocument[];
  onApprove: (docId: string, notes?: string) => void;
  onReject: (docId: string, reason: string) => void;
}

export const DocumentModeration: React.FC<DocumentModerationProps> = ({
  documents,
  onApprove,
  onReject
}) => {
  const { t } = useI18n();
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<VerificationDocument | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(selectableDocs.map((d) => d.id)));
    }
  };

  const handleBatchApprove = () => {
    selectedSet.forEach((id) => onApprove(id, t('portal.docMod.quickApproveNotes')));
    const n = selectedSet.size;
    setSelectedIds(new Set());
    toast.success(`${n} document${n === 1 ? '' : 's'} approved`);
  };

  const handleBatchReject = () => {
    selectedSet.forEach((id) => onReject(id, t('portal.docMod.quickRejectReason')));
    const n = selectedSet.size;
    setSelectedIds(new Set());
    toast.error(`${n} document${n === 1 ? '' : 's'} rejected`);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesSearch =
      doc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectableDocs = filteredDocs.filter((d) => d.status === 'pending');
  const selectedSet = new Set(selectedIds);
  const allSelected = selectableDocs.length > 0 && selectableDocs.every((d) => selectedSet.has(d.id));

  const handleQuickApprove = (doc: VerificationDocument) => {
    onApprove(doc.id, t('portal.docMod.quickApproveNotes'));
    toast.success(t('portal.docMod.approveSuccessToast'));
  };

  const handleQuickReject = (doc: VerificationDocument) => {
    onReject(doc.id, t('portal.docMod.quickRejectReason'));
    toast.error(t('portal.docMod.rejectSuccessToast'));
  };

  const filterLabels: Record<'all' | 'pending' | 'approved' | 'rejected', string> = {
    all: t('portal.docMod.filterAll'),
    pending: t('portal.docMod.filterPending'),
    approved: t('portal.docMod.filterApproved'),
    rejected: t('portal.docMod.filterRejected')
  };

  return (
    <div className="space-y-6">
      <Card className="border-[var(--card-border)] bg-[var(--panel)]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-[rgb(var(--text-rgb))] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[rgb(var(--gold-rgb))]" />
              {t('portal.docMod.title')}
            </CardTitle>
            <p className="text-xs text-[rgba(var(--text-rgb),0.6)] mt-1">{t('portal.docMod.sub')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filters */}
            <div className="flex items-center bg-[rgba(var(--text-rgb),0.03)] p-1 rounded-lg border border-[var(--card-border)] text-xs">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    filterStatus === status ? 'bg-[rgb(var(--gold-rgb))] text-[#1d1233] font-bold' : 'text-[rgba(var(--text-rgb),0.6)] hover:text-[rgb(var(--text-rgb))]'
                  }`}
                >
                  {filterLabels[status]}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-[rgba(var(--text-rgb),0.45)]" />
            <Input
              placeholder={t('portal.docMod.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-[rgba(var(--text-rgb),0.03)] border-[var(--card-border)] text-[rgb(var(--text-rgb))] placeholder:text-[rgba(var(--text-rgb),0.45)] text-sm"
            />
          </div>

          {/* Bulk action bar */}
          {selectedSet.size > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[rgba(var(--gold-rgb),0.3)] bg-[rgba(var(--gold-rgb),0.06)] px-4 py-2.5">
              <span className="nss-mono text-sm font-bold text-[rgb(var(--gold-rgb))]">
                {selectedSet.size} selected
              </span>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  onClick={handleBatchApprove}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 me-1" /> Approve selected
                </Button>
                <Button
                  size="sm"
                  className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/25"
                  onClick={handleBatchReject}
                >
                  <XCircle className="w-3.5 h-3.5 me-1" /> Reject selected
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedIds(new Set())}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="rounded-lg border border-[var(--card-border)] overflow-x-auto">
            <Table>
              <TableHeader className="bg-[rgba(var(--text-rgb),0.03)]">
                <TableRow className="border-[var(--card-border)] hover:bg-transparent">
                  <TableHead className="w-10">
                    <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" className="border-[rgba(var(--text-rgb),0.3)]" />
                  </TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.docMod.thClient')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.docMod.thTitleType')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.docMod.thSubmittedDate')}</TableHead>
                  <TableHead className="font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.docMod.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-[rgba(var(--text-rgb),0.6)]">{t('portal.docMod.thActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-[rgba(var(--text-rgb),0.45)] text-sm">
                      {t('portal.docMod.noDocs')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocs.map((doc) => (
                    <TableRow key={doc.id} className="border-[var(--card-border)] hover:bg-[rgba(var(--text-rgb),0.03)] transition-colors">
                      <TableCell className="w-10">
                        <Checkbox
                          checked={selectedSet.has(doc.id)}
                          disabled={doc.status !== 'pending'}
                          onCheckedChange={() => toggleRow(doc.id)}
                          aria-label={`Select ${doc.clientName}`}
                          className="border-[rgba(var(--text-rgb),0.3)]"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-[rgb(var(--text-rgb))]">
                        <div>{doc.clientName}</div>
                        <span className="text-[11px] text-[rgba(var(--text-rgb),0.45)] nss-mono">{doc.clientId}</span>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-[rgb(var(--gold-rgb))] text-sm">{doc.title}</div>
                        <div className="text-xs text-[rgba(var(--text-rgb),0.45)] capitalize">{doc.type.replace('_', ' ')} • {doc.fileSize}</div>
                      </TableCell>
                      <TableCell className="text-xs text-[rgba(var(--text-rgb),0.6)]">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={doc.status} />
                      </TableCell>
                      <TableCell className="text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs text-[rgb(var(--text-rgb))] hover:text-[rgb(var(--text-rgb))] hover:bg-[rgba(var(--text-rgb),0.05)]"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <Eye className="w-3.5 h-3.5 me-1 text-[rgba(var(--text-rgb),0.45)]" />
                            {t('portal.docMod.reviewBtn')}
                          </Button>
                          {doc.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300"
                                onClick={() => handleQuickApprove(doc)}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 me-1" />
                                {t('portal.docMod.approveBtn')}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300"
                                onClick={() => handleQuickReject(doc)}
                              >
                                <XCircle className="w-3.5 h-3.5 me-1" />
                                {t('portal.docMod.rejectBtn')}
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DocumentPreviewModal
        document={selectedDoc}
        isOpen={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};
