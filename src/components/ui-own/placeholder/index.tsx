import React from "react";

import { Skeleton } from "components/ui-libraries";

const PlaceHolder: React.SFC = () => {
  return (
    <>
      <Skeleton />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
    </>
  );
};

export default PlaceHolder;
