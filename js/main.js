// Word
let words = document.querySelectorAll(".word");

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let netWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    netWord.style.opacity = "1";
    Array.from(netWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 5000);


/////Active Menu

// Selecionar os elementos do menu e seções
const menuLinks = document.querySelectorAll('header ul li a');
const sections = document.querySelectorAll('section');

// Função para verificar qual seção está visível e atualizar o menu
function updateActiveMenu() {
    const scrollY = window.scrollY;

    // Iterar pelas seções para encontrar a seção visível atual
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;

        if (scrollY >= sectionTop - 97 && scrollY < sectionBottom) {
            // Remova a classe 'active' de todos os itens do menu e adicione à seção atual
            menuLinks.forEach(item => item.classList.remove('active'));
            menuLinks[index].classList.add('active');
        }
    });
}

// Chame a função para definir o estado inicial do menu
updateActiveMenu();

// Adicione um ouvinte de evento de rolagem para atualizar o menu durante a rolagem
window.addEventListener('scroll', updateActiveMenu);


// sticky navbar

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", this.window.scrollY > 50)
})



///////Selecionar elementos do DOM
const menuIcon = document.querySelector("#menu-icons");
const navList = document.querySelector(".navlist");
const navLinks = document.querySelectorAll(".navlist a");

// Função para alternar o ícone do menu e mostrar/ocultar a lista de navegação
function toggleNav() {
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
}

// Adicionar evento de clique ao ícone do menu
menuIcon.addEventListener("click", toggleNav);

// Adicionar evento de clique aos links de navegação para fechar o menu
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuIcon.classList.remove("bx-x");
        navList.classList.remove("open");
    });
});

// Fechar o menu quando ocorre um clique em qualquer lugar da janela
window.addEventListener("click", (event) => {
    if (!menuIcon.contains(event.target) && !navList.contains(event.target)) {
        menuIcon.classList.remove("bx-x");
        navList.classList.remove("open");
    }
});

// Impedir o evento de clique no menu de propagar para a janela
menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Fechar o menu quando a janela é redimensionada
window.addEventListener("resize", () => {
    menuIcon.classList.remove("bx-x");
    navList.classList.remove("open");
});

// parallax

const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("show-items", entry.isIntersecting);
    });
};

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

const observer = new IntersectionObserver(handleIntersection, options);

const elementsToObserve = document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top");

elementsToObserve.forEach((element) => {
    observer.observe(element);
});

// Alterar tema remove/add a classe dark
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggle.addEventListener("click", function () {
        // Alterne a classe "dark-theme" no corpo
        body.classList.toggle("dark-theme");
    });
});

// Altera as img para o tema dark

document.addEventListener("DOMContentLoaded", function () {
    const botaoTrocarImagem = document.getElementById("theme-toggle");
    const imagensVisiveis = document.querySelectorAll("#imagemVisivel");
    const imagensOcultas = document.querySelectorAll("#imagemOculta");

    botaoTrocarImagem.addEventListener("click", function () {
        // Itera por todas as imagens visíveis e alterna a visibilidade delas
        imagensVisiveis.forEach(function (imagemVisivel, index) {
            if (imagemVisivel.style.display === "block" || imagemVisivel.style.display === "") {
                imagemVisivel.style.display = "none";
                imagensOcultas[index].style.display = "block";
            } else {
                imagemVisivel.style.display = "block";
                imagensOcultas[index].style.display = "none";
            }
        });
    });
});



// Carrocel

// You can change global variables here:
var radius = 180; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  // Apply the angle
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

// document.onmousewheel = function(e) {
//   e = e || window.event;
//   var d = e.wheelDelta / 20 || -e.detail;
//   radius += d;
//   init(1);
// };
