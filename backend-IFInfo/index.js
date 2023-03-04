import raspagem_com_firestore from './src/raspagem/raspagem-com-firestore.js'
import adicionar_e_notificar_firestore from './src/adicionar-e-notificar/adicionar-e-notificar-firestore.js'
import adicionar_calendario from "./src/adicionar-calendario/index.js"
import curso_ofertados from "./src/curso-ofertados/index.js";
import contatos_horarios_servidores_e_professores from "./src/contatos-horarios-servidores-e-professores/index.js";

import chamaNotificacao from './src/notificacao/index.js'
import upload_imagem from "./src/imagem_base64/index.js";
import pdf_base64 from "./src/pdf_base64/index.js";

//IMPORTANTES
// raspagem_com_firestore()
// adicionar_calendario()
// curso_ofertados();
// contatos_horarios_servidores_e_professores();
adicionar_e_notificar_firestore(); //FUNÇÃO PRINCIPAL

//TESTES
// upload_imagem()
// pdf_base64("https://drive.google.com/file/d/1H9Ut7xc1ggmP1COjflEzNUojhv1C8vvG/view?usp=share_link");
// chamaNotificacao("teste", ["teste", "teste"], "https://www.ifnmg.edu.br/arquivos/conv3cham.jpg", 
//     "https://www.ifnmg.edu.br/mais-noticias-arinos/651-arinos-noticias-2023/30925-publicado-o-resultado-final-da-2-chamada-e-convocacao-da-3-chamada-do-processo-seletivo-para-cursos-tecnicos-integrados", 
//     "12/12/12","12:12");