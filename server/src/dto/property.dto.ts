export interface CreatePropertyDto {
  location: string;
  name: string;
  description: string;
  price: number;
  size: string;
  amenities: string;
  status: string;
  images: string;
  typeId: string;
  userId: string;
}

export type UpdatePropertyDto = Partial<CreatePropertyDto>;
