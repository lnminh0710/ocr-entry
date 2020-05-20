import { useCallback } from "react";
import { useSnackbar } from "notistack";

function useMessage() {
  const { enqueueSnackbar } = useSnackbar();

  const pushMsgError = useCallback(
    function pushMsgError(message: string) {
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    },
    [enqueueSnackbar]
  );

  const pushMsgDefault = useCallback(
    function pushMsgError(message: string) {
      enqueueSnackbar(message, {
        persist: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        }
      });
    },
    [enqueueSnackbar]
  );

  return { pushMsgError, pushMsgDefault };
}

export default useMessage;
