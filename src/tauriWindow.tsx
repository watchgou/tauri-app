import { appWindow, WebviewWindow } from "@tauri-apps/api/window";



interface Prevents {
    msg: string;
}


export async function myEvent() {


    await appWindow.listen<Prevents>("my_event", payload => {

        console.log(payload.payload.msg);
    });
}

export function newWindow() {
    const webView = new WebviewWindow("theUniqueLabel", {
        url: '../page.html',
        width: 150,
        height: 150,
        title: "xxxxx"
    });

    webView.once('tauri://created', function (e) {
        console.log(e);
        // webview window successfully created
    });
    webView.once('tauri://error', function (e) {
        // an error happened creating the webview window
    });
}

