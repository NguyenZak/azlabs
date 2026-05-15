import { Dictionary } from "./en";

export const vi: Dictionary = {
  nav: {
    home: "Trang chủ",
    services: "Dịch vụ",
    work: "Dự án",
    solutions: "Giải pháp",
    about: "Về chúng tôi",
    contact: "Liên hệ",
    cta: "Bắt đầu dự án"
  },
  hero: {
    badge: "AZLABS",
    title: "Xây Dựng Tương Lai Của Trải Nghiệm Số",
    subtitle: "Chúng tôi kiến tạo các website cao cấp, ứng dụng di động và giải pháp công nghệ AI cho các thương hiệu toàn cầu.",
    ctaPrimary: "Bắt đầu dự án",
    ctaSecondary: "Xem dự án",
    scroll: "Cuộn xuống"
  },
  services: {
    title: "Chuyên môn được xây dựng cho tương lai.",
    subtitle: "Chúng tôi kết hợp thiết kế cao cấp với công nghệ tiên tiến để xây dựng các sản phẩm kỹ thuật số dẫn đầu ngành.",
    items: [
      {
        id: "web",
        title: "Phát triển Website",
        description: "Các ứng dụng web siêu nhanh, hiệu suất cao được xây dựng bằng Next.js và React.",
        details: "Chúng tôi xây dựng các trang web có khả năng mở rộng, bảo mật và tối ưu hóa SEO nhằm mang lại trải nghiệm người dùng đặc biệt.",
        features: ["React & Next.js", "Giải pháp E-commerce", "CMS tùy chỉnh", "Tối ưu hóa hiệu năng"]
      },
      {
        id: "mobile",
        title: "Phát triển App di động",
        description: "Trải nghiệm iOS và Android cao cấp được thiết kế chính xác và hiệu năng mượt mà.",
        details: "Tạo ra các trải nghiệm di động liền mạch nhằm thu hút người dùng và thúc đẩy tăng trưởng kinh doanh.",
        features: ["iOS & Android", "React Native", "Flutter", "Tối ưu hóa App Store"]
      },
      {
        id: "ai",
        title: "Giải pháp AI",
        description: "Tự động hóa thông minh và tích hợp AI tạo sinh để chuyển đổi quy trình kinh doanh của bạn.",
        details: "Tận dụng sức mạnh của AI để tự động hóa công việc, thu thập thông tin chuyên sâu và cải thiện việc ra quyết định.",
        features: ["Generative AI", "Machine Learning", "Phân tích dữ liệu", "Mô hình AI tùy chỉnh"]
      },
      {
        id: "design",
        title: "Thiết kế UI/UX",
        description: "Giao diện đậm chất điện ảnh và hành trình người dùng liền mạch lấy cảm hứng từ thẩm mỹ hiện đại.",
        details: "Thiết kế các giao diện đẹp mắt, trực quan và lấy người dùng làm trung tâm để lại ấn tượng khó phai.",
        features: ["Nghiên cứu người dùng", "Prototyping", "Thiết kế thị giác", "Hệ thống thiết kế"]
      },
      {
        id: "saas",
        title: "Hệ thống SaaS",
        description: "Kiến trúc phần mềm doanh nghiệp có khả năng mở rộng được thiết kế cho sự tăng trưởng dài hạn.",
        details: "Xây dựng các nền tảng phần mềm dưới dạng dịch vụ mạnh mẽ và có thể mở rộng để giải quyết các vấn đề phức tạp.",
        features: ["Multi-tenancy", "Quản lý thuê bao", "Phát triển API", "Mở rộng đám mây"]
      },
      {
        id: "cloud",
        title: "Hạ tầng Cloud",
        description: "Các hệ thống mạnh mẽ, bảo mật và phân phối toàn cầu được hỗ trợ bởi AWS và Docker.",
        details: "Tối ưu hóa hạ tầng đám mây của bạn để đạt được hiệu năng, độ tin cậy và bảo mật.",
        features: ["AWS/Azure/GCP", "DevOps", "An ninh mạng", "Giám sát 24/7"]
      },
    ]
  },
  projects: {
    title: "Dự án tiêu biểu",
    subtitle: "Nơi tôn vinh sự xuất sắc về kỹ thuật số. Chúng tôi hợp tác với những người có tầm nhìn để định nghĩa thế hệ công nghệ tiếp theo.",
    viewAll: "Xem tất cả dự án",
    items: [
      {
        id: "nova",
        title: "Nova Bank",
        category: "Website doanh nghiệp / FinTech",
        image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/project_nova_bank_1778841266618.png",
        description: "Chuyển đổi số toàn diện cho một tổ chức tài chính hàng đầu.",
        details: "Chúng tôi đã thiết kế lại toàn bộ sự hiện diện kỹ thuật số của Nova Bank, tập trung vào bảo mật, tốc độ và trải nghiệm người dùng cao cấp cho các cá nhân có tài sản ròng cao.",
        tags: ["FinTech", "Next.js", "Bảo mật"]
      },
      {
        id: "eco",
        title: "EcoSphere",
        category: "Ứng dụng di động / IoT",
        image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/project_ecosphere_1778841280245.png",
        description: "Kết nối người dùng với môi trường thông qua công nghệ thông minh.",
        details: "EcoSphere là một ứng dụng di động hỗ trợ IoT giúp người dùng theo dõi và giảm dấu chân carbon của họ trong thời gian thực.",
        tags: ["Mobile", "IoT", "Bền vững"]
      },
      {
        id: "aura",
        title: "Aura AI",
        category: "Nền tảng AI / SaaS",
        image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/project_aura_ai_1778841293695.png",
        description: "Trao quyền cho doanh nghiệp bằng những hiểu biết sâu sắc từ AI tạo sinh.",
        details: "Aura AI cung cấp một bộ công cụ cho các doanh nghiệp để tích hợp các mô hình ngôn ngữ lớn vào quy trình làm việc hiện có của họ một cách an toàn và hiệu quả.",
        tags: ["AI", "SaaS", "Doanh nghiệp"]
      },
      {
        id: "zenith",
        title: "Zenith Commerce",
        category: "Thương mại điện tử / Bán lẻ",
        image: "/Users/apple/.gemini/antigravity/brain/68d34e72-8cb3-42f3-ad30-059828f30a01/project_zenith_commerce_1778841309974.png",
        description: "Trải nghiệm mua sắm xa xỉ được tái định nghĩa cho thời đại hiện đại.",
        details: "Zenith là một nền tảng thương mại điện tử cao cấp kết hợp hình ảnh điện ảnh với quy trình thanh toán không ma sát.",
        tags: ["E-commerce", "Xa xỉ", "React"]
      }
    ]
  },
  solutions: {
    title: "Giải pháp theo ngành nghề",
    subtitle: "Chúng tôi không chỉ xây dựng phần mềm; chúng tôi giải quyết các thách thức phức tạp của ngành bằng các khung công nghệ tùy chỉnh.",
    items: [
      {
        id: "fintech",
        title: "Chuyển đổi FinTech",
        description: "Hiện đại hóa các hệ thống tài chính cũ bằng kiến trúc đám mây bảo mật, hiệu suất cao.",
        icon: "Wallet",
        features: ["Thanh toán bảo mật", "Công cụ tuân thủ", "Phân tích thời gian thực"]
      },
      {
        id: "enterprise-ai",
        title: "Tích hợp AI doanh nghiệp",
        description: "Triển khai các LLM và mô hình máy học riêng tư, bảo mật để tự động hóa các hoạt động cốt lõi của doanh nghiệp.",
        icon: "Cpu",
        features: ["LLM riêng tư", "Tự động hóa quy trình", "Thông tin dự báo"]
      },
      {
        id: "luxury-retail",
        title: "Thương mại điện tử xa xỉ",
        description: "Tạo ra các cửa hàng kỹ thuật số đậm chất điện ảnh nhằm nâng cao uy tín thương hiệu và thúc đẩy chuyển đổi toàn cầu.",
        icon: "ShoppingBag",
        features: ["Xem sản phẩm 3D", "Đồng bộ đa kênh", "Chăm sóc khách hàng VIP"]
      },
      {
        id: "healthtech",
        title: "Nền tảng HealthTech",
        description: "Xây dựng các hệ thống quản lý bệnh nhân và y tế từ xa tuân thủ HIPAA với dịch vụ chăm sóc dựa trên dữ liệu.",
        icon: "Activity",
        features: ["SDK khám bệnh từ xa", "Hồ sơ sức khỏe điện tử", "Giám sát từ xa"]
      }
    ]
  },
  about: {
    title: "Nghệ thuật kiến tạo sự xuất sắc về kỹ thuật số",
    subtitle: "Tại AZLABS, chúng tôi không chỉ xây dựng công nghệ. Chúng tôi tạo ra những trải nghiệm tái định nghĩa các ngành công nghiệp và đưa thương hiệu vươn tới tầm dẫn đầu toàn cầu.",
    story: {
      title: "Câu chuyện của chúng tôi",
      content: "Được thành lập bởi một nhóm các kỹ sư và nhà thiết kế có tầm nhìn, AZLABS ra đời từ mong muốn thu hẹp khoảng cách giữa công nghệ phức tạp và thiết kế lấy con người làm trung tâm. Chúng tôi tin rằng mỗi điểm chạm kỹ thuật số là một cơ hội để tạo ra điều gì đó phi thường."
    },
    values: [
      {
        title: "Sự tinh xảo",
        description: "Chúng tôi tỉ mỉ trong từng pixel, từng dòng code và từng tương tác để đảm bảo sự hoàn hảo."
      },
      {
        title: "Sự đổi mới",
        description: "Chúng tôi luôn đi trước đón đầu, tích hợp các công nghệ AI và đám mây mới nhất trước khi chúng trở nên phổ biến."
      },
      {
        title: "Sự liêm chính",
        description: "Sự minh bạch và quan hệ đối tác dài hạn là cốt lõi trong mọi việc chúng tôi làm."
      }
    ],
    mission: {
      title: "Sứ mệnh của chúng tôi",
      content: "Trao quyền cho các thương hiệu toàn cầu bằng các giải pháp kỹ thuật số đậm chất điện ảnh nhằm thúc đẩy tăng trưởng và truyền cảm hứng cho người dùng."
    },
    team: {
      title: "Gặp gỡ những người tầm nhìn",
      subtitle: "Một nhóm các nghệ nhân và nhà đổi mới tận tâm thúc đẩy các giới hạn của khả năng kỹ thuật số.",
      members: [
        {
          name: "Alex Nguyen",
          role: "Sáng lập & CEO",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
        },
        {
          name: "Sarah Chen",
          role: "Giám đốc sáng tạo",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
        },
        {
          name: "Marcus Thorne",
          role: "Kỹ sư trưởng",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop"
        },
        {
          name: "Elena Rossi",
          role: "Chuyên gia AI",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2574&auto=format&fit=crop"
        }
      ]
    }
  },
  contact: {
    title: "Hãy cùng tạo nên điều phi thường.",
    subtitle: "Bạn có dự án trong tâm trí? Chúng tôi rất muốn lắng nghe bạn.",
    form: {
      name: "Họ và tên",
      namePlaceholder: "Steve Jobs",
      email: "Email",
      emailPlaceholder: "steve@apple.com",
      company: "Công ty",
      companyPlaceholder: "Apple Inc.",
      message: "Chi tiết dự án",
      messagePlaceholder: "Chia sẻ tầm nhìn của bạn với chúng tôi...",
      submit: "Bắt đầu dự án"
    }
  },
  magazine: {
    title: "Tạp chí",
    breadcrumbHome: "Trang chủ",
    breadcrumbMagazine: "Tạp chí",
    readTime: "phút đọc",
    share: "Chia sẻ",
    back: "Quay lại Tạp chí",
    relatedTitle: "Đọc tiếp",
    relatedSubtitle: "Các bài viết khác",
    viewAll: "Xem tất cả",
    ctaTitle: "Bạn có ý tưởng cho dự án?",
    ctaSubtitle: "Hãy cùng tạo nên điều phi thường. Đội ngũ của chúng tôi đã sẵn sàng hiện thực hóa tầm nhìn của bạn.",
    ctaPrimary: "Bắt đầu dự án",
    ctaSecondary: "Xem thêm bài viết"
  }
};
