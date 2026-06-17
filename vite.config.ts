import { defineConfig, type Plugin, type ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import type { Connect } from 'vite';

const apiTarget = 'http://showroom.eis24.me/c300/api/v4/test';

function apiCorsMiddleware(
  req: Connect.IncomingMessage,
  res: Connect.ServerResponse,
  next: Connect.NextFunction
) {
  if (!req.url?.startsWith('/api')) {
    next();
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  next();
}

function deleteProxyMiddleware(
  req: Connect.IncomingMessage,
  res: Connect.ServerResponse,
  next: Connect.NextFunction
) {
  const match = req.url?.match(/^\/api\/meters\/([^/]+)\/delete\/?$/);

  if (req.method !== 'POST' || !match) {
    next();
    return;
  }

  const meterId = match[1];

  fetch(`${apiTarget}/meters/${meterId}/`, { method: 'DELETE' })
    .then((response) => {
      res.statusCode = response.status;
      res.end();
    })
    .catch(() => {
      res.statusCode = 502;
      res.end();
    });
}

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(apiCorsMiddleware);
      server.middlewares.use(deleteProxyMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiCorsMiddleware);
      server.middlewares.use(deleteProxyMiddleware);
    },
  };
}

const apiProxy: ProxyOptions = {
  target: apiTarget,
  changeOrigin: true,
  rewrite: (requestPath: string) => requestPath.replace(/^\/api/, ''),
};

export default defineConfig({
  plugins: [apiMiddlewarePlugin(), react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': apiProxy,
    },
  },
  preview: {
    proxy: {
      '/api': apiProxy,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
});
