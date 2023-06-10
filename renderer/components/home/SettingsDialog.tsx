import { ipcRenderer } from "electron";
import Store from "electron-store";
import { useEffect, useState } from "react";
import useKeyRecorder from "../../hooks/useKeyRecorder";
import appwrite from "../../services/appwrite.service";
import TextInput from "../core/input/TextInput";

export default function SettingsDialog() {
  const store = new Store();
  const [storedHotkey, setStoredHotkey] = useState(
    (store.get("hotkey") as string).replace(
      "CommandOrControl",
      process.platform === "darwin" ? "meta" : "ctrl"
    )
  );
  const [recordHotkey, setRecordHotkey] = useState(false);
  const [hotkeyError, setHotkeyError] = useState(null);

  const keys = useKeyRecorder(
    (error) => setHotkeyError(recordHotkey ? error : null),
    () => {}
  );

  useEffect(() => {
    if (!recordHotkey && !hotkeyError && keys) {
      setStoredHotkey(keys);
      ipcRenderer.send(
        "set-hotkey",
        keys
          .replace("meta", "CommandOrControl")
          .replace("ctrl", "CommandOrControl")
      );
    }
  }, [recordHotkey]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm">Snipcap Hotkey</p>
        <p className="text-xs text-secondaryText mb-1">
          Make sure the shortcut isn't used for another action
        </p>
        <div className="flex gap-2">
          <div className="grow">
            <TextInput
              tabIndex={-1}
              value={recordHotkey ? keys : storedHotkey}
              readOnly
              disabled
              error={hotkeyError}
            />
          </div>
          <button
            tabIndex={-1}
            disabled={recordHotkey && hotkeyError}
            onClick={() => setRecordHotkey(!recordHotkey)}
            className="btn text-sm flex-none"
          >
            {recordHotkey ? "Recording..." : "Record Hotkey"}
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Account</p>
        <button
          tabIndex={-1}
          className="btn text-sm"
          onClick={async () => {
            await appwrite.account.deleteSession("current");
            window.location.reload();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
