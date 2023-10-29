import env from 'config/env.config';
import { totp } from 'otplib';

const { OTP_SECRET } = env;

const generateOtp = () => totp.generate(OTP_SECRET);

const verifyOtp = (otp: string) =>
  totp.verify({ token: otp, secret: OTP_SECRET });

export { generateOtp, verifyOtp };
