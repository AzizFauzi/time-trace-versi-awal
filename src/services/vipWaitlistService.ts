import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface VipWaitlistSubmission {
  contact: string;
  preferredPrice: string;
  selectedFeatures: string[];
}

export const submitVipWaitlistEntry = async (data: VipWaitlistSubmission): Promise<{ success: boolean; waitlistNumber: number; source: 'supabase' | 'local' }> => {
  // 1. Always backup to localStorage
  let waitlistNumber = 142;
  try {
    const existing = JSON.parse(localStorage.getItem('time_trace_premium_waitlist') || '[]');
    const newLocalEntry = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    existing.push(newLocalEntry);
    localStorage.setItem('time_trace_premium_waitlist', JSON.stringify(existing));
    waitlistNumber = 142 + existing.length;
  } catch (err) {
    console.warn('Failed saving waitlist to local storage:', err);
  }

  // 2. If Supabase is connected, insert to remote table
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('vip_waitlist').insert([
        {
          contact: data.contact,
          preferred_price: data.preferredPrice,
          selected_features: data.selectedFeatures,
        },
      ]);

      if (error) {
        console.error('Supabase VIP waitlist insert error:', error.message);
        return { success: true, waitlistNumber, source: 'local' };
      }

      // Count total submissions in Supabase to give a realistic waitlist number
      const { count } = await supabase.from('vip_waitlist').select('*', { count: 'exact', head: true });
      if (count !== null && count > 0) {
        waitlistNumber = 142 + count;
      }

      return { success: true, waitlistNumber, source: 'supabase' };
    } catch (err) {
      console.warn('Network error pushing to Supabase:', err);
    }
  }

  return { success: true, waitlistNumber, source: 'local' };
};
