const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const arrQuizzes = [];
const idQuizzes = [];
let arrAPI = [];
let quizzId;
let respostasCorretas = {};
let qtdPerguntas = 0;

// TRAZENDO OS QUIZZES DA API

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
    
    document.querySelector(".tela1").classList.add("escondido"); 
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
    while (i < questions.length - 1) {
        const opcao = document.querySelector(`.pergunta${i}`).parentElement.querySelectorAll(".resposta");
        console.log(opcao)
        for (let item of opcao) {
            if (item.classList.includes(".certo") && !item.classList.includes(".nao-selecionado")) {
                acertosUsuario += 1;
            }
        }
        i++
    }
    const levelUsuario = (acertosUsuario / i) * 100;
    console.log("levelUsuario: ", levelUsuario)


    //adicionando o texto da API
    const level = perguntas.data.levels;
    const tituloFinal = document.querySelector(".finalizar-top");
    const imgFinal = document.querySelector(".finalizar-content");
    const textoFinal = document.querySelector(".finalizar-texto");

    console.log(level)
    for (let i = 0; i < level.length; i++) {
        if (levelUsuario > level[i].minValue) {

        } else {
            tituloFinal.innerHTML = level[i].title;
            imgFinal.innerHTML = level[i].image;
            textoFinal.innerHTML = level[i].text;
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

function telaCriarQuizz() {
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela3-1").classList.remove("escondido");
}


// CRIANDO O QUIZ
  
let titulo = null;
let imagem = null;
let numeroPerguntas = null;
let numeroNiveis = null;
let checar = null;
let object = {
    title: "",
    image: "",
    questions: [],
    levels: []
    };

// verficações

function checkHex(str) {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
    return regex.test(str);
}

function checkUrl(str) {
    let regex = /apng|avif|gif|jpeg|jpg|png|svg|webp|bmp|ico|tiff/
    if (regex.test(str)) return true
    return false
}
 
//

function pegarInformaçõesBasicas() {
    titulo = document.querySelector("#inputTitulo").value;
    imagem = document.querySelector("#inputImagem").value;
    numeroPerguntas = document.querySelector("#inputPerguntas").value;
    numeroNiveis = document.querySelector("#inputNiveis").value;
    
    let ehImagem = checkUrl(imagem);
    
    if (numeroNiveis >= 2 && numeroPerguntas >= 3 && titulo.length > 20 && titulo.length < 65 && ehImagem) {

        object.title = titulo;
        object.image = imagem;
    
        document.querySelector(".tela3-1").classList.add("escondido");
        document.querySelector(".tela3-2").classList.remove("escondido");
    
        mostrarPerguntas();
    
        window.scrollTo(0, 0);

    } else {
        alert("Parâmetro inválido. Tente novamente!");
    }
}

function mostrarPerguntas() {
  
    for (let i = 1; i <= numeroPerguntas; i++) {
        document.querySelector(".tela3-2").innerHTML += `
          <div class= "clicar" data-identifier="expand" onclick ="abrirPergunta(${i})">
              <h2>Pergunta ${i}</h2>
              <ion-icon class="abrirDiv" name="create-outline"></ion-icon>
          </div> 
          <div class="question${i} escondido">
              <ul class="questao1" data-identifier="question">
                  <input id="${i}-question" type="text" placeholder="Texto da pergunta">
                  <input id="${i}-color" type="text" placeholder="Cor de fundo da pergunta">
                  <h3>Resposta correta</h3>
                  <input id="${i}-correct-answer" type="text" placeholder="Resposta correta">
                  <input id="${i}-correct-url" type="url" placeholder="URL da imagem correta">
                  <h3>Respostas incorretas</h3>
                  <input id="${i}-wrong-answer1" type="text" placeholder="Texto da pergunta">
                  <input id="${i}-wrong-url1" type="url" placeholder="URL da imagem 1">
                  
                  <input id="${i}-wrong-answer2" id="input_11" type="text" placeholder="Texto da pergunta">
                  <input id="${i}-wrong-url2" type="url" placeholder="URL da imagem 2">
                  
                  <input id="${i}-wrong-answer3" type="text" placeholder="Texto da pergunta">
                  <input id="${i}-wrong-url3" type="url" placeholder="URL da imagem 3">
              </ul>
          </div>`;
    }
    document.querySelector(".tela3-2").innerHTML += `
            <div class="botaoVermelho"> 
                <button onclick="checarPerguntas()"> Prosseguir para criar níveis </button>
            </div>`;
  }
  
function abrirPergunta(i) {
    const question = document.querySelector(`.question${i}`);
    question.classList.toggle("escondido");
}

function validarPerguntas(i) {
  
    let objetoPergunta = {
        title: "",
        color: "",
        answers: []
    };
    let objetoPerguntaCorreta = {
        text: "",
        image: "",
        isCorrectAnswer: true
    };
    let objetoPerguntaErrada1 = {
        text: "",
        image: "",
        isCorrectAnswer: false
    };
    let objetoPerguntaErrada2 = {
        text: "",
        image: "",
        isCorrectAnswer: false
    };  
    let objetoPergunta3 = {
        text: "",
        image: "",
        isCorrectAnswer: false
    };
  
let textQuestion = document.getElementById(`${i + 1}-question`).value;
let backgroundColor = document.getElementById(`${i + 1}-color`).value;
let correctAnswer = document.getElementById(`${i + 1}-correct-answer`).value;
let correctUrl = document.getElementById(`${i + 1}-correct-url`).value;
let wrongAnswer1 = document.getElementById(`${i + 1}-wrong-answer1`).value;
let wrongUrl1 = document.getElementById(`${i + 1}-wrong-url1`).value;
let wrongAnswer2 = document.getElementById(`${i + 1}-wrong-answer2`).value;
let wrongUrl2 = document.getElementById(`${i + 1}-wrong-url2`).value; 
let wrongAnswer3 = document.getElementById(`${i + 1}-wrong-answer3`).value;
let wrongUrl3 = document.getElementById(`${i + 1}-wrong-url3`).value;
  
objetoPergunta.title = textQuestion;
objetoPergunta.color = backgroundColor;
objetoPerguntaCorreta.text = correctAnswer;
objetoPerguntaCorreta.image = correctUrl;
objetoPergunta.answers.push(objetoPerguntaCorreta);
objetoPerguntaErrada1.text = wrongAnswer1;
objetoPerguntaErrada1.image = wrongUrl1;
objetoPergunta.answers.push(objetoPerguntaErrada1);  
objetoPerguntaErrada2.text = wrongAnswer2;
objetoPerguntaErrada2.image = wrongUrl2;
objetoPergunta.answers.push(objetoPerguntaErrada2); 
objetoPergunta3.text = wrongAnswer3;
objetoPergunta3.image = wrongUrl3;
objetoPergunta.answers.push(objetoPergunta3);
object.questions.push(objetoPergunta);
    
checar = (textQuestion.length > 20 && textQuestion.length !== "") &&
(checkHex(backgroundColor)) &&
(correctAnswer !== "") &&
(checkUrl(correctUrl)) &&
(wrongAnswer1 !== "" || wrongAnswer2 !== "" || wrongAnswer3 !== "") &&
(checkUrl(wrongUrl1) || checkUrl(wrongUrl2) || checkUrl(wrongUrl3)) === true;
return checar;
}
  
function checarPerguntas() {
    let validar = true;
  
for (let i = 0; i < numeroPerguntas; i++) {
    let validarAtual = validarPerguntas(i);
    validar = validar && validarAtual;
}
  
if (checar && object.questions.length == numeroPerguntas && validar) {
    mostrarNiveis();
    document.querySelector(".tela3-2").classList.add("escondido");
    document.querySelector(".tela3-3").classList.remove("escondido");
    window.scrollTo(0, 0);
} else {
    alert("Parâmetro inválido. Tente novamente!");
    object.questions = [];
    }
}
  
function mostrarNiveis() {
    for (let i = 1; i <= numeroNiveis; i++) {
      document.querySelector(".tela3-3").innerHTML += `
          <div class= "clicar" data-identifier="expand" onclick ="abrirNivel(${i})">
              <h2>Nível ${i}</h2>
              <ion-icon class="abrirDiv" name="create-outline"></ion-icon>
          </div> 
          <div class = "levels${i} escondido">
          <ul class="nivel1" data-identifier="level">
              <input id="${i}-Tittle_level" type="text" placeholder="Título do nível" >
              <input id="${i}-minimum_Hits" type="number" placeholder="% de acerto mínima" >
              <input id="${i}-levelUrl" type="url" placeholder="URL da imagem">
              <textarea id="${i}-LevelDescription" wrap="hard" placeholder="Descrição do nível" ></textarea>
          </ul>
          </div>`;
    }
    document.querySelector(".tela3-3").innerHTML += `
            <div class="botaoVermelho"> 
                <button onclick="validarNiveis()"> Finalizar Quizz </button>
            </div>
            `;
  
    document.getElementById("minimo").placeholder = "O nível 1 deve ser igual a 0";
}
  
function abrirNivel(i) {
    document.querySelector(`.levels${i}`).classList.toggle("escondido");
}
  
function validarNiveis() {
    object.levels = [];
  
    for (let i = 0; i < numeroNiveis; i++) {
    let objetoNiveis = {
        title: "",
        image: "",
        text: "",
        minValue: ""
    };
  
    let LevelTittle = document.getElementById(`${i + 1}-Tittle_level`).value;
    let MinimunHits = document.getElementById(`${i + 1}-minimum_Hits`).value;
    let levelUrl = document.getElementById(`${i + 1}-levelUrl`).value;
    let LevelDescription = document.getElementById(`${i + 1}-LevelDescription`).value;
  
    objetoNiveis.title = LevelTittle;
    objetoNiveis.image = levelUrl;
    objetoNiveis.text = LevelDescription;
    objetoNiveis.minValue = parseInt(MinimunHits);
    object.levels.push(objetoNiveis);
  
    if (
        (LevelTittle.length > 10 && LevelTittle !== "") &&
        (parseInt(MinimunHits) >= 0 && parseInt(MinimunHits) <= 100) &&
        (checkUrl(levelUrl)) &&
        (LevelDescription.length > 30 && LevelDescription !== "")
    ) {
    } else {
        alert("Parâmetro inválido. Tente novamente!");
        break;
      }
    }
  
    if (parseInt(document.getElementById("minimo").value) !== 0) {
      alert("O nivel 1 deve ser igual a 0 e os demais em ordem crescente de valor");
    } else {
      sucesso();
      document.querySelector(".tela3-3").classList.add("escondido");
      document.querySelector(".tela3-4").classList.remove("escondido");
      window.scrollTo(0, 0);
      postQuizz();
    }
  }
  
function sucesso() {
    document.querySelector(".tela3-4").innerHTML += 
    `<ul class="telaSucesso" style="background-image: url('${imagem}')">
        <span>${titulo}</span>
    </ul>
    <div class="botaoVermelho"> 
        <button onclick="acessarQuizzCriado()"> Acessar Quizz </button>
    </div>`;
}

function limparPergunta() {
    for (let i = 0; i < numeroPerguntas; i++) {
      object.questions[i].answers = object.questions[i].answers.filter(function (
        item
      ) {
        return item.title !== "" && item.image !== "";
      });
    }
}
  
function postQuizz() {
    limparPergunta();
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", object);
  
    promise.then(postValido);
    promise.catch(postInvalido);
}
  
function postValido(response) {
    salvarDados(response);
}
  
function postInvalido(erro) {
    const statusCode = erro.response.data;
    console.log(statusCode);
    alert("Deu ruim");
}

function salvarDados(response) {
    var meusQuizzes = JSON.parse(localStorage.getItem("meusQuizzes") || "[]");
  
    meusQuizzes.push({
      id: response.data.id,
      title: response.data.title,
      background_image: response.data.image
    });
  
    localStorage.setItem("meusQuizzes", JSON.stringify(meusQuizzes));
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
    document.querySelector(".tela1").classList.remove("escondido");
    document.querySelector(".telaDois").classList.add("escondido");
}



