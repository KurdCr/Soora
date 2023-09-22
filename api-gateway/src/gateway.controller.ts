import { Controller, All, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Controller()
export class GatewayController {
  @All('auth/**')
  async proxyAuthRoutes(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const target = 'http://localhost:3001';
    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
    });
    proxy(req, res, next);
  }

  @All('flashcards/**')
  async proxyFlashCards(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const target = 'http://localhost:3002';
    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
    });
    proxy(req, res, next);
  }

  @All('attributes/**')
  async proxyAttributes(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const target = 'http://localhost:3002';
    const proxy = createProxyMiddleware({
      target,
      changeOrigin: true,
    });
    proxy(req, res, next);
  }
}
