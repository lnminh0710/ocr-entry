import React, { useMemo } from "react";
import styles from "./tooltip.module.scss";

import TooltipUI, { TooltipProps } from "@material-ui/core/Tooltip";

export function Tooltip({ classes, ...rest }: TooltipProps) {
  const cls = useMemo(() => {
    const cls = classes || {};
    if (cls.tooltip) {
      cls.tooltip = `${cls.tooltip} ${styles.tooltip}`;
    } else {
      cls.tooltip = styles.tooltip;
    }

    return cls;
  }, [classes]);
  return <TooltipUI classes={cls} {...rest} />;
}
