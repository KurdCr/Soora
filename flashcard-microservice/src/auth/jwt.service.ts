import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  decodeJwt(token: string): { userId: string } {
    const decodedToken = this.jwtService.decode(token) as { userId: string };
    return decodedToken;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'] as string;
    const [type, token] = authorizationHeader?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
