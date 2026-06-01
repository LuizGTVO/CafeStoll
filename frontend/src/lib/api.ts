const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  categoryId: string;
  category?: Category;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProducts(category?: string, featured?: boolean): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (featured) params.append('featured', String(featured));

  const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createOrder(orderData: {
  customerName: string;
  customerEmail: string;
  items: Array<{ productId: string; quantity: number; price: number }>;
  total: number;
}) {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Failed to submit order');
  return res.json();
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export async function deleteProduct(id: string, token: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function createCategory(
  data: { name: string; slug: string; description?: string },
  token: string
): Promise<Category> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function getAdminOrders(token: string): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch admin orders');
  return res.json();
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  token: string
): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

export async function getAdminReservations(token: string): Promise<Reservation[]> {
  const res = await fetch(`${API_BASE_URL}/reservations`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch admin reservations');
  return res.json();
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  token: string
): Promise<Reservation> {
  const res = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update reservation status');
  return res.json();
}

export async function getAdminMessages(token: string): Promise<ContactMessage[]> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch admin messages');
  return res.json();
}

export async function markMessageAsRead(id: string, token: string): Promise<ContactMessage> {
  const res = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to mark message as read');
  return res.json();
}

export async function createProductMultipart(
  formData: FormData,
  token: string
): Promise<{ message: string; product: Product }> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to create product via multipart form');
  return res.json();
}

export async function createContactMessage(msgData: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msgData)
  });
  if (!res.ok) throw new Error('Failed to submit contact message');
  return res.json();
}

export async function createReservation(resData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
}): Promise<Reservation> {
  const res = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resData)
  });
  if (!res.ok) throw new Error('Failed to submit reservation');
  return res.json();
}

