import { writeText, readText } from '@tauri-apps/api/clipboard';



export async function clipboards() {

    // 页面copy 内容
    const readStr = await readText();

    console.log(readStr);

    await writeText("hello");



}