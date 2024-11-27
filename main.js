//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0; 
let temporizador = false;
let timer = 30;
let timerInicial = timer;
let tiempoRegresivoID = null;

//audios
let victoryAudio = new Audio('./sounds/victory.mp3');
let clickAudio = new Audio('./sounds/click.wav');
let loseAudio = new Audio('./sounds/game over.mp3');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');
let ambienceAudio = new Audio('./sound/ambience.mp3');
let youLoseAudio = new Audio('./sound/youLose.mp3')


//apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante')


//randomizar
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(function(){return Math.random() - 0.3});

//funciones
function contarTiempo(){
    tiempoRegresivoID = setInterval(() => {
        mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
        timer--;
        //derrota
        if (timer == 0){
            clearInterval(tiempoRegresivoID);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000, timer);
}

function bloquearTarjetas(numeros){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true; 
    }

    if(tarjetasDestapadas == 0){
        //mostrar el primer numero
        let tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //desabilitar primer boton
        tarjeta1.disabled = true;
        tarjetasDestapadas++; 

        primerID = id;

    }else if(tarjetasDestapadas == 1){
        //mostrar segundo numero
        let tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        //desabilitar el segundo boton
        tarjeta2.disabled = true;
        tarjetasDestapadas++;

        segundoID = id;

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            //encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;    
            rightAudio.play();
        }else{
            wrongAudio.play();
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1 = document.getElementById(primerID)
                tarjeta2 = document.getElementById(segundoID)
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },500);
        }
    }
//victoria
 if(aciertos == 8){
    victoryAudio.play();
    clearInterval(tiempoRegresivoID);
    mostrarAciertos.innerHTML = `tuviste ${aciertos} aciertos, Buena crack!!`
     mostrarTiempo.innerHTML = `En solo ${timerInicial - timer} segundos`
     mostrarMovimientos.innerHTML = `Lo hiciste en ${movimientos} movimientos, GG!!` 
    }  
}