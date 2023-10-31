import createJob from 'config/queue.config';
import { OtpMailerDto, WelcomeMailerDto } from 'dto/mailer.dto';
import {
  SENT_OTP,
  WELCOME_MSG,
  PASSSWORD_RESET,
  PASSSWORD_UPDATE,
} from 'constants/mail.constants';

const sendOtp = (otpMailerDto: OtpMailerDto) => {
  createJob(SENT_OTP, otpMailerDto);
};

const sendWelcome = (welcomeMailerDto: WelcomeMailerDto) => {
  createJob(WELCOME_MSG, welcomeMailerDto);
};

const passwordReset = (passwordResetDto: OtpMailerDto) => {
  createJob(PASSSWORD_RESET, passwordResetDto);
};

const passwordUpdate = (passwordUpdateDto: WelcomeMailerDto) => {
  createJob(PASSSWORD_UPDATE, passwordUpdateDto);
};

export { sendOtp, sendWelcome, passwordReset, passwordUpdate };
