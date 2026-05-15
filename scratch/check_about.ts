import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function checkAboutContent() {
  const { data, error } = await supabase.from("about_content").select("*").limit(1);
  if (error) {
    console.log("Error about_content:", error.message);
  } else if (data && data.length > 0) {
    console.log("Columns in about_content:", Object.keys(data[0]));
  } else {
    console.log("about_content exists but is empty.");
  }
}

checkAboutContent();
