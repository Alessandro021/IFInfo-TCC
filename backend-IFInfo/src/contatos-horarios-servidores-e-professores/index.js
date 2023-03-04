import firebase from "../server/firebase.js";

const contatos = [
    {id: "Diretor-Geral", contato: [{nome: "Prof. Elias Rodrigues de Oliveira Filho", email: "elias.rodrigues@ifnmg.edu.br", telefone: "38 98409-5162"}]},
    {id: "Chefe de Gabinete", contato: [{nome: "Warley Ferreira Nascimento", email: "warley.nascimento@ifnmg.edu.br", telefone: "38 3218-7393"}]},
    {id: "Assessoria de Comunicação e Eventos", contato: [{nome: "Priscila Borges de Castro", email: "priscila.castro@ifnmg.edu.br", telefone: "38 3218-7391"}]},
    {id: "Coordenador da Coordenadoria de Gestão de Pessoas", contato: [{nome: "Gustavo Rodrigues Morgado", email: "gustavo.morgado@ifnmg.edu.br", telefone: "38 3218-7391"}]},
    {id: "Coordenador da Coordenadoria de Extensão", contato: [{nome: "Profa. Elza Cristiny Carneiro Batista", email: "elza.carneiro@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador da Coordenadoria de Pesquisa, Pós Graduação e Inovação", contato: [{nome: "Diogo de Moraes Cardoso", email: "diogo.moraes@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador da Coordenadoria de Gestão de Tecnologia da Informação", contato: [{nome: "Fernando Macedo Lopes", email: "fernando.lopes@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenadora do Núcleo de Atendimento às Pessoas com Necessidades Especiais - NAPNE", contato: [{nome: "Ursulina Ataíde Alves", email: "ursulina.alves@ifnmg.edu.br", telefone: ""}]},
    {id: "Subcomissão da Comissão Própria de Avaliação: CPA", contato: [{nome: "Ana Lúcia Ferreira Oliveira de Freitas", email: "ana.freitas@ifnmg.edu.br", telefone: ""}]},
    {id: "Subcomissão da Comissão Permanente de Pessoal Docente: CPPD", contato: [{nome: "Renato Rodrigues de Oliveira", email: "renato.rodrigues@ifnmg.edu.br", telefone: ""}]},
    {id: "Subcomissão da Comissão Interna de Supervisão do Plano de Carreira dos Técnicos-Administrativos em Educação: CIS-PCCTAE", contato: [{nome: "Marcelo Tiago de Brito", email: "marcelo.brito@ifnmg.edu.br", telefone: ""}]},
    {id: "Assessoria de Pesquisa Institucional", contato: [{nome: "Adailton Cardoso da Silva", email: "adailton.silva@ifnmg.edu.br", telefone: ""}]},
    {id: "Diretora do Departamento de Ensino", contato: [{nome: "Profa. Juliana Maria Nogueira Pereira", email: "juliana.nogueira@ifnmg.edu.br", telefone: "38 3218-7393"}]},
    {id: "Coordenador da Coordenação de Ensino", contato: [{nome: "Profa. Edinília Nascimento Cruz", email: "edinilia.cruz@ifnmg.edu.br", telefone: "38 3218-7393"}]},
    {id: "Coordenadora da Coordenadoria de Registros Escolares", contato: [{nome: "Lucinéia Rodrigues Durães", email: "lucineia.duraes@ifnmg.edu.br", telefone: "38 3218-7394"}]},
    {id: "Coordenador da Coordenadoria de Registros Acadêmicos", contato: [{nome: "Cesane Faustino Pereira", email: "cesane.pereira@ifnmg.edu.br", telefone: "38 3218-7393"}]},
    {id: "Coordenador do Curso Superior de Tecnologia em Produção de Grãos", contato: [{nome: "Prof. Luana da Silva Botelho", email: "luana.botelho@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Superior de Tecnologia em Gestão Ambiental", contato: [{nome: "Prof. Diorny da Silva Reis", email: "diorny.reis@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Bacharelado em Administração", contato: [{nome: "Profa. Valdinice Ferreira da Mota", email: "valdinice.mota@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do  Curso Bacharelado em Agronomia", contato: [{nome: "Prof. Ronaldo Porto Madureira", email: "ronaldo.madureira@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Bacharelado em Sistemas de Informação", contato: [{nome: "Prof. Danilo Silveira Martins", email: "danilo.silveira@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Técnico em Informática", contato: [{nome: "Prof.Eude Soares de Lacerda", email: "eude.lacerda@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Técnico em Agropecuária", contato: [{nome: "Ana Amélia dos Santos Cordeiro", email: "ana.cordeiro@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador do Curso Técnico em Meio Ambiente", contato: [{nome: "Fabiana Soares da Cruz Lima", email: "fabiana.lima@ifnmg.edu.br", telefone: ""}]},
    {id: "Responsável pelo Núcleo de Assistência ao Educando", contato: [{nome: "Silvânia Almeida da Silva", email: "silvania.almeida@ifnmg.edu.br", telefone: ""}]},
    {id: "Responsável pelo Núcleo de Assuntos Comunitários e Estudantis", contato: [{nome: "Marcus Vinicius de Matos Escobar", email: "marcus.escobar@ifnmg.edu.br", telefone: ""},
    {nome: "Ellen Krystine Mota Lima", email: "ellen.lima@ifnmg.edu.br", telefone: ""}]},
    {id: "Diretor do Departamento de Administração e Planejamento", contato: [{nome: "Willegaignon Gonçalves de Resende", email: "will.resende@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador da Coordenação de Administração", contato: [{nome: "Joaquim Henrique Alvares", email: "joaquim.alvares@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenação de Execução Orçamentária e Financeira", contato: [{nome: "Herik Ribeiro Baldez", email: "herik.baldez@ifnmg.edu.br", telefone: ""}]},
    {id: "Coordenador de Compra, Contrato e Convênio", contato: [{nome: "Jacqueline de Moura Ferreira", email: "jacqueline.ferreira@ifnmg.edu.br", telefone: "38 3218-7391"}]},
    {id: "Coordenação de Almoxarifado, Patrimônio e Transportes", contato: [{nome: "Adenilson Teixeira de Moura", email: "adenilson.moura@ifnmg.edu.br", telefone: ""}]},
    {id: "Setor de Protocolo", contato: [{nome: "Jonas Oliveira Moraes", email: "jonas.moraes@ifnmg.edu.br", telefone: "38 3218-7392"}]},

]

const horario = [
    {nome: "1º Agropecuária I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-1"},
    {nome: "1º Agropecuária II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-2"},
    {nome: "2º Agropecuária I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-3"},
    {nome: "2º Agropecuária II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-4"},
    {nome: "3º Agropecuária I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-37"},
    {nome: "3º Agropecuária II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-38"},
    {nome: "1º Informática I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-6"},
    {nome: "1º Informática II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-7"},
    {nome: "2º  Informática I", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-39"},
    {nome: "2º  Informática II", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-40"},
    {nome: "3º  Informática", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-9"},
    {nome: "1º Meio Ambiente", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-10"},
    {nome: "2º Meio Ambiente", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-11"},
    {nome: "3º Meio Ambiente", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-12"},
    {nome: "I Bacharelado em Administração", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-13"},
    {nome: "III Bacharelado em Administração", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-14"},
    {nome: "V Bacharelado em Administração", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-15"},
    {nome: "VII Bacharelado em Administração", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-41"},
    {nome: "I Bacharelado em Agronomia", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-18"},
    {nome: "III Bacharelado em Agronomia", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-19"},
    {nome: "V Bacharelado em Agronomia", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-20"},
    {nome: "VII Bacharelado em Agronomia", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-21"},
    {nome: "IX Bacharelado em Agronomia", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-22"},
    {nome: "I Tecnologia em Gestão Ambiental", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-24"},
    {nome: "III Tecnologia em Gestão Ambiental", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-25"},
    {nome: "V Tecnologia em Gestão Ambiental", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-42"},
    {nome: "Tecnologia em Produção de Grãos", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-43"},
    {nome: "I Bacharelado em Sistemas de Informação", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-30"},
    {nome: "III Bacharelado em Sistemas de Informação", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-31"},
    {nome: "V Bacharelado em Sistemas de Informação", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-32"},
    {nome: "VII Bacharelado em Sistemas de Informação", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-33"},
    {nome: "Optativas", link: "https://ifnmgarinos.edupage.org/timetable/view.php?num=26&class=-23"},    
]

const servidoresAdministrativos = [
    {nome: "Adailton Cardoso da Silva", cargo: "Técnico em Assuntos Educacionais"},
    {nome: "Adélia Karina Carneiro Batista", cargo: "Técnico em Assuntos Educacionais"},
    {nome: "Adenilson Teixeira de Moura", cargo: "Engenheiro Agrônomo"},
    {nome: "Andrea da Conceição Pires Franca", cargo: "Técnica em Assuntos Educacionais"},
    {nome: "Carlos de Freitas Júnior", cargo: "Auxiliar de Biblioteca"},
    {nome: "Césane Faustino Pereira", cargo: "Assistente em Administração"},
    {nome: "Clarissa Gabriela Giraldi Cleto", cargo: "Assistente em Administração"},
    {nome: "Crispiniano Viana da Silva", cargo: "Técnico de Tecnologia da Informação"},
    {nome: "Cyrlene Rita dos Santos", cargo: "Assistente de Alunos"},
    {nome: "Daiane Aparecida Ribeiro Queiroz", cargo: "Assistente Social"},
    {nome: "Elica Correia Santos", cargo: "Administradora"},
    {nome: "Elis Marina Fonseca Almeida", cargo: "Técnico de laboratório/Química"},
    {nome: "Elissandro Dias Costa", cargo: "Assistente em Administração"},
    {nome: "Ellen Krystine Mota Lima", cargo: "Odontólogo"},
    {nome: "Evandro Barbosa dos Anjos", cargo: "Médico"},
    {nome: "Fernando Carlos Evangelista Botelho", cargo: "Assistente em Administração"},
    {nome: "Fernando Macedo Lopes", cargo: "Analista de Tecnologia da Informação"},
    {nome: "Graciele de Miranda Monteiro", cargo: "Nutricionista"},
    {nome: "Gustavo Rodrigues Morgado", cargo: "Técnico em ALimentos e Laticínios"},
    {nome: "Hérik Ribeiro Baldez", cargo: "Assistente em Administração"},
    {nome: "Jacqueline de Moura Ferreira", cargo: "Assistente em Administração"},
    {nome: "João de Pádua Pereira de Sousa", cargo: "Assistente em Administração"},
    {nome: "Joaquim Henrique Álvares", cargo: "Assistente em Administração"},
    {nome: "Jonas Oliveira de Moraes", cargo: "Assistente em Administração"},
    {nome: "José Francisco Teixeira Pitangui", cargo: "Técnico em Agropecuária"},
    {nome: "Josedir Lopes de Araújo", cargo: "Técnico em Agropecuária"},
    {nome: "Jussara Gomes da Cruz", cargo: "Assistente em Administração"},
    {nome: "Kassiene Gomes dos Santos", cargo: "Assistente de Alunos"},
    {nome: "Kelis Alves Batista", cargo: "Auxiliar de Biblioteca"},
    {nome: "Luciana Soares Benício Viana", cargo: "Assistente em Administração"},
    {nome: "Lucineia Rodrigues Durães", cargo: "Auxiliar de Administração"},
    {nome: "Luiz Claudio Martins Sousa", cargo: "Auxiliar em Enfermagem"},
    {nome: "Marcela Oliveira Nascimento", cargo: "Auxiliar de Biblioteca"},
    {nome: "Marcelo Tiago de Brito", cargo: "Auxiliar de Biblioteca"},
    {nome: "Marcus Vinícius de Matos Escobar", cargo: "Psicólogo"},
    {nome: "Maria Aldenise Soares de Oliveira", cargo: "Assistente de Alunos"},
    {nome: "Paula Assis Martinez", cargo: "Bibliotecária / Documentalista"},
    {nome: "Priscila Borges de Castro", cargo: "Relações Públicas"},
    {nome: "Rosana Alves Macedo Saraiva", cargo: "Auxiliar de Biblioteca"},
    {nome: "Saulo Cerezo Araújo Silva", cargo: "Assistente de Alunos"},
    {nome: "Silvânia Almeida da Silva", cargo: "Assistente de Alunos"},
    {nome: "Ursulina Ataíde Alves", cargo: "Pedagogo"},
    {nome: "Valdenir Santos Soares", cargo: "Assistente de Alunos"},
    {nome: "Vivian Lopes de Melo", cargo: "Assistente em Amdinistração"},
    {nome: "Viviane Mangabeira Ormundo", cargo: "Técnico de Tecnologia da Informação"},
    {nome: "Warley Ferreira Nascimento", cargo: "Técnico em Enfermagem"},
    {nome: "Willegaignon Gonçalves de Resende", cargo: "Assistente em Administração"},
]

const servidoresDocente = [
    {nome: "Aélcio Vander dos Santos", area: "História", email: "aelcio.santos@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4435066E4" },
    {nome: "Adriana de Fátima Lima", area: "Física", email: "adriana.lima@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/9346277685006913" },
    {nome: "Alisson Macendo Amaral", area: "Topografia/Desenho Técnico", email: "alisson.amaral@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4235688H2" },
    {nome: "Ana Amélia dos Santos Cordeiro", area: "Ciências Agrárias", email: "ana.cordeiro@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4734366D0" },
    {nome: "Ana Lúcia Ferreira Oliveira de Freitas", area: "Administração/Contabilidade/Economia", email: "ana.freitas@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4357169A2" },
    {nome: "Antônio Martins de Freitas Junior", area: "Química", email: "antonio.freitas@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4964096J2" },
    {nome: "Carlos Magno Moreira de Oliveira", area: "Conservação da natureza, manejo florestal, gestão e legislação ambiental e geoprocessamento", email: "carlos.moreira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4477630P0" },
    {nome: "Carmem Silva Félix Venturi", area: "Língua Espanhola", email: "", curriculo: "" },
    {nome: "Celso Antônio da Silveira", area: "Química", email: "celso.silveira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4525602H2" },
    {nome: "Christiane Oliveira Valente", area: "Administração", email: "christiane.valente@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4497675U7" },
    {nome: "Chrystian Jorge da Mata", area: "Cálculo Diferencial e Integral", email: "chrystian.mata@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4420334J2" },
    {nome: "Daniela Cotta Bicalho", area: "Matemática", email: "daniela.bicalho@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/2079804659260327" },
    {nome: "Danilo Silveira Martins", area: "Informática", email: "danilo.silveira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8926837P6" },
    {nome: "Diogo de Moraes Cardoso", area: "Zootecnia", email: "diogo.moraes@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4249458A0" },
    {nome: "Dilma Maria Campelo Rio Verde", area: "Língua Portuguesa ", email: "dilma.verde@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/8101709834395729" },
    {nome: "Dino Beghetto Junior ", area: "Matemática ", email: "dino.junior@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/3753647897546875" },
    {nome: "Diorny da Silva Reis", area: "Engenharia Ambiental", email: "diorny.reis@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4290034Z0" },
    {nome: "Djanine Raquel Cantuária Santos Fonseca", area: "Língua Portuguesa", email: "djanine.fonseca@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4775732A9" },
    {nome: "Edgar Gomes Junior", area: "Sociologia", email: "edgar.junior@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8129542T0&tokenCaptchar=03AOLTBLSLYGr0Or4Ev9nQ-e8NUtoxulV_IeNlBCvCyyVe8qwhvUVVDodis3XU5WQtQXbXXHBQNNY78_LUkwDI_jYipIoKCrCr8_mWUdTqCesXQsEUhExnQ3t9I7jsLdwfATMVpzqLbqnprQnJs89N6VInRfTjQPPQijLLiUkEAHXM-SIN10649LOgJm7swUhWleUsszGwZjNzF3_0WEr2r67KzHHI-BCBJUGYng0F_oSGOrYflhlHoEzuN_OrQaqQOGjqyayMf5PwcmBokmDWSa9oQK7exq-WXlj9onnRudhTa5FX1BfS-JaS3-30dlzjluinweh_VKVEOMS33uyT3FQUIsE4WZ5wU3qRNqLyyNzmbnJpoKlAmYNgzKpA7ZcxfFuC90E-SfedRE56fvWchLuTKmPoICSCMaae0gnqVP-2KKr0w2PHPbB1fPU71Q4LkNyb2flJCm65TiDFz4fOnjj9LiLa89zTqjjqUmQCcDeZNuKZ2bTR5YH7h45XjLpZGDO-ShIRG_MsNuc5mcM1bTXt2npaIAcRUA" },
    {nome: "Edinilia Nascimento Cruz", area: "Língua Portuguesa", email: "edinilia.cruz@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4259274A0&tokenCaptchar=03AOLTBLRR6FcZReGARDByP121JAmVSVTOJBIa4W0Vr8ScPuryzNe2hNEsAcrkTn8w2QW10_TdmpR5-dCqWbb1UaRE36QVdeLI1kY8Ahv9X1HFT4iH53l3fZpoSr2nuvLy9-uOnljGPsba6oDSoBRlv0UMNbQwcDApbtUs7imhSWje8RpZXsfZjELv4ohg1PJkhMyOhlMDJaKoXLtOolgvzv7aEKtwZL2c6A7p2Q2CN9UASqZvyR6GKZHDgaHUqHGBfe_XX6zqFOAzZ5so_3Vao_lJgBbPA0pUlL0EqhHgC9JamuJHsDudlcoziqhSc0IOdXwGaoSfknkkJfeIbtKj5S5UPvDrNjKTVLdMT7b7IxrB-_yu9cx9J6HBdL7Z8ksCiQaCTGCag9IyUqV8S2F0K17yxJM-n-KPyRgqgONOTr0j-GsiwoXkZcQ8Th3125VTyhjrEfr9ENmvwH_jgVrXJMbvZPWokPDnvIFbtBLXg2jNt6tLZIMAScCqopiMFl0nUktsJ-hRccVv5unFRgWgZzbmpYfHNLECJA" },
    {nome: "Edna Aparecida Andrade Armond", area: "Língua Inglesa", email: "edna.armond@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8612169Y8" },
    {nome: "Elias Rodrigues de Oliveira Filho", area: "Administração", email: "elias.rodrigues@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8703499E6" },
    {nome: "Elza Cristiny Carneiro Batista", area: "História", email: "elza.carneiro@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4347864U6" },
    {nome: "Eude Soares de Lacerda", area: "Informática/Desenvolvimento de sistemas/Banco de dados", email: "eude.lacerda@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4490719Z4" },
    {nome: "Fabiana Soares da Cruz Lima", area: "Filosofia", email: "fabiana.lima@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4283002P7" },
    {nome: "Fábio Simão da Cunha", area: "Área: Administração", email: "fabio.cunha@ifnmg.edu.br ", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8762989A0&tokenCaptchar=03AOLTBLQQ8qHv3-g_Q8DQF5X8-CfKew6uYddL-YcgZZ3dDkrjc10HNb2GtBxDz02A7TLlco89RxwlyDczCnHNBca6FVT8W4knrjNKrAR6FvhlrKDXefZatTi4gQL49DQ-iZXRCzlTHNUUC7C41hexwztfrKC95y3MUHLnuTu1_AYnXO_DnoLeTfk0Nv3nH6DSuZYg02gGsLWCm_G9ogq35C3SnMsVZkIwTgL7PteX4ez0pOUxaY3FMgVicf79UqdhNbdd8UE-VybmZ0q0mscXV7zOlLQVRtGn07nPp7eZ722BviPkxoJ9T8Cc1JgwXGG_bKXGbldefHYQHqfyCRCzHkP8L0zGYzdKM4if3SJNhgZKR5yMb903XKnjeKG1tqANBnrfSFap2rLSLj027MIdlaQ58LQxrAP7Cd5-KwjW92jBC4pUwQrSEEcclumAJD4EFRXuE8qOVfJRUabeHdIHwocuhqS26PJr2CyTi9t7HPwMUJZjJpi_XJMQxGTAWp8m1Vk8ki4-xGd_ntepuZldl0yJT0MtXHwvTA" },
    {nome: "Francisco Valdevino Bezerra Neto", area: "Genética e melhoramento vegetal", email: "francisco.neto@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4701638T5" },
    {nome: "Gabriel Muller Valadão", area: "Meio ambiente", email: "gabriel.valadao@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4334857J9" },
    {nome: "Inácio Barbosa Borges", area: "Agropecuária", email: "inacio.borges@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4770435H7" },
    {nome: "Jean Carlo Laughton de Sousa", area: "Geografia", email: "jean.carlo@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/3091538167285259" },
    {nome: "Josué Reis Batista Junior", area: "Contabilidade", email: "josue.junior@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4477915Y0" },
    {nome: "Juliana Maria Nogueira Pereira", area: "Agropecuária", email: "juliana.nogueira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4761486U1" },
    {nome: "Lais Lorena Queiroz Moreira", area: "Agrárias", email: "lais.moreira@fnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4274352Z6&tokenCaptchar=03AOLTBLS5ey1VHI2uXhR9qPpdjcQN6hlFILTmSY1HcEb6rLJ8TyOAnLZkGel3j6q7soPVrrvCYZhRh2iDZtyIJ0CZuvN7BAhnu5-uYmRQAHh8QXV2XiXfpqrZJqvXcdx4c1G8YDJt0M_y1chN9K3JxgOwGED3_0aXNYiAqS1a0y3GS8D6HMG4UZd11iFTvTy2V1aCw1Lha8jJoVCPAYQTev5-l-mvP0zlmbwwpnDZbX0BQUAG-1xPtwujnPZAL0MpM4NmE6l1-yYW_wa38vyatnkfoSKK5kA5IYOM4XAfl6aJpMFKWXeEGFTBUwRVkpHsnLNC1YmP6AKHRDKz56UC2FRj0QZOg4icDTcXKSwCvekhRJUhqcYKkvoFXUJS9dn8eAdZXQzY528OimHqCq_Ni8dPXwEx2QvEMQe8ygQ7YMM_RF0KfGUJ_hIa9sIXfyfoD4j7LQcdWC2IEpMQwSYlQFP5dC05O_b68PL9vs2Kb76qAJVcHlOIPNCWKIFym8xt7CK8IVWXMuHMFMV2opYzkWA_XePtglt0rQ" },
    {nome: "Luana da Silva Botelho", area: "Agronomia/Fitopatologia", email: "luana.botelho@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4705381P3" },
    {nome: "Marcelino Gonçalves de Macedo", area: "Informática", email: "marcelino.macedo@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8143760H7&tokenCaptchar=03AOLTBLQvqXAACVGBAuIlkJ3m2UdnG9IIIv4nwXSVTTzAs7RttEd5nWsaf7cU1ei-x4G3KyotSkBo6vraRr4mVftklc0ZzDH_C5wH3wVEYiDx54ngRmPSRLiq-brPM47IiqhzQNra2XPPXcxqIZ7xDrrZtzZgBZaPnMoXEd4QBYZaHZAfJOFOBms7AX-EfZ33YB0xWA6WX1FX_4DfHPxlL7z5nqmJuZvw2pzYcGikAFrHUG_-XBAZgqSelwNhlQgGGf9wAfudoyG3kzYKfmYXOcxMyvUJWm2KrUxzvUqCNkvsGKDPz-IwzsbZF_EnTUcIUf5Gc9ozcmsq1gf6EGLr6YwFKhZVn2mFgng6MJHbegEizruL85VlLBZJE0Kyi9fjC6jShWwRkbrDzc41H8Iz5TUQdZoFooWVEEJ6Iw3B6SkR_j6NBHr5E9zpcy_U7H1FT06HTeBIZYncT17FAQMF_Vm_J8vET4MejaJoKYpdACvUzs2meLElp08txyP6cyMC-show_xRZx91dkbWMA68UCvn7wGTstuF-w" },
    {nome: "Marcelo Marcos Magalhães", area: "Biologia", email: "marcelo.magalhaes@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4551210E6" },
    {nome: "Maria Flávia Pereira Barbosa", area: "Língua Portuguesa", email: "maria.barbosa@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4775066Y1" },
    {nome: "Marina Gomes Tavares", area: "Informática", email: "marina.tavares@ifnmg.edu.br ", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8390277P6" },
    {nome: "Nadia Bueno Rezende", area: "Educação Física", email: "nadia.rezende@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4576673P9&tokenCaptchar=03AOLTBLRLHMKh_Z08KMOiuopKOoBr9zySc05K6cpa4vS8uxZ-bBDPeDWfb2sqHRG-Ba1iBYuOdH7T1C5hBcBcxNsNQ-6BB4uLTg084g38WYZnhfNKo4OTC8Bg-xGgxDnvYimgnf_se1WuAoknv0LEaJceFV8FZmm3HHyfazphTzEKSThbWDDy1eEhdeIlRvri_uM6FZcD7ied5nCE8PssxJ1NR8Xra-GGN2Ki_KAURvh9oZHqt_sABDOrM2n9zovWrMzxlFKZ8MF6_zsmjUqkDCj6TrggSsyayj_sSttAWOmnB-gYx44i4qPPrPkopY1QU9GTxR3z-vzZ77ofegfMryNZTHM1DwPXMbeKc4dfF8sT5WpPX90d2vpldvwPL9vuKlWEcAQ0ewmQSd2j870Gu0XXCGIb1P7ANNWYLUxDaXSOeU8OOuvuVYMYig0mOi6Y5iyrfnMKf4u5ogQawxWkXlWtmjnMWwL6wmzMcjFHdOsyIQgL5JcQoa8PiVsLVDDHXgmg-mUGAg9lIkRWadY-Fa6ZBu100mAVKw" },
    {nome: "Nestor Flaviano Madureira Barbosa", area: "Informática/Desenvolvimento de sistema/ Banco de dados", email: "nestor.barbosa@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4291166H5" },
    {nome: "Pablo Florentino Fróes Couto", area: "Direito", email: "pablo.couto@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4316888Z0" },
    {nome: "Pedro Augusto de Lima Bastos", area: "Língua Inglesa", email: "pedro.bastos@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8177561H6&tokenCaptchar=03AOLTBLRmvyGB82f3i2L0MP2_4F2Nc_gGV0pXfqk3M8iFp610EtFolbTNbNGEqT7wWnCPThm55KafkVlwgk6x-jM13ajGfqwrJ8dAvQKyuXp7HLbVIITFrkgvkZ-3te4j5EwDoM3Xe8PrbgzP_2UZXGchF28ZCwUv5I3thglrxx81akVygHfh4YUlgxeOW1F9PlWDGpXaansbzo869Wj-m_ejMuzfZ788CUPOxUf1lyVqx8PHW_z5CaZJb63dCzuqkgATtrtumJW0-TH-eVs8cyXmRk2j9S_ygZoNAn6EbtVJixQOshTCNLimGSWymktA3YlNuGQSQnvCnOQw0wKdgiHUytngzieYxFAdictArkrJnuix_OcMi_9DNtjQAAMWuBYsM8n-vGkpU0EmQ095bUuYD8fFmjYjDTzVziFRZaTZ5MIJCCoY6uHd6_gmqDglPYtT89Q0iv9wZd2MFqU-EUiu7aHtx7HCCuwM8rEvHN9_Y7CZPCfgz1piD5-aX_dSWAHKtNWUVNd9zYcEIpoAWYQ8YdGcN_raRw" },
    {nome: "Pedro Henrique Prado da Silva", area: "Educação Física", email: "pedro.silva@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/1544967904238877" },
    {nome: "Priscila Franco Binatto", area: "Biologia", email: "priscila.binatto@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4730910Y8" },
    {nome: "Reginaldo Proque", area: "Meio Ambiente", email: "reginaldo.proque@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4267435Z4" },
    {nome: "Renato Rodrigues de Oliveira", area: "Língua Portuguesa", email: "renato.rodrigues@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8099424Z2" },
    {nome: "Rildo Araújo Leite", area: "Secagem e armazenamento de grãos/ Sensoriamento remoto/ Geoprocessamento/ Ambiência e instalações rurais/Eletrificação rural/ Máquinas, Motores e implementos agrícolas/água na agricultura/ Saneamento ambiental rural", email: "rildo.leite@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4734446P7" },
    {nome: "Roberto Lúcio Corrêa de Freitas", area: "Administração/Contabilidade/Economia", email: "roberto.freitas@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4564640Z2" },
    {nome: "Ronaldo Porto Madureira", area: "Engenharia Agrícola", email: "ronaldo.madureira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4232235P3" },
    {nome: "Ronan Aparecido Valadares Santana", area: "Zootecnia", email: "ronan.valadares@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4771440A9" },
    {nome: "Rondinei Almeida da Silva", area: "Matemática", email: "rondinei.silva@ifnmg.edu.br", curriculo: "http://lattes.cnpq.br/8294412599274206" },
    {nome: "Valdeir Antônio da Silva", area: "Física", email: "valdeir.antonio@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4206062U5&tokenCaptchar=03AOLTBLSnVR8iu8t7g5MH19xHCLjsKtjSS1lbYcKfqqdyliOBfD3wzn5fb0js8Vb8lVl6IkIahqnZkjJxfToiHdMM1vgqAfNdywiLbvqeRbf27Y_ZZhnPo2J-nXFqmsVyQAH-7-rHCd_15L3CEVIvc436I9Wpf0Uu-t-eSsns_a8qgO2N7pQLKAw8WbKTxNuGUXNR9BGgsX1pl6g6uqzowXl4xQn3nrKXD2TNA8R0uRiKySf7A7jzBJTFCR8yEo1Pkgotr9WJBJr3knCXJQtNDBrS2ngon-F74b_L8j2A_kxm16R6R9-QePVOcaV_fb7ZsN1q6aJ166oY9A1GCf3dFj5OxXdyV_wgXiEW8ebt5nW5VGo6pDQx70lLPtMZ8bU6SQDAkbK4i50t62LSuStVyvLPB0JmVlZf4Ie5h5NyAdVAgfbcdEr5wW-Sdsv5ACBBl8W8lKviUyNW7uVZpAsm0lkjwhYVHlTP2wckQC_tr_TS50I-0RE5QnVVAzNwVsM9A4c5PVCw17iOFbbCq9PV_Gbh3By79iU9-g" },
    {nome: "Valdinice Ferreira Mota", area: "Administração", email: "valdinice.mota@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8289864Z6" },
    {nome: "Willian Antonio Gonçalves", area: "Informática", email: "willian.goncalves@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4424729D8" },
    {nome: "Wilson Prates de Oliveira", area: "Informática", email: "wilson.oliveira@ifnmg.edu.br", curriculo: "http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4177571D1&tokenCaptchar=03AOLTBLRFP1-2kkVQmw0Svgh3cQlqzkQV1pAzuEIsX9-1LzWmkvy0CsX8kR_svevtGid3uFzVO7JkWRaEUq7HrMOPjn9keAlGvrxQDPl0FBD74-grmSSY8a8UOG_NZo2VpXfg5L8GxhtkBqMXWFWPG6gxyHmoK6j2Yjucj-ck04n_xxoc7T-shgETD24gwmcgT1_4ae-dHcqcaha9cykl--lvw4lCIkIi426PMcs0ds1caNF457Z44Ir3WATCQNLj9WkwYMv9mWqUsoKhiy-Kb7Tn3jvUmTYS0vLTQNOk0P_V8HsNcM8xWp-nRorWmU-K_nIoGcKjsrEGymFQgVBe4Ff6EsysPQYMHvRkLqlzt6glqvUD8QNOTm4J3nAe0PZ_4ET815QfSZQEnyrQzwSMTvHY9pMeu3lESiCwfasaZVWE1Dm1VyU34v1DNwHlIdcPxSs9bvMY3CqWkCgIshD-ImgKYyFR42PSICgFUjb5Clp18KN4dt6ZPi4BpJd5s7tw0UJmsYe51CODFAcFk76LmnCGz7bvbd9m_Q" },
]


const contatos_horarios_servidores_e_professores = async () => {

    // ADICIONANDO NO FIRESTORE OS CONTATOS
    contatos.forEach(async contato => {

        await firebase.firestore().collection('contatos').doc(contato.id).set(
            contato
       )
       .then(()=>{
        console.log(`Contato do(a) ${contato.id}} adicionado com sucesso!`)
      })

    })

    console.log("////////////////////////////////")

    //ADICIONANDO NO FIRESTORE OS HORARIOS DA TURMA
    horario.forEach(async horario => {

        await firebase.firestore().collection('horarios').doc(horario.nome).set(
            horario
       )
       .then(()=>{
            console.log(`Horario da turma de ${horario.nome}} adicionado com sucesso!`)
        })

    })

    console.log("////////////////////////////////")

    //ADICIONANDO NO FIRESTORE OS SERVIDORES DO IFNMG
    servidoresAdministrativos.forEach(async administrativos => {

        await firebase.firestore().collection('administrativos').doc(administrativos.nome).set(
            administrativos
       )

       .then(()=>{
            console.log(`Servidores do IFNMG ${administrativos.nome}} adicionado com sucesso!`)
        })

    })
    
    console.log("////////////////////////////////")
    
    //ADICIONANDO NO FIRESTORE OS PROFESSORES DO IFNMG
    servidoresDocente.forEach(async docente => {
        await firebase.firestore().collection('docentes').doc(docente.nome).set(
            docente
       )

       .then(()=>{
            console.log(`Professores do IFNMG ${docente.nome} adicionado com sucesso!`)
        })
    })
    
}


export default contatos_horarios_servidores_e_professores;