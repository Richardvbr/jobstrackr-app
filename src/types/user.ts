export type UserData = {
  id: string;
  created_at: string;
  email: string | null;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    name: string;
    email: string;
    picture: string;
    full_name: string;
    avatar_url: string;
  };
};
