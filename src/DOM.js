export default class TodoDOMHandler {
  createHTMLElement(element, text, className) {
    const elem = document.createElement(element);
    if (className) {
      elem.classList.add(className);
    }
    if (text) {
      elem.textContent = text;
    }
    return elem;
  }

  appendChildren(container, array) {
    for (const elem of array) {
      container.appendChild(elem);
    }
  }

  renderImg(src, className) {
    const img = document.createElement("img");
    if (src) {
      img.src = src;
    }
    if (className) {
      img.classList.add(className);
    }
    return img;
  }
}
