// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Prevents {
    msg: String,
}

#[tauri::command]
fn greet(name: &str, window: tauri::Window) -> String {
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

    window.once("tauri://created", move |_| {});
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize, serde::Deserialize, Debug, Default)]
pub struct DebugEvent {
    pub code: u32,
    pub msg: String,
}

// remember to call `.manage(MyState::default())`
#[tauri::command]
fn debug_event() -> DebugEvent {
    DebugEvent {
        code: 0,
        msg: String::from("hello"),
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.listen_global("global_event", |event| {
                println!("golbal_event {:#?}", event.payload().unwrap());
            });
            let _ = app.get_window("main").unwrap();
            println!("setup");
            //tauri::api::dialog::blocking::message(Some(&main_window), "Hello", "Welcome back!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, debug_event])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
