import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow, WebviewWindow,PhysicalSize } from "@tauri-apps/api/window";
import "./App.css";


interface Prevents {
  msg: string;
}


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");



  async function my_event() {

    await appWindow.listen<Prevents>("my_event", payload => {

      console.log(payload.payload.msg);
    });
  }

  async function greet() {
    const webView = new WebviewWindow("theUniqueLabel", {
      url: '../page.html',
      width:150,
      height:150,
      title:"xxxxx"
    });
    webView.once('tauri://created', function (e) {
      console.log(e);
      // webview window successfully created
    });
    webView.once('tauri://error', function (e) {
      // an error happened creating the webview window
    });
    // await appWindow.setMaxSize(new PhysicalSize(600, 500));

    // await my_event();
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (

    <div id='drag' className="container">
      {/* <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p> */}

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
