import { app, globalShortcut, ipcMain } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";

// Initialize store
Store.initRenderer();
const store = new Store();

function setHotkey(mainWindow: Electron.BrowserWindow, hotkey: string) {
  globalShortcut.unregister(store.get("hotkey") as string);

  const success = globalShortcut.register(hotkey, () => {
    if (process.platform === "darwin") {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    } else {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
        mainWindow.focus();
      } else {
        mainWindow.minimize();
      }
    }
  });
}

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  let hotkey: string;

  if (!store.get("hotkey")) {
    hotkey = "CommandOrControl+Shift+L";
    store.set("hotkey", hotkey);
  } else {
    hotkey = store.get("hotkey") as string;
  }

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    //  mainWindow.webContents.openDevTools();
  }

  app.whenReady().then(() => {
    setHotkey(mainWindow, hotkey);
  });

  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setFullScreenable(false);

  ipcMain.on("set-hotkey", (event, hotkey) => {
    setHotkey(mainWindow, hotkey);
    store.set("hotkey", hotkey);
  });
})();

app.on("window-all-closed", () => {
  app.quit();
});
