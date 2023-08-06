export interface CreatePinType {
  title: string;
  pin_about: string;
  description: string;
  destination_link: string;
  image?: any;
  board_id: number;
}
export interface Pin {
  title?: string;
  description?: string;
  pin_about?: string;
  image?: string; // url de imagen
  source_url?: string;
  destination_link?: string;
  user?: number; // id de usuario
  board?: number; // id de board
  category?: string;
  created_at?: string; // formato ISO 8601 (ejemplo: '2023-03-20T18:25:43.511Z')
  repin_count?: number;
  like_count?: number;
  tags?: number[]; // array de ids de tags
  buy_link?: string;
  price?: number;
  comment_permissions?: boolean;
  recommendations?: boolean;
  is_active?: boolean;
  is_public?: boolean;
}

export interface Tag {
  name?: string;
}
