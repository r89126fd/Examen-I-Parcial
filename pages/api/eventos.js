import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (req.query.estado === 'eliminado') {
        const eventosEliminados = await prisma.evento.findMany({
          where: { estado: 'eliminado' },
        });
        return res.status(200).json(eventosEliminados);
      } else {
        const eventos = await prisma.evento.findMany();
        return res.status(200).json(eventos);
      }
    }

    if (req.method === 'POST') {
      const { nombre, direccion, fechaInicio, fechaFinal, estado, comentario } = req.body;

      if (new Date(fechaInicio) > new Date(fechaFinal)) {
        return res.status(400).json({ error: 'Hay un error en los tiempos de fecha' });
      }

      const nuevoEvento = await prisma.evento.create({
        data: {
          nombre,
          direccion,
          fechaInicio: new Date(fechaInicio),
          fechaFinal: new Date(fechaFinal),
          estado,
          comentario,
        },
      });
      return res.status(201).json(nuevoEvento);
    }

    if (req.method === 'PUT') {
      if (req.query.restaurar === 'true') {
        const { id } = req.body;
        const eventoRestaurado = await prisma.evento.update({
          where: { id: Number(id) },
          data: { estado: 'activo' },
        });
        return res.status(200).json(eventoRestaurado);
      } else {
        const { id, nombre, direccion, fechaInicio, fechaFinal, estado, comentario } = req.body;
        const eventoEditado = await prisma.evento.update({
          where: { id: Number(id) },
          data: {
            nombre,
            direccion,
            fechaInicio: new Date(fechaInicio),
            fechaFinal: new Date(fechaFinal),
            estado,
            comentario,
          },
        });
        return res.status(200).json(eventoEditado);
      }
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const eventoEliminado = await prisma.evento.update({
        where: { id: Number(id) },
        data: { estado: 'eliminado' },
      });
      return res.status(200).json(eventoEliminado);
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
}