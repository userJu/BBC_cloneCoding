"use strict";

(() => {
  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");

  let currentGraphic = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    console.log(ioIndex);
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].setAttribute("data-index", i);
    graphicElems[i].dataset.index = i;
  }

  function activate() {
    currentGraphic.classList.add("visible");
  }
  function inActivate() {
    currentGraphic.classList.remove("visible");
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
        inActivate();
        currentGraphic = graphicElems[index];
        activate();
      }
    }
    console.log(loop);
  });
  activate();
})();
