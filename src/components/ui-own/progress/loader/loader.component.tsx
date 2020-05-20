import React, { useEffect, useState } from "react";

import styles from "./loader.module.scss";

const Circular: React.FC = () => {
  const [isChrome, setChrome] = useState<boolean>(false);

  useEffect(() => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    setChrome(isChrome);
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={
          isChrome ? styles["loader--chrome"] : styles["loader--others"]
        }
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Circular;
