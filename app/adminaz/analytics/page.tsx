import { getAnalytics, getContacts, getProjects } from "@/lib/actions/cms";
import AnalyticsClient from "./AnalyticsClient";

export default async function AnalyticsPage() {
  const stats = await getAnalytics();
  const contacts = await getContacts();
  const projects = await getProjects();

  return (
    <AnalyticsClient 
      stats={stats} 
      contacts={contacts} 
      projects={projects}
    />
  );
}
