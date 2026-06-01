import { Request, Response } from 'express';
import * as newsletterService from '@/services/newsletterService';

export const subscribeEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const subscriber = await newsletterService.subscribeEmail(email);

    return res.status(201).json({
      message: 'Inscrição realizada com sucesso no clube CaféStoll!',
      subscriber,
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar inscrição na newsletter' });
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await newsletterService.getSubscribers();
    return res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return res.status(500).json({ error: 'Erro ao buscar inscritos' });
  }
};

export const unsubscribeEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const subscriber = await newsletterService.unsubscribeEmail(email);
    return res.status(200).json({
      message: 'Inscrição cancelada com sucesso!',
      subscriber,
    });
  } catch (error) {
    console.error('Error unsubscribing email:', error);
    return res.status(500).json({ error: 'Erro ao cancelar inscrição na newsletter' });
  }
};
