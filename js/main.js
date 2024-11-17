//ランダムに0~9までの数字の中から5個生成
const randomNumbers = new Set(); 
  
while (randomNumbers.size < 5) {
    const randomNum = Math.floor(Math.random() * 10);
    randomNumbers.add(randomNum); 
}
const randomNumbersArray = Array.from(randomNumbers);
console.log(randomNumbersArray);
sessionStorage.setItem('randomNumbers', JSON.stringify(randomNumbersArray));