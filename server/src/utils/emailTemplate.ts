import env from 'config/env.config';
import { OtpMailerDto, WelcomeMailerDto } from 'dto/mailer.dto';
import Mailgen from 'mailgen';

const { APP_NAME, CLIENT_URL } = env;

const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: `${APP_NAME}`,
    link: 'https://mailgen.js/',
    copyright: `Copyright © 2023 ${APP_NAME}. All rights reserved.`,
  },
});

export function sendOtpTemplate(otpMailerDto: OtpMailerDto) {
  const { name, opt } = otpMailerDto;

  const template = {
    body: {
      name,
      title: 'Verify your email address',
      intro:
        "Thanks for starting the new AWS account creation process.We want to make sure it's really you. Please enter the following verification code when prompted. If you don’t want to create an account, you can ignore this message.",
      action: {
        instructions: `<br><strong>To get started with ${APP_NAME}, Verify this OPT:</strong>`,
        button: {
          color: '#48cfad',
          text: opt,
          link: '#',
        },
      },
      outro:
        'We will never email you and ask you to disclose or verify your password, credit card, or banking account number.',
    },
  };

  return MailGenerator.generate(template);
}

export function sendWelcomeTemplate(welcomeMailerDto: WelcomeMailerDto) {
  const { email, name } = welcomeMailerDto;

  const template = {
    body: {
      name,
      title: `Welcome to ${APP_NAME}`,
      intro: `You have successfully created an account on ${APP_NAME}`,
      dictionary: {
        name,
        email,
      },
      outro: 'Thank you for joining with us',
    },
  };

  return MailGenerator.generate(template);
}

export function sendPasswordUpdateTemplate(dto: WelcomeMailerDto) {
  const { name, email } = dto;
  const date = new Date();

  const template = {
    body: {
      name,
      title: `You've successfully updated your password.`,
      intro: `${name}, the password for email <strong> ${email} </strong> has been successfully updated. Here are the details:`,
      dictionary: {
        name,
        email,
        date,
      },
      outro: `If you don't recognize this action, we recommend you do an additional password reset. If you need assistance, please connect with our Support team. <br />`,
    },
  };

  return MailGenerator.generate(template);
}

export function sendPasswordResetTemplate(passwordResetDto: OtpMailerDto) {
  const { name, email, opt } = passwordResetDto;

  const template = {
    body: {
      name,
      title: `Reset your password of ${email}`,
      intro: `If you are not trying to reset your password please ignore this mail.`,
      action: {
        instructions: `<br><strong>You can reset your password using the button below.</strong>`,
        button: {
          color: '#414141',
          text: 'Reset Password',
          link: `https://${CLIENT_URL}/passwordReset?token=${opt}`,
        },
      },
      outro:
        'Please do not reply to this email. Emails sent to this address will not be answered.',
    },
  };

  return MailGenerator.generate(template);
}
