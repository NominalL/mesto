export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderCards() {
    this._renderer(this._items);
  }

  addItemPrepend(element) {
    this._selector.prepend(element);
  }

  addItemAppend(element) {
    this._selector.append(element);
  }
}
