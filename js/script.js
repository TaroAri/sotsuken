//問題文
const questionData = [
  { 
    question: '0はどれ？', option1: '0だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '1だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '1はどれ？', option1: '1だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '2はどれ？', option1: '2だよ。', option2: '1だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '3はどれ？', option1: '3だよ。', option2: '2だよ。', option3: '1だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '4はどれ？', option1: '4だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '1だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '5はどれ？', option1: '5だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '1だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '6はどれ？', option1: '6だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '7はどれ？', option1: '7だよ。', option2: '1だよ。', option3: '3だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '8はどれ？', option1: '8だよ。', option2: '2だよ。', option3: '1だよ。', 
    option4: '4だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  },
  { 
    question: '9はどれ？', option1: '9だよ。', option2: '2だよ。', option3: '3だよ。', 
    option4: '1だよ。', option5: '5だよ。', correct: 'あってるよ。', worng: 'ちがうよ？'
  }
];

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

const randNum = JSON.parse(sessionStorage.getItem('randomNumbers'));
console.log(randNum);

// ランダムに選択肢を表示する関数
function displayRandomOptions() {
  
  const question = questionData[randNum[pageCount]];
  
  // 質問テキストを表示
  const questionElement = document.querySelector('.question__text');
  questionElement.textContent = question.question;
  
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
document.getElementById('submitBtn').addEventListener('click', function() {
  // ラジオボタンの選択されている要素を取得
  const selectedOption = document.querySelector('input[name="options"]:checked');
  // console.log(selectedOption.value);
  
  // 選択されているラジオボタンがある場合、そのvalueをコンソールに表示
  let explanation;
  if (selectedOption == null) {
    alert('選択してね？');
    return false;
  }
  else if(selectedOption.value == 1){
    correctCount += 1;
    explanation = document.querySelector(`.answer_text`);
    explanation.textContent = questionData[randNum[pageCount]].correct;
  }
  else if(selectedOption.value == 2 || selectedOption.value == 3 || selectedOption.value == 4 || selectedOption.value == 5){
    explanation = document.querySelector(`.answer_text`);
    explanation.textContent = questionData[randNum[pageCount]].worng;
  }
  else {
    console.log('なんか変だね');
  }
  displaySwitch();
});

document.getElementById('nextBtn').addEventListener('click', function() {
  pageCount += 1;
  console.log(correctCount);

  if(pageCount >= 4) {
    console.log("start");
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = "終了";

    //ランダムに0~9までの数字の中から5個生成
    const randomNumbers = new Set(); 
  
    while (randomNumbers.size < 5) {
      const randomNum = Math.floor(Math.random() * 10);
      randomNumbers.add(randomNum); 
    }
    const randomNumbersArray = Array.from(randomNumbers);
    console.log(randomNumbersArray);
    sessionStorage.setItem('randomNumbers', JSON.stringify(randomNumbersArray));
    
    nextBtn.removeEventListener('click', arguments.callee); // 古いイベントリスナーを削除
    nextBtn.addEventListener('click', function() {
      sessionStorage.setItem('correctCount', correctCount);
      window.location.href = './finish.html';  // 遷移先のページに遷移
    });
  }
  displayRandomOptions();
  displaySwitch();
});