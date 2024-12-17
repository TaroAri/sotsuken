function finish(){
  const correctCount = JSON.parse(sessionStorage.getItem('correctCount'));
  console.log(correctCount);
  document.getElementById('score').textContent = "5問中" + correctCount + "問正解でした。";
}

window.onload = function() {
  finish();
};

let checkCount = Number(sessionStorage.getItem('sectionCount'));
let sectionCount = checkCount;

document.querySelector('.oneMore').addEventListener('click', () => {
  event.preventDefault();
  sessionStorage.setItem('sectionCount', sectionCount);
  window.location.href = "./section.html"
});

document.querySelector('.nextSection').addEventListener('click', () => {
  event.preventDefault();
  console.log(sectionCount);
  sessionStorage.setItem('sectionCount', sectionCount);
  window.location.href = "./section.html"
});

window.addEventListener('popstate', function(event) {
  sectionCount -= 1;
  sessionStorage.setItem('sectionCount', sectionCount);
})