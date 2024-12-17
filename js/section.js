const canvas = document.querySelector('.canvas');
var pageCount = 1;
var allPage = 2;
var sectionCount  = sessionStorage.getItem('sectionCount');
var headText = null;

if(sectionCount == 1){
  headText = "1.CSS設計の基本";
}else if(sectionCount == 2){
  headText = "2.BEMの基本";
}else if(sectionCount == 3){
  headText = "3.Block";
}else if(sectionCount == 4){
  headText = "4.Element";
}else if(sectionCount == 5){
  headText = "5.Modifier";
}else if(sectionCount == 6){
  headText = "6.Mix";
}
document.querySelector('.title').textContent = headText;
canvas.src = "./slide/" + sectionCount + "-" + pageCount + ".html";

document.querySelector('.button_Return').addEventListener('click', () => {
  if(pageCount == 1){
    window.location.href = "index.html"
  }else{
    pageCount -= 1;
    canvas.src = "./slide/" + sectionCount + "-" + pageCount + ".html";
  }
});

if(sectionCount == 1){
  allPage = 3;
}

document.querySelector('.button_Next').addEventListener('click', () => {
  if(pageCount == allPage){
    document.querySelector('.check').style.display = 'block';
  }else{
    pageCount += 1;
    canvas.src = "./slide/" + sectionCount + "-" + pageCount + ".html";
  }
});

document.querySelector('.modal__button_return').addEventListener('click', () => {
  document.querySelector('.check').style.display = 'none';
});

document.querySelector('.modal__button_next').addEventListener('click', () => {
  sessionStorage.setItem('sectionCount', sectionCount);
  window.location.href = "question.html"
});




// function adjust_frame_css(F){
//   if(document.getElementById(F)) {
//     var myF = document.getElementById(F);
//     var myC = myF.contentWindow.document.documentElement;
//     var myH = 30;
//     if(document.all) {
//       myH  = myC.scrollHeight;
//     } else {
//       myH = myC.offsetHeight;
//     }
//     myF.style.height = myH+"px";
//   }
// }