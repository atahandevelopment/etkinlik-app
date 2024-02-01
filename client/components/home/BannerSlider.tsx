/* eslint-disable jsx-a11y/alt-text */
import { BannerTypes } from "@/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Image } from "@nextui-org/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import Link from "next/link";

interface BannerProps {
  banners: BannerTypes[];
}
export default function Banners({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const settings = {
    showArrows: true,
    autoPlay: true,
    showIndicators: false,
    showStatus: false,
    infinite: true,
    infiniteLoop: true,
    showThumbs: false,
    width: "100%",
    swipeable: true,
    renderArrowPrev: () => (
      <button onClick={handlePrev} className="carousel-arrow">
        <IoIosArrowBack
          style={{ zIndex: 1, position: "absolute", top: "45%", left:"4.5rem" }}
          className="text-6xl light:text-slate-300 text-shadow-md dark:text-white hover:text-blue-700"
        />
      </button>
    ),
    renderArrowNext: () => (
      <button onClick={handleNext} className="carousel-next-arrow">
        <IoIosArrowForward
          style={{ position: "absolute", top: "45%", right: "4.5rem" }}
          className="text-6xl light:text-slate-300 text-shadow-md dark:text-white hover:text-blue-700"
        />
      </button>
    ),
  };

  const handleNext = () => {
    if (currentIndex < banners.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const handlePrev = () => {
    if (currentIndex === 1) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(banners.length - 1);
    }
  };
  return (
    <>
      <Carousel {...settings} selectedItem={currentIndex}>
        {banners && banners.length > 0
          ? banners.map((banner: BannerTypes, index: number) => {
              return (
                <div
                  className="w-full h-[500px] flex justify-center rounded-md items-start"
                  key={index}
                >
                  <Link href={banner.url}>
                    <Image
                    isZoomed
                      src={banner?.image?.url}
                      width={1300}
                      height={500}
                      className="object-contain"
                    />
                  </Link>
                </div>
              );
            })
          : null}
      </Carousel>
    </>
  );
}
