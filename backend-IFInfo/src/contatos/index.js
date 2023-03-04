import pup from "puppeteer";
import firebase from "../server/firebase.js";

const url = "https://www.ifnmg.edu.br/menu-arinos/estrutura-organizacional";

let cont = 0
 const contatos = async () => {
     const browser = await pup.launch(
         { 
            headless: false,
            slowMo: 100,
        }
     );
     const page = await browser.newPage();
      // await page.waitForTimeout(30000)
     await page.goto(url);
   
    //    const titulos = await page.$$eval("div.item-page > p:nth-child(7)", (elemento) => elemento.map((titulo) => titulo.outerText));
    //    const titulos1 = await page.$$eval(".item-page > p", (elemento) => elemento.map((titulo) => titulo.outerText));
    //    const titulos1 = await page.$$eval("p:nth-child(3) > a", (elemento) => elemento.map((titulo) => titulo.href));
    //    const links = await page.$$eval('div > div > div> div > div > div > div > a', (elemento) => elemento.map((titulo) => titulo.href));

    // const titulos1 = ''
    for( let i = 3; i < 15; i++ ){
        // const titulos1 = await page.$$eval(`p:nth-child(${i})`, elemento => elemento.map(conteudo => conteudo.outerText.trim().replace("/", "\n")));

        //CARGO
        await page.waitForSelector(`p:nth-child(${i})`);
        const cargo = await page.evaluate((i) => {
            // elemento.map(conteudo => conteudo.outerText.trim())
        
            return document.querySelector(`p:nth-child(${i}) > strong`).innerText.trim();
        }, i)

        //NOME
        await page.waitForXPath(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`)
        // const nome = await page.$x(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`)
        // let nomeEstraido = await page.evaluate(texto => texto.textContent.trim().replace("/", ""), nome[0])
        let nome = await page.evaluate( elemento => {

            return elemento.textContent
        }, (await page.$x(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`))[0] )

        // //EMAIL
        // await page.waitForSelector(`div.item-page > p:nth-child(5) > a:nth-child(${i}) > span`);
        // const email = await page.evaluate((i) => {
        //     // elemento.map(conteudo => conteudo.outerText.trim())
        
        //     return document.querySelector(`p:nth-child(${i}) > span`).innerText.trim();
        // }, i)


        //TELEFONE
        // await page.waitForXPath(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[3]`)
        // const telefone = (await page.$x(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[3]`))[0]
        // let telefoneEstraido = await page.evaluate( elemento => {

        //     // if(!elemento) {
        //     //     return null;
        //     //  }
        //     return elemento.textContent
        // },telefone)


        // await firebase.firestore().collection('contatos').add({
        //     contato: titulos1,
        // })
        // .then(()=>{
        //     console.log("OS calendarios escolares foram adicionado ao banco de dados com sucesso!");
        // })

    // console.log(cargo)
    // console.log(cargo)
    // console.log(nome)
    console.log(email)
    console.log("////////////////////////////////////////////////////////////////")
        
    }

    // for( let i = 16; i < 28; i++ ){


    //     //CARGO
    //     await page.waitForSelector(`p:nth-child(${i})`);
    //     const cargo = await page.evaluate((i) => {
    //         // elemento.map(conteudo => conteudo.outerText.trim())
        
    //         return document.querySelector(`p:nth-child(${i}) > strong`).innerText.trim();
    //     }, i)

    //     //NOME
    //     await page.waitForXPath(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`)

    //     let nome = await page.evaluate( elemento => {

    //         return elemento.textContent
    //     }, (await page.$x(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`))[0] )

    // // console.log(cargo)
    // console.log(cargo)
    // console.log(nome)
    // console.log("////////////////////////////////////////////////////////////////")
        
    // }

    // for( let i = 30; i < 34; i++ ){


    //     //CARGO
    //     await page.waitForSelector(`p:nth-child(${i})`);
    //     const cargo = await page.evaluate((i) => {
    //         // elemento.map(conteudo => conteudo.outerText.trim())
        
    //         return document.querySelector(`p:nth-child(${i}) > strong`).innerText.trim();
    //     }, i)

    //     //NOME
    //     await page.waitForXPath(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`)

    //     let nome = await page.evaluate( elemento => {

    //         return elemento.textContent
    //     }, (await page.$x(`//*[@id="content-section"]/div/div[1]/p[${i - 2}]/text()[1]`))[0] )

    // // console.log(cargo)
    // console.log(cargo)
    // console.log(nome)
    // console.log("////////////////////////////////////////////////////////////////")
        
    // }

    

    

    

    //    for(let i = 0; i < 2; i++){
    //      await firebase.firestore().collection('calendario').doc(titulos[i]).set({
    //         id: titulos[i],
    //         pdf: links[i],
    //    })
    //    .then(()=>{
    //       console.log("OS calendarios escolares foram adicionado ao banco de dados com sucesso!");
    //   })
    //    }
     await browser.close();

    }
    export default contatos;