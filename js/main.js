document.addEventListener("DOMContentLoaded", () => {
  const headerAccordionText = document.querySelector('.header-accordion__text');
  const countBlock = document.querySelector('.header__count-block');
  const countText = document.querySelector('.header__count');
  const answersLists = document.querySelectorAll('.question-answers-list');

  accordionTextGenerator(5, 5, 5);
  select();
  accordion();

  if (window.screen.availWidth >= 600){
    countBlock.classList.remove('passive');
    headerAccordionText.innerHTML = 'Страница 1 из 2';
  } else {
    countBlock.classList.add('passive');
  };

  const checkboxes = document.querySelectorAll('.question-checkbox__input');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const questionContainer = checkbox.closest('.question-container');
      if(questionContainer.querySelector('.question__star-obligatory')){
        if (checkbox.checked){
          questionContainer.classList.remove('question-container-obligatory');
        } else {
          questionContainer.classList.add('question-container-obligatory');
        };
      };
    });
  });

  const inputs = document.querySelectorAll('.question__input');

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const questionContainer = input.closest('.question-container');
      if(questionContainer.querySelector('.question__star-obligatory')){
        if (input.value){
          questionContainer.classList.remove('question-container-obligatory');
        } else {
          questionContainer.classList.add('question-container-obligatory');
        };
      };
    });
  });  

  answersLists.forEach((answersList) => {
    const answersBtns = answersList.querySelectorAll('.question-answers-list__item-btn');

    answersBtns.forEach((answersBtn) => {
      answersBtn.addEventListener('click', (event) => {
        for(let i=0; i<answersBtns.length; i++){
          if(event.currentTarget === answersBtns[i]){
            answersBtns[i].classList.add('question-answers-list__item-btn-active');
          } else{
            answersBtns[i].classList.remove('question-answers-list__item-btn-active');
          };
        };
        accordionTextGenerator(5, 5, 5);
        const questionContainer = answersBtn.closest('.question-container-obligatory');
        if (questionContainer){
          questionContainer.classList.remove('question-container-obligatory');
        }
        
      });
    });
  })

  

  const noteBtns = document.querySelectorAll('.question-action-list__item-note-btn');

  noteBtns.forEach((noteBtn) => {
    noteBtn.addEventListener('click', () => {
      const noteInput = document.createElement('input');

      noteInput.classList.add('question-note__input', 'input-resert');

      noteInput.type = 'text';
      noteInput.placeholder = 'Введите текст заметки...';

      noteBtn.closest('.question-action-list').before(noteInput);
    });
  });

  const fileInputs = document.querySelectorAll('.question-action-list__item-input');

  fileInputs.forEach((fileInput) => {
    fileInput.onchange = function () {
      let fileBox = this.closest('.question-container').querySelector('.question-file');
      if(!fileBox){
        fileBox = document.createElement('div');
        const fileTitle = document.createElement('h3');

        fileBox.classList.add('question-file');
        fileTitle.classList.add('question-file__title');
        fileTitle.innerHTML = 'Медиа';

        fileBox.append(fileTitle);
      }

      const fileBlock = document.createElement('div');

      if (this.value.includes('.png') || this.value.includes('.jpg') || this.value.includes('.svg')){
        fileBlock.classList.add('question-file__img-block');
        const fileImg = document.createElement('img');
        fileImg.classList.add('question-file__img');
        fileImg.src = "https://mobimg.b-cdn.net/v3/fetch/f2/f2689a880e15cbb49bd267f84689111a.jpeg?w=1470&r=0.5625";
        console.log(this.files);
        fileBlock.append(fileImg);
      } else{
        const fileText = document.createElement('p');
        fileBlock.classList.add('question-file__text-block');
        fileText.classList.add('question-file__text');
        fileText.innerHTML = this.files[0].name;
        fileBlock.append(fileText);
      };
    
      
      fileBox.append(fileBlock);
      this.closest('.question-action-list').before(fileBox);
    };
  });

  const navigateBtnNext = document.querySelector('.navigate__btn-next');
  const navigateBtnBack = document.querySelector('.navigate__btn-back');

  navigateBtnNext.addEventListener('click', () => {
    navigateBtnNext.classList.add('passive');
    navigateBtnBack.classList.remove('passive');
    navigateBtnNext.closest('.navigate-container').classList.add('navigate-container-back');
    if (window.screen.availWidth >= 600){
      headerAccordionText.innerText = 'Страница 2 из 2';
    } else{
      headerAccordionText.innerText = 'Страница 2 из 2' + ' -' + headerAccordionText.innerHTML.split('-')[1];
    }
  });

  navigateBtnBack.addEventListener('click', () => {
    navigateBtnBack.classList.add('passive');
    navigateBtnNext.classList.remove('passive');
    navigateBtnNext.closest('.navigate-container').classList.remove('navigate-container-back');
    if (window.screen.availWidth >= 600){
      headerAccordionText.innerText = 'Страница 1 из 1';
    } else{
      headerAccordionText.innerText = 'Страница 1 из 2' + ' -' + headerAccordionText.innerHTML.split('-')[1];
    }
  });

  window.addEventListener('resize', () => {
    accordionTextGenerator(5, 5, 5);
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
      if(this.classList.contains('header-select__item')){
        if (window.screen.availWidth >= 600){
          currentText.innerText = text;
        } else{
          currentText.innerText = text + ' -' + currentText.innerHTML.split('-')[1];
        };
      } else{
        currentText.innerText = text;
      }
      
      select.classList.remove('is-active');
      selectIcon.classList.remove('rotate');

      const questionContainer = this.closest('.question-container-obligatory');
        if (questionContainer){
          questionContainer.classList.remove('question-container-obligatory');
        }
    }
  
  };

  function accordion() {
    const accordionHeader = document.querySelectorAll('.accordion__header');
  
    accordionHeader.forEach(item => {
      item.addEventListener('click', accordionToggle)
    });
  
    function accordionToggle() {
      this.parentElement.parentElement.classList.toggle('is-active');
      this.querySelector('.accordion__icon').classList.toggle('rotate');
    }
  
  };


  function accordionTextGenerator(yesPoints, noPoints, dnPoints){
    const voutedAnswers = document.querySelectorAll('.question-answers-list__item-btn-active');

    const points = Math.max(yesPoints, noPoints, dnPoints);
    const questionsPoints = answersLists.length * points;
    let count=0;

    for(let i=0; i<voutedAnswers.length; i++){
      if(voutedAnswers[i].classList.contains('yes-btn')){
        count+=yesPoints;
      } else if(voutedAnswers[i].classList.contains('no-btn')){
        count+=noPoints;
      } else if(voutedAnswers[i].classList.contains('dn-btn')){
        count+=dnPoints;
      } 
    }

    const percent = count*100/questionsPoints;

    if (window.screen.availWidth > 600){
      countText.innerHTML = `${count} / ${questionsPoints} (${percent}%)`;
    } else {
      headerAccordionText.innerHTML = `Страница 1 из 2 - Оценка: ${count} из ${questionsPoints} (${percent}%)`;
    };
  };

})