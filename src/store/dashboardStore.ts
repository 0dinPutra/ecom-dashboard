import { create } from 'zustand';

import { customersData } from '../data/customersData';
import { ordersData } from '../data/ordersData';
import { productsData } from '../data/productsData';

import type {
  Customer,
  DateRange,
  Order,
  OrderStatus,
  PaymentStatus,
  Product,
} from '../types';

interface DashboardState {
  // Shared data
  products: Product[];
  orders: Order[];
  customers: Customer[];

  // Navigation
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;

  // Dashboard controls
  dateRange: DateRange;
  notificationPanelOpen: boolean;

  // Navigation actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;

  // Dashboard actions
  setDateRange: (range: DateRange) => void;
  setNotificationPanelOpen: (open: boolean) => void;

  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Order actions
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updatePaymentStatus: (id: string, status: PaymentStatus) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;

  // Reset
  resetDemoData: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial data
  products: [...productsData],
  orders: [...ordersData],
  customers: [...customersData],

  // Initial navigation state
  sidebarCollapsed: false,
  mobileNavOpen: false,

  // Initial dashboard state
  dateRange: '30d',
  notificationPanelOpen: false,

  // Navigation actions
  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  setMobileNavOpen: (open) =>
    set({ mobileNavOpen: open }),

  // Dashboard actions
  setDateRange: (range) =>
    set({ dateRange: range }),

  setNotificationPanelOpen: (open) =>
    set({ notificationPanelOpen: open }),

  // Product actions
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, ...updates, id: product.id }
          : product,
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  // Order actions
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    })),

  updatePaymentStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, paymentStatus: status } : order,
      ),
    })),

  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id
          ? { ...order, ...updates, id: order.id }
          : order,
      ),
    })),

  // Reset all mutable demo data and dashboard controls
  resetDemoData: () =>
    set({
      products: [...productsData],
      orders: [...ordersData],
      customers: [...customersData],
      sidebarCollapsed: false,
      mobileNavOpen: false,
      dateRange: '30d',
      notificationPanelOpen: false,
    }),
}));