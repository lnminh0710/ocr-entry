import { useCallback } from "react";
import { useSnackbar } from "notistack";

function useMessage() {
  const { enqueueSnackbar } = useSnackbar();

  const pushMsgDefault = useCallback(
    function pushMsgDefault(
      message: any,
      variant: "default" | "error" | "success" | "warning" | "info"
    ) {
      if (!message) {
        return;
      }

      let messages = Array.isArray(message) ? message : [message];

      messages.forEach(msg => {
        try {
          let message = typeof msg === "string" ? msg : msg.message;

          enqueueSnackbar(message, {
            variant,
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
    },
    [enqueueSnackbar]
  );

  return { pushMsgDefault };
}

export default useMessage;
