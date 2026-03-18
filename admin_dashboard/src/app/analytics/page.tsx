import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getClaimsChart, getDashboardStats, getPersonaBreakdown, getRevenueMetrics, getTriggerDistribution, getZoneStats } from '@/lib/api';

export default async function AnalyticsPage() {
  const [revenue, distribution, zones, stats, claimsChart, personas] = await Promise.all([
    getRevenueMetrics(),
    getTriggerDistribution(),
    getZoneStats(),
    getDashboardStats(),
    getClaimsChart(),
    getPersonaBreakdown(),
  ]);

  const monthlyData = claimsChart.data.map((item) => ({
    month: item.date ? new Date(item.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'N/A',
    claims: item.total,
    payouts: item.approved * (revenue.average_claim || 0),
  }));

  const kpis = [
    { label: 'Total Premium', value: formatCurrency(revenue.premium_collected), change: `${stats.active_policies} active`, trend: 'up' },
    { label: 'Total Payouts', value: formatCurrency(revenue.claims_paid), change: `${stats.total_claims} claims`, trend: 'up' },
    { label: 'Loss Ratio', value: `${revenue.loss_ratio.toFixed(1)}%`, change: 'Live backend metric', trend: revenue.loss_ratio > 80 ? 'up' : 'down' },
    { label: 'Avg Claim', value: formatCurrency(revenue.average_claim), change: 'Approved payouts only', trend: 'neutral' },
    { label: 'Fraud Detection', value: `${(1 - stats.avg_risk_score).toFixed(2)}`, change: 'Portfolio confidence', trend: 'up' },
    { label: 'Auto-Approval', value: `${stats.active_triggers}`, change: 'Live trigger count', trend: 'neutral' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1><p className="text-slate-500">Performance metrics and insights</p></div><span className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Last 30 Days</span></div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{kpis.map((kpi)=><div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">{kpi.label}</p><p className="mt-1 text-xl font-bold text-slate-900">{kpi.value}</p><div className="mt-2 flex items-center gap-1">{kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 text-green-500" /> : kpi.trend === 'down' ? <TrendingDown className="h-3 w-3 text-green-500" /> : <Minus className="h-3 w-3 text-slate-400" />}<span className={cn('text-xs font-medium', kpi.trend === 'up' || kpi.trend === 'down' ? 'text-green-600' : 'text-slate-500')}>{kpi.change}</span></div></div>)}</div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"><h3 className="text-lg font-semibold text-slate-900">Claims Trend</h3><p className="text-sm text-slate-500">Recent claim volume from the backend</p><div className="mt-6 space-y-3">{monthlyData.slice(-8).map((item)=><div key={item.month}><div className="mb-1 flex items-center justify-between text-sm"><span className="text-slate-600">{item.month}</span><span className="font-medium text-slate-900">{item.claims} claims</span></div><div className="h-3 w-full rounded-full bg-slate-100"><div className="h-3 rounded-full bg-orange-500" style={{ width: `${Math.min(item.claims * 6, 100)}%` }} /></div></div>)}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold text-slate-900">Trigger Distribution</h3><p className="text-sm text-slate-500">Claims by trigger type</p><div className="mt-6 space-y-3">{distribution.distribution.map((item)=><div key={item.trigger_type}><div className="mb-1 flex items-center justify-between text-sm"><span className="capitalize text-slate-700">{item.trigger_type}</span><span className="font-medium text-slate-900">{item.count}</span></div><div className="h-3 w-full rounded-full bg-slate-100"><div className="h-3 rounded-full bg-teal-500" style={{ width: `${Math.min(item.count * 8, 100)}%` }} /></div></div>)}</div></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold text-slate-900">Zone Performance</h3><p className="text-sm text-slate-500">Claims and payouts by zone</p><div className="mt-6 space-y-4">{zones.zones.map((zone)=><div key={zone.zone_id}><div className="flex items-center justify-between"><span className="font-medium text-slate-700">{zone.name}</span><span className="text-sm text-slate-500">{zone.total_claims} claims</span></div><div className="mt-2 h-3 w-full rounded-full bg-slate-100"><div className="h-3 rounded-full bg-orange-500" style={{ width: `${Math.min(zone.total_claims * 12, 100)}%` }} /></div><p className="mt-1 text-xs text-slate-500">{formatCurrency(zone.total_payouts)} payouts</p></div>)}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold text-slate-900">Persona Mix</h3><p className="text-sm text-slate-500">Riders by working category</p><div className="mt-6 space-y-4">{personas.personas.map((persona)=><div key={persona.persona}><div className="flex items-center justify-between"><span className="font-medium capitalize text-slate-700">{persona.persona.replace('_', ' ')}</span><span className="text-sm font-semibold text-slate-900">{persona.count}</span></div><div className="mt-2 h-3 w-full rounded-full bg-slate-100"><div className="h-3 rounded-full bg-purple-500" style={{ width: `${Math.min(persona.count * 5, 100)}%` }} /></div><p className="mt-1 text-xs text-slate-500">Average risk {persona.average_risk_score.toFixed(2)}</p></div>)}</div></div>
      </div>
    </div>
  );
}
