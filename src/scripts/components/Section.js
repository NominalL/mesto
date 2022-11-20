export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderCards() {
    this._renderer(this._items);
  }

  addItem(element) {
    this._selector.prepend(element);
  }
}
