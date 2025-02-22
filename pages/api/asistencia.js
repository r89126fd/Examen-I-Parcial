import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { usuarioId } = req.query;
    const asistencias = await prisma.asistencia.findMany({
      where: { usuarioId: Number(usuarioId) },
      include: { evento: true },
    });
    return res.status(200).json(asistencias);
  }

  if (req.method === 'POST') {
    const { usuarioId, eventoId } = req.body;

    const evento = await prisma.evento.findUnique({ where: { id: eventoId } });
    const asistenciaExistente = await prisma.asistencia.findFirst({
      where: {
        usuarioId,
        evento: { fechaInicio: evento.fechaInicio },
      },
    });

    if (asistenciaExistente) {
      return res.status(400).json({ error: 'Ya estás asistiendo a otro evento en esta fecha.' });
    }

    const nuevaAsistencia = await prisma.asistencia.create({
      data: { usuarioId, eventoId },
    });
    return res.status(201).json(nuevaAsistencia);
  }

  return res.status(405).json({ error: 'Método no permitido.' });
}