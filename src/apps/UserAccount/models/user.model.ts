export interface UserAuth {
  accessToken?: string;
  refreshToken?: string;
  id_token_google?: string;
  userAccount?: UserAccount | null;
  isLoadingUser?: boolean;
  isAuthenticated?: boolean;
  isVerify?: boolean;
  stateMessage?: string;
  isVerifyActivateEmail?: boolean;
  isLoadingActivate?: boolean;
  isLoadingCreate:boolean
}

export interface UserAccount{
  id?: number;
  email?: string;
  username: string;
  first_name?: string;
  last_name?: string;
  date_joined?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  is_registered_with_google?: boolean;
  desactivate_account?: boolean;
}


export interface CommentEspecificWords {
  word_name: string;
}

export interface UserPermissionSettings {
  user_account: number;
  can_mentions:
    | "anyone_on_pinterest"
    | "only_people_you_follow"
    | "turn_off_mentions";
  hidden_me_comments_especific_words: CommentEspecificWords[];
  hidden_others_comments_especific_words: CommentEspecificWords[];
  messages_friends: "direct_messages" | "message_requests" | "ignore";
  messages_followers: "direct_messages" | "message_requests" | "ignore";
  messages_following: "direct_messages" | "message_requests" | "ignore";
  messages_contact: "direct_messages" | "message_requests" | "ignore";
  messages_others: "direct_messages" | "message_requests" | "ignore";
  show_on_standard_pins: boolean;
  show_on_idea_pins: boolean;
  auto_play_videos: boolean;
}

export interface CreateUser {
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  password: string;
  re_password: string;
}