import { Hotkey } from "react-hotkeys-hook/dist/types";

export function keyBoardEventToShortcut(hotkey: Hotkey) {
  const shortcut = `${hotkey.meta ? "meta+" : ""}${hotkey.ctrl ? "ctrl+" : ""}${
    hotkey.alt ? "alt+" : ""
  }${hotkey.shift ? "shift+" : ""}${hotkey.keys
    .join("+")
    .replaceAll("control+", "")}`;

  return shortcut;
}
