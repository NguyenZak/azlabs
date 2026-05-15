import { getServices } from "@/lib/actions/cms";
import ServicesClient from "./ServicesClient";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return constructMetadata({
    title: "Dịch vụ Công nghệ & Chuyển đổi số",
    description: "Giải pháp thiết kế website cao cấp, phát triển ứng dụng di động và tích hợp trí tuệ nhân tạo đột phá cho doanh nghiệp.",
    url: "/services",
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesClient data={services} />;
}
