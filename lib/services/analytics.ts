import { createClient } from "@/utils/supabase/client";

export async function trackPageView(path: string) {
  try {
    const supabase = createClient();
    
    // We use a silent insert to avoid blocking UI if table is missing or RLS is not set
    await supabase.from("page_views").insert({
      path: path,
      referrer: typeof document !== 'undefined' ? document.referrer : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });
  } catch (e) {
    // Silently fail to not disrupt user experience
  }
}

export async function trackEvent(name: string, category?: string, label?: string) {
  try {
    const supabase = createClient();
    
    await supabase.from("interaction_events").insert({
      event_name: name,
      event_category: category,
      event_label: label,
      page_path: typeof window !== 'undefined' ? window.location.pathname : null
    });
  } catch (e) {
    // Silently fail
  }
}

export async function getAnalyticsSummary() {
  const supabase = createClient();
  
  // Get total views
  const { count: totalViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  // Get total unique visitors (by IP - simplified for demo)
  const { data: visitors } = await supabase
    .from("page_views")
    .select("ip_address");
  
  const uniqueVisitors = new Set(visitors?.map(v => v.ip_address)).size;

  // Get views by path
  const { data: viewsByPath } = await supabase
    .rpc('get_views_by_path'); // We'll need a SQL function for this or group manually

  return {
    totalViews,
    uniqueVisitors,
    viewsByPath
  };
}
