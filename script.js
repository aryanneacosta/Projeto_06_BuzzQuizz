const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const arrQuizzes = [];
const idQuizzes = [];
let arrAPI = [];
let quizzId;
let respostasCorretas = {};
let qtdPerguntas = 0;

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



function verificarResposta(idPergunta, idResposta) {
    const respostas = document.querySelector(`.pergunta${idPergunta}`).parentElement.querySelectorAll(".resposta");
    for (let i = 0; i < respostas.length; i++) {
        
        respostas[i].removeAttribute("onclick");
        if (i !== idResposta) {
            respostas[i].classList.add("nao-selecionado");
        }
        if (respostasCorretas[idPergunta] == i) {
            respostas[i].classList.add("certo");
        } else {
            respostas[i].classList.add("errado");
        }
    }
    console.log(respostas)


    //verificar se todas as perguntas estão respondidas
    console.log(idPergunta)
    console.log(qtdPerguntas)
    
    if (idPergunta + 1 === qtdPerguntas) {
        finalizarQuizz();
    }
   



    //rolar para a próxima pergunta 
    // const proximaPergunta = document.querySelector("onclick");   
    // console.log(respostas.classList.contais("nao-selecionado")); 
    // setTimeout(
    //     proximaPergunta.scrollIntoView()
    //     , 2000);



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
            <div class="resposta" onclick="verificarResposta(${i}, ${j})">
                <img src="${img}"/>
                <div class="resposta-texto">${texto}</div>
            </div>`
            console.log(respostas[j].isCorrectAnswer);
            console.log(respostasCorretas);
        }

        //perguntas 
        const title = questions[i].title;
        const color = questions[i].color;
        const perguntaQuizz = document.querySelector(".conteudo-perguntas");
        perguntaQuizz.innerHTML += `
            <div class="perguntas">
                <div class="pergunta pergunta${i}" style="background-color: ${color};">${title}</div>
                <div class="respostas">
                ${respostasHTML}
                </div>
            </div>`;

        qtdPerguntas += 1;
        console.log(qtdPerguntas)
    }

    //calcular o level do usuário
    let acertosUsuario = 0;
    let i = 0;
    while (i < questions.length) {
        const opcao = document.querySelector(`.pergunta${i}`).parentElement.querySelectorAll(".resposta");
        if (opcao.classList.contains(".certo")) {
            acertosUsuario += 1;
        }
        i++
    }
    const levelUsuario = (acertosUsuario / i) * 100;
    console.log(levelUsuario)


    //adicionando o texto da API
    const level = perguntas.data.levels;
    const tituloFinal = document.querySelector(".finalizar-top");
    const imgFinal = document.querySelector(".finalizar-content");
    const textoFinal = document.querySelector(".finalizar-texto");

    for (let i = 0; i < level.length; i++) {
        if (levelUsuario > level.minValue) {

        } else {
            tituloFinal.innerHTML = level.title;
            imgFinal.innerHTML = level.image;
            textoFinal.innerHTML = level.text;
        }
    }
}


//finalizar quizz
function finalizarQuizz() {
    const levelFinal = document.querySelector(".finalizar");
    levelFinal.classList.remove("escondido");
    const botoesFinal = document.querySelector(".finalizar-botoes");
    botoesFinal.classList.remove("escondido");
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

//voltar para a home pelo header
function home() {
    document.querySelector(".telaUm").classList.remove("escondido");
    document.querySelector(".telaDois").classList.add("escondido");
}



