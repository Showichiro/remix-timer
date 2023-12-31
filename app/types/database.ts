export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      timer: {
        Row: {
          created_at: string
          hour: number
          id: number
          is_countdown: boolean
          minute: number
          name: string
          second: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hour?: number
          id?: number
          is_countdown?: boolean
          minute?: number
          name?: string
          second?: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          hour?: number
          id?: number
          is_countdown?: boolean
          minute?: number
          name?: string
          second?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
