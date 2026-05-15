import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function checkTable() {
  const { data, error } = await supabase.from("team_members").select("*").limit(1);
  if (error) {
    console.log("Error:", error.message);
    if (error.message.includes("relation \"team_members\" does not exist")) {
      console.log("TABLE_MISSING");
    }
  } else {
    console.log("Table exists, data count:", data.length);
  }
}

checkTable();
