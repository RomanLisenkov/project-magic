export interface InterfaceItems {
  
  id: number;
  user_id: number;
  image: string;
  title: string;
  price: number;
  condition: string;
}

export interface UserInterface {
  name: string;
  email: string;
  city: string;
}

export interface CitySearchInterface {
  city: string;
}
