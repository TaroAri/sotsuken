import { questionData } from './questions.js';

var sectionCount  = Number(sessionStorage.getItem('sectionCount'));
console.log(sectionCount)

//表示切り替え
function displaySwitch() {
  const hide = document.querySelectorAll(`.hide`);
  const show = document.querySelectorAll(`.show`);

  hide.forEach(element => {
    // hide => show
    element.classList.remove('hide');
    element.classList.add('show');
  });
  
  show.forEach(element => {
    // show => hide
    element.classList.remove('show');
    element.classList.add('hide');
  });
}

let pageCount = 0;
var correctCount = 0;
let questionArray = [];
if(sectionCount < 7){
  questionArray = questionData.filter(item => item.section === Number(sectionCount));
}

const randNum = JSON.parse(sessionStorage.getItem('randomNumbers'));
console.log(randNum);

// ランダムに選択肢を表示する関数
function displayRandomOptions() {

  let question;
  if(sectionCount < 7){
    question = questionArray[pageCount];
  }else{
    question = questionData[randNum[pageCount]];
  }

  console.log(question);
  
  
  // 質問テキストを表示
  const questionElement = document.querySelector('.question__text');
  questionElement.innerText = question.question;
  
  // 選択肢を配列に格納
  const options = [
    { value: '1', text: question.option1 },
    { value: '2', text: question.option2 },
    { value: '3', text: question.option3 },
    { value: '4', text: question.option4 },
    { value: '5', text: question.option5 }
  ];
  
  // 配列をシャッフル
  shuffle(options);
  
  // 各選択肢を表示
  for (let i = 0; i < 5; i++) {
    const optionElement = document.querySelector(`.option${i + 1}`);
    optionElement.innerHTML = `<input type="radio" name="options" value="${options[i].value}">${options[i].text}`;
  }
}

// 配列をシャッフルする関数
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替え
  }
}

// ページ読み込み後にランダムに選択肢を表示
window.onload = function() {
  displayRandomOptions();
};


// 回答ボタンがクリックされたときの処理
document.getElementById('submitBtn').addEventListener('click', () => {

  const selectedOption = document.querySelector('input[name="options"]:checked');
  
  if (selectedOption == null) {
    alert('選択してね？');
    return false;
  }
  else if(selectedOption.value == 1){
    correctCount += 1;
    document.querySelector('.answer__text').textContent = "正解";
    if(sectionCount < 7){
      document.querySelector(`.answer__explain`).textContent = questionArray[pageCount].explain;
    }else{
      document.querySelector(`.answer__explain`).textContent = questionData[randNum[pageCount]].explain;
    }
  }
  else if(selectedOption.value == 2 || selectedOption.value == 3 || selectedOption.value == 4 || selectedOption.value == 5){
    document.querySelector('.answer__text').textContent = "不正解";
    if(sectionCount < 7){
      document.querySelector(`.answer__explain`).textContent = questionArray[pageCount].explain;
    }else{
      document.querySelector(`.answer__explain`).textContent = questionData[randNum[pageCount]].explain;
    }
  }
  else {
    console.log('なんか変だね');
  }
  displaySwitch();
});

document.getElementById('nextBtn').addEventListener('click', nextBtnClick);

function nextBtnClick() {
  pageCount += 1;
  document.querySelector('.question__num').textContent = "問題" + (pageCount + 1);
  if(sectionCount < 7){
    document.querySelector('.counter').textContent = (pageCount + 1) + " / " + questionArray.length;
  }else{
    document.querySelector('.counter').textContent = (pageCount + 1) + " / " + 5;
  }

  if (pageCount >= 4) {
    console.log("start");
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = "終了";

    // ランダムに0~9までの数字の中から5個生成
    const randomNumbers = new Set();

    while (randomNumbers.size < 5) {
      const randomNum = Math.floor(Math.random() * 10);
      randomNumbers.add(randomNum);
    }
    const randomNumbersArray = Array.from(randomNumbers);
    console.log(randomNumbersArray);
    sessionStorage.setItem('randomNumbers', JSON.stringify(randomNumbersArray));

    // 古いイベントリスナーを削除
    nextBtn.removeEventListener('click', nextBtnClick); 

    // 新しいイベントリスナーを追加
    nextBtn.addEventListener('click', function() {
      sessionStorage.setItem('sectionCount', sectionCount + 1);
      sessionStorage.setItem('correctCount', correctCount);
      window.location.href = './finish.html';  // 遷移先のページに遷移
    });
  }
  displayRandomOptions();
  displaySwitch();
}


