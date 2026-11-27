export type DateRange = '7d' | '30d' | '90d' | '12m';

export type OrderStatus =
  | 'Completed'
  | 'Processing'
  | 'Shipped'
  | 'Pending'
  | 'Cancelled'
  | 'Refunded';

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type ProductStatus = 'Active' | 'Draft' | 'Archived';

export type StockStatus = 'In stock' | 'Low stock' | 'Out of stock';

export type CustomerStatus = 'Active' | 'Inactive' | 'New';

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  description?: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  previousRevenue: number;
  orders: number;
}

export interface SalesDataPoint {
  name: string;
  sales: number;
  orders: number;
}

export interface TrafficSource {
  id: string;
  name: string;
  visitors: number;
  percentage: number;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sold: number;
  status: ProductStatus;
  image: string;
  createdAt: string;
  description?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  date: string;
  items: OrderItem[];
  itemCount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  joinedAt: string;
  status: CustomerStatus;
}

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  image: string;
  category: string;
  available: number;
  reserved: number;
  reorderLevel: number;
  status: StockStatus;
}

export interface Activity {
  id: string;
  type: 'order' | 'customer' | 'product' | 'payment' | 'inventory';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  revenue: number;
  unitsSold: number;
  percentage: number;
}

export interface ChartTooltipPayload {
  name: string;
  value: number;
  color?: string;
  dataKey?: string;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: string;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  badge?: string | number;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}