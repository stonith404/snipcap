import { useHotkeys } from "react-hotkeys-hook";

const useKeyPress = function (...args: Parameters<typeof useHotkeys>) {
  (args[0] as string) = (args[0] as string).replaceAll(
    "coc",
    process.platform === "darwin" ? "meta" : "control"
  );

  args[2] = {
    ...args[2],
    enableOnFormTags: true,
    preventDefault: true,
  };
  return useHotkeys(...args);
};
export default useKeyPress;
