import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      open: false,
      proxy: {
        '/api/oauth/token': {
          target: 'https://api.wytnet.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/oauth\/token/, '/oauth/token'),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              // Inject client credentials if needed or log
            });
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});
