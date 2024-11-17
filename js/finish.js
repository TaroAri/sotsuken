function finish(){
  const correctCount = JSON.parse(sessionStorage.getItem('correctCount'));
  console.log(correctCount);
  document.getElementById('score').textContent = "5問中" + correctCount + "問正解でした。";
}

window.onload = function() {
  finish();
};