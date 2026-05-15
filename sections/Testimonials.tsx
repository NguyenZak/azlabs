"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import AnimatedText from "@/components/AnimatedText";

export default function Testimonials({ data = [] }: { data?: any[] }) {
  const { language } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayData = data.length > 0 ? data : [
    {
      content_en: "AZLABS transformed our digital presence completely. Their attention to detail and premium design sense is unmatched in the industry.",
      content_vi: "AZLABS đã thay đổi hoàn toàn sự hiện diện kỹ thuật số của chúng tôi. Sự chỉn chu đến từng chi tiết và tư duy thiết kế cao cấp của họ là không thể so sánh được.",
      name: "James Wilson",
      role_en: "CEO, FinStream",
      role_vi: "Giám đốc điều hành, FinStream",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
      rating: 5
    },
    {
      content_en: "The AI solutions provided by AZLABS allowed us to automate 40% of our operations while maintaining a high-end user experience.",
      content_vi: "Các giải pháp AI do AZLABS cung cấp đã cho phép chúng tôi tự động hóa 40% hoạt động trong khi vẫn duy trì trải nghiệm người dùng cao cấp.",
      name: "Sarah Chen",
      role_en: "Director of Product, Nexa",
      role_vi: "Giám đốc sản phẩm, Nexa",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
      rating: 5
    },
    {
      content_en: "Working with AZLABS felt like working with a partner who cared as much about our brand as we did. Truly world-class.",
      content_vi: "Làm việc với AZLABS cảm giác như làm việc với một đối tác thực sự quan tâm đến thương hiệu của chúng tôi. Thực sự đẳng cấp thế giới.",
      name: "Michael Ross",
      role_en: "Founder, Aura",
      role_vi: "Người sáng lập, Aura",
      avatar_url: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
      rating: 5
    },
  ];

  const formattedTestimonials = displayData.map((t) => ({
    quote: language === "vi" ? t.content_vi : t.content_en,
    name: t.name,
    designation: language === "vi" ? t.role_vi : t.role_en,
    src: t.avatar_url || t.avatar,
  }));

  return (
    <section className="py-32 bg-[#f5f5f7] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-[32px] md:text-[56px] font-bold tracking-tight text-apple-text">
            <AnimatedText 
              text={language === "vi" ? "Đánh giá từ đối tác." : "What our partners say."} 
              effect="random" 
            />
          </h2>
          <p className="text-apple-text-secondary text-lg md:text-xl mt-4">
            {language === "vi" ? "Được tin tưởng bởi các đội ngũ tiên phong toàn cầu." : "Trusted by visionary teams worldwide."}
          </p>
        </div>
        
        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
      </div>
    </section>
  );
}
