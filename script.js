const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const arrQuizzes = [];
const idQuizzes = [];
let quizzId;

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
        containerQuizz.innerHTML += `
            <div class="top2" onclick="acessarQuizz(this)"> 
                    <div class="id escondido">${resposta.data[i].id}</div>
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

function acessarQuizz(quizzId) {
    
    const idQuizz = quizzId.querySelector(".id").textContent;
    console.log(idQuizz);
    
    let promise = axios.get(`${URL_API}/quizzes/${idQuizz}`);
    promise.then(mostrarTelaQuizz);
    promise.catch(erroAcessarQuizz);
}

function mostrarTelaQuizz(perguntas) {

    document.querySelector(".telaUm").classList.add("escondido");
    document.querySelector(".telaDois").classList.remove("escondido");

    const respostasCorretas = {};

    //html do quizz
    const paginaQuizz = document.querySelector(".conteudo-quizz");
    const title = perguntas.data.title;
    const image = perguntas.data.image;
    console.log(perguntas.data)

    //titulo do quizz
    paginaQuizz.innerHTML =  
    `<div class="página-quizz">
        <div class="top">
            <img src="${image}" />
            <div class="titulo-quizz">${title}</div>
        </div>
    
        <div class="conteudo-perguntas">
        </div>
    </div>`;

    //questões
    const questions = perguntas.data.questions;
    for (let i = 0; i < questions.length; i++) {
        //fazendo html só com as respostas
        const respostas = randomizar.shuffle(questions[i].answers);
        let respostasHTML = "";
        for (let j = 0; j < respostas.length; j++) {
            if (respostas[j].isCorrectAnswer) {
                respostasCorretas[i] = j;
            }
            const texto = respostas[j].text;
            const img = respostas[j].image;
            respostasHTML += `
            <div class="resposta" onclick="verificaResposta(${i}, ${j})">
                <img src="${img}"/>
                <div class="resposta-texto">${texto}</div>
            </div>`
        }

        //perguntas 
        const title = questions[i].title;
        const perguntaQuizz = document.querySelector(".conteudo-perguntas");
        perguntaQuizz.innerHTML += `
            <div class="perguntas">

                <div class="pergunta ${i}">${title}</div>
                <div class="respostas">
                ${respostasHTML}
                </div>
            </div>`;
    }

    function verificaResposta(idPergunta, idResposta) {
        const pergunta = document.querySelector(`pergunta ${i}`).querySelectorAll(".resposta");
        for (let i = 0; i < pergunta.length; i++) {
            pergunta[i].removeAttribute("onclick");
            if (i !== idResposta) {
                pergunta[i].classList.add("nao-selecionado");
            }
            if (respostasCorretas[idPergunta] == i){
                pergunta[i].classList.add("certo");
            } else {
                pergunta[i].classList.add("errado");
            }
        }
    }

}




function erroAcessarQuizz(erro) {
    alert("Erro ao acessar quizz. Tente novamente.");
    console.log(resposta.data.erro);
}


//respostas serem aleatórias
const randomizar = {
    shuffle(array) {
        let currentIndex = array.length,
          randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      },
};

