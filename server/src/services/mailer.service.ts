import createJob from 'config/queue.config';
import { SENT_OTP, WELCOME_MSG } from 'constants/mail.constants';
import { OtpMailerDto, WelcomeMailerDto } from 'dto/mailer.dto';

const sendOtp = (otpMailerDto: OtpMailerDto) => {
  createJob(SENT_OTP, otpMailerDto);
};

const sendWelcome = (welcomeMailerDto: WelcomeMailerDto) => {
  createJob(WELCOME_MSG, welcomeMailerDto);
};

export { sendOtp, sendWelcome };
