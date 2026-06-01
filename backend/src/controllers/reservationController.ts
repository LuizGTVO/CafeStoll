import { Request, Response } from 'express';
import * as reservationService from '@/services/reservationService';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, date, time, guestsCount } = req.body;

    const reservation = await reservationService.createReservation({
      name,
      email,
      phone,
      date,
      time,
      guestsCount,
    });

    return res.status(201).json({
      message: 'Reserva realizada com sucesso!',
      reservation,
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar reserva' });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getReservations();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.status(500).json({ error: 'Erro ao buscar reservas' });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await reservationService.updateReservationStatus(id, status);
    return res.status(200).json({
      message: 'Status da reserva atualizado!',
      reservation,
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return res.status(500).json({ error: 'Erro ao atualizar status da reserva' });
  }
};
