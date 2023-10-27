import mailer from 'config/mailer.config';
import { OtpMailerDto, WelcomeMailerDto } from 'dto/mailer.dto';
import { sendOtpTemplate, sendWelcomeTemplate } from 'utils/emailTemplate';

const sendOtp = async (otpMailerDto: OtpMailerDto) => {
  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: otpMailerDto.email,
    subject: `${process.env.APP_NAME} Email Verification`,
    html: sendOtpTemplate(otpMailerDto),
  };

  return mailer.sendMail(message);
};

const sendWelcome = async (welcomeMailerDto: WelcomeMailerDto) => {
  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: welcomeMailerDto.email,
    subject: `${process.env.APP_NAME} Email Verification`,
    html: sendWelcomeTemplate(welcomeMailerDto),
  };

  return mailer.sendMail(message);
};

export { sendOtp, sendWelcome };
