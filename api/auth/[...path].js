import { createAuthConnectMiddleware } from '../../server/auth-service.js';

const handler = createAuthConnectMiddleware();

export default async function (req, res) {
  return new Promise((resolve) => {
    handler(req, res, () => {
      res.status(404).json({ error: 'Route not found' });
      resolve();
    });
  });
}
