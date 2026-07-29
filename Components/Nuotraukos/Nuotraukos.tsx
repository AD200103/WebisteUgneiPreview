import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Nuotraukos = () => {
  const [arr, setArr] = useState<string[]>([]);
  const arrCreation = () => {
    const stringArr: string[] = [];

    for (let i = 1; i < 21; i++) {
      stringArr.push(`foto (${i}).webp`);
    }

    setArr(stringArr);
  };

  useEffect(() => {
    arrCreation();

    for (let i = 1; i < 18; i++) {
      const img = new Image();
      img.src = `pics/foto (${i}).webp`;
    }
  }, []);

  return (
    <div className={styles.content}>
      <h1>Atmosfera renginiuose</h1>

      <div className={styles.main}>
        {arr.length > 0 && (
          <div className={styles.imgContainer}>
            <button
              className={`${styles.swiperButtonPrevCustom} swiper-button-prev-custom`}
            >
              &lt;
            </button>

            <div className={styles.middleSection}>
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
                centeredSlides={true}
                loop={true}
                grabCursor={true}
                speed={300}
                spaceBetween={0}
                slidesPerView={3}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  668: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 2.2,
                    spaceBetween: 0,
                  },
                  1500: {
                    spaceBetween: 0,
                    slidesPerView: 2.2,
                  },
                }}
              >
                {arr.map((photo) => (
                  <SwiperSlide key={photo}>
                    <img src={`pics/${photo}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              className={`${styles.swiperButtonNextCustom} swiper-button-next-custom`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nuotraukos;
