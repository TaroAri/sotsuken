const correctCount = JSON.parse(sessionStorage.getItem('correctCount'));
document.querySelector('.score__num').textContent = correctCount;

let sectionCount = Number(sessionStorage.getItem('sectionCount'));
let nextSection = Number(sessionStorage.getItem('nextSection'));
console.log("nextS: " + nextSection);

console.log("section: " + sectionCount);
let nextCount = Number(sessionStorage.getItem('nextCount'));
console.log("next: " + nextCount);

document.querySelector('.button_Return').addEventListener('click', () => {
  event.preventDefault();
  if(nextCount > 0){
    nextSection -= 1;
    console.log(nextSection);
    sessionStorage.setItem('sectionCount', nextSection);
  }
  window.location.href = "./section.html"
});

document.querySelector('.button_Next').addEventListener('click', () => {
  event.preventDefault();
  sessionStorage.setItem('sectionCount', nextSection);
  nextCount += 1;
  sessionStorage.setItem('nextCount', nextCount);
  if(sectionCount == 6) {
    window.location.href = "./question.html"
  }else {
    window.location.href = "./section.html"
  }
});

var message = '';
if(correctCount > 3) {
  messge = 'すごいですね！この調子でどんどん進めちゃいましょう！';
}else if (correctCount > 1) {
  message = 'まずまずといったところですね。間違ったところを見返して、次に進みましょう！';
}else if (correctCount = 1) {
  message = 'まだまだですね。しっかりと復習をしてから、次へ進みましょう！';
}
document.querySelector('.feed-back__mesage').textContent = message;

var sectionName = '';
if(sectionCount == 1) {
  sectionName = 'Next section... "BEMの基本"'
}else if (sectionCount == 2) {
  sectionName = 'Next section... "Block"';
}else if (sectionCount == 3) {
  sectionName = 'Next section... "Element"';
}else if (sectionCount == 4) {
  sectionName = 'Next section... "Modifier"';
}else if (sectionCount == 5) {
  sectionName = 'Next section... "Mix"';
}else if (sectionCount == 6) {
  sectionName = "Let's practice!";
}else if (sectionCount == 7) {
  sectionName = "Let's practice again!";
}

document.querySelector('.next-section').textContent = sectionName;


//背景の処理
var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 25 * s,
        w: 7 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx.beginPath();
            ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 15, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 20, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#C3F0C6';
            ctx.stroke();
        }
    }
};

presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 40 * s,
        w: 7 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };
            
            ctx.save();
            
            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, '#C3F0C6');
            line(1, -1, -1, 1, '#C3F0C6');
            
            ctx.restore();
        }
    }
};

for(var x = 0; x < Canvas.width; x++) {
    for(var y = 0; y < Canvas.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if(Math.round(Math.random()) == 1)
                elements.push(presets.o(x, y, s, 0, 0));
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
    elements[e].draw(ctx, time);
}, 10);