//ランダムに0~9までの数字の中から5個生成
const randomNumbers = new Set();
var sectionCount;
let clickSection;
  
while (randomNumbers.size < 5) {
    const randomNum = Math.floor(Math.random() * 30);
    randomNumbers.add(randomNum); 
}
const randomNumbersArray = Array.from(randomNumbers);
console.log(randomNumbersArray);
sessionStorage.setItem('randomNumbers', JSON.stringify(randomNumbersArray));


const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.addEventListener('click', () => {
        event.preventDefault();
        clickSection = event.target.getAttribute('value');
        sectionCount = clickSection;
        sessionStorage.setItem('sectionCount', sectionCount);
        window.location.href = "./section.html"
    });
});

document.querySelector('.learn').addEventListener('click', () => {
    event.preventDefault();
    sectionCount = 7;
    sessionStorage.setItem('sectionCount', sectionCount);
    window.location.href = "./question.html";
});

