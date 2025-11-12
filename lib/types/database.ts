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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          city: string
          address: string
          description: string | null
          image_url: string | null
          amenities: Json
          latitude: number | null
          longitude: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          city: string
          address: string
          description?: string | null
          image_url?: string | null
          amenities?: Json
          latitude?: number | null
          longitude?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          city?: string
          address?: string
          description?: string | null
          image_url?: string | null
          amenities?: Json
          latitude?: number | null
          longitude?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      spaces: {
        Row: {
          id: string
          location_id: string
          name: string
          type: 'hotdesk' | 'meeting_room' | 'private_office'
          capacity: number
          price_per_month: number
          description: string | null
          image_url: string | null
          amenities: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          location_id: string
          name: string
          type: 'hotdesk' | 'meeting_room' | 'private_office'
          capacity?: number
          price_per_month: number
          description?: string | null
          image_url?: string | null
          amenities?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          location_id?: string
          name?: string
          type?: 'hotdesk' | 'meeting_room' | 'private_office'
          capacity?: number
          price_per_month?: number
          description?: string | null
          image_url?: string | null
          amenities?: Json
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          space_id: string
          start_time: string
          end_time: string
          total_hours: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          space_id: string
          start_time: string
          end_time: string
          total_hours: number
          total_amount: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          space_id?: string
          start_time?: string
          end_time?: string
          total_hours?: number
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          amount: number
          currency: string
          status: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded'
          refund_id: string | null
          refund_amount: number | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          amount: number
          currency?: string
          status?: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded'
          refund_id?: string | null
          refund_amount?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          amount?: number
          currency?: string
          status?: 'created' | 'authorized' | 'captured' | 'failed' | 'refunded'
          refund_id?: string | null
          refund_amount?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}