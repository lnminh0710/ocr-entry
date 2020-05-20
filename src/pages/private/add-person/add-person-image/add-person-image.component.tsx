import React from "react";

import ImageCanvasComponent from "../../../../components/ui-own/canvas/image-canvas.container";

interface IAddPersonImageProps {
  onCaptureRect: Function;
  fieldFocused: string;
  styles: any;
  isPinTable: boolean;
}

const AddPersonImageContainer: React.FC<IAddPersonImageProps> = ({
  onCaptureRect,
  styles,
  fieldFocused,
  isPinTable
}) => {
  const element: any = document.getElementById("add-person__image");
  const { width, height } = element
    ? element.getBoundingClientRect()
    : { width: 0, height: 0 };
  return (
    <div className={styles["add-person-image"]}>
      <ImageCanvasComponent
        imageSource={""}
        width={width}
        height={height}
        optionRect={{ fieldName: fieldFocused }}
        captureOcrData={(data: any) => onCaptureRect(data)}
      ></ImageCanvasComponent>
    </div>
  );
};

export default AddPersonImageContainer;
