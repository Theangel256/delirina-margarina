import React, { useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { GlassCard } from "./ui/glass-card";
import MotionWrapper from "./MotionWrapper";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type ImageItem = {
  title: string;
  url: string;
};

// Simulación de más imágenes
import { images as allImages } from "@/lib/data";

const LOAD_BATCH = 6;

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<ImageItem[]>(allImages.slice(0, LOAD_BATCH));

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const loadMoreImages = useCallback(() => {
    const currentCount = visibleImages.length;
    const nextImages = allImages.slice(currentCount, currentCount + LOAD_BATCH);
    if (nextImages.length > 0) {
      setVisibleImages((prev) => [...prev, ...nextImages]);
    }
  }, [visibleImages]);

  if (inView && visibleImages.length < allImages.length) {
    loadMoreImages();
  }

  return (
    <section id="galeria" className="py-12 relative">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            📷 Galería de Imágenes
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleImages.map((image, index) => (
            <MotionWrapper key={image.title} delay={index * 0.1}>
              <GlassCard
                className="overflow-hidden group transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <CardHeader className="p-0">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={import.meta.env.BASE_URL + image.url}
                      alt={image.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-center text-base mt-2">
                    {image.title}
                  </CardTitle>
                </CardContent>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>

        <div ref={ref} className="h-12 mt-4" />

        <Lightbox
          open={lightboxIndex !== null}
          close={() => setLightboxIndex(null)}
          index={lightboxIndex ?? 0}
          slides={visibleImages.map((img) => ({
            src: img.url,
            alt: img.title,
          }))}
          plugins={[Zoom]}
        />
      </div>
    </section>
  );
}
