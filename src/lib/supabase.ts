import { createClient } from '@supabase/supabase-js';
import { User, UserRole } from '@/types';
import { DEFAULT_WORK_SCHEDULE } from '@/constants/schedule';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'timesheet-manager'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error: authError } = await supabase.auth.getSession();
    return !authError;
  } catch (err) {
    return false;
  }
};

export const handleSupabaseError = (error: any): string => {
  if (!error) return 'An unknown error occurred';

  if (error.message === 'Failed to fetch' || error.message.includes('network')) {
    return 'Network connection error. Please check your internet connection and try again.';
  }

  if (error.message.includes('JWT')) {
    return 'Your session has expired. Please sign in again.';
  }

  if (error.code === 'PGRST301') {
    return 'Database connection error. Please try again later.';
  }

  if (error.code === '429') {
    return 'Too many requests. Please wait a moment and try again.';
  }

  return error.message || 'An unexpected error occurred. Please try again.';
};

interface UserInitResult {
  user: User | null;
  isNewUser: boolean;
  error?: string;
}

export const initializeUser = async (
  authUserId: string,
  email: string,
  fullName: string,
  role: UserRole = 'frontend_dev'
): Promise<UserInitResult> => {
  try {
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUserId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingUser) {
      return {
        user: existingUser,
        isNewUser: false
      };
    }

    // Create new user profile
    const newUser = {
      id: authUserId,
      email,
      full_name: fullName,
      role,
      work_schedule: DEFAULT_WORK_SCHEDULE,
      created_at: new Date().toISOString()
    };

    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    if (!createdUser) {
      throw new Error('Failed to create user profile');
    }

    return {
      user: createdUser,
      isNewUser: true
    };

  } catch (error) {
    console.error('Error initializing user:', error);
    return {
      user: null,
      isNewUser: false,
      error: handleSupabaseError(error)
    };
  }
};

export const checkUserProfile = async (userId: string): Promise<{ exists: boolean; isComplete: boolean }> => {
  try {
    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return { exists: false, isComplete: false };
      }
      throw error;
    }

    const isComplete = Boolean(
      profile &&
      profile.email &&
      profile.full_name &&
      profile.role
    );

    return { exists: true, isComplete };
  } catch (err) {
    console.error('Error checking user profile:', err);
    throw err;
  }
};