import pup from "puppeteer";
import firebase from "../server/firebase.js";
import imagem_base64 from "../imagem_base64/index.js";

//https://javascript.plainenglish.io/uploading-an-image-to-firebase-cloud-storage-and-returning-url-with-express-nodejs-713daac7a5d4

const url = "https://www.ifnmg.edu.br/mais-noticias-arinos";

const noticias = [];
const numero_de_noticias_por_pagina = "20" // 5, 10,15,20, 25,30, 50, 100, Todos
let cont = 1;
let contNotAdd = 1
 const raspagem_com_firestore = async () => {
     const browser = await pup.launch(
         { 
            headless: false,
            slowMo: 100,
        }
     );
     const page = await browser.newPage();
     console.log("Iniciado");
      // await page.waitForTimeout(30000)
     await page.goto(url);
     console.log("fui para a url das noticias de cada ano");
   
   //   const ano_da_noticia = await page.$eval('div.tileHeader > h2 > a', (elemento) => elemento.href);

   let ano_da_noticias = []
   for(let i = 1; i < 3; i++) { //PEGA AS URLS DAS NOTICIAS DE CADA ANO
      ano_da_noticias.push(await page.$eval(`div:nth-child(${i}) > div.span10.tileContent > div.tileHeader > h2 > a`, (elemento) => elemento.href))
   }


    for (const ano_da_noticia of ano_da_noticias) { //RODA POR CADA URL DE NOTICIAS DE CADA ANO


       await page.goto(ano_da_noticia)

       await page.waitForSelector('#limit')

       const verifica_select = await page.evaluate(() => { //VERIFICA SE A PAGINA DE NOTICIAS DE CADA ANO E NOVA E POSSUI ALGUMA NOTICIA
          const elemento = document.querySelector("#limit > option:nth-child(3)")
          if (!elemento) {
             return false;
          }
          return elemento.innerText;
       })

      if(verifica_select){ //SE A PAGINA FOR NOVA NÃO TERA NOTICIA E POR ISSO ELA NÃO É EXECULTADA E NUMERO DE PAGINAS DE NOTICIAS VAI RODAR ATE O ESPECIFICADO
      
      
         await page.select('#adminForm > div.row-fluid > fieldset > div.display-limit.pull-right > label> select', numero_de_noticias_por_pagina)


         await page.waitForSelector('.tileHeadline > a')


         const links = await page.$$eval('.tileHeadline > a', (elemento) => elemento.map((titulo) => titulo.href));


         for (const link of links) {
            if(contNotAdd <= Number(numero_de_noticias_por_pagina)){

            await page.goto(link);

            // await page.waitForSelector('.documentFirstHeading > a');

            // const tituloText = await page.$eval('.documentFirstHeading > a', elemento => elemento.innerText);
            // const data_e_hora = await page.$eval('.documentPublished', elemento => elemento.innerText);
            const conteudo = await page.$$eval('.item-page > p', elemento => elemento.map(conteudo => conteudo.outerText.trim()));
            const id_noticia = link.substring(66, 79).replace(/\D/g, '')
            //peguei umcodigo que fica fica na url da noticia, que é um identificador unico da noticia, e utilizo o replace para que caso alguma string apareça ele so pegue o numero.



            await page.goto(ano_da_noticia)
            // page.waitForNavigation(`div:nth-child(${cont}) > div.span10.tileContent > div > a > img`)

            await page.waitForSelector(`#adminForm > div.tile-list-1 > div:nth-child(${cont}) > div.span10.tileContent > h2 > a`);
            const titulo = await page.evaluate((cont) => {  //pego o titulo do lado de fora, no conjunto de noticias de 2022
               return document.querySelector(`#adminForm > div.tile-list-1 > div:nth-child(${cont}) > div.span10.tileContent > h2 > a`).innerText.trim();
            }, cont)

            const link_da_foto = await page.evaluate((cont) => {
               const elemento = document.querySelector(`div:nth-child(${cont}) > div.span10.tileContent > div > a > img`);
               if (!elemento) {
                  return null;
               }
               return elemento.currentSrc;
            }, cont)

            await page.waitForSelector(`div:nth-child(${cont}) > div.span2.tileInfo > ul > li:nth-child(3)`);
            const data = await page.evaluate((cont) => {
               return document.querySelector(`div:nth-child(${cont}) > div.span2.tileInfo > ul > li:nth-child(3)`).innerText.trim();
            }, cont)

            await page.waitForSelector(`div:nth-child(${cont}) > div.span2.tileInfo > ul > li:nth-child(4)`);
            const hora = await page.evaluate((cont) => {
               return document.querySelector(`div:nth-child(${cont}) > div.span2.tileInfo > ul > li:nth-child(4)`).innerText.trim().replace("h", ":");
            }, cont)
            cont++;
            contNotAdd++;

            await firebase.firestore().collection('noticias').doc(id_noticia).set({
               id: id_noticia,
               titulo: titulo,
               conteudo: conteudo,
               hora: hora,
               data: data,
               link: link,
               urlFoto: link_da_foto ? await imagem_base64(link_da_foto) : null
            })
               .then(() => {
                  console.log("deu tudo certo")

               })

            }
         }
   }
   cont = 1

   
}

   //   console.log(noticias)

     await browser.close();
 };

//  setInterval(raspagem, 100000)
//  module.exports = raspagem;
export default raspagem_com_firestore;
// $('.SELETOR') verificar se o seletor e usado somente uma vez
// document.querySelector('div.tileHeader > h2 > a').href