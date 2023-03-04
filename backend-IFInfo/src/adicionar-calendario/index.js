import pup from "puppeteer";
import firebase from "../server/firebase.js";
import pdf_base64 from "../pdf_base64/index.js";

const url = "https://www.ifnmg.edu.br/calendario-ari";


 const adicionar_calendario = async () => {
     const browser = await pup.launch(
         { 
            headless: false,
            slowMo: 100,
        }
     );
     const page = await browser.newPage();
      // await page.waitForTimeout(30000)
     await page.goto(url);
   
      //  const titulos = await page.$$eval("div.NsaAfc > p", (elemento) => elemento.map((titulo) => titulo.textContent));
      //  const links = await page.$$eval('div > div > div> div > div > div > div > a', (elemento) => elemento.map((titulo) => titulo.href));

       //.mYVXT > div > div:nth-child(1) > div > div > div> div > div > div > div > a

      //  for(let i = 0; i < 2; i++){
      //    await firebase.firestore().collection('calendario').doc(titulos[i]).set({
      //       id: titulos[i],
      //       pdf: links[i],
      //  })
      //  .then(()=>{
      //     console.log("OS calendarios escolares foram adicionado ao banco de dados com sucesso!");
      // })
      //  }

      let titulos = [];
      let links = [];
        for(let i = 4; i <=7; i++){
          if(i % 2 == 0){
            titulos.push( await page.$eval(`p:nth-child(${i}) > strong`, (elemento) => elemento.textContent))
          }else{
            links.push( await page.$eval(`p:nth-child(${i}) > a`, (elemento) => elemento.href))
          }
        }

      for (let i = 0; i < titulos.length; i++) {
        await firebase.firestore().collection('calendario').doc(titulos[i]).set({
          id:  titulos[i],
          pdf: await pdf_base64(links[i]) ,
        })
          .then(() => {
            console.log("OS calendarios escolares foram adicionado ao banco de dados com sucesso!");
          })
      }

      // console.log(titulos)
     await browser.close();

    }
    export default adicionar_calendario;