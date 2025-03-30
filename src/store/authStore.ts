import { create } from 'zustand';
import { Auth } from '@/types';
import { checkUserProfile, initializeUser, supabase } from '@/lib/supabase';

export const useAuthStore = create<Auth>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (session) {
      const { exists, isComplete } = await checkUserProfile(session.user.id);

      if (!exists) {
        // Try to initialize the user if they don't exist
        const { user: newUser, error: initError } = await initializeUser(
          session.user.id,
          email,
          email.split('@')[0], // Temporary name from email
          'frontend_dev'
        );

        if (initError || !newUser) {
          await supabase.auth.signOut();
          throw new Error('Failed to initialize user profile. Please sign up first.');
        }

        set({ user: newUser });
        return;
      }

      if (!isComplete) {
        await supabase.auth.signOut();
        throw new Error('User profile is incomplete. Please sign up first.');
      }

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) throw profileError;
      set({ user: profile });
    }
  },
  signUp: async (email: string, password: string, fullName: string, role: string) => {
    const { data: { session }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signUpError) throw signUpError;
    if (!session?.user) throw new Error('User creation failed');

    const { user: newUser, error: initError } = await initializeUser(
      session.user.id,
      email,
      fullName,
      role as any
    );

    if (initError || !newUser) {
      await supabase.auth.signOut();
      throw new Error('Failed to create user profile');
    }

    set({ user: newUser });
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        set({ user: null, loading: false });
        return;
      }

      try {
        const { exists, isComplete } = await checkUserProfile(session.user.id);

        if (!exists) {
          const { user: newUser, error: initError } = await initializeUser(
            session.user.id,
            session.user.email || '',
            session.user.email?.split('@')[0] || '',
            'frontend_dev'
          );

          if (initError || !newUser) {
            throw new Error('Failed to initialize user profile');
          }

          set({ user: newUser, loading: false });
          return;
        }

        if (!isComplete) {
          await supabase.auth.signOut();
          set({ user: null, loading: false });
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;
        set({ user: profile, loading: false });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        await supabase.auth.signOut();
        set({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, loading: false });
    }
  },
}));