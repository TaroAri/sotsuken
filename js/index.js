import { link } from './link.js'

//ランダムに0~9までの数字の中から5個生成
const randomNumbers = new Set();
var sectionCount;
let clickSection;
const nextCount = 0;
sessionStorage.setItem('nextCount', nextCount);
console.log(nextCount);

link();
  
while (randomNumbers.size < 5) {
    const randomNum = Math.floor(Math.random() * 30);
    randomNumbers.add(randomNum); 
}
const randomNumbersArray = Array.from(randomNumbers);
console.log(randomNumbersArray);
sessionStorage.setItem('randomNumbers', JSON.stringify(randomNumbersArray));



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




// ナビゲーション
var elemTop = [];

function PositionCheck() {
    var scrollPoints = document.querySelectorAll('.scroll-point');
    elemTop = [];
    scrollPoints.forEach(function (elem, i) {
        elemTop[i] = Math.round(elem.getBoundingClientRect().top + window.scrollY - 200);
    });
}

function ScrollAnime() {
    var scroll = Math.round(window.scrollY);
    var navLinks = document.querySelectorAll('.global-nav__link');
    navLinks.forEach(function (link) {
        link.classList.remove('global-nav_active');
    });

    if (scroll >= 0 && scroll < elemTop[1]) {
        navLinks[0].classList.add('global-nav_active');
    } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
        navLinks[1].classList.add('global-nav_active');
    } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
        navLinks[2].classList.add('global-nav_active');
    } else if (scroll >= elemTop[3]) {
        navLinks[3].classList.add('global-nav_active');
    }
}

// スクロール時にアニメーションをチェック
window.addEventListener('scroll', function () {
    PositionCheck();
    ScrollAnime();
});

// ページロード時に初期位置をチェック
window.addEventListener('load', function () {
    PositionCheck();
    ScrollAnime();
});

// ウィンドウサイズ変更時に位置を再計算
window.addEventListener('resize', function () {
    PositionCheck();
});

// ナビゲーションクリック時のスクロール処理
var navLinks = document.querySelectorAll('.global-nav__link');
navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var elmHash = link.getAttribute('href');
        var targetElement = document.querySelector(elmHash);
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});


