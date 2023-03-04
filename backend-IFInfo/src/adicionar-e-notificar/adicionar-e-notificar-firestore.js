import pup from "puppeteer";
import firebase from "../../src/server/firebase.js";
import chamaNotificacao from "../notificacao/index.js";
import imagem_base64 from "../imagem_base64/index.js";
import deleta_Token_repitido from "../Deleta-token-repitido/index.js";
import deleta_noticia from "../deleta-noticia/index.js";

const url = "https://www.ifnmg.edu.br/mais-noticias-arinos";

let cont = 1;
let contAux = 1;
let contNotAdd = 0;
const numero_de_noticias_por_pagina = "5" // 5, 10,15,20, 25,30, 50, 100, Todos
let ids = []
const adicionar_e_notificar_firestore = async () => {

    await deleta_Token_repitido()

   await firebase.firestore().collection('noticias').orderBy("id", "desc").limit(5).get()
      .then(snapshot => {
         ids = snapshot.docs.map(doc => doc.id);
      })
      
         const browser = await pup.launch(
            {
               headless: false,
               slowMo: 100,
            }
         );
         const page = await browser.newPage();
         // console.log("Iniciado");

         await page.goto(url);
         // console.log("fui para a url das noticias de cada ano");

         let ano_da_noticias = []
         for (let i = 1; i < 3; i++) { //PEGA AS URLS DAS NOTICIAS DE CADA ANO
            ano_da_noticias.push(await page.$eval(`div:nth-child(${i}) > div.span10.tileContent > div.tileHeader > h2 > a`, (elemento) => elemento.href))
         }

         for (const ano_da_noticia of ano_da_noticias) { //RODA POR CADA URL DE NOTICIAS DE CADA ANO

            // ano_da_noticia = await page.$eval('div.tileHeader > h2 > a', (elemento) => elemento.href);
         
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


            // console.log("fui para a url da noticias de 2022");

            await page.waitForSelector('.tileHeadline > a')


            const links = await page.$$eval('.tileHeadline > a', (elemento) => elemento.map((titulo) => titulo.href));


               for (const link of links) {
                  if(contAux <= Number(numero_de_noticias_por_pagina)){

                     await page.goto(link);

                     const conteudo = await page.$$eval('.item-page > p', elemento => elemento.map(conteudo => conteudo.outerText));
                     const id_noticia = link.substring(66, 79).replace(/\D/g, '')
                     //peguei umcodigo que fica fica na url da noticia, que é um identificador unico da noticia, e utilizo o replace para que caso alguma string apareça ele so pegue o numero.

                     await page.goto(ano_da_noticia)

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
                     contAux++;
                     
                     if (!ids.includes(id_noticia)) {
               
                        // new Promise(r => setTimeout(r, "4000"));
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
                              contNotAdd++;
                              chamaNotificacao(titulo, conteudo, hora, data, link, null) // enviar notificação de novas noticias adicionadas no firebase.
                              // console.log("Adicionado com sucesso -- ", id_noticia)
                           })
                     } else {
                        // console.log("Ja foi adicionado - ", id_noticia)
                     }
                  }
               }
               cont = 1;
            }
         }

         console.log(`Foi adicionado em: ${ new Date()} [${contNotAdd}] noticia(as) ao firestore!`)
         await browser.close();
         cont = 1;
         contNotAdd = 0;
         contAux = 1

         deleta_noticia() //mantem 20 somente 20 noticias no banco de dados.
      

}//FINAL DA FUNÇÃO PRINCIPAL

  setInterval(adicionar_e_notificar_firestore, 1800000)
export default adicionar_e_notificar_firestore;