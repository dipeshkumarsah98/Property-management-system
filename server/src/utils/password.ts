import bcrypt from 'bcrypt';

const saltRound = 10;

export const comparePassword = async (
  newPassword: string,
  oldPassword: string
): Promise<boolean> => {
  const isValid = await bcrypt.compare(newPassword, oldPassword);
  return isValid;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
