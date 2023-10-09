import jwt from 'jsonwebtoken';
import env from 'config/env.config';

const secretKey: string = env.JWT_SECRET_KEY;
const accessTokenExpireTime: string = env.ACCESSTOKENEXPIRETIME;
const refreshTokenExpireTime: string = env.REFRESHTOKENEXPIRETIME;

type FieldsType = {
  id: string;
  role: string;
  email: string;
};

function generateAccessToken(fields: FieldsType): string {
  const accessToken = jwt.sign(fields, secretKey, {
    expiresIn: accessTokenExpireTime,
  });
  return accessToken;
}

function generateRefreshToken(fields: FieldsType): string {
  const refereshToken = jwt.sign(fields, secretKey, {
    expiresIn: refreshTokenExpireTime,
  });
  return refereshToken;
}

export { generateAccessToken, generateRefreshToken };
