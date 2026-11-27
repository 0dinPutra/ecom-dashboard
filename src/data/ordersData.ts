import type { Order } from '../types';

export const ordersData: Order[] = [
  {
    id: 'ORD-2847',
    customerId: 'CUS-001',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav.sharma@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=11',
    date: '2026-11-24T17:42:00+05:30',
    items: [
      {
        productId: 'PRD-001',
        productName: 'Minimalist Ceramic Vase',
        quantity: 1,
        price: 2499,
        image:
          'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop',
      },
      {
        productId: 'PRD-010',
        productName: 'Sculptural Coffee Mug',
        quantity: 2,
        price: 799,
        image:
          'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 3,
    total: 4097,
    status: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Arera Colony, Bhopal, Madhya Pradesh 462016',
  },
  {
    id: 'ORD-2846',
    customerId: 'CUS-002',
    customerName: 'Ananya Verma',
    customerEmail: 'ananya.verma@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=47',
    date: '2026-11-24T16:58:00+05:30',
    items: [
      {
        productId: 'PRD-002',
        productName: 'Premium Leather Tote',
        quantity: 1,
        price: 4299,
        image:
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 1,
    total: 4299,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Indiranagar, Bengaluru, Karnataka 560038',
  },
  {
    id: 'ORD-2845',
    customerId: 'CUS-003',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.mehta@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=12',
    date: '2026-11-24T15:35:00+05:30',
    items: [
      {
        productId: 'PRD-003',
        productName: 'Everyday Running Shoes',
        quantity: 1,
        price: 3499,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      },
      {
        productId: 'PRD-006',
        productName: 'Minimal Leather Wallet',
        quantity: 1,
        price: 1499,
        image:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 4998,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking',
    shippingAddress: 'Bandra West, Mumbai, Maharashtra 400050',
  },
  {
    id: 'ORD-2844',
    customerId: 'CUS-004',
    customerName: 'Isha Kapoor',
    customerEmail: 'isha.kapoor@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=44',
    date: '2026-11-24T14:20:00+05:30',
    items: [
      {
        productId: 'PRD-004',
        productName: 'Classic Analog Watch',
        quantity: 1,
        price: 5999,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 1,
    total: 5999,
    status: 'Pending',
    paymentStatus: 'Pending',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: 'Hauz Khas, New Delhi, Delhi 110016',
  },
  {
    id: 'ORD-2843',
    customerId: 'CUS-005',
    customerName: 'Kabir Malhotra',
    customerEmail: 'kabir.malhotra@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=13',
    date: '2026-11-24T12:45:00+05:30',
    items: [
      {
        productId: 'PRD-005',
        productName: 'Soft Cotton Throw',
        quantity: 2,
        price: 1899,
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 3798,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Civil Lines, Jaipur, Rajasthan 302006',
  },
  {
    id: 'ORD-2842',
    customerId: 'CUS-006',
    customerName: 'Meera Joshi',
    customerEmail: 'meera.joshi@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=45',
    date: '2026-11-24T11:30:00+05:30',
    items: [
      {
        productId: 'PRD-007',
        productName: 'Modern Table Lamp',
        quantity: 1,
        price: 2799,
        image:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
      },
      {
        productId: 'PRD-008',
        productName: 'Essential Cotton T-Shirt',
        quantity: 2,
        price: 999,
        image:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 3,
    total: 4797,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    paymentMethod: 'Debit Card',
    shippingAddress: 'Koregaon Park, Pune, Maharashtra 411001',
  },
  {
    id: 'ORD-2841',
    customerId: 'CUS-007',
    customerName: 'Arjun Patel',
    customerEmail: 'arjun.patel@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=14',
    date: '2026-11-23T18:40:00+05:30',
    items: [
      {
        productId: 'PRD-009',
        productName: 'Wireless Headphones',
        quantity: 1,
        price: 4999,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 1,
    total: 4999,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Satellite, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'ORD-2840',
    customerId: 'CUS-008',
    customerName: 'Diya Reddy',
    customerEmail: 'diya.reddy@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=48',
    date: '2026-11-23T16:25:00+05:30',
    items: [
      {
        productId: 'PRD-011',
        productName: 'Everyday Canvas Backpack',
        quantity: 1,
        price: 2199,
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      },
      {
        productId: 'PRD-013',
        productName: 'Classic Leather Belt',
        quantity: 1,
        price: 1799,
        image:
          'https://images.unsplash.com/photo-1624222247344-550fb8f8bbc7?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 3998,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Jubilee Hills, Hyderabad, Telangana 500033',
  },
  {
    id: 'ORD-2839',
    customerId: 'CUS-009',
    customerName: 'Vivaan Singh',
    customerEmail: 'vivaan.singh@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=15',
    date: '2026-11-23T14:10:00+05:30',
    items: [
      {
        productId: 'PRD-001',
        productName: 'Minimalist Ceramic Vase',
        quantity: 2,
        price: 2499,
        image:
          'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 4998,
    status: 'Processing',
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card',
    shippingAddress: 'Vijay Nagar, Indore, Madhya Pradesh 452010',
  },
  {
    id: 'ORD-2838',
    customerId: 'CUS-010',
    customerName: 'Sara Khan',
    customerEmail: 'sara.khan@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=49',
    date: '2026-11-23T10:15:00+05:30',
    items: [
      {
        productId: 'PRD-010',
        productName: 'Sculptural Coffee Mug',
        quantity: 3,
        price: 799,
        image:
          'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 3,
    total: 2397,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Aliganj, Lucknow, Uttar Pradesh 226024',
  },
  {
    id: 'ORD-2837',
    customerId: 'CUS-011',
    customerName: 'Aditya Nair',
    customerEmail: 'aditya.nair@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=16',
    date: '2026-11-22T19:20:00+05:30',
    items: [
      {
        productId: 'PRD-002',
        productName: 'Premium Leather Tote',
        quantity: 1,
        price: 4299,
        image:
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 1,
    total: 4299,
    status: 'Refunded',
    paymentStatus: 'Refunded',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Panampilly Nagar, Kochi, Kerala 682036',
  },
  {
    id: 'ORD-2836',
    customerId: 'CUS-012',
    customerName: 'Anika Das',
    customerEmail: 'anika.das@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=50',
    date: '2026-11-22T15:45:00+05:30',
    items: [
      {
        productId: 'PRD-003',
        productName: 'Everyday Running Shoes',
        quantity: 2,
        price: 3499,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 6998,
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking',
    shippingAddress: 'Salt Lake, Kolkata, West Bengal 700091',
  },
  {
    id: 'ORD-2835',
    customerId: 'CUS-013',
    customerName: 'Reyansh Gupta',
    customerEmail: 'reyansh.gupta@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=17',
    date: '2026-11-22T12:30:00+05:30',
    items: [
      {
        productId: 'PRD-005',
        productName: 'Soft Cotton Throw',
        quantity: 1,
        price: 1899,
        image:
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 1,
    total: 1899,
    status: 'Pending',
    paymentStatus: 'Pending',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: 'Rajouri Garden, New Delhi, Delhi 110027',
  },
  {
    id: 'ORD-2834',
    customerId: 'CUS-014',
    customerName: 'Myra Fernandes',
    customerEmail: 'myra.fernandes@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=51',
    date: '2026-11-21T17:15:00+05:30',
    items: [
      {
        productId: 'PRD-004',
        productName: 'Classic Analog Watch',
        quantity: 1,
        price: 5999,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      },
      {
        productId: 'PRD-006',
        productName: 'Minimal Leather Wallet',
        quantity: 1,
        price: 1499,
        image:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 7498,
    status: 'Completed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    shippingAddress: 'Baga, Goa 403516',
  },
  {
    id: 'ORD-2833',
    customerId: 'CUS-015',
    customerName: 'Ibrahim Sheikh',
    customerEmail: 'ibrahim.sheikh@example.com',
    customerAvatar: 'https://i.pravatar.cc/150?img=18',
    date: '2026-11-21T11:50:00+05:30',
    items: [
      {
        productId: 'PRD-007',
        productName: 'Modern Table Lamp',
        quantity: 2,
        price: 2799,
        image:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
      },
    ],
    itemCount: 2,
    total: 5598,
    status: 'Cancelled',
    paymentStatus: 'Failed',
    paymentMethod: 'Debit Card',
    shippingAddress: 'Hazratganj, Lucknow, Uttar Pradesh 226001',
  },
];

export const orderStatusOptions = [
  'All Statuses',
  'Pending',
  'Processing',
  'Shipped',
  'Completed',
  'Cancelled',
  'Refunded',
] as const;

export const paymentStatusOptions = [
  'All Payments',
  'Paid',
  'Pending',
  'Failed',
  'Refunded',
] as const;

export const orderSummary = {
  totalOrders: ordersData.length,
  completedOrders: ordersData.filter(
    (order) => order.status === 'Completed',
  ).length,
  processingOrders: ordersData.filter(
    (order) => order.status === 'Processing',
  ).length,
  pendingOrders: ordersData.filter(
    (order) => order.status === 'Pending',
  ).length,
  shippedOrders: ordersData.filter(
    (order) => order.status === 'Shipped',
  ).length,
  cancelledOrders: ordersData.filter(
    (order) => order.status === 'Cancelled',
  ).length,
  refundedOrders: ordersData.filter(
    (order) => order.status === 'Refunded',
  ).length,
  totalRevenue: ordersData
    .filter((order) => order.paymentStatus === 'Paid')
    .reduce((total, order) => total + order.total, 0),
};