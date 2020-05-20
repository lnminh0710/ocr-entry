import React from "react";
// import { useTranslation } from "react-i18next";

interface IImageCanvasProps {
  styles: any;
}

const ImageCanvasComponent: React.FC<IImageCanvasProps> = ({ styles }) => {
  // const { t } = useTranslation(["common"]);

  return (
    <div
      id="image__canvas-container"
      style={{ height: "100%" }}
      className={styles["image-canvas__container"]}
    >
      <canvas id="image__canvas"></canvas>
    </div>
  );
};

export default ImageCanvasComponent;
