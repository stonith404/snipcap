import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export default (
  windowName: string,
  options: BrowserWindowConstructorOptions
): BrowserWindow => {
  let state = {};

  const browserOptions: BrowserWindowConstructorOptions = {
    ...state,
    ...options,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      ...options.webPreferences,
    },
    width: 750,
    height: 600,
    frame: false,
    resizable: false,
    center: true,
  };

  return new BrowserWindow(browserOptions);
};
