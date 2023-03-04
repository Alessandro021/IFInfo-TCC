import pup from "puppeteer";
import firebase from "../server/firebase.js";

const urlTecnicos = "https://www.ifnmg.edu.br/cursos-ari1/cursos-tecnicos";
const urlSuperiores = "https://www.ifnmg.edu.br/cursos-ari1/cursos-superiores";


 const curso_ofertados = async () => {
     const browser = await pup.launch(
         { 
            headless: false,
            slowMo: 100,
        }
     );
     const page = await browser.newPage();
      // await page.waitForTimeout(30000)

      //CURSOS TECNICOS
     await page.goto(urlTecnicos);
   
       const tituloTecnico = await page.$$eval("div.item-page span > a", (elemento) => elemento.map((titulo) => titulo.textContent));
       const linksTecnico = await page.$$eval('div.item-page span > a', (elemento) => elemento.map((titulo) => titulo.href));
       //.mYVXT > div > div:nth-child(1) > div > div > div> div > div > div > div > a
       let lista1 = []
       for(let i = 0; i < tituloTecnico.length; i++){
        lista1.push({nome: tituloTecnico[i], link: linksTecnico[i]})
       }

     await firebase.firestore().collection('cursosTecnicos').doc("tecnico").set({ //Não alterar o valor "tecnico" do doc
         tecnico: lista1,
     })
         .then(() => {
             console.log("Lista de cursos tecnicos adicionados ao firestore");
     })

      //CURSOS SUPERIORES
       await page.goto(urlSuperiores);
   
       const tituloSuperio = await page.$$eval("div.item-page span > a", (elemento) => elemento.map((titulo) => titulo.textContent));
       const linksSuperior = await page.$$eval('div.item-page span > a', (elemento) => elemento.map((titulo) => titulo.href));
       //.mYVXT > div > div:nth-child(1) > div > div > div> div > div > div > div > a
    
       let lista2 = []
       for(let i = 0; i < tituloSuperio.length; i++){
         lista2.push({nome: tituloSuperio[i], link: linksSuperior[i]})
       }

     await firebase.firestore().collection('cursosSuperiores').doc("superior").set({ //Não alterar o valor "superior" do doc
        superior: lista2,
     })
         .then(() => {
             console.log("Lista de cursos superiores adicionados ao firestore");
    })

     await browser.close();

    }
    export default curso_ofertados;