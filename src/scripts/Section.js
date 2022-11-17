export default class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = document.querySelector(selector);
  }

  renderCard() {
    this.items.forEach((element) => {
      this.renderer(element);
    });
  }

  addItem(element) {
    this.selector.prepend(element);
  }
}
