import { getSolutions } from "@/lib/actions/cms";
import SolutionsClient from "./SolutionsClient";

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return <SolutionsClient data={solutions} />;
}
