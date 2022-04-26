const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz";
const arrQuizzes = [];
const idQuizzes = [];
let quizzTitle;

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
    
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela2").classList.remove("escondido");   

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

function telaCriarQuizz() {
    document.querySelector(".tela1").classList.add("escondido");
    document.querySelector(".tela3-1").classList.remove("escondido");
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