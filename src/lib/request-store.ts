export type PlatformRequest = {
  reference: string
  mode: string
  createdAt: string
  status: 'submitted' | 'under_review'
}

const STORAGE_KEY = 'nss-platform-requests'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

export function getPlatformRequests(): PlatformRequest[] {
  if (!canUseStorage()) return []
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(value) ? value.filter(isPlatformRequest) : []
  } catch {
    return []
  }
}

export function createPlatformRequest(mode: string): PlatformRequest {
  const record: PlatformRequest = {
    reference: `REQ-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    mode,
    createdAt: new Date().toISOString(),
    status: 'submitted',
  }
  if (canUseStorage()) localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...getPlatformRequests()]))
  return record
}

function isPlatformRequest(value: unknown): value is PlatformRequest {
  return typeof value === 'object' && value !== null && 'reference' in value && 'mode' in value && 'createdAt' in value && 'status' in value
}
