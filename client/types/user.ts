export interface CurrentUser {
  username: string;
  is_admin: boolean;
}

export type UserProfile = {
  username: string;
  email: string;
  first_name: string;
  gender: string;
  address: string;
  phone: string;
  academic_level: string;
};
