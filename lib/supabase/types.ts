// Typy domeny ClearTable PL — 1:1 ze schematem (PRD §4).
// Bez klas udziałów (flat). % liczone w runtime: shares / SUM(shares).

export type ShareholderType = "founder" | "angel" | "vc" | "esop" | "other";

// Typy aliasy (nie interface) — Row musi być przypisywalny do Record<string, unknown>
// dla typowanego klienta supabase-js (GenericTable). Interface nie ma index signature.
export type CapTable = {
  id: string; // uuid
  owner_id: string; // -> auth.users.id (RLS)
  company_name: string;
  share_token: string; // publiczny token read-only linku (unikalny)
  is_shared: boolean; // czy link aktywny
  updated_at: string; // timestamptz ISO
};

export type Shareholder = {
  id: string; // uuid
  cap_table_id: string; // -> cap_tables.id (cascade delete)
  name: string;
  type: ShareholderType;
  shares: number; // liczba udziałów; % liczone w runtime
  created_at: string; // timestamptz ISO
};

// Wiersze do wstawienia (DB uzupełnia id/token/daty/defaulty).
export type CapTableInsert = Pick<CapTable, "company_name"> &
  Partial<Pick<CapTable, "owner_id" | "is_shared">>;

export type ShareholderInsert = Pick<Shareholder, "cap_table_id" | "name"> &
  Partial<Pick<Shareholder, "type" | "shares">>;

// Kształt bazy dla typowanego klienta supabase-js.
export interface Database {
  public: {
    Tables: {
      cap_tables: {
        Row: CapTable;
        Insert: CapTableInsert;
        Update: Partial<CapTableInsert> &
          Partial<Pick<CapTable, "is_shared" | "updated_at">>;
        Relationships: [];
      };
      shareholders: {
        Row: Shareholder;
        Insert: ShareholderInsert;
        Update: Partial<ShareholderInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      shareholder_type: ShareholderType;
    };
    CompositeTypes: Record<string, never>;
  };
}
