import { defineConfig, loadEnv } from 'vite';
import { createAuthConnectMiddleware } from './server/auth-service.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Populate process.env so server/auth-service.js picks up any loaded env variables
  Object.assign(process.env, env);

  const authMiddlewarePlugin = {
    name: 'wytnet-auth-layer-plugin',
    configureServer(server) {
      server.middlewares.use(createAuthConnectMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(createAuthConnectMiddleware());
    }
  };

  return {
    plugins: [authMiddlewarePlugin],
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api/oauth/token': {
          target: process.env.WYTNET_ISSUER || 'https://api.wytnet.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/oauth\/token/, '/oauth/token')
        },
        '/api/oauth/userinfo': {
          target: process.env.WYTNET_ISSUER || 'https://api.wytnet.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/oauth\/userinfo/, '/oauth/userinfo')
        }
      }
    },
    preview: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});
