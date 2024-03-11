import { User } from "@supabase/supabase-js";

export function isGuestUser(user: User | null) {
  return user?.id === "5e6d4cdf-1074-4b64-bf54-df145a784201";
}
