import firebase from "../server/firebase.js"
import fetch from "node-fetch";
// import XMLHttpRequest from "xhr2/lib/xhr2.js"


const imagem_base64 =  async (img) => {

    const imageUrlData = await fetch(img);
    const buffer = await imageUrlData.arrayBuffer();
    const stringifiedBuffer = Buffer.from(buffer).toString('base64');
    const contentType = imageUrlData.headers.get('content-type');
    const imageBas64 = `data:image/${contentType};base64,${stringifiedBuffer}`;
    return imageBas64;
    // console.log(imageBas64);
    
}


export default imagem_base64;