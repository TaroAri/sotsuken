export function link() {
  document.querySelectorAll('.page-link').forEach(section => {
      section.addEventListener('click', () => {
          event.preventDefault();
          let sectionCount = null;
          let clickSection = event.target.getAttribute('value');
          if(clickSection == 7) {
              sectionCount = 7;
              sessionStorage.setItem('sectionCount', sectionCount);
              window.location.href = "./question.html";
          }else{
              sectionCount = clickSection;
              sessionStorage.setItem('sectionCount', sectionCount);
              window.location.href = "./section.html"
          }
      });
  });
}