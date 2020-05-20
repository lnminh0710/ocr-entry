import WebFont from "webfontloader";

export function loadFont() {
  WebFont.load({
    google: {
      families: ["Roboto:300,400,500"]
    }
  });
}
