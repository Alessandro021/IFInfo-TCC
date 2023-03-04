import firebase from "../server/firebase.js"
import fetch from "node-fetch";
// import XMLHttpRequest from "xhr2/lib/xhr2.js"


const pdf_base64 =  async (pdf) => {

    const pdfUrlData = await fetch(pdf);
    const buffer = await pdfUrlData.arrayBuffer();
    const stringifiedBuffer = Buffer.from(buffer).toString('base64');
    const contentType = pdfUrlData.headers.get('content-type');
    const pdfBas64 = `data:${contentType};base64,${stringifiedBuffer}`;
    return pdfBas64;
    // console.log(contentType);
    
}


export default pdf_base64;