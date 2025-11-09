import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { haptics } from '../../utils/haptics';

export interface PhoneVerificationProps {
  /**
   * Called when verification is successful
   */
  onVerified?: (phoneNumber: string) => void;

  /**
   * Called when there's an error
   */
  onError?: (error: string) => void;

  /**
   * Verification channel
   */
  channel?: 'sms' | 'whatsapp';

  /**
   * Additional CSS classes
   */
  className?: string;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  onVerified,
  onError,
  channel = 'sms',
  className = '',
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'code' | 'verified'>('phone');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  const codeInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX for display
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(formatPhoneNumber(value));
    setError('');
  };

  const handleSendCode = async () => {
    // Clean phone number
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      haptics.error();
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:3000/api/verification/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: cleaned,
          channel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send verification code');
      }

      haptics.success();
      setStep('code');
      setTimer(60); // 60 second countdown
      // Focus first input
      setTimeout(() => {
        codeInputs.current[0]?.focus();
      }, 100);
    } catch (error) {
      haptics.error();
      const errorMessage = error instanceof Error ? error.message : 'Failed to send code';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take last character
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      codeInputs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newCode.every((digit) => digit !== '')) {
      handleVerifyCode(newCode.join(''));
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (codeValue?: string) => {
    const verificationCode = codeValue || code.join('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      haptics.error();
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const cleaned = phoneNumber.replace(/\D/g, '');

      const response = await fetch('http://localhost:3000/api/verification/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: cleaned,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid verification code');
      }

      haptics.success();
      setStep('verified');
      onVerified?.(phoneNumber);
    } catch (error) {
      haptics.error();
      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      setError(errorMessage);
      onError?.(errorMessage);
      // Clear code inputs on error
      setCode(['', '', '', '', '', '']);
      codeInputs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = () => {
    if (timer > 0) return;
    setCode(['', '', '', '', '', '']);
    handleSendCode();
  };

  const handleChangeNumber = () => {
    haptics.tap();
    setStep('phone');
    setCode(['', '', '', '', '', '']);
    setPhoneNumber('');
    setError('');
  };

  if (step === 'verified') {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Phone Verified!</h3>
          <p className="text-sm text-gray-600">
            {phoneNumber} has been successfully verified
          </p>
        </div>
      </div>
    );
  }

  if (step === 'code') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
            <Smartphone className="w-8 h-8 text-sky-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Enter Verification Code</h3>
          <p className="text-sm text-gray-600">
            We sent a 6-digit code to {phoneNumber}
          </p>
        </div>

        {/* Code Inputs */}
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { codeInputs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(index, e)}
              disabled={isVerifying}
              className={`
                w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg
                transition-all duration-200
                ${digit
                  ? 'border-sky-500 bg-sky-50'
                  : 'border-gray-300 bg-white'
                }
                ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
              `}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Resend / Change Number */}
        <div className="flex items-center justify-center gap-4 text-sm">
          <button
            onClick={handleResendCode}
            disabled={timer > 0}
            className={`
              ${timer > 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-sky-600 hover:text-sky-700'
              }
            `}
          >
            {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={handleChangeNumber}
            className="text-sky-600 hover:text-sky-700"
          >
            Change number
          </button>
        </div>

        {/* Verify Button (manual) */}
        {!isVerifying && code.every((d) => d !== '') && (
          <div className="pt-2">
            <Button
              onClick={() => handleVerifyCode()}
              variant="primary"
              className="w-full"
            >
              Verify
            </Button>
          </div>
        )}

        {isVerifying && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Verifying...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="w-8 h-8 text-sky-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Verify Your Phone Number</h3>
        <p className="text-sm text-gray-600">
          We'll send you a verification code via {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          maxLength={14} // Formatted length
          disabled={isSending}
        />
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <Button
        onClick={handleSendCode}
        variant="primary"
        className="w-full"
        disabled={isSending || phoneNumber.replace(/\D/g, '').length !== 10}
        loading={isSending}
      >
        {isSending ? 'Sending...' : 'Send Verification Code'}
      </Button>
    </div>
  );
};
