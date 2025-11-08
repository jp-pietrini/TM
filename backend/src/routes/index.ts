import { Router } from 'express';
import authRoutes from './auth';
import uploadRoutes from './upload.routes';
import verificationRoutes from './verification';
// Import other route modules here as they are created
// import userRoutes from './users';
// import leadsRoutes from './leads';
// import walletRoutes from './wallet';
// etc.

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/verification', verificationRoutes);

// Future routes will be added here:
// router.use('/users', userRoutes);
// router.use('/leads', leadsRoutes);
// router.use('/wallet', walletRoutes);
// router.use('/chat', chatRoutes);
// router.use('/admin', adminRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'TrustMe API v1',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      upload: '/api/upload',
      verification: '/api/verification',
      health: '/health',
    },
  });
});

export default router;
