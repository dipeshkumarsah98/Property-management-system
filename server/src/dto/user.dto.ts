export interface CreateUserDto {
  name: string;
  email: string;
  roleId: number;
  password: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
