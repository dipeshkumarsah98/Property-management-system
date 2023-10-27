import env from 'config/env.config';
import { OtpMailerDto, WelcomeMailerDto } from 'dto/mailer.dto';
import Mailgen from 'mailgen';

const { APP_NAME } = env;

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
