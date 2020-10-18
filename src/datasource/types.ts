export type CarResponse = {
  id: string;
  model: string;
  registration_plate: string;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  cars: { id: string }[];
};
