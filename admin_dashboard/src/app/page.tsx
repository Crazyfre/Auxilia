import {
  FileText,
  ClipboardList,
  Users,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { StatCard, ClaimsChart, LiveTriggers, RecentClaims, ZoneDistribution } from '@/components/dashboard';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening with your insurance platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Policies"
          value="998"
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Total Claims"
          value="2,847"
          change="+8% from last month"
          changeType="positive"
          icon={ClipboardList}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Active Riders"
          value="1,234"
          change="+5% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-teal-600"
          iconBg="bg-teal-100"
        />
        <StatCard
          title="Premium Collected"
          value={formatCurrency(2450000)}
          change="+18% from last month"
          changeType="positive"
          icon={IndianRupee}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Claims Paid"
          value={formatCurrency(1875000)}
          change="Loss ratio: 76.5%"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Pending Claims"
          value="47"
          change="Avg processing: 2.3 hrs"
          changeType="neutral"
          icon={ClipboardList}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Active Triggers"
          value="2"
          change="Rain & Traffic active"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
        <StatCard
          title="Avg Risk Score"
          value="0.42"
          change="Medium risk level"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="text-slate-600"
          iconBg="bg-slate-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClaimsChart />
        </div>
        <div>
          <ZoneDistribution />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentClaims />
        </div>
        <div>
          <LiveTriggers />
        </div>
      </div>
    </div>
  );
}
