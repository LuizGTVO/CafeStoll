import { Request, Response } from 'express';
import * as orderService from '@/services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, customerEmail, items, total } = req.body;

    const order = await orderService.createOrder({
      customerName,
      customerEmail,
      total,
      items,
    });
    console.log(`Order successfully created in PostgreSQL: ${order.id}`);

    return res.status(201).json({
      message: 'Pedido criado com sucesso!',
      order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Erro interno ao processar pedido' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);
    return res.status(200).json({
      message: 'Status do pedido atualizado!',
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
  }
};
