const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const arrQuizzes = [];
const idQuizzes = [];
let quizzTitle;

function pegarQuizzes() {
    const promise = axios.get(`${URL_API}/quizzes`);
    promise.then(renderizarQuizzes);
    promise.catch(erroPegarQuizzes); 
}

function renderizarQuizzes(resposta) {
    console.log(resposta.data);
    const containerQuizz = document.querySelector(".containerImagens");
    for (let i = 0; i < resposta.data.length; i++) {
        idQuizzes.push(resposta.data[i].id); 
        arrQuizzes.push(resposta.data[i].title);
        containerQuizz.innerHTML += `
            <div class="top2" onclick="acessarQuizz(this)"> 
                    <img src="${resposta.data[i].image}" class="imagemQuizz"> 
                <div class="tituloQuizz" > 
                    ${resposta.data[i].title} 
                </div>
            </div> `
    }
}

pegarQuizzes();

function erroPegarQuizzes() {
    alert("Erro na coleta de dados da API. Tente novamente.");
}

function acessarQuizz(quizzTitle) {
    
    const tituloQuizz = quizzTitle.querySelector(".tituloQuizz").textContent;
    console.log(tituloQuizz);
    let idQuizz; 
    let i = 0;

    while (i < arrQuizzes.length) {

        if (arrQuizzes[i] === tituloQuizz) {
            
            idQuizz = idQuizzes[i];
            
        }
        i++;
    }
    
    
    let promise = axios.get(`${URL_API}/quizzes/8023`);
    promise.then(mostrarTelaQuizz);
    promise.catch(erroAcessarQuizz);
}

function mostrarTelaQuizz(perguntas) {
    
    document.querySelector(".telaUm").classList.add("escondido");
    document.querySelector(".telaDois").classList.remove("escondido");

    //html do quizz
    const paginaQuizz = document.querySelector(".perguntas");
    paginaQuizz.innerHTML =  
    `<div class="página quizz">
        <div class="top">
            <img src="${perguntas.image}" />
            <div class="titulo-quizz">${perguntas.title}</div>
        </div>
    
        <div class="conteudo-perguntas">
        </div>
    </div>`;

    const perguntaQuizz = document.querySelector(".conteudo-perguntas");
    for (let i = 0; i < perguntas.questions.length; i++ ) {
        perguntaQuizz.innerHTML += `
        <div class="perguntas">

        <div class="pergunta">${perguntas.questions.title}</div>
        <div class="respostas">`

        for (let i = 0; i < perguntas.questions.answers.length; i++ ) {
            `<div class="resposta">
                <img src="${perguntas.questions.answers.image}"/>
                <div class="resposta-texto">${perguntas.questions.answers.text}</div>         
            </div>`
        }   
        `</div>
        </div>`
    }
    

}

function erroAcessarQuizz(erro) {
    alert("Erro ao acessar quizz. Tente novamente.");
    console.log(resposta.data.erro);
}

`

    



    <div class="pergunta">Qual o sobrenome do Harry?</div>
    <div class="respostas">
        <div class="resposta">
            <img src="https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-cinemark-reexibe-harry-potter.jpg"/>
            <div class="resposta-texto">Styles</div>        
        </div>
        <div class="resposta">
            <img src="https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-cinemark-reexibe-harry-potter.jpg"/>
            <div class="resposta-texto">Styles</div>
        </div>
        <div class="resposta">
            <img src="https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-cinemark-reexibe-harry-potter.jpg"/>
            <div class="resposta-texto">Styles</div>
        </div>
        <div class="resposta">
            <img src="https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-cinemark-reexibe-harry-potter.jpg"/>
            <div class="resposta-texto">Styles</div>
        </div>
    </div>`
