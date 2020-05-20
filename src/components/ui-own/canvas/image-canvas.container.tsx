import React from "react";
// import { useTranslation } from "react-i18next";

import styles from "./image-canvas.module.scss";

import ImageCanvasComponent from "./image-canvas.component";
import ImageToolbarComponent from "./image-toolbar.component";

import useImageCanvasHook from "./image-canvas.hook";
import { useAddPersonStyle } from "../../../utils/theme.util";

interface IImageCanvasProps {
  imageSource: string;
  width: number;
  height: number;
  optionRect: Object;
  captureOcrData?: Function;
}

const ImageCanvasContainer: React.FC<IImageCanvasProps> = ({
  imageSource,
  width,
  height,
  optionRect,
  captureOcrData
}) => {
  // const { t } = useTranslation(["common"]);
  const styleDarkMode = useAddPersonStyle();
  const { rotateImage, viewActualSize } = useImageCanvasHook(
    imageSource,
    width,
    height,
    optionRect,
    captureOcrData
  );

  return (
    <>
      <ImageToolbarComponent
        styles={styles}
        styleDarkMode={styleDarkMode}
        rotateImage={rotateImage}
        viewActualSize={viewActualSize}
      ></ImageToolbarComponent>
      <ImageCanvasComponent styles={styles}></ImageCanvasComponent>
    </>
  );
};

export default ImageCanvasContainer;
