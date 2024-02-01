import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  Card,
  // CardHeader,
  // CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { Products } from "@/types";

interface SliderProps {
  products: Products[];
}

export default function ProductSlider({ products }: SliderProps) {
  const settings = {
    dots: false,
    infinite: true,
    gap: 10,
    autoplay: true,
    navigator: true,
    nextArrow: <IoIosArrowForward />,
    prevArrow: <IoIosArrowBack />,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-10/12 h-[400px] my-10">
      <Slider {...settings} className="gap-2">
        {products &&
          products.length > 0 &&
          products.map((product: Products, index: number) => {
            return (
              <Card
                key={index}
                isFooterBlurred
                className="w-full h-[300px] col-span-12 sm:col-span-5"
              >
                {/* <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    New
                  </p>
                  <h4 className="text-black font-medium text-2xl">
                    Acme camera
                  </h4>
                </CardHeader> */}
                <Image
                  removeWrapper
                  isZoomed
                  width={240}
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-contain"
                  src={product?.image.url}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                    <p className="light:text-black text-xl dark:text-white">{product.title}</p>
                    <p className="text-secondary font-bold text-l">{product?.price}</p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                  >
                    Bilgi al
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </Slider>
    </div>
  );
}
