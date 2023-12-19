const cards = document.querySelectorAll(".plate");

// Hide all cards
cards.forEach(function (card) {
  card.classList.add("none");
});

let currentIndex = 0; // Для перемещения по карточкам
let currentCard = 0; // Для прогресс бара

// Скрываем кнопку "Назад" на первой карточке
cards[0].querySelector('[data-nav="prev"]').remove();

// Отображаем первую карточку
cards[currentIndex].classList.remove("none");
cards[currentIndex].classList.add("visible");

// Запускаем прогресс бар (0%)
updateProgressBar();

window.addEventListener("click", function (event) {
  // Движение вперед
  if (event.target.closest('[data-nav="next"]')) {

    const result = checkOnAnswer(cards[currentIndex]);
    const answersWrapper = cards[currentIndex].querySelector("[data-answers]");

    if (result) {
      // Прогресс бар
      updateProgressBar("next");

      // Перемещение
      setTimeout(function () {
        // Скрываем текущую с анимацией
        cards[currentIndex].classList.remove("visible");

        setTimeout(function () {
          // Скрываем текущую полностью
          cards[currentIndex].classList.add("none");

          // Показываем следующую, готовим к анимации
          currentIndex = currentIndex + 1;
          cards[currentIndex].classList.remove("none");

          setTimeout(function () {
            // Отображаем слудующую с анимацией
            cards[currentIndex].classList.add("visible");
          }, 100);
        }, 500);
      }, 500);
    } else {
      answersWrapper.classList.add("required");
    }
  }

  // Движение назад
  if (event.target.closest('[data-nav="prev"]')) {

    // Прогресс бар
    updateProgressBar("prev");

    setTimeout(function () {
      // Перемещение между карточками
      if (currentIndex === 0) return;

      cards[currentIndex].classList.remove("visible");

      setTimeout(function () {
        cards[currentIndex].classList.add("none");

        // Определяем prev card и готовим ее к анимации
        currentIndex = currentIndex - 1;
        cards[currentIndex].classList.remove("none");

        // Отображаем prev card с анимацией
        setTimeout(function () {
          cards[currentIndex].classList.add("visible");
        }, 100);
      }, 500);
    }, 500);
  }
});

function checkOnAnswer(card) {
  // Проверка на радиокнопки
  const radioBtns = card.querySelectorAll('input[type="radio"]');
  if (radioBtns.length > 0) {
    for (let radio of radioBtns) if (radio.checked) return true;
  }

  // Проверка на чекбоксы
  const checkBoxes = card.querySelectorAll('input[type="checkbox"]');
  if (checkBoxes.length > 0) {
    for (let checkBox of checkBoxes) {
      if (checkBox.checked) return true;
    }
  }
}

function updateProgressBar(direction = "start") {
  if (direction === "next") {
    currentCard = currentCard + 1;
  } else if (direction === "prev") {
    currentCard = currentCard - 1;
  }

  const progressValue = document.querySelectorAll(".progress__label strong");
  const progressLineBar = document.querySelectorAll(".progress__line-bar");
  const countableCards = document.querySelectorAll("[data-progress]").length;
  const progress = Math.round((currentCard * 100) / countableCards);

  progressValue.forEach(function (item) {
    item.innerText = progress + "%";
  });

  progressLineBar.forEach(function (item) {
    item.style.width = progress + "%";
  });
}

// Phone mask
mask("#tel");

// Проверка на заполненность, если только "+"" или меньше 6 символов (пробелы учитываются)
// тогда очищаем поле ввода и оно не проходит проверку на заполненность как "пустое"
const submitForm = document.querySelector("#submitForm");
const telInput = document.querySelector("#tel");

submitForm.onclick = function () {
  if (telInput.value === "+" || telInput.value.length < 6) {
    telInput.value = "";
  }
};

// Focus on checkbox and styling frame around it
const checkBoxPolicy = document.querySelector("#policy");

checkBoxPolicy.addEventListener("focus", function () {
  this.closest("label").classList.add("hovered");
});

checkBoxPolicy.addEventListener("blur", function () {
  this.closest("label").classList.remove("hovered");
});
