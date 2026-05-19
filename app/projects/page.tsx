import { getProjects, getSiteSettings } from "@/lib/actions/cms";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSiteSettings()
  ]);

  return <ProjectsClient data={projects} settings={settings} />;
}
