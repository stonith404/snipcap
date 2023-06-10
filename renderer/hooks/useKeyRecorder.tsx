import { useEffect, useRef, useState } from "react";

const metaKeys = ["meta", "ctrl", "alt", "shift"];

const useKeyRecorder = (
  onError: (error: string) => void,
  onFinished: () => void
) => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const resetOnNextKey = useRef(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (resetOnNextKey.current) {
      setKeysPressed([key]);
      resetOnNextKey.current = false;
    } else if (!keysPressed.includes(key)) {
      setKeysPressed([...keysPressed, key]);
    }
  };

  const handleKeyUp = () => {
    resetOnNextKey.current = true;
    onFinished();
  };

  useEffect(() => {
    if (keysPressed.length < 2) {
      onError("Must have at least two keys");
    } else if (keysPressed.length > 3) {
      onError("Must have at most three keys");
    } else if (!keysPressed.some((key) => metaKeys.includes(key.toLowerCase())) ) {
      onError("Must have at least one meta key");
    } else if(keysPressed.every(key => metaKeys.includes(key.toLowerCase()))) {
      onError("Must have at least one non-meta key");
    }else {
      onError(null);
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed]);

  return keysPressed.join("+");
};

export default useKeyRecorder;
