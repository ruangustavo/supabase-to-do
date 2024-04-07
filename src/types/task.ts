import { Database } from './supabase'

export type Task = Database['public']['Tables']['tasks']['Row']
