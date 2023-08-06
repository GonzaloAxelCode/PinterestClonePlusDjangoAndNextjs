import { useEffect, useState } from "react";

function useImageCarousel() {
  const [showImages, setShowImages] = useState(true);

  const [images, setImages] = useState([
    "https://picsum.photos/235/450?random=1",
    "https://picsum.photos/235/450?random=2",
    "https://picsum.photos/235/450?random=3",
    "https://picsum.photos/235/450?random=4",
    "https://picsum.photos/235/450?random=5",
  ]);

  useEffect(() => {
    let t = 0;
    const intervalId = setInterval(() => {
      setShowImages(false);
      if (t <= 1) {
        t = 0;
      }
      if (t == 0) {
        setTimeout(() => {
          setImages([
            "https://picsum.photos/235/450?random=8",
            "https://picsum.photos/235/450?random=9",
            "https://picsum.photos/235/450?random=10",
            "https://picsum.photos/235/450?random=11",
            "https://picsum.photos/235/450?random=12",
          ]);
          setShowImages(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setImages([
            "https://picsum.photos/235/450?random=13",
            "https://picsum.photos/235/450?random=14",
            "https://picsum.photos/235/450?random=16",
            "https://picsum.photos/235/450?random=16",
            "https://picsum.photos/235/450?random=17",
          ]);
          setShowImages(true);
        }, 1000);
      }

      t++;
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return { showImages, images };
}

export default useImageCarousel;