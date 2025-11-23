import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Delete cookie
    res.setHeader('Set-Cookie', 'auth-token=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/');

    return res.status(200).json({
      success: true,
      message: 'Logout exitoso'
    });

  } catch (error: any) {
    console.error('Error in logout endpoint', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
