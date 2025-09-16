import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 400px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 600px;
    height: 350px;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }

`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={`relative w-full max-w-7xl px-5 ${className || ''}`}
      style={{ position: 'relative', zIndex: 2001 }}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="">
              <a href={image.link} className="block h-full w-full" target="_blank">
                <img
                  className="h-full w-full object-cover"
                  src={image.src}
                  alt={image.alt}
                />
              </a>
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

const Skiper49 = () => {
  const images = [
    {
      src: "/projects/1.png",
      alt: "Project 1",
      link: "https://ferzconsulting.com",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092458.png",
      alt: "Project Screenshot 1",
      link: "https://thebessongroup.com",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092528.png",
      alt: "Project Screenshot 2",
      link: "https://miamishoulderinstitute.com",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092800.png",
      alt: "Project Screenshot 3",
      link: "https://www.nymetrovein.com/",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092844.png",
      alt: "Project Screenshot 4",
      link: "https://thebigloveretreats.com",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092924.png",
      alt: "Project Screenshot 6",
      link: "https://interfaceclinic.co.uk",
    },
    {
      src: "/projects/Screenshot 2025-09-13 092945.png",
      alt: "Project Screenshot 7",
      link: "https://tyson.yiol.in/",
    },
    {
      src: "/projects/Screenshot 2025-09-13 093501.png",
      alt: "Project Screenshot 9",
      link: "https://tysondirksen.com",
    },
    {
      src: "/projects/ssc.png",
      alt: "SSC Project",
      link: "https://mrpotatovegas.com/",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]" style={{ position: 'relative', zIndex: 2000 }}>
      <Carousel_003 className="w-full max-w-6xl" images={images} showPagination loop />
    </div>
  );
};

export { Carousel_003, Skiper49 };
