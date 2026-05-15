"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactNode[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  textColor?: string; // e.g., "#ffffff" or "text-white"
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth pb-10 pt-4 [scrollbar-width:none] md:pb-20 md:pt-6"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4",
              "features-scroll-container"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
            {/* Pseudo-element for right padding in Safari */}
            <div className="flex-none w-px h-px pr-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] md:pr-[max(3rem,calc((100vw-1440px)/2+3rem))]" />
          </div>
        </div>

        <style jsx global>{`
          .features-scroll-container {
            padding-left: max(1.5rem, calc((100vw - 1440px) / 2 + 1.5rem));
          }
          @media (min-width: 768px) {
            .features-scroll-container {
              padding-left: max(3rem, calc((100vw - 1440px) / 2 + 3rem));
            }
          }
        `}</style>
        <div className="flex justify-end gap-3 px-4 md:px-10 mt-6 md:mt-10">
          <button
            className="relative z-40 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 disabled:opacity-20 transition-all hover:bg-neutral-200 active:scale-95 group shadow-sm"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-7 w-7 text-neutral-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            className="relative z-40 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 disabled:opacity-20 transition-all hover:bg-neutral-200 active:scale-95 group shadow-sm"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-7 w-7 text-neutral-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}-${index}` : undefined}
              data-lenis-prevent
              className="relative z-[60] mx-auto my-10 h-fit max-h-[90vh] overflow-y-auto max-w-5xl rounded-3xl bg-white p-4 md:p-10 dark:bg-neutral-900 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.category}-${index}` : undefined}
                className="text-base font-semibold text-neutral-500 md:text-2xl"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}-${index}` : undefined}
                className="mt-4 text-2xl font-semibold text-neutral-700 md:text-5xl dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}-${index}` : undefined}
        onClick={handleOpen}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 flex h-[28rem] w-72 flex-col items-start justify-start overflow-hidden rounded-[32px] bg-neutral-900 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:h-[40rem] md:w-96 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
      >
        {/* Black Gradient Overlay for Text Readability */}
        <div className="absolute inset-x-0 top-0 z-30 h-1/2 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

        <div className="relative z-40 p-10 flex flex-col h-full w-full">
          <motion.p
            layoutId={layout ? `category-${card.category}-${index}` : undefined}
            className="text-left font-sans text-sm md:text-base font-semibold text-white/80"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}-${index}` : undefined}
            className="mt-6 max-w-xl text-left font-sans text-xl md:text-[16px] lg:text-[28px] font-semibold tracking-tighter text-white"
          >
            {card.title}
          </motion.p>

          {/* Signature Plus Button - Always White Theme for consistency */}
          <div className="mt-auto ml-auto">
            <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 bg-white">
              <IconPlus className="h-8 w-8 text-black" />
            </div>
          </div>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="absolute inset-0 z-0 object-cover"
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  blurDataURL,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
