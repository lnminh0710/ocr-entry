import { fabric } from "fabric";

import map from "lodash/map";
import filter from "lodash/filter";
import includes from "lodash/includes";

const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
};
const createRect = (canvas: any, option: object) => {
    const rect = new fabric.Rect({
        originX: "left",
        originY: "top",
        strokeWidth: 3,
        stroke: "red",
        fill: "transparent",
        hoverCursor: "pointer",
        selectable: true,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        ...option
    });

    if (canvas) {
        canvas.add(rect);
    }
    return rect;
};

const validateRect = (rect: any) => {
    if (!rect) return false;
    if (!rect.done && rect.height && rect.width) return true;
    return false;
};

const changeSelectable = (
    canvasInit: any,
    defaultCursor: string,
    value: boolean
) => {
    canvasInit.forEachObject(function(obj: any) {
        obj.selectable = value;
        obj.hoverCursor = defaultCursor;
    });

    canvasInit.defaultCursor = defaultCursor;

    canvasInit.renderAll();
};

const parseOrcData = (data: string) => {
    let dataOcr: any = JSON.parse(data);
    if (!dataOcr) {
        return;
    }
    dataOcr = dataOcr.text_annotations;
    let i = 1;
    dataOcr = map(dataOcr, _d => {
        const dataX = map(_d.bounding_poly.vertices, "x");
        const dataY = map(_d.bounding_poly.vertices, "y");

        _d.position = {
            p1: {
                x: Math.min(...dataX),
                y: Math.min(...dataY)
            },
            p2: {
                x: Math.max(...dataX),
                y: Math.min(...dataY)
            },
            p3: {
                x: Math.max(...dataX),
                y: Math.max(...dataY)
            },
            p4: {
                x: Math.min(...dataX),
                y: Math.max(...dataY)
            }
        };
        _d.k = i;
        i++;
        delete _d.bounding_poly;
        return _d;
    });
    return dataOcr;
};

const generateRegexp = (firstWord: any, lastWord: any) => {
    if (includes([".", "(", ")"], lastWord)) lastWord = "\\" + lastWord;
    if (includes([".", "(", ")"], firstWord)) firstWord = "\\" + firstWord;

    return new RegExp(firstWord + "(.*)" + lastWord, "g");
};

const findTheSentence = (fullWords: string, value: any) => {
    const fullWordsList = fullWords.split("<br />");
    const listResult = [];
    let listFilter = [];
    let firstWord = "";
    let lastWord = "";
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            const element = value[key];
            const regexFilter = generateRegexp(firstWord, element);
            const listTemp: any = filter(
                firstWord ? listFilter : fullWordsList,
                _w => _w.match(regexFilter)
            );
            if (!firstWord) {
                firstWord = element;
            }
            const isLastItem = parseInt(key, 10) === value.length - 1;

            if (listTemp.length === 0) {
                if (lastWord === firstWord) {
                    listResult.push(firstWord);
                } else {
                    const regex = generateRegexp(firstWord, lastWord);
                    const word = listFilter[0].match(regex);
                    if (word) {
                        listResult.push(word[0]);
                    }
                }
                if (isLastItem) {
                    listResult.push(element);
                }
                listFilter = filter(fullWordsList, _w => includes(_w, element));
                firstWord = element;
                lastWord = element;
                continue;
            }
            if (isLastItem) {
                if (element === firstWord) {
                    listResult.push(firstWord);
                } else {
                    lastWord =
                        isLastItem && firstWord === element ? "" : element;
                    const regex = generateRegexp(firstWord, lastWord);
                    const word = listTemp[0].match(regex);
                    if (word) {
                        listResult.push(word[0]);
                    }
                }
                continue;
            }

            lastWord = element;
            listFilter = listTemp;
        }
    }
    return listResult.join(" ");
};

const getTextFromRect = (rect: any, ocrData: any) => {
    const position = {
        p1: {
            x: rect.left,
            y: rect.top
        },
        p2: {
            x: rect.left + rect.width,
            y: rect.top
        },
        p3: {
            x: rect.left + rect.width,
            y: rect.top + rect.height
        },
        p4: {
            x: rect.left,
            y: rect.top + rect.height
        }
    };

    const result = filter(ocrData, _d => {
        const posiotionOcr = _d.position;
        if (
            position.p1.x < posiotionOcr.p1.x &&
            position.p1.y < posiotionOcr.p1.y &&
            position.p2.x > posiotionOcr.p2.x &&
            position.p2.y < posiotionOcr.p2.y &&
            position.p3.x > posiotionOcr.p3.x &&
            position.p3.y > posiotionOcr.p3.y &&
            _d.k !== 1
        ) {
            return true;
        }
        return false;
    });
    const value = findTheSentence(
        ocrData[0].description,
        map(result, "description")
    );
    rect.value = value;
    // rect.key = this.fieldFocused;
    // this.coordinates.push(rect);
    return {
        value: value,
        Position: position,
        rectDetail: [rect]
    };
};

const getTextByPoint = (point: any, orcData: any) => {
    const result = filter(orcData, _d => {
        const posiotionOcr = _d.position;
        if (
            point.x > posiotionOcr.p1.x &&
            point.y > posiotionOcr.p1.y &&
            point.x < posiotionOcr.p2.x &&
            point.y > posiotionOcr.p2.y &&
            point.x < posiotionOcr.p3.x &&
            point.y < posiotionOcr.p3.y &&
            point.x > posiotionOcr.p4.x &&
            point.y < posiotionOcr.p4.y &&
            _d.k !== 1
        ) {
            return true;
        }
        return false;
    })[0];
    if (!result) {
        return {};
    }
    return {
        value: result.description,
        Position: result.position
    };
};

const getWidthHeightAfterRotate = (position: any, angle: number) => {
    let { width, height, left, top } = position;

    switch (angle) {
        case 0:
        case 360:
            break;
        case 90:
            left = left + width;
            break;
        case 180:
            left = left + width;
            top = top + height;
            break;
        case 270:
            top = top + height;
            break;
        default:
            break;
    }

    var rad = (angle * Math.PI) / 180,
        sin = Math.sin(rad),
        cos = Math.cos(rad);

    var newWidth = Math.abs(width * cos) + Math.abs(height * sin),
        newHeight = Math.abs(width * sin) + Math.abs(height * cos);
    position.width = newWidth;
    position.height = newHeight;
    position.top = top;
    position.left = left;

    return position;
};

export {
    changeSelectable,
    createRect,
    getWidthHeightAfterRotate,
    getTextFromRect,
    getTextByPoint,
    guid,
    parseOrcData,
    validateRect
};
