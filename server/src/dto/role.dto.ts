export interface CreateRoleDto {
  name: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateRoleDto extends Partial<CreateRoleDto> {}
