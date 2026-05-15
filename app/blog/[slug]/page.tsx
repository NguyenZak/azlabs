import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function BlogPostDetail({ params }: { params: { slug: string } }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    notFound();
  }

  // Giả định ngôn ngữ mặc định là VI, bạn có thể thêm logic đa ngôn ngữ sau
  const title = post.title_vi || post.title_en;
  const content = post.content_vi || post.content_en;
  const date = new Date(post.published_at || post.created_at).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-apple-text-secondary hover:text-apple-accent transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </Link>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm text-apple-text-secondary font-bold uppercase tracking-widest">
            <span className="px-3 py-1 bg-[#f5f5f7] rounded-full">Blog</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {date}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-apple-text">
            {title}
          </h1>
          
          <div className="flex items-center gap-4 pt-4 border-t border-apple-border">
            <div className="w-10 h-10 rounded-full bg-apple-accent flex items-center justify-center text-white font-bold">
              AZ
            </div>
            <div>
              <p className="font-bold text-apple-text">AZLABS Editorial</p>
              <p className="text-xs text-apple-text-secondary">Technology & Design Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image_url && (
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <div className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-apple-border">
            <img 
              src={post.image_url} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-32">
        <div 
          className="prose prose-lg md:prose-xl max-w-none prose-p:leading-relaxed prose-headings:tracking-tight prose-headings:font-bold prose-blockquote:border-l-4 prose-blockquote:border-apple-accent prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-strong:text-apple-text prose-a:text-apple-accent prose-img:rounded-[32px] prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        <div className="mt-20 pt-12 border-t border-apple-border flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center text-white shadow-xl">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Cảm ơn bạn đã đọc!</h3>
            <p className="text-apple-text-secondary mt-2">AZLABS cam kết mang đến những nội dung công nghệ chất lượng nhất.</p>
          </div>
          <Link 
            href="/" 
            className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all"
          >
            Khám phá thêm dự án
          </Link>
        </div>
      </article>
    </main>
  );
}
