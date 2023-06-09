//Variáveis da Bolinha
let xBolinha = 300, yBolinha = 200, diametro = 13, 
    velocidadeXBolinha = 6, velocidadeYBolinha = 6,
    raio = diametro / 2;

//Variáveis da Raquete
let xRaquete = 5, yRaquete = 150, raqueteComprimento = 10, 
    raqueteAltura = 90;

//Variáveis do Oponente
let xRaqueteOponente = 585, yRaqueteOponente = 150,
    velocidadeYOponente;

//Ajustando dificuldade oponente
let chanceErrar = 0;

//Variável de colisão
let colidiu = false;

//Placar do jogo
let meusPontos = 0, pontosOponente = 0;

//Sons do jogo
let raquetada, ponto, trilha;

//Carregando os sons
function preload() {
  trilha = loadSound("./sounds/trilha.mp3");
  ponto = loadSound("./sounds/ponto.mp3");
  raquetada = loadSound ("./sounds/raquetada.mp3");
}

//Criando o campo
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Desenhando e executando
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();  
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha  *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }

    //Limitando a raquete a borda do jogo
    yRaquete = constrain(yRaquete, 10, 300);
}

function verificaColisaoRaquete(){
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha  *= -1;
      raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceErrar;

    //Limitando a raquete a borda do jogo
    yRaqueteOponente = constrain(yRaqueteOponente, 10, 300);
  
    //Calculando chance de errar
    calculaChanceErrar();

  
//Variáveis multiplayer
//    if (keyIsDown(87)) {
//        yRaqueteOponente -= 10;
//    }
//    if (keyIsDown(83)) {
//        yRaqueteOponente += 10;
//    }

//    //Limitando a raquete a borda do jogo
//    yRaqueteOponente = constrain(yRaqueteOponente, 10, 300);
 
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if(xBolinha > 590){
    meusPontos++;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente++;
    ponto.play();
  }
}

function calculaChanceErrar() {
  if (pontosOponente >= meusPontos) {
    chanceErrar += 1
    if (chanceErrar >= 39){
    chanceErrar = 40
    }
  } else {
    chanceErrar -= 1
    if (chanceErrar <= 35){
    chanceErrar = 35
    }
  }
}