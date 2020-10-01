import React, { useState, useEffect } from "react";

import MinW10 from "../assets/titlebar/min-w-10.png";
import MinW12 from "../assets/titlebar/min-w-12.png";
import MinW15 from "../assets/titlebar/min-w-15.png";
import MinW20 from "../assets/titlebar/min-w-20.png";
import MinW24 from "../assets/titlebar/min-w-24.png";
import MinW30 from "../assets/titlebar/min-w-30.png";

import MaxW10 from "../assets/titlebar/max-w-10.png";
import MaxW12 from "../assets/titlebar/max-w-12.png";
import MaxW15 from "../assets/titlebar/max-w-15.png";
import MaxW20 from "../assets/titlebar/max-w-20.png";
import MaxW24 from "../assets/titlebar/max-w-24.png";
import MaxW30 from "../assets/titlebar/max-w-30.png";

import RestoreW10 from "../assets/titlebar/restore-w-10.png";
import RestoreW12 from "../assets/titlebar/restore-w-12.png";
import RestoreW15 from "../assets/titlebar/restore-w-15.png";
import RestoreW20 from "../assets/titlebar/restore-w-20.png";
import RestoreW24 from "../assets/titlebar/restore-w-24.png";
import RestoreW30 from "../assets/titlebar/restore-w-30.png";

import CloseW10 from "../assets/titlebar/close-w-10.png";
import CloseW12 from "../assets/titlebar/close-w-12.png";
import CloseW15 from "../assets/titlebar/close-w-15.png";
import CloseW20 from "../assets/titlebar/close-w-20.png";
import CloseW24 from "../assets/titlebar/close-w-24.png";
import CloseW30 from "../assets/titlebar/close-w-30.png";

const { remote } = window.require("electron");

function Titlebar() {
  const [isMaximized, setIsMaximized] = useState(false);
  const win = remote.getCurrentWindow();

  useEffect(() => {
    function toggleMaxRestoreButtons() {
      if (win.isMaximized()) {
        setIsMaximized(true);
      } else {
        setIsMaximized(false);
      }
    }
    toggleMaxRestoreButtons();
    win.on("maximize", toggleMaxRestoreButtons);
    win.on("unmaximize", toggleMaxRestoreButtons);
    return win.removeAllListeners;
  }, [win]);

  return (
    <header id="titlebar" className={isMaximized ? "maximized" : ""}>
      <div id="drag-region">
        {/* <div id="window-title">
          <span className="logo">xioni</span>
        </div> */}

        <div id="window-controls">
          <div className="button" id="min-button" onClick={() => win.minimize()}>
            <img
              className="icon"
              srcSet={`${MinW10} 1x, ${MinW12} 1.25x, ${MinW15} 1.5x, ${MinW15} 1.75x, ${MinW20} 2x, ${MinW20} 2.25x, ${MinW24} 2.5x, ${MinW30} 3x, ${MinW30} 3.5x`}
              draggable="false"
              alt="min"
            />
          </div>
          <div className="button" id="max-button" onClick={() => win.maximize()}>
            <img
              className="icon"
              srcSet={`${MaxW10} 1x, ${MaxW12} 1.25x, ${MaxW15} 1.5x, ${MaxW15} 1.75x, ${MaxW20} 2x, ${MaxW20} 2.25x, ${MaxW24} 2.5x, ${MaxW30} 3x, ${MaxW30} 3.5x`}
              draggable="false"
              alt="max"
            />
          </div>
          <div className="button" id="restore-button" onClick={() => win.unmaximize()}>
            <img
              className="icon"
              srcSet={`${RestoreW10} 1x, ${RestoreW12} 1.25x, ${RestoreW15} 1.5x, ${RestoreW15} 1.75x, ${RestoreW20} 2x, ${RestoreW20} 2.25x, ${RestoreW24} 2.5x, ${RestoreW30} 3x, ${RestoreW30} 3.5x`}
              draggable="false"
              alt="restore"
            />
          </div>
          <div className="button" id="close-button" onClick={() => win.close()}>
            <img
              className="icon"
              srcSet={`${CloseW10} 1x, ${CloseW12} 1.25x, ${CloseW15} 1.5x, ${CloseW15} 1.75x, ${CloseW20} 2x, ${CloseW20} 2.25x, ${CloseW24} 2.5x, ${CloseW30} 3x, ${CloseW30} 3.5x`}
              draggable="false"
              alt="close"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Titlebar;
