import { link } from './link.js'

const slide = document.querySelector('.slide');
var pageCount = 1;
var allPage = 2;
var sectionCount  = Number(sessionStorage.getItem('sectionCount'));
let nextSection = sectionCount + 1;
var headText = null;

link();

document.querySelector('.side-bar__item' + sectionCount).classList.add('side-bar__item_active');

if(sectionCount == 1){
  headText = "1. CSS設計の基本";
}else if(sectionCount == 2){
  headText = "2. BEMの基本";
}else if(sectionCount == 3){
  headText = "3. Block";
}else if(sectionCount == 4){
  headText = "4. Element";
}else if(sectionCount == 5){
  headText = "5. Modifier";
}else if(sectionCount == 6){
  headText = "6. Mix";
}
document.querySelector('.title').textContent = headText;
slide.src = "./slide/" + sectionCount + "-" + pageCount + ".html";

if(sectionCount == 1){
  allPage = 3;
}

document.querySelector('.page-counter').textContent = pageCount + " / " + allPage;

document.querySelector('.button_Return').addEventListener('click', () => {
  if(pageCount == 1){
    window.location.href = "index.html#sections"
  }else{
    pageCount -= 1;
    document.querySelector('.page-counter').textContent = pageCount + " / " + allPage;
    slide.src = "./slide/" + sectionCount + "-" + pageCount + ".html";
  }
});

document.querySelector('.button_Next').addEventListener('click', () => {
  if(pageCount == allPage){
    document.querySelector('.check').style.display = 'block';
  }else{
    pageCount += 1;
    document.querySelector('.page-counter').textContent = pageCount + " / " + allPage;
    slide.src = "./slide/" + sectionCount + "-" + pageCount + ".html";
  }
});

document.querySelector('.modal__button_return').addEventListener('click', () => {
  document.querySelector('.check').style.display = 'none';
});

document.querySelector('.modal__button_next').addEventListener('click', () => {
  sessionStorage.setItem('nextSection', nextSection);
  window.location.href = "question.html"
});
