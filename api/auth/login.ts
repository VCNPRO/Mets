import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDB } from '../../lib/db';
import { loginRateLimit, getClientIdentifier, checkRateLimit } from '../../lib/rate-limit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // SECURITY: Rate limiting
    const identifier = getClientIdentifier(req);
    const rateLimitResult = await checkRateLimit(loginRateLimit, identifier, 'intentos de login');
    if (rateLimitResult) {
      return res.status(429).json({ error: rateLimitResult.error });
    }

    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await UserDB.findByEmail(email);
    if (!user) {
      console.log('Failed login attempt - user not found', { email });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Failed login attempt - invalid password', { email, userId: user.id });
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET no configurado');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // SECURITY: Establecer token en httpOnly cookie
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`);

    console.log('Successful login', { userId: user.id, email: user.email, role: user.role });

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });

  } catch (error: any) {
    console.error('Error in login endpoint', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
