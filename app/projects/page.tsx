import { getProjects } from "@/lib/actions/cms";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient data={projects} />;
}
