import { API_BASE_URL } from '@/lib/constants';

type FetchOptions = {
  cache?: RequestCache;
};

async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: options?.cache ?? 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type DashboardStatsResponse = {
  total_policies: number;
  active_policies: number;
  total_claims: number;
  pending_claims: number;
  total_premium_collected: number;
  total_claims_paid: number;
  active_riders: number;
  avg_risk_score: number;
  active_triggers: number;
  loss_ratio: number;
};

export type ClaimsChartResponse = {
  data: Array<{
    date: string | null;
    total: number;
    approved: number;
    rejected: number;
  }>;
  days: number;
};

export type RecentClaimsResponse = {
  claims: Array<{
    id: string;
    rider_name: string;
    zone_id: string;
    trigger_type: string;
    amount: number;
    status: string;
    created_at: string;
  }>;
};

export type LiveTriggersResponse = {
  triggers: Array<{
    zone_id: string;
    zone_name: string;
    trigger_type: string;
    current_value: number;
    threshold: number;
    source: string;
    severity: string;
    last_updated: string;
  }>;
  count: number;
};

export type ZoneStatsResponse = {
  zones: Array<{
    zone_id: string;
    name: string;
    city: string;
    active_policies: number;
    total_claims: number;
    total_payouts: number;
    active_triggers: number;
  }>;
};

export type ClaimListItem = {
  id: string;
  policy_id: string;
  rider_id: string;
  trigger_type: string;
  trigger_value: number;
  threshold: number;
  amount: number;
  status: string;
  fraud_score: number;
  ai_decision?: string | null;
  tx_hash?: string | null;
  created_at: string;
  processed_at?: string | null;
};

export type PolicyListItem = {
  id: string;
  rider_id: string;
  zone_id: string;
  persona: 'qcommerce' | 'food_delivery';
  premium: number;
  coverage: number;
  start_date: string;
  end_date: string;
  status: string;
  tx_hash?: string | null;
  created_at: string;
};

export type RiderListItem = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  persona: 'qcommerce' | 'food_delivery';
  zone_id: string;
  latitude?: number | null;
  longitude?: number | null;
  risk_score: number;
  status: string;
  created_at: string;
};

export type ClaimStatsResponse = {
  total_claims: number;
  pending_claims: number;
  approved_claims: number;
  rejected_claims: number;
  total_payout: number;
  average_fraud_score: number;
  by_trigger_type: Record<string, number>;
};

export type PolicyStatsResponse = {
  total_policies: number;
  active_policies: number;
  total_premium_collected: number;
  total_coverage_liability: number;
};

export type RiderStatsResponse = {
  total_riders: number;
  active_riders: number;
  average_risk_score: number;
  by_persona: {
    qcommerce: number;
    food_delivery: number;
  };
};

export type TriggerStatusResponse = {
  zones: Record<
    string,
    {
      zone_name: string;
      city: string;
      triggers: Array<{
        zone_id: string;
        zone_name: string;
        trigger_type: string;
        current_value: number;
        threshold: number;
        is_active: boolean;
        affected_policies: number;
        last_updated: string;
        source: string;
      }>;
      active_count: number;
      checked_at: string;
    }
  >;
  total_zones: number;
  zones_with_triggers: number;
  checked_at: string;
};

export type RevenueMetricsResponse = {
  period_days: number;
  premium_collected: number;
  claims_paid: number;
  net_revenue: number;
  average_claim: number;
  loss_ratio: number;
};

export type TriggerDistributionResponse = {
  distribution: Array<{
    trigger_type: string;
    count: number;
    total_payout: number;
  }>;
};

export type PersonaBreakdownResponse = {
  personas: Array<{
    persona: string;
    count: number;
    average_risk_score: number;
  }>;
};

export async function getDashboardStats() {
  return apiFetch<DashboardStatsResponse>('/dashboard/stats');
}

export async function getClaimsChart(days = 30) {
  return apiFetch<ClaimsChartResponse>(`/dashboard/claims-chart?days=${days}`);
}

export async function getRecentClaims(limit = 10) {
  return apiFetch<RecentClaimsResponse>(`/dashboard/recent-claims?limit=${limit}`);
}

export async function getLiveTriggers() {
  return apiFetch<LiveTriggersResponse>('/dashboard/live-triggers');
}

export async function getZoneStats() {
  return apiFetch<ZoneStatsResponse>('/dashboard/zone-stats');
}

export async function getClaims(params?: { status?: string; triggerType?: string }) {
  const search = new URLSearchParams();
  if (params?.status && params.status !== 'all') search.set('status', params.status);
  if (params?.triggerType && params.triggerType !== 'all') search.set('trigger_type', params.triggerType);
  const query = search.toString();
  return apiFetch<ClaimListItem[]>(`/claims/${query ? `?${query}` : ''}`);
}

export async function getClaimStats() {
  return apiFetch<ClaimStatsResponse>('/claims/stats/overview');
}

export async function approveClaim(claimId: string) {
  return fetch(`${API_BASE_URL}/claims/${claimId}/approve`, { method: 'POST' });
}

export async function rejectClaim(claimId: string) {
  return fetch(`${API_BASE_URL}/claims/${claimId}/reject`, { method: 'POST' });
}

export async function getPolicies(params?: { status?: string }) {
  const search = new URLSearchParams();
  if (params?.status && params.status !== 'all') search.set('status', params.status);
  const query = search.toString();
  return apiFetch<PolicyListItem[]>(`/policies/${query ? `?${query}` : ''}`);
}

export async function getPolicyStats() {
  return apiFetch<PolicyStatsResponse>('/policies/stats/overview');
}

export async function getRiders(params?: { status?: string }) {
  const search = new URLSearchParams();
  if (params?.status && params.status !== 'all') search.set('status', params.status);
  const query = search.toString();
  return apiFetch<RiderListItem[]>(`/riders/${query ? `?${query}` : ''}`);
}

export async function getRiderStats() {
  return apiFetch<RiderStatsResponse>('/riders/stats/overview');
}

export async function getTriggerStatus() {
  return apiFetch<TriggerStatusResponse>('/triggers/status');
}

export async function triggerRefresh() {
  return fetch(`${API_BASE_URL}/triggers/check`, { method: 'POST' });
}

export async function getRevenueMetrics(days = 30) {
  return apiFetch<RevenueMetricsResponse>(`/dashboard/revenue-metrics?days=${days}`);
}

export async function getTriggerDistribution() {
  return apiFetch<TriggerDistributionResponse>('/dashboard/trigger-distribution');
}

export async function getPersonaBreakdown() {
  return apiFetch<PersonaBreakdownResponse>('/dashboard/rider-personas');
}
