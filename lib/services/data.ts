/**
 * Static Data for AZLABS
 * Used as a fallback or for purely static sections
 */

export const NAV_LINKS = [
  { name: "Services", href: "#services", name_vi: "Dịch vụ" },
  { name: "Work", href: "#work", name_vi: "Dự án" },
  { name: "About", href: "#about", name_vi: "Về chúng tôi" },
  { name: "Blog", href: "/blog", name_vi: "Blog" },
  { name: "Contact", href: "#contact", name_vi: "Liên hệ" },
];

export const TECH_STACK = [
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "amazonaws", name: "AWS" },
  { slug: "docker", name: "Docker" },
  { slug: "swift", name: "Swift" },
  { slug: "kotlin", name: "Kotlin" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "supabase", name: "Supabase" },
  { slug: "firebase", name: "Firebase" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "framer", name: "Framer Motion" },
  { slug: "prisma", name: "Prisma" },
  { slug: "postman", name: "Postman" },
  { slug: "python", name: "Python" },
  { slug: "stripe", name: "Stripe" },
  { slug: "vercel", name: "Vercel" },
  { slug: "github", name: "GitHub" },
  { slug: "openai", name: "OpenAI" },
  { slug: "googlecloud", name: "Google Cloud" },
  { slug: "mongodb", name: "MongoDB" },
  { slug: "redis", name: "Redis" },
  { slug: "cloudflare", name: "Cloudflare" },
  { slug: "figma", name: "Figma" }
];

export const MOCK_SERVICES = [
  {
    id: "1",
    title_en: "Web Development",
    title_vi: "Phát triển Web",
    description_en: "High-performance, scalable web applications built with Next.js and React.",
    description_vi: "Ứng dụng web hiệu suất cao, có khả năng mở rộng được xây dựng bằng Next.js và React.",
    image_url: "/services/web.png",
    order_index: 0
  },
  {
    id: "2",
    title_en: "Mobile Solutions",
    title_vi: "Giải pháp Di động",
    description_en: "Native and cross-platform mobile apps for iOS and Android.",
    description_vi: "Ứng dụng di động bản địa và đa nền tảng cho iOS và Android.",
    image_url: "/services/mobile.png",
    order_index: 1
  },
  {
    id: "3",
    title_en: "AI Integration",
    title_vi: "Tích hợp AI",
    description_en: "Custom AI solutions to automate and enhance your business processes.",
    description_vi: "Các giải pháp AI tùy chỉnh để tự động hóa và nâng cao quy trình kinh doanh của bạn.",
    image_url: "/services/ai.png",
    order_index: 2
  }
];

export const HERO_SAMPLES = [
  {
    title_en: "Engineering the Future of AI Ecosystems",
    title_vi: "Kiến tạo Tương lai Hệ sinh thái AI",
    subtitle_en: "Pioneering cinematic digital experiences with cutting-edge intelligence and Apple-grade aesthetics.",
    subtitle_vi: "Tiên phong trải nghiệm kỹ thuật số điện ảnh với trí tuệ tiên tiến và thẩm mỹ đẳng cấp Apple.",
    cta_text_en: "Explore Our Core",
    cta_text_vi: "Khám phá Cốt lõi",
    cta_link: "/services",
    order_index: 0
  },
  {
    title_en: "Next-Gen Platforms for Global Innovators",
    title_vi: "Nền tảng Thế hệ mới cho Nhà đổi mới Toàn cầu",
    subtitle_en: "Ultra-fast, scalable infrastructures designed for the next wave of high-tech industries.",
    subtitle_vi: "Cơ sở hạ tầng siêu nhanh, có khả năng mở rộng được thiết kế cho làn sóng công nghệ cao tiếp theo.",
    cta_text_en: "View Technology Stack",
    cta_text_vi: "Xem Hệ sinh thái Công nghệ",
    cta_link: "/tech-stack",
    order_index: 1
  },
  {
    title_en: "High-Performance Digital Transformation",
    title_vi: "Chuyển đổi Kỹ thuật số Hiệu suất cao",
    subtitle_en: "Elevating brands through sophisticated motion design and cloud-native engineering.",
    subtitle_vi: "Nâng tầm thương hiệu thông qua thiết kế chuyển động tinh tế và kỹ thuật đám mây tối ưu.",
    cta_text_en: "Get Started",
    cta_text_vi: "Bắt đầu ngay",
    cta_link: "/contact",
    order_index: 2
  }
];

export const FEATURE_SAMPLES = [
  {
    title_en: "AI-Powered Analytics",
    title_vi: "Phân tích hỗ trợ bởi AI",
    description_en: "Deep insights into your business data.",
    description_vi: "Thông tin sâu sắc về dữ liệu kinh doanh của bạn.",
    icon: "Sparkles"
  },
  {
    title_en: "Cloud Native",
    title_vi: "Đám mây bản địa",
    description_en: "Built for the modern web infrastructure.",
    description_vi: "Xây dựng cho cơ sở hạ tầng web hiện đại.",
    icon: "Cloud"
  }
];
