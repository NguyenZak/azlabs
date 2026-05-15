import { getServices } from "@/lib/actions/cms";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient data={services} />;
}
