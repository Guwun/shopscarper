"use client"

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const heroImages = [
    { img: '/assets/images/hero-1.svg', alt:'smartwatch'},
    { img: '/assets/images/hero-2.svg', alt:'bag'},
    { img: '/assets/images/hero-3.svg', alt:'lamp'},
    { img: '/assets/images/hero-4.svg', alt:'air fryer'},
    { img: '/assets/images/hero-5.svg', alt:'chair'}, 
 
]

  const HeroCarousel = () => {
    return (
        <div className="hero-carousel">
            <Carousel
                showThumbs={false}
               // autoPlay
                infiniteLoop
               // interval={2000} 
                showArrows={false}
                showStatus={false}
            >
               {heroImages.map((image) => (
                 <img 
                 src={image.img} 
                 alt={image.alt}
                 width={484}
                 height={484}
                 className="object-contain"
                 key={image.alt}
                 />
               ))}
            </Carousel>   

            <img 
            src="/assets/icons/hand-drawn-arrow.svg"
            alt="arrow"
            width={175}
            height={175}
            className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"/>
        </div>
    );
}

export default HeroCarousel