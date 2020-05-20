import React from "react";

import { IconButton, Paper } from "components/ui-libraries";

import FocusIcon from "@material-ui/icons/CenterFocusWeak";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

import ArrowLeftIcon from "@material-ui/icons/RotateLeft";
import ArrowRightIcon from "@material-ui/icons/RotateRight";
import ListIcon from "@material-ui/icons/Menu";

// import { useTranslation } from "react-i18next";

interface IImageCanvasProps {
    rotateImage: Function;
    viewActualSize: Function;
    styles: any;
    styleDarkMode: any;
}

const ImageCanvasComponent: React.FC<IImageCanvasProps> = ({
    styles,
    rotateImage,
    viewActualSize
}) => {
    // const { t } = useTranslation(["common"]);

    return (
        <Paper className={styles["image-canvas__toolbar"]}>
            {/* <IconButton>
        <ZoomInIcon></ZoomInIcon>
      </IconButton>
      <IconButton>
        <ZoomOutIcon></ZoomOutIcon>
      </IconButton> */}
            <IconButton onClick={() => viewActualSize()}>
                <FocusIcon></FocusIcon>
            </IconButton>
            <IconButton onClick={() => rotateImage(-90)}>
                <ArrowLeftIcon></ArrowLeftIcon>
            </IconButton>
            <IconButton onClick={() => rotateImage(90)}>
                <ArrowRightIcon></ArrowRightIcon>
            </IconButton>
            {/* <IconButton>
        <ListIcon></ListIcon>
      </IconButton> */}
        </Paper>
    );
};

export default ImageCanvasComponent;
