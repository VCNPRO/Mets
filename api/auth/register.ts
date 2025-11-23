import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDB } from '../../lib/db';
import { registerRateLimit, getClientIdentifier, checkRateLimit } from '../../lib/rate-limit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // SECURITY: Rate limiting
    const identifier = getClientIdentifier(req);
    const rateLimitResult = await checkRateLimit(registerRateLimit, identifier, 'registros');
    if (rateLimitResult) {
      return res.status(429).json({ error: rateLimitResult.error });
    }

    const { email, password, name } = req.body;

    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido' });
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserDB.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await UserDB.create({
      email,
      password: hashedPassword,
      name: name || null,
      role: 'user'
    });

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

    // Establecer cookie
    res.setHeader('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}; Path=/`);

    console.log('New user registered', { userId: user.id, email: user.email });

    return res.status(201).json({
      success: true,
      message: 'Registro exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }
    });

  } catch (error: any) {
    console.error('Error in register endpoint', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
