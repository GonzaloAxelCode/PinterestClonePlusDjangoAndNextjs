import { Box, Flex, Masonry } from "gestalt";
import React, { useEffect, useRef, useState, FC } from "react";

import { motion, AnimatePresence } from "framer-motion";
import useAnimateTitle from "ui/hooks/useAnimateTitle";
import useImageCarousel from "ui/hooks/useImageCarousel";

const IndexScreen = () => {
  const textos = [
    "weeknight dinner idea",
    "home décor idea",
    "new outfit",
    "green thumb idea",
  ];

  const { textoActual, cambiaTexto } = useAnimateTitle(textos);
  const { showImages, images } = useImageCarousel();

  return (
    <div className="">
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "50vh" }}
      >
        <h1 className="text-7xl mb-5">Get your next</h1>
        <AnimatePresence mode="wait">
          <motion.h2
            key={textoActual}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-5xl  text-center"
          >
            {textos[textoActual]}
          </motion.h2>
        </AnimatePresence>
        <div className="flex justify-center m-10 ">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => cambiaTexto(i)}
              className={`h-2.5 w-2.5 rounded-full mx-2 cursor-pointer ${
                i === textoActual ? "bg-red-500" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex w-full h-screen">
        <AnimatePresence>
          {showImages ? (
            images.map((image, index) => (
              <motion.div
                key={index}
                className="w-full h-450 p-2 mt-50"
                style={{
                  transform: index >= 3 ? "translateY(-50%)" : "translateY(0)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="bg-gray-200 flex items-center justify-center "
                  style={{
                    borderRadius: "20px",
                    transform:
                      index == 1 || index == 3
                        ? "translateY(70px)"
                        : index === 2 || index == 5
                        ? "translateY(140px)"
                        : "",
                  }}
                >
                  <motion.img
                    style={{ borderRadius: "20px" }}
                    className="h-full w-full object-cover rounded-sm "
                    src={image}
                    alt="Placeholder Image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </motion.div>
              </motion.div>
            ))
          ) : (
            <></>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IndexScreen;
