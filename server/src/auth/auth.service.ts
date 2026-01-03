import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

type User = { id: string; username: string; passwordHash: string };

@Injectable()
export class AuthService {
  private users: User[] = [];

  async register(username: string, password: string) {
    if (this.users.find((u) => u.username === username)) {
      throw new Error('User exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const user: User = { id: String(this.users.length + 1), username, passwordHash: hash };
    this.users.push(user);
    return { id: user.id, username: user.username };
  }

  async validate(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;
    return { id: user.id, username: user.username };
  }

  signPayload(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return null;
    }
  }
}
