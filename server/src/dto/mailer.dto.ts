export interface OtpMailerDto {
  opt: string;
  email: string;
  name: string;
}

export type WelcomeMailerDto = Omit<OtpMailerDto, 'opt'>;
