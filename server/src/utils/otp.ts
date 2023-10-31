import env from 'config/env.config';
import { totp } from 'otplib';

const { OTP_SECRET, OTP_DURATION_IN_SECS } = env;
console.log('🚀 ~ file: otp.ts:5 ~ OTP_SECRET:', OTP_SECRET);
totp.options = {
  step: +OTP_DURATION_IN_SECS,
};

const generateOtp = () => totp.generate(OTP_SECRET);

const verifyOtp = (otp: string) =>
  totp.verify({ token: otp, secret: OTP_SECRET });

export { generateOtp, verifyOtp };
