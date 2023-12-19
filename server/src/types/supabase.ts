export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string | null;
          company: string | null;
          created_at: string;
          employment_type: string | null;
          id: string;
          labels: string | null;
          link: string | null;
          location: string | null;
          notes: string | null;
          position: string | null;
          salary: string | null;
          salary_currency: string | null;
          status: string | null;
          updated_at: string | null;
          user_id: string | null;
          via: string | null;
          work_model: string | null;
        };
        Insert: {
          applied_at?: string | null;
          company?: string | null;
          created_at?: string;
          employment_type?: string | null;
          id?: string;
          labels?: string | null;
          link?: string | null;
          location?: string | null;
          notes?: string | null;
          position?: string | null;
          salary?: string | null;
          salary_currency?: string | null;
          status?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          via?: string | null;
          work_model?: string | null;
        };
        Update: {
          applied_at?: string | null;
          company?: string | null;
          created_at?: string;
          employment_type?: string | null;
          id?: string;
          labels?: string | null;
          link?: string | null;
          location?: string | null;
          notes?: string | null;
          position?: string | null;
          salary?: string | null;
          salary_currency?: string | null;
          status?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          via?: string | null;
          work_model?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      documents: {
        Row: {
          application_id: string | null;
          created_at: string;
          description: string | null;
          document_path: string | null;
          id: string;
          title: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          application_id?: string | null;
          created_at?: string;
          description?: string | null;
          document_path?: string | null;
          id?: string;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          application_id?: string | null;
          created_at?: string;
          description?: string | null;
          document_path?: string | null;
          id?: string;
          title?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          app_metadata: Json | null;
          created_at: string;
          email: string | null;
          id: string;
          user_metadata: Json | null;
        };
        Insert: {
          app_metadata?: Json | null;
          created_at?: string;
          email?: string | null;
          id: string;
          user_metadata?: Json | null;
        };
        Update: {
          app_metadata?: Json | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          user_metadata?: Json | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
