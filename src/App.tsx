import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
//import { myEvent, newWindow } from "./tauriWindow";
//import {appName} from "./tauriApp";
//import { clipboards } from "./tauriClipboard";

import { Button } from '@douyinfe/semi-ui';

import "./App.css";




function App() {
  const switchMode = () => {
    const body = document.body;
    const hasAttribute=body.hasAttribute('theme-mod');
    console.log("hasAttribute "+hasAttribute);
    if (hasAttribute) {
      console.log("remove attribute");
      body.removeAttribute('theme-mod');
      //window.setMode("light");
    } else {
      console.log("set attribute");
      body.setAttribute('theme-mode', 'dark');
      //window.setMode('dark');
    }
  };
// 

  return (
    <Button onClick={switchMode}>
        Switch Mode
    </Button>

  );
}

export default App;
