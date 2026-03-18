'use client';

import { useState } from 'react';
import { Search, Filter, Download, Plus, Eye, MoreVertical, Shield, Zap, Bike } from 'lucide-react';
import { cn, formatCurrency, formatDate, getStatusBadgeClass } from '@/lib/utils';

const policies = [
  {
    id: 'POL-2847',
    rider: 'Rahul Sharma',
    phone: '+91 98765 43210',
    persona: 'qcommerce',
    zone: 'Andheri',
    premium: 299,
    coverage: 10000,
    riskScore: 0.45,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'active',
    claimsCount: 3,
    txHash: '0x1234...abcd',
  },
  {
    id: 'POL-2846',
    rider: 'Priya Patel',
    phone: '+91 98765 43211',
    persona: 'food_delivery',
    zone: 'Dadar',
    premium: 249,
    coverage: 8000,
    riskScore: 0.32,
    startDate: '2026-03-05',
    endDate: '2026-04-04',
    status: 'active',
    claimsCount: 1,
    txHash: '0x5678...efgh',
  },
  {
    id: 'POL-2845',
    rider: 'Amit Kumar',
    phone: '+91 98765 43212',
    persona: 'qcommerce',
    zone: 'Bandra',
    premium: 279,
    coverage: 9000,
    riskScore: 0.58,
    startDate: '2026-02-15',
    endDate: '2026-03-14',
    status: 'expired',
    claimsCount: 5,
    txHash: '0x9abc...ijkl',
  },
  {
    id: 'POL-2844',
    rider: 'Sneha Desai',
    phone: '+91 98765 43213',
    persona: 'food_delivery',
    zone: 'Kurla',
    premium: 229,
    coverage: 7500,
    riskScore: 0.25,
    startDate: '2026-03-10',
    endDate: '2026-04-09',
    status: 'active',
    claimsCount: 0,
    txHash: '0xdefg...mnop',
  },
  {
    id: 'POL-2843',
    rider: 'Vikram Singh',
    phone: '+91 98765 43214',
    persona: 'qcommerce',
    zone: 'Powai',
    premium: 199,
    coverage: 6000,
    riskScore: 0.72,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    status: 'cancelled',
    claimsCount: 2,
    txHash: '0xhijk...qrst',
  },
];

export default function PoliciesPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPolicies = policies.filter((policy) => {
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    const matchesSearch =
      policy.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.rider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Policy Management</h1>
          <p className="text-slate-500">Manage all rider insurance policies</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600">
            <Plus className="h-4 w-4" />
            New Policy
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Policies', value: '998', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Policies', value: '847', icon: Zap, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Q-Commerce', value: '523', icon: Bike, color: 'text-orange-600', bg: 'bg-orange-100' },
          { label: 'Food Delivery', value: '475', icon: Bike, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className={cn('rounded-xl p-3', stat.bg)}>
              <stat.icon className={cn('h-6 w-6', stat.color)} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by policy ID or rider name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Policies Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Policy ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Rider
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Persona / Zone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Premium
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Coverage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Risk Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Validity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {policy.id}
                      </span>
                      <p className="text-xs text-slate-500">{policy.claimsCount} claims</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{policy.rider}</p>
                      <p className="text-xs text-slate-500">{policy.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span
                        className={cn(
                          'inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                          policy.persona === 'qcommerce'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-purple-100 text-purple-700'
                        )}
                      >
                        {policy.persona.replace('_', ' ')}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">{policy.zone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {formatCurrency(policy.premium)}/mo
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">
                      {formatCurrency(policy.coverage)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-slate-200">
                        <div
                          className={cn(
                            'h-2 rounded-full',
                            policy.riskScore < 0.3
                              ? 'bg-green-500'
                              : policy.riskScore < 0.6
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          )}
                          style={{ width: `${policy.riskScore * 100}%` }}
                        />
                      </div>
                      <span
                        className={cn(
                          'text-xs font-medium',
                          policy.riskScore < 0.3
                            ? 'text-green-600'
                            : policy.riskScore < 0.6
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        )}
                      >
                        {(policy.riskScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-slate-700">{formatDate(policy.startDate)}</p>
                      <p className="text-xs text-slate-500">to {formatDate(policy.endDate)}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize',
                        getStatusBadgeClass(policy.status)
                      )}
                    >
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">1-5</span> of{' '}
            <span className="font-medium">998</span> policies
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Previous
            </button>
            <button className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              2
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              3
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
