'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Download, UserPlus, Eye, MoreVertical, Phone, MapPin, Bike } from 'lucide-react';
import { getRiders, getRiderStats, type RiderListItem, type RiderStatsResponse } from '@/lib/api';
import { cn, formatDate, getStatusBadgeClass } from '@/lib/utils';

export default function RidersPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [riders, setRiders] = useState<RiderListItem[]>([]);
  const [stats, setStats] = useState<RiderStatsResponse | null>(null);

  useEffect(() => {
    async function load() {
      const [items, overview] = await Promise.all([getRiders(), getRiderStats()]);
      setRiders(items);
      setStats(overview);
    }
    void load();
  }, []);

  const filteredRiders = useMemo(() => riders.filter((rider) => {
    const matchesStatus = statusFilter === 'all' || rider.status === statusFilter;
    const matchesSearch = rider.name.toLowerCase().includes(searchQuery.toLowerCase()) || rider.phone.includes(searchQuery) || rider.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  }), [riders, searchQuery, statusFilter]);

  const inactiveCount = riders.filter((item) => item.status === 'inactive').length;
  const suspendedCount = riders.filter((item) => item.status === 'suspended').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-900">Rider Management</h1><p className="text-slate-500">Manage registered delivery riders</p></div><div className="flex items-center gap-3"><button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"><Download className="h-4 w-4" />Export</button><button className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"><UserPlus className="h-4 w-4" />Add Rider</button></div></div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">{[{ label: 'Total Riders', value: stats?.total_riders ?? 0, color: 'text-slate-900' }, { label: 'Active', value: stats?.active_riders ?? 0, color: 'text-green-600' }, { label: 'Inactive', value: inactiveCount, color: 'text-gray-600' }, { label: 'Suspended', value: suspendedCount, color: 'text-red-600' }].map((stat)=><div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-sm text-slate-500">{stat.label}</p><p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p></div>)}</div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search by name, ID or phone..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" /></div><div className="flex items-center gap-2"><Filter className="h-4 w-4 text-slate-400" /><select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500"><option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option></select></div></div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredRiders.map((rider)=>{const avatar = rider.name.split(' ').map((part)=>part[0]).slice(0,2).join('').toUpperCase(); return <div key={rider.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"><div className="flex items-start justify-between"><div className="flex items-center gap-4"><div className={cn('flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-white', rider.persona === 'qcommerce' ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-purple-500 to-purple-600')}>{avatar}</div><div><h3 className="font-semibold text-slate-900">{rider.name}</h3><p className="text-sm text-slate-500">{rider.id}</p></div></div><span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize', getStatusBadgeClass(rider.status))}>{rider.status}</span></div><div className="mt-4 space-y-2"><div className="flex items-center gap-2 text-sm text-slate-600"><Phone className="h-4 w-4 text-slate-400" />{rider.phone}</div><div className="flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-slate-400" />{rider.zone_id}</div><div className="flex items-center gap-2 text-sm text-slate-600"><Bike className="h-4 w-4 text-slate-400" /><span className="capitalize">{rider.persona.replace('_', ' ')}</span></div></div><div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4"><div className="text-center"><p className="text-lg font-bold text-slate-900">{(rider.risk_score * 100).toFixed(0)}%</p><p className="text-xs text-slate-500">Risk</p></div><div className="text-center"><p className="text-lg font-bold text-slate-900">{rider.status}</p><p className="text-xs text-slate-500">Status</p></div></div><div className="mt-3"><div className="h-2 w-full rounded-full bg-slate-100"><div className={cn('h-2 rounded-full transition-all', rider.risk_score < 0.3 ? 'bg-green-500' : rider.risk_score < 0.6 ? 'bg-yellow-500' : 'bg-red-500')} style={{ width: `${rider.risk_score * 100}%` }} /></div></div><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4"><p className="text-xs text-slate-500">Joined {formatDate(rider.created_at)}</p><div className="flex items-center gap-2"><button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"><Eye className="h-4 w-4" /></button><button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"><MoreVertical className="h-4 w-4" /></button></div></div></div>;})}</div>
    </div>
  );
}
