import { getServices, getSiteSettings } from "@/lib/actions/cms";
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
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings()
  ]);

  return <ServicesClient data={services} settings={settings} />;
}
