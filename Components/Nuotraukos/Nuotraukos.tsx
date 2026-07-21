import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const Nuotraukos = () => {
  const [arr, setArr] = useState<string[]>([]);
  const [integer, setInteger] = useState(0);
  const [firstInteger, setFirstInteger] = useState(16);
  const [lastInteger, setLastInteger] = useState(integer + 1);
  const [dragX, setDragX] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentX = e.touches[0].clientX;
    setDragX(currentX - touchStart);
  };

  const arrCreation = () => {
    const stringArr: string[] = [];
    for (let i = 1; i < 18; i++) {
      stringArr.push(`foto (${i}).webp`);
    }
    setArr(stringArr);
  };

  const changeIntegerForward = () => {
    const tick = integer + 1;
    setFirstInteger(tick - 1);
    setInteger(tick);
    setLastInteger(tick + 1);
    if (tick >= arr.length - 1) {
      setLastInteger(tick - (arr.length - 1));
    }
    if (tick >= arr.length) {
      setInteger(0);
      setFirstInteger(arr.length - 1);
      setLastInteger(1);
    }
  };
  const changeIntegerBackward = () => {
    const tick = integer - 1;
    setFirstInteger(tick - 1);
    setInteger(tick);
    setLastInteger(tick + 1);

    if (tick < 1) {
      setFirstInteger(arr.length - 1);
    }
    if (tick < 0) {
      setInteger(arr.length - 1);
      setFirstInteger(arr.length - 2);
      setLastInteger(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (difference > minSwipeDistance) {
      // Swiped left → next photo
      changeIntegerForward();
    }
    if (difference < -minSwipeDistance) {
      // Swiped right → previous photo
      changeIntegerBackward();
    }
    setTouchStart(null);
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
        <button
          onClick={() => {
            changeIntegerBackward();
          }}
        >
          &lt;
        </button>

        {arr.length > 0 && (
          <div className={styles.imgContainer}>
            <img src={`pics/${arr[firstInteger]}`} />

            <div
              className={styles.middleSectionPics}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            >
              <div
                className={styles.track}
                style={{
                  transform: `translateX(${dragX}px)`,
                }}
              >
                <img src={`pics/${arr[firstInteger]}`} />
                <img
                  className={styles.middlePic}
                  src={`pics/${arr[integer]}`}
                />
                <img src={`pics/${arr[lastInteger]}`} />
              </div>
            </div>

            <img src={`pics/${arr[lastInteger]}`} />
          </div>
        )}

        <button
          onClick={() => {
            changeIntegerForward();
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
export default Nuotraukos;
