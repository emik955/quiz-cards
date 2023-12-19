const cards = document.querySelectorAll(".plate");

cards[0].classList.add("visible");

cards[0].querySelector('[data-nav="prev"]').remove();

let currentIndex = 0;

document.addEventListener("click", function(e) {
  if (e.target.dataset.nav === "next") {
    if (currentIndex === cards.length - 1) return;

    cards[currentIndex].classList.remove("visible");

    currentIndex++;

    cards[currentIndex].classList.add("visible");
  }

  if (e.target.dataset.nav === "prev") {
    cards[currentIndex].classList.remove("visible");

    currentIndex--;

    cards[currentIndex].classList.add("visible");
  }
});

