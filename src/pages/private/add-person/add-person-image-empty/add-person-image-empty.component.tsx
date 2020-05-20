import React, { useEffect } from "react";
import classnames from "classnames";

import { Button } from "components/ui-libraries";
import { useAddPersonStyle } from "utils/theme.util";

interface IImageEmptyProps {
  getCard: any;
  styles: any;
}

const ImageEmptyComponent: React.FC<IImageEmptyProps> = ({
  getCard,
  styles
}) => {
  useEffect(() => {
    const callGetCard = (e: any) => {
      if (e.keyCode === 13) getCard();
    };

    document.addEventListener("keydown", callGetCard);

    return () => document.removeEventListener("keydown", callGetCard);
  });

  const styleDarkMode = useAddPersonStyle();
  return (
    <div className={styles["add-person-image-empty"]}>
      <div className={styles["add-person-image-empty__main"]}>
        <div
          className={classnames(styles["add-person-image-empty__image"], {
            [styleDarkMode.treeInvert]: true
          })}
        ></div>
        <div className={styles["add-person-image-empty__title"]}>
          <Button
            className={styles["add-person-image-empty__button"]}
            variant="outlined"
            color="primary"
            onClick={getCard}
          >
            Click here
          </Button>
          or press <b>Enter</b> to get card
        </div>
      </div>
    </div>
  );
};

export default ImageEmptyComponent;
