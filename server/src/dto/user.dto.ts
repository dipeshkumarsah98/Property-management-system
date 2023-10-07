export interface CreateUserDto {
  name: string;
  email: string;
  roleId: string;
  password: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
