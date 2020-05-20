export function lazyLoadBG(eleId: string, imgBg: any) {
  const image = new Image();
  image.onload = function() {
    const node: any = document.getElementById(eleId);
    if (node) {
      node.setAttribute("style", `background-image: url('${imgBg}')`);
    }
  };
  image.src = imgBg;
}
