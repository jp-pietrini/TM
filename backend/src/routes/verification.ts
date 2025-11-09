import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth';
import { sendVerificationCode, verifyCode, formatPhoneNumber, isValidPhoneNumber } from '../services/sms';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

/**
 * Send verification code to phone number
 * POST /api/verification/send
 * Body: { phoneNumber: string, channel?: 'sms' | 'whatsapp' }
 */
router.post(
  '/send',
  authenticate,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { phoneNumber, channel } = req.body;

      if (!phoneNumber) {
        sendError(res, 'Phone number is required', 400);
        return;
      }

      // Format and validate phone number
      const formattedPhone = formatPhoneNumber(phoneNumber);

      if (!isValidPhoneNumber(formattedPhone)) {
        sendError(res, 'Invalid phone number format', 400);
        return;
      }

      // Send verification code
      const result = await sendVerificationCode(
        formattedPhone,
        channel || 'sms'
      );

      sendSuccess(
        res,
        {
          phoneNumber: formattedPhone,
          channel: channel || 'sms',
        },
        result.message
      );
    } catch (error: any) {
      console.error('Send verification error:', error);
      sendError(res, error.message || 'Failed to send verification code', 500);
    }
  }
);

/**
 * Verify code entered by user
 * POST /api/verification/verify
 * Body: { phoneNumber: string, code: string }
 */
router.post(
  '/verify',
  authenticate,
  async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { phoneNumber, code } = req.body;

      if (!phoneNumber || !code) {
        sendError(res, 'Phone number and code are required', 400);
        return;
      }

      // Format phone number
      const formattedPhone = formatPhoneNumber(phoneNumber);

      if (!isValidPhoneNumber(formattedPhone)) {
        sendError(res, 'Invalid phone number format', 400);
        return;
      }

      // Verify code
      const result = await verifyCode(formattedPhone, code);

      if (result.valid) {
        sendSuccess(
          res,
          {
            phoneNumber: formattedPhone,
            verified: true,
          },
          result.message
        );
      } else {
        sendError(res, result.message, 400);
      }
    } catch (error: any) {
      console.error('Verify code error:', error);
      sendError(res, error.message || 'Failed to verify code', 500);
    }
  }
);

export default router;
