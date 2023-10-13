// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Window;

#[derive(Clone, serde::Serialize)]
struct Prevents {
    msg: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str, window: Window) -> String {
    let mut count: u32 = 0;
    while count < 100 {
        window
            .emit(
                "my_event",
                Prevents {
                    msg: "hello world".to_string(),
                },
            )
            .unwrap();

        count += 1;
    }
    
    window.once("tauri://created",move|_| {

    });
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
