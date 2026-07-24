import React, { useState } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  const filteredDocs = documents.filter((doc) => {
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesSearch =
      doc.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-500" />
              {t('portal.docMod.title')}
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">{t('portal.docMod.sub')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filters */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    filterStatus === status ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
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
            <Search className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
            <Input
              placeholder={t('portal.docMod.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 bg-slate-950/70 border-slate-800 text-slate-200 text-sm"
            />
          </div>

          {/* Table */}
          <div className="rounded-lg border border-slate-800 overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-950/80">
                <TableRow className="border-slate-800 text-slate-400 hover:bg-transparent">
                  <TableHead className="font-semibold text-slate-300">{t('portal.docMod.thClient')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.docMod.thTitleType')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.docMod.thSubmittedDate')}</TableHead>
                  <TableHead className="font-semibold text-slate-300">{t('portal.docMod.thStatus')}</TableHead>
                  <TableHead className="text-end font-semibold text-slate-300">{t('portal.docMod.thActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-400 text-sm">
                      {t('portal.docMod.noDocs')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocs.map((doc) => (
                    <TableRow key={doc.id} className="border-slate-800/60 hover:bg-slate-800/30 transition-colors">
                      <TableCell className="font-medium text-slate-200">
                        <div>{doc.clientName}</div>
                        <span className="text-[11px] text-slate-400 font-mono">{doc.clientId}</span>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-amber-400 text-sm">{doc.title}</div>
                        <div className="text-xs text-slate-400 capitalize">{doc.type.replace('_', ' ')} • {doc.fileSize}</div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-300">
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
                            className="h-8 text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                            onClick={() => setSelectedDoc(doc)}
                          >
                            <Eye className="w-3.5 h-3.5 me-1 text-slate-400" />
                            {t('portal.docMod.reviewBtn')}
                          </Button>
                          {doc.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                                onClick={() => handleQuickApprove(doc)}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 me-1" />
                                {t('portal.docMod.approveBtn')}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
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
