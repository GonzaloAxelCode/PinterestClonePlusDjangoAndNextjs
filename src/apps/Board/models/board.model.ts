import { UserAccount } from "../../UserAccount/models/user.model";

interface User extends UserAccount {
  // Add any other properties you need from the User model
}

export interface Board {
  id?: number;
  name?: string;
  description?: string;
  user?: User;
  created_at?: string; // or Date, depending on how you want to use it
  cover_image?: string | null;
  is_private?: boolean;
  is_public?: boolean;
  is_active?: boolean;
  category?: string | null;
  followers?: User[];
  is_personalisation?: boolean;
  collaborators?: BoardCollaborator[];
  updated_at?: string; // or Date
}

export interface BoardCollaborator {
  id?: number;
  user?: User;
  board?: Board;
  date_joined?: string; // or Date
}

export interface BoardCollaboratorPermission {
  id?: number;
  collaborator?: BoardCollaborator;
  permission?: string; // Should be one of the choices in PERMISSION_CHOICES
}

export interface CreateBoardType {
  name: string;
  description: string;
  category: string;
}


