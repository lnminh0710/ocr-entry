import { useGlobalStore } from "../../../store/index.store";

function useHomeHook() {
  const {
    state: {
      auth: { roles }
    }
  } = useGlobalStore();

  return { roles };
}

export default useHomeHook;
