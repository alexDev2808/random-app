
const btnStart = document.getElementById('btn-start')
const containerStart = document.getElementById('container-start')
const containerContent = document.getElementById('container-content')
const btnGirar = document.getElementById('girar-btn')
const wishlistContainer = document.getElementById('wishlist-container')
const showResultContainer = document.getElementById('show-result')
const showResultText = document.getElementById('result-text')
const btnVolverSortear = document.getElementById('btn-resortear')

const ruletaContainer = document.getElementById('ruleta-container')

var canvas = document.getElementById("canvas");


const wishlist = [
  '- Esponjas para baño',
  '- Toallas de baño',
  '- Baberos de tela y plásticos',
  '- Ropita de 1 mes en adelante',
  '- Toallitas para rostro',
  '- Talco de bebé -menen',
  '- Fular',
  '- Juguetes de bebé',
  '- Toallitas húmedas',
  '- Pañales de recién nacido y en adelante',
  '- Sabanas para cuna',
  '- Jabón neutro para bebe',
  '- Shampoo para bebe (ricitos de oro)',
  '- Cobijitas para bebe'
];

const seleccionados = [];

const time = 4000

function revolverLista() {
  wishlist.sort(() => Math.random() - 0.5)
}

function obtenerLista() {
  wishlistContainer.innerHTML = ''
  revolverLista()
  wishlist.forEach( item => {
    const listItem = document.createElement('div')
    listItem.classList.add('list-group-item','text-center', 'fw-bold')
    listItem.innerText = item
    wishlistContainer.appendChild(listItem)
  })
}


function seleccionar() {
    return Math.round(Math.random() * ( wishlist.length - 1 ));
}

function obtenerElemento(index) {

    const elemento = wishlist[index];
    seleccionados.push(elemento);
    wishlist.splice(index,1)
    revolverLista()
    return elemento
}

function showResult(seleccionado) {

    showResultContainer.classList.remove('d-none')
    showResultText.innerText = seleccionado

    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
}

function showSweet() {
    const seleccionado = obtenerElemento(seleccionar())
    Swal.fire({
        title: "Girando..... Sorteando.....",
        width: 600,
        padding: "3em",
        color: "#716add",
        timer: 2000,
        timerProgressBar: true,
        background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
      
      obtenerLista()
      console.log(seleccionado);
      
      setTimeout(() => {
        showResult(seleccionado)
      },2000)
    
}

function volverASortear() {
  showResultContainer.classList.add('d-none')
}

function startApp() {
  unicornios()
  containerStart.classList.add('d-none')
  containerContent.classList.remove('d-none')

  obtenerLista()
}

function showRuleta() {
  const seleccionado = obtenerElemento(seleccionar())

  ruletaContainer.classList.remove('v-ruleta')
  spin()

  obtenerLista()
  
  setTimeout(() => {
    ruletaContainer.classList.add('v-ruleta')
    showResult(seleccionado)
  },time)
}

function unicornios() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });
  
    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ["emoji"],
      shapeOptions: {
        emoji: {
          value: ["🦄", "🌈"],
        },
      },
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

btnStart.addEventListener('click', startApp )
btnGirar.addEventListener('click', showRuleta )
btnVolverSortear.addEventListener('click', volverASortear)


var options = ['- Esponjas para baño',
  '- Toallas de baño',
  '- Baberos de tela y plásticos',
  '- Ropita de 1 mes en adelante',
  '- Toallitas para rostro',
  '- Talco de bebé -menen',
  '- Fular',
  '- Juguetes de bebé',
  '- Toallitas húmedas',
  '- Pañales de recién nacido y en adelante',
  '- Sabanas para cuna',
  '- Jabón neutro para bebe',
  '- Shampoo para bebe (ricitos de oro)',
  '- Cobijitas para bebe'
];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;


function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;
  
  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;
  
  return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1500;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index]
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();