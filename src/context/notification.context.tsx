import React, { useRef } from "react";

import { IconButton } from "../components/ui-libraries";
import { CloseIcon } from "../components/ui-libraries/icons";

import { SnackbarProvider } from "notistack";

const NotificationProvider = (props: any) => {
  const snackbarRef: any = useRef();

  const onClickDismiss = (key: any) => () => {
    snackbarRef.current.handleDismissSnack(key);
  };

  return (
    <SnackbarProvider
      ref={snackbarRef}
      action={(key: any) => (
        <IconButton onClick={onClickDismiss(key)}>
          <CloseIcon style={{ color: "#FFFFFF" }} />
        </IconButton>
      )}
      {...props}
    />
  );
};

export default NotificationProvider;
