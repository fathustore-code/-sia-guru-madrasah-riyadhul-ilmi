
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ujeugupgfdzrmnomikpt.supabase.co'
const supabasePublishableKey = 'sb_publishable_s6F9JBllAr7Z3-pMb7uI3A_es2Pe0tb'

export const supabase = createClient(
  supabaseUrl,
    supabasePublishableKey
    )
