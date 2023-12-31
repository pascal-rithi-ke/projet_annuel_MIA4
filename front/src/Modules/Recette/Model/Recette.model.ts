export enum RecetteType {
  PLAT,
  DESSERT,
}

export interface Recette {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  available: boolean;
  type: RecetteType;
}
