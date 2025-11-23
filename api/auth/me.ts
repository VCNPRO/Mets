import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyRequestAuth } from '../../lib/auth';
import { UserDB } from '../../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const authPayload = verifyRequestAuth(req);
    if (!authPayload) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Get fresh user data from database
    const user = await UserDB.findById(authPayload.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });

  } catch (error: any) {
    console.error('Error in me endpoint', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
