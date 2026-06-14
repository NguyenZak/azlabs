"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { TracingBeam } from "@/components/ui/tracing-beam";
import TechContact from "@/sections/TechContact";
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Cloud, 
  Bot, 
  Globe, 
  PenTool, 
  Network, 
  BarChart3, 
  Server,
  Coffee,
  GraduationCap,
  ShoppingBag,
  Activity,
  Building,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Clock,
  MessageSquare,
  Lock
} from "lucide-react";
import gsap from "gsap";

const techLogos: Record<string, string> = {
  "React": "react/61DAFB",
  "Next.js": "nextdotjs/white",
  "Vue": "vuedotjs/4FC08D",
  "Angular": "angular/DD0031",
  "TailwindCSS": "tailwindcss/06B6D4",
  "TypeScript": "typescript/3178C6",
  "Node.js": "nodedotjs/339933",
  "Express": "express/white",
  "Python": "python/3776AB",
  "Django": "django/092E20",
  "Go": "go/00ADD8",
  "Java": "openjdk/FFFFFF",
  "Spring Boot": "springboot/6DB33F",
  "Flutter": "flutter/02569B",
  "React Native": "react/61DAFB",
  "Swift (iOS)": "swift/F05138",
  "Kotlin (Android)": "kotlin/7F52FF",
  "PostgreSQL": "postgresql/4169E1",
  "MySQL": "mysql/4479A1",
  "MongoDB": "mongodb/47A248",
  "Redis": "redis/FF4438",
  "Elasticsearch": "elasticsearch/005571",
  "AWS": "amazonaws/232F3E",
  "Google Cloud": "googlecloud/4285F4",
  "Azure": "microsoftazure/0089D6",
  "Docker": "docker/2496ED",
  "Kubernetes": "kubernetes/326CE5",
  "CI/CD": "githubactions/2088FF",
  "OpenAI API": "openai/white",
  "TensorFlow": "tensorflow/FF6F00",
  "PyTorch": "pytorch/EE4C2C",
  "Custom LLMs": "huggingface/FFD21E",
  "Mô hình LLMs": "huggingface/FFD21E",
  "RAG": "langchain/white"
};

const content = {
  en: {
    hero: {
      badge: "AZLabs Technology Partner Portfolio",
      title1: "Build Systems.",
      title2: "Not Just Software.",
      desc: "AZLabs is a technology partner that helps businesses design, build, and scale digital systems — from websites and mobile apps to AI-powered enterprise software.",
      ctaPrimary: "Get Consultation",
      ctaSecondary: "View Our Work"
    },
    about: {
      title: "About AZLabs",
      p1: "AZLabs is a full-stack technology company specializing in custom software development, SaaS platforms, and AI-powered solutions.",
      p2: "We don't just build products — we build systems that power business operations, automate workflows, and unlock growth.",
      values: ['Practical Innovation', 'Business-first Thinking', 'Scalable Architecture', 'AI-driven Future']
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive technology solutions to scale your business.",
      items: [
        {
          icon: <Code className="w-6 h-6" />,
          title: "Custom Software Development",
          description: "We design and build tailored software solutions for businesses of all sizes.",
          list: ["ERP, CRM, HRM systems", "Internal management platforms", "Workflow automation tools", "Business operation systems"]
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Mobile App Development",
          description: "From idea to launch, we build powerful mobile experiences.",
          list: ["iOS & Android apps", "Cross-platform development", "Internal business apps", "AI-integrated applications"]
        },
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "SaaS Platform Development",
          description: "Launch and scale your SaaS product with AZLabs.",
          list: ["Multi-tenant architecture", "Subscription & billing systems", "Admin dashboards", "High-performance backend"]
        },
        {
          icon: <Bot className="w-6 h-6" />,
          title: "AI Integration & Automation",
          description: "We integrate AI directly into your business workflows.",
          list: ["AI chatbot for customer service", "Internal AI assistants", "Recommendation systems", "Automation pipelines"]
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: "Website Development & SEO",
          description: "We build high-performance websites optimized for growth.",
          list: ["Corporate websites", "Landing pages", "E-commerce platforms", "SEO optimization (technical + content)"]
        },
        {
          icon: <PenTool className="w-6 h-6" />,
          title: "UI/UX Design",
          description: "Design that converts and scales.",
          list: ["User research & journey mapping", "Wireframes & prototypes", "Design systems", "Conversion optimization"]
        },
        {
          icon: <Network className="w-6 h-6" />,
          title: "System Integration",
          description: "Connect everything into one seamless system.",
          list: ["API integrations", "Payment gateways", "Third-party platforms", "Legacy system modernization"]
        },
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Data & Analytics",
          description: "Turn data into decisions.",
          list: ["Business dashboards", "Tracking & analytics setup", "Data pipelines", "AI-based predictions"]
        },
        {
          icon: <Server className="w-6 h-6" />,
          title: "DevOps & Cloud",
          description: "Reliable infrastructure for scalable products.",
          list: ["AWS / GCP / Azure deployment", "CI/CD pipelines", "Auto scaling systems", "Monitoring & logging"]
        }
      ]
    },
    industries: {
      title: "Solutions by Industry",
      subtitle: "We build solutions tailored to specific industries with deep domain expertise.",
      items: [
        { icon: <Coffee className="w-8 h-8" />, name: "F&B" },
        { icon: <GraduationCap className="w-8 h-8" />, name: "Education" },
        { icon: <ShoppingBag className="w-8 h-8" />, name: "Retail & E-commerce" },
        { icon: <Activity className="w-8 h-8" />, name: "Healthcare" },
        { icon: <Building className="w-8 h-8" />, name: "Real Estate" },
        { icon: <Truck className="w-8 h-8" />, name: "Logistics" }
      ]
    },
    process: {
      title: "Our Process",
      items: [
        { num: "01", title: "Discovery", desc: "We understand your business, goals, and challenges." },
        { num: "02", title: "Strategy", desc: "We define the right solution and roadmap." },
        { num: "03", title: "Design", desc: "We create user-focused, scalable designs." },
        { num: "04", title: "Development", desc: "We build fast, reliable, and scalable systems." },
        { num: "05", title: "Launch & Scale", desc: "We support deployment, optimization, and growth." }
      ]
    },
    caseStudies: {
      title: "Impact Delivered",
      subtitle: "See how we engineer business growth through technology.",
      items: [
        {
          title: "Enterprise ERP System",
          client: "Manufacturing Corp",
          challenge: "Manual inventory tracking and disconnected financial systems were causing 20% loss in efficiency.",
          solution: "A custom multi-tenant ERP unifying HR, Finance, and Supply Chain with real-time analytics.",
          metrics: [
            { label: "Cost Reduction", value: "40%" },
            { label: "Reporting Speed", value: "10x" },
            { label: "ROI", value: "3 Months" }
          ],
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
        },
        {
          title: "AI-Powered SaaS Platform",
          client: "Global SaaS Inc.",
          challenge: "Customer support was overloaded, leading to 48-hour response times and churn.",
          solution: "Integrated custom LLMs to handle 80% of Tier 1 support queries automatically.",
          metrics: [
            { label: "Support Handled", value: "85%" },
            { label: "Response Time", value: "<1m" },
            { label: "CSAT Score", value: "98%" }
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
        },
        {
          title: "Omnichannel Super App",
          client: "Retail Enterprise",
          challenge: "Fragmented customer experience across 3 different apps caused low retention and high acquisition costs.",
          solution: "A unified cross-platform Super App with seamless e-commerce, loyalty program, and in-store QR payments.",
          metrics: [
            { label: "Active Users", value: "2M+" },
            { label: "Retention Rate", value: "3x" },
            { label: "App Store", value: "4.9★" }
          ],
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop"
        }
      ]
    },
    whyUs: {
      title: "Why AZLabs",
      items: [
        "Business-focused solutions",
        "Custom-built systems (no templates)",
        "AI-first approach",
        "Scalable architecture",
        "Long-term technology partner"
      ]
    },
    techStack: {
      title: "Tech Stack",
      items: [
        { label: "Frontend", value: "React, Next.js, Vue, Angular, TailwindCSS, TypeScript" },
        { label: "Backend", value: "Node.js, Express, Python, Django, Go, Java, Spring Boot" },
        { label: "Mobile", value: "Flutter, React Native, Swift (iOS), Kotlin (Android)" },
        { label: "Database", value: "PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch" },
        { label: "Cloud & DevOps", value: "AWS, Google Cloud, Azure, Docker, Kubernetes, CI/CD" },
        { label: "AI & ML", value: "OpenAI API, TensorFlow, PyTorch, Custom LLMs, RAG" }
      ]
    },
    commitment: {
      title: "Our Commitment",
      subtitle: "We stand by our engineering and your business goals.",
      items: [
        { icon: <Clock className="w-8 h-8" />, title: "On-time Delivery", desc: "We respect your timeline and launch schedules." },
        { icon: <MessageSquare className="w-8 h-8" />, title: "Transparent Communication", desc: "No technical jargon. Clear, honest updates." },
        { icon: <ShieldCheck className="w-8 h-8" />, title: "Long-term Support", desc: "We support you long after the product goes live." },
        { icon: <Lock className="w-8 h-8" />, title: "Data Security", desc: "Strict adherence to enterprise security standards." }
      ]
    },
    contact: {
      title: "Let's build something impactful together.",
      subtitle: "Leave your information below and our experts will reach out to provide the best solutions for your business.",
      cta: "Start Your Project Today"
    }
  },
  vi: {
    hero: {
      badge: "Đặc Quyền Doanh Nghiệp Họ Dương Việt Nam",
      title1: "Xin Chào Doanh Nghiệp,",
      title2: "Hộ Kinh Doanh Họ Dương.",
      desc: "AZLabs tự hào là đối tác công nghệ chiến lược, đồng hành cùng các doanh nghiệp, hộ kinh doanh họ Dương thiết kế, xây dựng và chuyển đổi số toàn diện — từ website đến hệ thống quản trị AI.",
      ctaPrimary: "Nhận Tư Vấn Trực Tiếp",
      ctaSecondary: "Khám Phá Giải Pháp"
    },
    about: {
      title: "Giải Pháp Đột Phá",
      p1: "AZLabs là công ty công nghệ full-stack chuyên phát triển phần mềm tùy chỉnh, nền tảng SaaS và giải pháp tích hợp AI cho doanh nghiệp.",
      p2: "Chúng tôi cam kết mang đến các hệ thống quản trị, tự động hóa quy trình giúp các doanh nghiệp và hộ kinh doanh họ Dương tối ưu vận hành và mở khóa đà tăng trưởng bền vững.",
      values: ['Đổi mới thực tiễn', 'Thấu hiểu đặc thù kinh doanh', 'Kiến trúc mở rộng linh hoạt', 'Tương lai dẫn dắt bởi AI']
    },
    services: {
      title: "Giải Pháp Số Hóa",
      subtitle: "Giải pháp công nghệ toàn diện giúp hệ sinh thái doanh nghiệp họ Dương mở rộng quy mô và bứt phá.",
      items: [
        {
          icon: <Code className="w-6 h-6" />,
          title: "Phát triển phần mềm doanh nghiệp",
          description: "Thiết kế và xây dựng phần mềm quản trị tùy biến cho quy mô và đặc thù của doanh nghiệp họ Dương.",
          list: ["Hệ thống ERP, CRM, HRM", "Nền tảng quản lý nội bộ", "Công cụ tự động hóa quy trình", "Hệ thống vận hành doanh nghiệp"]
        },
        {
          icon: <Smartphone className="w-6 h-6" />,
          title: "Phát triển ứng dụng di động",
          description: "Từ ý tưởng đến ra mắt, chúng tôi kiến tạo trải nghiệm di động mạnh mẽ cho khách hàng và nội bộ.",
          list: ["Ứng dụng iOS & Android", "Phát triển đa nền tảng", "Ứng dụng chăm sóc khách hàng", "Ứng dụng tích hợp AI"]
        },
        {
          icon: <Cloud className="w-6 h-6" />,
          title: "Phát triển nền tảng SaaS",
          description: "Chuyển đổi mô hình kinh doanh truyền thống sang nền tảng dịch vụ số SaaS.",
          list: ["Kiến trúc multi-tenant", "Hệ thống đăng ký & thanh toán", "Bảng điều khiển quản trị", "Backend hiệu năng cao"]
        },
        {
          icon: <Bot className="w-6 h-6" />,
          title: "Tích hợp AI & Tự động hóa",
          description: "Tiên phong đưa AI trực tiếp vào quy trình làm việc để giảm chi phí nhân sự.",
          list: ["Chatbot AI CSKH tự động", "Trợ lý ảo AI nội bộ", "Hệ thống phân tích dữ liệu", "Chuỗi tự động hóa thông minh"]
        },
        {
          icon: <Globe className="w-6 h-6" />,
          title: "Phát triển Website & SEO",
          description: "Xây dựng website doanh nghiệp chuẩn quốc tế, định vị thương hiệu mạnh mẽ trên Internet.",
          list: ["Website giới thiệu công ty", "Trang đích (Landing pages) chuyển đổi cao", "Nền tảng thương mại điện tử", "Tối ưu hóa SEO tổng thể"]
        },
        {
          icon: <PenTool className="w-6 h-6" />,
          title: "Thiết kế UI/UX & Thương Hiệu",
          description: "Giao diện số hóa chuyên nghiệp, nâng tầm hình ảnh doanh nghiệp trong mắt đối tác.",
          list: ["Nghiên cứu hành trình khách hàng", "Wireframe & Prototype", "Nhận diện thương hiệu số", "Tối ưu hóa điểm chạm"]
        },
        {
          icon: <Network className="w-6 h-6" />,
          title: "Tích hợp hệ thống đồng bộ",
          description: "Kết nối dữ liệu rời rạc thành một trung tâm quản lý duy nhất.",
          list: ["Tích hợp API đối tác", "Tích hợp cổng thanh toán VNPay, MoMo", "Hệ thống kế toán bên thứ ba", "Nâng cấp hệ thống cũ"]
        },
        {
          icon: <BarChart3 className="w-6 h-6" />,
          title: "Phân tích dữ liệu kinh doanh",
          description: "Báo cáo trực quan giúp lãnh đạo đưa ra quyết định nhanh chóng và chính xác.",
          list: ["Dashboard báo cáo CEO", "Hệ thống theo dõi dòng tiền", "Luồng dữ liệu (Data pipelines)", "Dự báo tăng trưởng bằng AI"]
        },
        {
          icon: <Server className="w-6 h-6" />,
          title: "Điện toán đám mây & Bảo mật",
          description: "Lưu trữ dữ liệu an toàn tuyệt đối và đảm bảo hệ thống luôn hoạt động 24/7.",
          list: ["Hạ tầng điện toán đám mây", "Sao lưu dữ liệu tự động", "Hệ thống tự động chống quá tải", "Giám sát & Bảo vệ chống tấn công"]
        }
      ]
    },
    industries: {
      title: "Đa Dạng Lĩnh Vực",
      subtitle: "Chúng tôi đã và đang cung cấp giải pháp chuyển đổi số cho nhiều mô hình kinh doanh truyền thống.",
      items: [
        { icon: <Coffee className="w-8 h-8" />, name: "F&B (Nhà hàng, Quán Cafe)" },
        { icon: <GraduationCap className="w-8 h-8" />, name: "Giáo dục & Đào tạo" },
        { icon: <ShoppingBag className="w-8 h-8" />, name: "Bán lẻ & Thương mại điện tử" },
        { icon: <Activity className="w-8 h-8" />, name: "Phòng khám & Dịch vụ Y tế" },
        { icon: <Building className="w-8 h-8" />, name: "Bất động sản & Xây dựng" },
        { icon: <Truck className="w-8 h-8" />, name: "Logistics & Vận tải" }
      ]
    },
    process: {
      title: "Quy trình Triển Khai",
      items: [
        { num: "01", title: "Khảo Sát", desc: "Đội ngũ AZLabs gặp gỡ, tìm hiểu thực trạng quản lý và vấn đề cốt lõi của doanh nghiệp." },
        { num: "02", title: "Tư Vấn & Đề Xuất", desc: "Lên phương án số hóa khả thi, phù hợp với ngân sách và quy mô hiện tại." },
        { num: "03", title: "Phát Triển", desc: "Lập trình và hoàn thiện phần mềm trong thời gian cam kết." },
        { num: "04", title: "Đào Tạo & Chuyển Giao", desc: "Hướng dẫn đội ngũ nhân sự sử dụng thành thạo hệ thống mới." },
        { num: "05", title: "Đồng Hành Dài Hạn", desc: "Bảo trì, nâng cấp liên tục để hệ thống lớn mạnh cùng công ty." }
      ]
    },
    caseStudies: {
      title: "Hiệu Quả Thực Tế",
      subtitle: "Những bài toán quản trị đã được giải quyết triệt để nhờ áp dụng giải pháp từ AZLabs.",
      items: [
        {
          title: "Hệ thống Quản lý Chuỗi Cung Ứng",
          client: "Doanh nghiệp Sản xuất & Phân phối",
          challenge: "Quản lý tồn kho thủ công, thất thoát hàng hóa 15% và chậm trễ đối soát công nợ cuối tháng.",
          solution: "Hệ thống ERP tùy chỉnh hợp nhất Kho bãi, Bán hàng và Tài chính với khả năng quét mã vạch và báo cáo theo thời gian thực.",
          metrics: [
            { label: "Giảm Thất thoát", value: "99%" },
            { label: "Tốc độ Báo cáo", value: "Tức thời" },
            { label: "Hoàn vốn (ROI)", value: "4 Tháng" }
          ],
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop"
        },
        {
          title: "Số Hóa Quy Trình Chăm Sóc Khách Hàng",
          client: "Công ty Dịch vụ & Bán lẻ",
          challenge: "Nhân sự trực fanpage và Zalo quá tải, thời gian phản hồi lâu khiến khách hàng phàn nàn và bỏ đi.",
          solution: "Tích hợp Bot AI tự động hóa kịch bản tư vấn, trả lời câu hỏi thường gặp và tự động tạo đơn hàng 24/7.",
          metrics: [
            { label: "Tự động xử lý", value: "85%" },
            { label: "Thời gian phản hồi", value: "<10s" },
            { label: "Tăng trưởng Doanh thu", value: "30%" }
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
        },
        {
          title: "Hệ Thống Đặt Lịch & Hội Viên Cao Cấp",
          client: "Chuỗi Dịch vụ & Chăm sóc Sức khỏe",
          challenge: "Lịch hẹn chồng chéo, quản lý thẻ thành viên trên sổ sách gây khó khăn trong việc chăm sóc và giữ chân khách cũ.",
          solution: "Phát triển App đặt lịch riêng với hệ thống tích điểm loyalty, nhắc nhở tự động qua Zalo ZNS.",
          metrics: [
            { label: "Tỷ lệ quay lại", value: "+45%" },
            { label: "Giảm nhân sự trực", value: "2 Người" },
            { label: "Trải nghiệm KH", value: "5.0★" }
          ],
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop"
        }
      ]
    },
    whyUs: {
      title: "Sự Khác Biệt Của AZLabs",
      items: [
        "Thiết kế riêng biệt cho đặc thù kinh doanh của bạn",
        "Luôn đồng hành sát sao cùng doanh nghiệp",
        "Áp dụng công nghệ thực tiễn, sinh lời ngay",
        "Chi phí minh bạch, không phát sinh ẩn",
        "Đội ngũ kỹ sư tinh nhuệ, tận tâm"
      ]
    },
    techStack: {
      title: "Hạ Tầng Công Nghệ Mới Nhất",
      items: [
        { label: "Frontend", value: "React, Next.js, TailwindCSS" },
        { label: "Backend", value: "Node.js, Python, Java, Go" },
        { label: "Mobile", value: "Flutter, React Native, Swift" },
        { label: "Database", value: "PostgreSQL, MongoDB, Redis" },
        { label: "Bảo mật & Máy chủ", value: "AWS, Google Cloud, Docker" },
        { label: "AI Trí Tuệ Nhân Tạo", value: "OpenAI, Custom LLMs, RAG" }
      ]
    },
    commitment: {
      title: "Cam Kết Với Họ Dương",
      subtitle: "AZLabs tự hào góp phần xây dựng sự vững mạnh của cộng đồng doanh nghiệp họ Dương.",
      items: [
        { icon: <Clock className="w-8 h-8" />, title: "Triển Khai Đúng Hẹn", desc: "Chúng tôi coi trọng thời gian vàng ngọc của doanh nghiệp." },
        { icon: <MessageSquare className="w-8 h-8" />, title: "Tư Vấn Chân Thành", desc: "Không vẽ vời tính năng không cần thiết. Tập trung vào bài toán cốt lõi." },
        { icon: <ShieldCheck className="w-8 h-8" />, title: "Bảo Trì Trọn Đời", desc: "Hệ thống vận hành trơn tru là trách nhiệm cao nhất của AZLabs." },
        { icon: <Lock className="w-8 h-8" />, title: "Bảo Mật Kín Đáo", desc: "Bảo vệ tuyệt đối thông tin kinh doanh và dữ liệu khách hàng của bạn." }
      ]
    },
    contact: {
      title: "Sẵn sàng bứt phá doanh thu với chuyển đổi số?",
      subtitle: "Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ tư vấn giải pháp tối ưu nhất cho doanh nghiệp của bạn.",
      cta: "Kết Nối Với Chuyên Gia AZLabs"
    }
  }
};

const MouseSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.12), transparent 80%)`
      }}
    />
  );
};

const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("w-max cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative transition-all duration-200 ease-linear", className)}
    >
      <div 
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ProjectImage = ({ src, alt }: { src: string, alt: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      className="relative w-full aspect-square lg:aspect-video rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl lg:cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
      <img src={src} alt={alt} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
            className="absolute top-0 left-0 w-24 h-24 bg-blue-600/80 backdrop-blur-md rounded-full items-center justify-center text-white font-semibold tracking-wider text-sm z-50 pointer-events-none shadow-[0_0_30px_rgba(59,130,246,0.6)] hidden lg:flex"
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = content[language === "vi" ? "vi" : "en"];
  
  const heroWords = language === "vi" 
    ? ["Không Chỉ Là Phần Mềm.", "Tương Lai Doanh Nghiệp.", "Lợi Thế Cạnh Tranh.", "Nền Tảng Mở Rộng."]
    : ["Not Just Software.", "The Future of B2B.", "Your Next Advantage.", "Scalable Platforms."];
  
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroWords.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-[100px] pb-20 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      <MouseSpotlight />
      
      {/* 1. Hero Section */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto min-h-[70vh] flex flex-col justify-center relative perspective-1000 z-10">
        <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-[20%] w-[50%] h-[50%] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Enterprise Dashboard Mockup Element */}
        <div className="absolute right-[5%] top-1/4 w-[600px] h-[400px] pointer-events-none hidden lg:block perspective-1000">
          <motion.div 
            initial={{ opacity: 0, rotateY: 15, x: 50 }}
            animate={{ opacity: 1, rotateY: -5, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)] bg-black/50 backdrop-blur-md"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Fake UI Header */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            {/* Fake UI Body */}
            <div className="p-6 grid grid-cols-4 gap-6 h-[calc(100%-3rem)]">
              {/* Sidebar */}
              <div className="col-span-1 border-r border-white/5 space-y-3 pr-4 flex flex-col">
                <div className="flex items-center gap-2 text-white/90 bg-white/10 px-3 py-2 rounded-md"><BarChart3 className="w-4 h-4 text-blue-400" /><span className="text-[11px] font-medium">Overview</span></div>
                <div className="flex items-center gap-2 text-white/50 px-3 py-1 hover:text-white/80 transition-colors"><Network className="w-4 h-4" /><span className="text-[11px]">Network</span></div>
                <div className="flex items-center gap-2 text-white/50 px-3 py-1 hover:text-white/80 transition-colors"><Server className="w-4 h-4" /><span className="text-[11px]">Servers</span></div>
                <div className="flex items-center gap-2 text-white/50 px-3 py-1 hover:text-white/80 transition-colors"><ShieldCheck className="w-4 h-4" /><span className="text-[11px]">Security</span></div>
                <div className="flex items-center gap-2 text-white/50 px-3 py-1 hover:text-white/80 transition-colors"><Bot className="w-4 h-4" /><span className="text-[11px]">AI Agents</span></div>
              </div>
              {/* Main Content */}
              <div className="col-span-3 space-y-6">
                {/* Stats */}
                <div className="flex gap-4">
                  <div className="w-1/2 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                    <div className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Total Requests</div>
                    <div className="text-2xl font-bold text-white tracking-tight">1.2M</div>
                  </div>
                  <div className="w-1/2 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                    <div className="text-[10px] text-white/50 font-medium uppercase tracking-wider">System Uptime</div>
                    <div className="text-2xl font-bold text-white tracking-tight">99.99%</div>
                  </div>
                </div>
                {/* Chart placeholder */}
                <div className="w-full h-32 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between p-4 relative">
                   <div className="flex justify-between items-center z-10 mb-2">
                      <span className="text-[11px] text-white/70 font-medium">Traffic Overview</span>
                      <span className="text-[10px] text-green-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/> Live</span>
                   </div>
                   <div className="flex-1 flex items-end gap-2 mt-2">
                     {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                       <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-400/80 rounded-t-sm" 
                       />
                     ))}
                   </div>
                </div>
              </div>
            </div>
            
            {/* Overlay reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </motion.div>
        </div>

        <div className="max-w-4xl relative z-10">
          <MagneticButton>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {t.hero.badge}
            </motion.div>
          </MagneticButton>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-[1.1] tracking-tight mb-8"
          >
            {t.hero.title1}<br/>
            {t.hero.title2}<br/>
            <div className="grid overflow-hidden w-full py-2 mt-2">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentWord}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                >
                  {heroWords[currentWord]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-xl md:text-2xl leading-relaxed max-w-2xl mb-12 font-light"
          >
            {t.hero.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <MagneticButton>
              <Link href="#contact" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                {t.hero.ctaPrimary} <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="#services" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 hover:scale-105 transition-all border border-white/10 backdrop-blur-md flex items-center">
                {t.hero.ctaSecondary}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* 2. About AZLabs */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t.about.title}</h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-6">
              {t.about.p1}
            </p>
            <p className="text-xl text-neutral-400 font-light leading-relaxed mb-12">
              {t.about.p2}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {t.about.values.map((val: any, i: number) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-150 transition-transform" />
                  <span className="text-neutral-200 font-medium group-hover:text-blue-400 transition-colors">{val}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <TiltCard className="relative aspect-square md:aspect-video lg:aspect-square rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full border border-white/5 rounded-2xl relative overflow-hidden flex flex-col p-6 bg-black/40 backdrop-blur-sm" style={{ transform: "translateZ(40px)" }}>
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                      <Bot className="w-5 h-5 text-blue-300" />
                    </div>
                 </div>
                 <div className="flex-1 text-sm font-mono leading-relaxed flex flex-col gap-2">
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-blue-400">
                      $ init azlabs-core
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="text-green-400">
                      &gt; Loading AI modules... [OK]
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-green-400">
                      &gt; Connecting to cloud infra... [OK]
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="text-purple-400 mt-2">
                      <span className="text-pink-500">const</span> <span className="text-blue-300">platform</span> = <span className="text-pink-500">new</span> <span className="text-yellow-200">AZLabs</span>.System(&#123;
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }} className="text-purple-400 pl-4">
                      mode: <span className="text-green-300">"scalable"</span>,
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="text-purple-400 pl-4">
                      ai_driven: <span className="text-orange-400">true</span>,
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.7 }} className="text-purple-400">
                      &#125;);
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 2.0 }} className="text-blue-400 mt-2">
                      $ platform.deploy()
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }} className="text-yellow-400">
                      &gt; System deployed successfully. 🚀
                    </motion.div>
                 </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 3. Our Services */}
      <section id="services" className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10">
        <Reveal className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t.services.title}</h2>
          <p className="text-xl text-neutral-400 font-light">{t.services.subtitle}</p>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1500px" }}>
          {t.services.items.map((svc: any, idx: number) => (
            <TiltCard key={idx} className="group bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/30 h-full flex flex-col backdrop-blur-sm">
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)] transition-all" style={{ transform: "translateZ(20px)" }}>
                  {svc.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ transform: "translateZ(30px)" }}>{svc.title}</h3>
                <p className="text-neutral-400 mb-8 min-h-[48px]" style={{ transform: "translateZ(20px)" }}>{svc.description}</p>
                <ul className="space-y-3 mt-auto" style={{ transform: "translateZ(25px)" }}>
                  {svc.list.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-500/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 4. Solutions by Industry */}
      <section className="py-32 px-6 md:px-12 bg-white/[0.02] border-y border-white/5 text-center relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{t.industries.title}</h2>
            <p className="text-xl text-neutral-400 font-light mb-16 max-w-2xl mx-auto">{t.industries.subtitle}</p>
          </Reveal>
          
          <div className="relative w-full overflow-hidden flex py-10" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-6 w-max"
            >
              {[...t.industries.items, ...t.industries.items].map((ind: any, i: number) => (
                <div key={i} className="w-[250px] shrink-0">
                  <TiltCard className="h-full">
                    <div className="flex flex-col items-center justify-center p-8 bg-black/50 border border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors group h-full backdrop-blur-sm">
                      <div className="text-neutral-500 group-hover:text-blue-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all mb-4" style={{ transform: "translateZ(30px)" }}>
                        {ind.icon}
                      </div>
                      <span className="font-medium text-neutral-400 group-hover:text-white transition-colors text-center" style={{ transform: "translateZ(20px)" }}>{ind.name}</span>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Our Process with Tracing Beam */}
      <section className="py-32 bg-black relative z-10">
        <Reveal className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t.process.title}</h2>
        </Reveal>
        
        <TracingBeam className="px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-24 relative">
            {t.process.items.map((step: any, i: number) => (
              <div key={i} className={cn("w-full md:w-[45%] relative", i % 2 === 0 ? "mr-auto ml-0" : "ml-auto mr-0")}>
                {/* Visual Connector to Center Tracing Beam */}
                <div className={cn(
                  "hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] w-[5.5vw] max-w-[100px] pointer-events-none", 
                  i % 2 === 0 
                    ? "left-full bg-gradient-to-r from-blue-500/50 to-transparent" 
                    : "right-full bg-gradient-to-l from-blue-500/50 to-transparent"
                )}>
                  {/* Glowing dot at the center line junction */}
                  <div className={cn("absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]", i % 2 === 0 ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2")} />
                </div>
                
                <TiltCard className="w-full">
                  <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white/[0.06] hover:border-blue-500/30 transition-all group backdrop-blur-sm">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5" style={{ transform: "translateZ(40px)" }}>
                        {step.num}
                      </div>
                      <h3 className="text-3xl font-bold group-hover:text-blue-400 transition-colors" style={{ transform: "translateZ(30px)" }}>{step.title}</h3>
                    </div>
                    <p className="text-xl text-neutral-400 leading-relaxed" style={{ transform: "translateZ(20px)" }}>{step.desc}</p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </TracingBeam>
      </section>

      {/* 6. Case Studies */}
      <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-transparent to-blue-950/20 border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto">
          <Reveal className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t.caseStudies.title}</h2>
            <p className="text-xl text-neutral-400 font-light">{t.caseStudies.subtitle}</p>
          </Reveal>

          <div className="space-y-32">
            {t.caseStudies.items.map((study: any, i: number) => (
              <div key={i} className={cn("flex flex-col lg:flex-row gap-16 items-center", i % 2 !== 0 && "lg:flex-row-reverse")}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <TiltCard>
                    <ProjectImage src={study.image} alt={study.title} />
                  </TiltCard>
                </div>
                
                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <Reveal delay={0.2}>
                    <div className="text-blue-500 font-mono text-sm tracking-wider uppercase mb-4">Project 0{i+1} • {study.client}</div>
                    <h3 className="text-4xl font-bold mb-6">{study.title}</h3>
                    
                    <div className="space-y-6 text-lg text-neutral-400">
                      <div>
                        <strong className="text-white block mb-2">The Challenge:</strong>
                        <p>{study.challenge}</p>
                      </div>
                      <div>
                        <strong className="text-white block mb-2">The Solution:</strong>
                        <p>{study.solution}</p>
                      </div>
                    </div>
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/10">
                      {study.metrics.map((metric: any, j: number) => (
                        <div key={j}>
                          <div className="text-3xl font-bold text-blue-400 mb-2">{metric.value}</div>
                          <div className="text-sm text-neutral-500 uppercase tracking-wider">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why AZLabs & Tech Stack */}
      <section className="py-32 px-6 md:px-12 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div>
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight">{t.whyUs.title}</h2>
          </Reveal>
          <ul className="space-y-6">
            {t.whyUs.items.map((reason: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-lg text-neutral-200 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <span className="group-hover:text-white group-hover:translate-x-2 transition-transform">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <TiltCard>
          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 backdrop-blur-sm h-full flex flex-col justify-center relative overflow-hidden group">
            {/* Subtle glow effect behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight relative z-10" style={{ transform: "translateZ(30px)" }}>{t.techStack.title}</h2>
            
            <div className="space-y-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
              {t.techStack.items.map((tech: any, i: number) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-white/5 last:border-0 group/row">
                  <span className="w-36 font-mono text-neutral-500 mb-3 sm:mb-0 shrink-0 pt-1 group-hover/row:text-blue-400 transition-colors">{tech.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {tech.value.split(', ').map((item: string, j: number) => (
                      <div 
                        key={j} 
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-neutral-300 hover:bg-white/10 hover:border-white/30 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 transition-all cursor-default"
                      >
                        {techLogos[item] && (
                          <img src={`https://cdn.simpleicons.org/${techLogos[item]}`} alt={item} className="w-4 h-4" />
                        )}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </section>

      {/* 8. Commitment */}
      <section className="py-32 px-6 md:px-12 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image */}
          <TiltCard className="w-full">
            <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group shadow-[0_0_50px_-15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_80px_-15px_rgba(59,130,246,0.5)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 group-hover:bg-blue-500/0 transition-colors duration-500" />
              {/* Using a premium 3D abstract liquid/glass unplash image */}
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
                alt="Our Commitment"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10 z-20 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <div className="w-16 h-1.5 bg-blue-500 mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{t.commitment.title}</h3>
                <p className="text-neutral-300 text-lg font-light">{t.commitment.subtitle}</p>
              </div>
            </div>
          </TiltCard>

          {/* Right Side: List */}
          <div className="space-y-12">
            {t.commitment.items.map((item: any, i: number) => (
              <div key={i} className="flex gap-6 group cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-500 shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-400 group-hover:scale-110 transition-all shadow-lg">
                  {item.icon}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-lg group-hover:text-neutral-300 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Contact Form */}
      <TechContact 
        customTitle={t.contact.title}
        customSubtitle={t.contact.subtitle}
      />
      
    </div>
  );
}
