import jwt from 'jsonwebtoken';

const JWT_SECRET = 'zeedleai-demo-secret-key-2024';

export interface User {
  email: string;
  name: string;
  role: string;
}

export const DEMO_CREDENTIALS = {
  email: 'admin@zeedleai.com',
  password: 'demo123',
  user: {
    email: 'admin@zeedleai.com',
    name: 'Admin User',
    role: 'Administrator'
  }
};

export function signToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}

export function authenticateUser(email: string, password: string): { success: boolean; token?: string; user?: User } {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    const token = signToken(DEMO_CREDENTIALS.user);
    return { success: true, token, user: DEMO_CREDENTIALS.user };
  }
  return { success: false };
}
