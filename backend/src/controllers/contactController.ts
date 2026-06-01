import { Request, Response } from 'express';
import * as contactService from '@/services/contactService';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = await contactService.createMessage({
      name,
      email,
      message,
    });

    return res.status(201).json({
      message: 'Mensagem de contato registrada!',
      contactMessage,
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return res.status(500).json({ error: 'Erro interno ao registrar mensagem de contato' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await contactService.getMessages();
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
};

export const markMessageAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await contactService.markMessageAsRead(id);
    return res.status(200).json({
      messageText: 'Mensagem marcada como lida!',
      contactMessage: message,
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return res.status(500).json({ error: 'Erro ao atualizar mensagem de contato' });
  }
};
