import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import AnimatedText from '@/components/AnimatedText';

export const metadata = constructMetadata({
  title: '404 - Không tìm thấy trang',
  description: 'Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-[120px] md:text-[200px] font-bold tracking-tighter text-apple-bg-gray leading-none mb-8">
          404
        </h1>
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-apple-text mb-6">
            <AnimatedText text="Lạc lối trong không gian số?" effect="soft-blur-in" />
          </h2>
          <p className="text-xl text-apple-text-secondary leading-relaxed">
            Trang bạn đang tìm kiếm không tồn tại. Đừng lo lắng, chúng tôi sẽ giúp bạn quay trở lại hành trình.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/"
            className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-apple-accent transition-all duration-300"
          >
            Quay về Trang chủ
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto bg-apple-bg-gray text-apple-text px-10 py-5 rounded-full font-bold hover:bg-apple-border transition-all duration-300"
          >
            Xem dịch vụ của chúng tôi
          </Link>
        </div>
        
        <div className="mt-24 pt-12 border-t border-apple-border">
          <p className="text-apple-text-secondary font-medium mb-6 uppercase tracking-widest text-sm">Gợi ý dành cho bạn</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Link href="/blog" className="group">
              <h3 className="font-bold group-hover:text-apple-accent transition-colors">Tạp chí Công nghệ</h3>
              <p className="text-sm text-apple-text-secondary">Kiến thức và xu hướng mới nhất.</p>
            </Link>
            <Link href="/projects" className="group">
              <h3 className="font-bold group-hover:text-apple-accent transition-colors">Dự án tiêu biểu</h3>
              <p className="text-sm text-apple-text-secondary">Những sản phẩm chúng tôi đã thực hiện.</p>
            </Link>
            <Link href="/contact" className="group">
              <h3 className="font-bold group-hover:text-apple-accent transition-colors">Liên hệ tư vấn</h3>
              <p className="text-sm text-apple-text-secondary">Bắt đầu dự án của bạn ngay hôm nay.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
