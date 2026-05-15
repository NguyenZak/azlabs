import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

export default async function Diagnostic() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase.from("hero_slides").select("count");
  
  if (error) {
    console.error("DIAGNOSTIC ERROR:", error.message);
    return { status: "error", message: error.message };
  }
  
  return { status: "ok", count: data };
}
