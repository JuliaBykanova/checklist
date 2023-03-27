document.addEventListener("DOMContentLoaded", () => {
  const headerAccordionText = document.querySelector('.header-accordion__text');
  const countBlock = document.querySelector('.header__count-block');
  const countText = document.querySelector('.header__count');

  accordionTextGenerator();
  select();

  if (window.screen.availWidth >= 600){
    countBlock.classList.remove('passive');
    headerAccordionText.innerHTML = 'Страница 1 из 2';
  } else {
    countBlock.classList.add('passive');
  };

  const answersBtns = document.querySelectorAll('.question-answers-list__item-btn');

  answersBtns.forEach((answersBtn) => {
    answersBtn.addEventListener('click', (event) => {
      for(let i=0; i<answersBtns.length; i++){
        if(event.currentTarget === answersBtns[i]){
          answersBtns[i].classList.add('question-answers-list__item-btn-active');
        } else{
          answersBtns[i].classList.remove('question-answers-list__item-btn-active');
        };
      };
      accordionTextGenerator();
    });
  });

  window.addEventListener('resize', () => {
    accordionTextGenerator();
    if (window.screen.availWidth >= 600){
      countBlock.classList.remove('passive');
      headerAccordionText.innerHTML = 'Страница 1 из 2';
    } else {
      countBlock.classList.add('passive');
    };
  });

  function select() {
    const selectHeader = document.querySelectorAll('.select__header');
    const selectItem = document.querySelectorAll('.select__item');
  
    selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
    });
  
    selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
    });
  
    function selectToggle() {
      this.parentElement.classList.toggle('is-active');
      this.querySelector('.select__icon').classList.toggle('rotate');
    }
  
    function selectChoose() {
      const text = this.innerText;
      const select = this.closest('.select');
      const selectIcon = this.closest('.select').querySelector('.select__icon');
      const currentText = select.querySelector('.select__current');
      if (window.screen.availWidth >= 600){
        currentText.innerText = text;
      } else{
        currentText.innerText = text + ' -' + currentText.innerHTML.split('-')[1];
      }
      select.classList.remove('is-active');
      selectIcon.classList.remove('rotate');
    }
  
  };


  function accordionTextGenerator(){
    const questions = document.querySelectorAll('.question');
    const inputs = document.querySelectorAll('.question__input');
    const checkboxes = document.querySelectorAll('.question-checkbox__input');
    const voutedTestQuestion = document.querySelectorAll('.question-answers-list__item-btn-active');

    const questionAmount = questions.length;
    let count=0;

    for(let i=0; i<inputs.length; i++){
      if(inputs[i].value){
        count++;
      };

      inputs[i].addEventListener('blur', () => {
        accordionTextGenerator();
      });
    };

    for(let i=0; i<checkboxes.length; i++){
      if(checkboxes[i].checked){
        count++;
      };

      checkboxes[i].addEventListener('click', () => {
        accordionTextGenerator();
      });
    };

    for(let i=0; i<voutedTestQuestion.length; i++){
      count++;
    }

    const percent = count*100/questionAmount;

    if (window.screen.availWidth > 600){
      countText.innerHTML = `${count} / ${questionAmount} (${percent}%)`;
    } else {
      headerAccordionText.innerHTML = `Страница 1 из 2 - Оценка: ${count} из ${questionAmount} (${percent}%)`;
    };
  };

})