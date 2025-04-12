// Modelo para produtos (não precisa ser usado diretamente, mas é bom ter para organização)
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
  }

