import jwt from 'jsonwebtoken';
import env from 'config/env.config';

const {
  RESETTOKENEXPIRETIME,
  JWT_SECRET_KEY,
  REFRESHTOKENEXPIRETIME,
  ACCESSTOKENEXPIRETIME,
} = env;

type FieldsType = {
  id: string;
  role: string;
  email: string;
};

function generateAccessToken(fields: FieldsType): string {
  const accessToken = jwt.sign(fields, JWT_SECRET_KEY, {
    expiresIn: ACCESSTOKENEXPIRETIME,
  });
  return accessToken;
}

function generateRefreshToken(fields: FieldsType): string {
  const refereshToken = jwt.sign(fields, JWT_SECRET_KEY, {
    expiresIn: REFRESHTOKENEXPIRETIME,
  });
  return refereshToken;
}
function resetPasswordToken(fields: FieldsType & { token: string }): string {
  const token = jwt.sign(fields, JWT_SECRET_KEY, {
    expiresIn: RESETTOKENEXPIRETIME,
  });
  return token;
}

export { generateAccessToken, generateRefreshToken, resetPasswordToken };
