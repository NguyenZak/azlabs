import { getSolutions, getSiteSettings } from "@/lib/actions/cms";
import SolutionsClient from "./SolutionsClient";

export default async function SolutionsPage() {
  const [solutions, settings] = await Promise.all([
    getSolutions(),
    getSiteSettings()
  ]);

  return <SolutionsClient data={solutions} settings={settings} />;
}
