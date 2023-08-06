import { useState, useEffect } from "react";

function useAnimateTitle(textos: any[]) {
  const [textoActual, setTextoActual] = useState(0);

  const cambiaTexto = (indice:number) => {
    setTextoActual(indice);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextoActual((textoActual + 1) % textos.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [textoActual, textos]);

  return { textoActual, cambiaTexto };
}

export default useAnimateTitle;
