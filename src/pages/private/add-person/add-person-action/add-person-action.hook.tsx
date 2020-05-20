import { useState } from "react";

function useAddPersonActionHook() {
  const [isNext, setIsNext] = useState<boolean>(true);

  return { isNext, setIsNext };
}

export default useAddPersonActionHook;
