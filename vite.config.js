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
          rewrite: (path) => path.replace(/^\/api\/oauth\/token/, '/oauth/token')
        },
        '/api/oauth/userinfo': {
          target: 'https://api.wytnet.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/oauth\/userinfo/, '/oauth/userinfo')
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});
