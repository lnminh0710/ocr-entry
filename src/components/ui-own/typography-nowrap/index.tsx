import React from "react";
import styles from "./tooltip.module.scss";

import { Typography } from "components/ui-libraries";

export default function TypographyOwn({ title, ...props }: any) {
    return <Typography {...props} noWrap />;
}
