import { getName } from '@tauri-apps/api/app';


export async function appName(){

   const aName= await getName();
   console.log(aName);

}