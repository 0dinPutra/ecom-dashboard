import { motion } from 'motion/react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import SalesChart from '../components/dashboard/SalesChart';
import TrafficSources from '../components/dashboard/TrafficSources';
import TopProducts from '../components/dashboard/TopProducts';
import RecentOrders from '../components/dashboard/RecentOrders';
import ActivityFeed from '../components/dashboard/ActivityFeed';

import { dashboardStats } from '../data/dashboardData';

function Dashboard() {
  return (
    <div className="space-y-6 pb-8">
      {/* Welcome header */}
      <DashboardHeader />

      {/* KPI cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-[14px] font-bold tracking-[-0.3px] text-foreground">
              Performance overview
            </h3>
            <p className="mt-1 text-[10px] text-muted">
              Your key business metrics
            </p>
          </div>

          <span className="text-[9px] font-medium text-muted">
            Compared to previous period
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Revenue and traffic */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        <div className="min-w-0 xl:col-span-8">
          <RevenueChart />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <TrafficSources />
        </div>
      </motion.section>

      {/* Sales and products */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        <div className="min-w-0 xl:col-span-5">
          <SalesChart />
        </div>

        <div className="min-w-0 xl:col-span-7">
          <TopProducts />
        </div>
      </motion.section>

      {/* Orders and activity */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        <div className="min-w-0 xl:col-span-8">
          <RecentOrders />
        </div>

        <div className="min-w-0 xl:col-span-4">
          <ActivityFeed />
        </div>
      </motion.section>
    </div>
  );
}

export default Dashboard;