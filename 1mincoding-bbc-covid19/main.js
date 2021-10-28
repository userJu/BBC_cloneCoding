"use strict";

(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)
        `;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");

  let currentGraphic = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].setAttribute("data-index", i);
    graphicElems[i].dataset.index = i;
  }

  function activate(action) {
    currentGraphic.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }
  function inActivate(action) {
    currentGraphic.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    let loop = 0;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      let index = step.dataset.index;
      boundingRect = step.getBoundingClientRect();

      loop++;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inActivate(currentGraphic.dataset.action);
        currentGraphic = graphicElems[index];
        activate(currentGraphic.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });
  activate();
})();
