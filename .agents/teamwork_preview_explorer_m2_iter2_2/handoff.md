# Handoff Report: Forensic Audit Remediation Analysis (Client Portal Components)

## 1. Observation
Direct analysis of the client portal UI component source files revealed widespread hardcoded English text strings bypassing the `t(...)` i18n translation system:
- `src/components/portals/ClientDashboard.tsx`: Zero calls to `useI18n()` or `t(...)`. Contains 55+ hardcoded English strings including tab labels, table headers, form labels, button labels, rate calculator options, support desk details, modal fields, and toast messages (e.g. lines 62, 76, 85, 98, 107, 116, 125, 134, 141, 160, 206, 214-219, 249, 269-272, 300, 312, 325, 376).
- `src/components/portals/ClientVerification.tsx`: Contains partial `useI18n()` calls, but retains 22+ hardcoded English strings including warning titles, document selector options, drag-and-drop dropzone instructions, submitted document labels, demo triggers, and toast messages (e.g. lines 31-37, 43, 65, 69, 83, 93-95, 120-121, 127, 171, 182, 194-195).
- `src/components/portals/ClientRegistration.tsx`: Uses `t(...)` for social auth and submit buttons, but leaves 16+ hardcoded strings in form section dividers, field labels, input placeholders, and organization category selector items (e.g. lines 92, 101, 105, 114, 118, 154, 168, 181, 188-191).
- `src/components/portals/ClientDetailSheet.tsx`: Contains 12+ hardcoded English strings across header dates, representative details, order & expenditure stats, document status lists, moderation action headers, and toast feedback (e.g. lines 35, 42, 64, 68, 76, 79, 98, 106, 110, 117-118, 122).
- `src/components/portals/ClientsList.tsx`: Contains 11+ hardcoded English strings in card titles, subheadings, state filter buttons, search bar placeholders, table headers, empty state notices, and detail action buttons (e.g. lines 42, 44, 56, 66, 77-81, 88, 116).
- `src/components/portals/DocumentModeration.tsx` & `src/components/portals/DocumentPreviewModal.tsx`: Contain 30+ hardcoded English strings in moderation queue headers, filter buttons, table columns, quick-approve/reject toasts, rejection reason arrays, metadata labels, preview box text, and administrative note placeholders (e.g. `DocumentModeration.tsx` lines 37, 38, 42, 43, 53, 55, 69, 81, 93-97, 104, 133, 144, 153; `DocumentPreviewModal.tsx` lines 18-24, 45, 68-80, 92, 101, 109, 113, 123, 130, 133, 139, 154, 158).

Inspection of `src/i18n/translations/` (`en.ts`, `ru.ts`, `fa.ts`, `ps.ts`) confirmed that TypeScript enforces `export const ru: Record<TranslationKey, string>` (and `fa.ts`, `ps.ts`) where `TranslationKey = keyof typeof en`. Any key added to `en.ts` MUST be present in all 4 language files.

---

## 2. Logic Chain
1. The Forensic Audit issued a binary veto because UI components displayed hardcoded English strings instead of calling `t(...)`, violating the core i18n architectural rule ("every user-visible string must be a translation key, never hardcoded").
2. Replacing all hardcoded strings requires defining corresponding keys in `en.ts` and implementing full translations across `ru.ts`, `fa.ts`, and `ps.ts`.
3. Because `ru.ts`, `fa.ts`, and `ps.ts` are typed as `Record<TranslationKey, string>`, adding new keys to `en.ts` without updating `ru.ts`, `fa.ts`, and `ps.ts` will break the strict TypeScript build (`npm run build` / `tsc -b`).
4. To remediate the violation cleanly and permanently, all hardcoded strings have been cataloged in `analysis.md`, complete key namespaces defined (`client.dash.*`, `client.verif.*`, `client.reg.*`, `client.detail.*`, `client.list.*`, `doc.mod.*`, `doc.preview.*`), and exact translations drafted for English, Russian, Dari, and Pashto.

---

## 3. Caveats
- No caveats. All 6 target files and their underlying document moderation sub-components were fully inspected, and exhaustive key mappings were generated.

---

## 4. Conclusion
The remediation plan in `analysis.md` provides a complete, 100% comprehensive blueprint for eliminating all hardcoded UI strings across `ClientDashboard.tsx`, `ClientVerification.tsx`, `ClientRegistration.tsx`, `ClientDetailSheet.tsx`, `ClientsList.tsx`, `DocumentModeration.tsx`, and `DocumentPreviewModal.tsx`. 
All translation additions across all 4 target languages (`en`, `ru`, `fa`, `ps`) are ready for direct implementation by Implementer 2.

---

## 5. Verification Method
1. Inspect `analysis.md` to review the key mappings and translation dictionary contents.
2. After Implementer applies changes:
   - Run `npm run lint` to verify clean ESLint output.
   - Run `npm run build` to verify `tsc -b` type completeness across `en.ts`, `ru.ts`, `fa.ts`, and `ps.ts`.
   - In browser (`npm run dev`), open Client Portal and switch languages between EN, RU, FA (دری), and PS (پښتو) to verify zero untranslated UI text strings.
