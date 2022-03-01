import { useEffect } from "react";

export function useKeyDown(
  targetKey: string,
  callback: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === targetKey) {
        callback(event);
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
}
