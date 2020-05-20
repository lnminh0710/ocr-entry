import { useEffect, useState, useCallback } from "react";
import { fabric } from "fabric";
import TestImage from "../../../styles/images/4690-000015.pdf.2.jpg";

import cloneDeep from "lodash/cloneDeep";

import {
    guid,
    createRect,
    validateRect,
    changeSelectable,
    parseOrcData,
    getTextFromRect,
    getTextByPoint,
    getWidthHeightAfterRotate
} from "./image-canvas.util";
import { ocrJson } from "../../../pages/private/add-person/resource/ocr-text";

const optionCanvas: Object = {
    hoverCursor: "pointer",
    selection: false,
    centeredRotation: true,
    backgroundColor: "transparent"
};

// Action
function useImageCanvasHook(
    imageSource: string,
    width: number,
    height: number,
    optionRect: any,
    captureOcrData?: Function,
    OCRJson?: string
) {
    const [canvas, setCanvas] = useState<any>(null);
    // eslint-disable-next-line
    const [ocrData, setOcrData] = useState<any>(parseOrcData(ocrJson));
    const [rotation, setRotation] = useState<number>(0);

    const initDrawRectangle = (canvas: any, addData: any, angle: number) => {
        let rect: any, isDown: any, origX: any, origY: any, isCtrl: any;

        canvas.on("mouse:down", function(o: any) {
            if (o.target) return;
            const pointer = canvas.getPointer(o.e);
            isDown = true;
            isCtrl = o.e.ctrlKey;
            origX = pointer.x;
            origY = pointer.y;
            const randomId: string = guid();
            rect = createRect(canvas, {
                ...optionRect,
                left: origX,
                top: origY,
                id: randomId,
                width: pointer.x - origX,
                height: pointer.y - origY
            });
        });

        canvas.on("mouse:move", function(o: any) {
            if (!isDown) return;
            const pointer = canvas.getPointer(o.e);
            const pointX = Math.max(pointer.x);
            const pointY = Math.max(pointer.y);
            isCtrl = isCtrl ? o.e.ctrlKey : false;
            if (origX > pointer.x) {
                rect.set({
                    left: pointX
                });
            }
            if (origY > pointer.y) {
                rect.set({
                    top: pointY
                });
            }

            rect.set({
                width: Math.abs(origX - pointX)
            });
            rect.set({
                height: Math.abs(origY - pointY)
            });

            canvas.renderAll();
        });

        canvas.on("mouse:up", function(o: any) {
            isDown = false;

            isCtrl = isCtrl ? o.e.ctrlKey : false;

            if (!rect) return;
            if (validateRect(rect)) {
                const cloneRect: any = getWidthHeightAfterRotate(
                    cloneDeep(rect),
                    Math.abs(angle)
                );
                const newPoint = parseLocationByAngle(
                    canvas,
                    cloneRect.left,
                    cloneRect.top,
                    -angle
                );
                cloneRect.left = newPoint.left;
                cloneRect.top = newPoint.top;

                console.log(cloneRect, rect);
                const data = getTextFromRect(
                    cloneRect,
                    ocrData
                    // parseLocationByAngle(canvas, rect.left, rect.top, 360 - angle)
                );
                // const newPoint = parseLocationByAngle(canvas, rect.left, rect.top, 0);
                // rect.left = newPoint.left;
                // rect.top = newPoint.top;
                // rect.angle += angle;
                // rect.setCoords();
                if (data.value) addData(data, rect);
                else canvas.remove(rect);
            } else if (isCtrl) {
                const pointer = canvas.getPointer(o.e);

                const { left, top } = parseLocationByAngle(
                    canvas,
                    pointer.x,
                    pointer.y,
                    360 - angle
                );
                pointer.x = left;
                pointer.y = top;
                const data = getTextByPoint(pointer, ocrData);
                if (data.value) {
                    const randomId: string = guid();

                    const leftX = data.Position.p1.x;
                    const topY = data.Position.p1.y;
                    const width = data.Position.p2.x - leftX;
                    const height = data.Position.p4.y - topY;
                    rect = createRect(canvas, {
                        ...optionRect,
                        left: leftX,
                        top: topY,
                        id: randomId,
                        width,
                        height
                    });
                    // rect.angle = angle;
                    if (angle) {
                        const newPoint = parseLocationByAngle(
                            canvas,
                            data.Position.p1.x,
                            data.Position.p1.y,
                            angle
                        );
                        rect.top = newPoint.top;
                        rect.left = newPoint.left;
                        rect.angle += angle; //rotate each object buy the same angle
                        rect.setCoords();
                    }
                    addData({ ...data, rectDetailt: [rect] }, rect);
                } else canvas.remove(rect);
            }
            rect.done = true;
            rect.dirty = true;
            rect.setCoords();
            isCtrl = false;
            canvas.renderAll();
        });

        changeSelectable(canvas, "crosshair", false);
    };

    const initEvents = (canvas: any) => {
        canvas.on("mouse:wheel", function(opt: any) {
            const delta = opt.e.deltaY;
            let zoom;
            if (delta < 0) {
                zoom = canvas.getZoom() * 1.2;
            } else {
                zoom = canvas.getZoom() / 1.2;
            }

            // if (zoom >= 2) {
            //   zoom = 2;
            // }
            if (zoom <= 0.5) {
                zoom = 0.5;
            }
            canvas.zoomToPoint(
                new fabric.Point(opt.pointer.x, opt.pointer.y),
                zoom
            );

            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
    };
    // eslint-disable-next-line
    const initBackground = (canvas: any, imgElement: any) => {
        const f_img = new fabric.Image(imgElement);

        canvas.setBackgroundImage(f_img, canvas.renderAll.bind(canvas));
        canvas.setDimensions(
            {
                width: imgElement.width,
                height: imgElement.height
            },
            {
                backstoreOnly: true
            }
        );
    };
    // eslint-disable-next-line
    const initCanvas = (element: any, imgElement: any, options: Object) => {
        const _option: Object = { ...optionCanvas, ...options };
        const canvasNew = new fabric.Canvas(element, _option);
        initEvents(canvasNew);
        if (imgElement) {
            initBackground(canvasNew, imgElement);
        }
        initDrawRectangle(canvasNew, addData, rotation);
        setCanvas(canvasNew);
    };

    const initImage = useCallback(async () => {
        // if (!imageSource) return;
        const imgElement = new Image();
        const idCanvas = "image__canvas";
        imgElement.onload = function() {
            const scale = height / imgElement.height;
            initCanvas(document.getElementById(idCanvas), imgElement, {
                width: Math.min(width, imgElement.width * scale),
                height: height
            });
        };
        imgElement.src = TestImage;
    }, [initCanvas, height, width]);

    const addData = (data: any, rect: any) => {
        captureOcrData && captureOcrData(data);
        if (canvas && canvas.getObjects()) {
            // canvas
            canvas.getObjects().forEach((item: any) => {
                if (
                    item.fieldName === optionRect.fieldName &&
                    item.id !== rect.id
                )
                    canvas.remove(item);
            });
        }
    };

    const rotateImage = (rotateNumber: number) => {
        if (!canvas.backgroundImage) return;
        rotateAllObject(rotateNumber);
        canvas.backgroundImage.rotate(rotation + rotateNumber);
        setRotation(Math.abs(360 + rotation + rotateNumber) % 360);
        canvas.renderAll();
    };

    const rotateAllObject = (degrees: number) => {
        canvas.getObjects("rect").forEach((obj: any) => {
            const { left, top } = parseLocationByAngle(
                canvas,
                obj.left,
                obj.top,
                degrees
            );
            obj.top = top;
            obj.left = left;
            obj.angle += degrees; //rotate each object buy the same angle

            obj.setCoords();
        });

        canvas.renderAll();
    };

    const parseLocationByAngle = (
        canvasV: any,
        left: number,
        top: number,
        degrees: number
    ) => {
        let canvasCenter = new fabric.Point(
            canvasV.getWidth() / 2,
            canvasV.getHeight() / 2
        );
        let radians = fabric.util.degreesToRadians(degrees);
        let objectOrigin = new fabric.Point(left, top);
        let new_loc = fabric.util.rotatePoint(
            objectOrigin,
            canvasCenter,
            radians
        );
        return { left: new_loc.x, top: new_loc.y, degrees };
    };

    useEffect(() => {
        function initImageCanvas() {
            initImage();
        }
        initImageCanvas();
        // eslint-disable-next-line
    }, [imageSource]);

    useEffect(() => {
        if (!canvas) return;
        initDrawRectangle(canvas, addData, rotation);

        return () => {
            canvas.off("mouse:down");
            canvas.off("mouse:up");
            canvas.off("mouse:move");
        };
        // eslint-disable-next-line
    }, [addData, rotation]);

    const viewActualSize = () => {
        if (!canvas) return;
        // canvas.setZoom(1);
        // canvas.zoomToPoint(new fabric.Point(canvas.width, canvas.height), 1);
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    };

    // const zoom
    return { rotateImage, viewActualSize };
}

export default useImageCanvasHook;
