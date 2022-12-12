export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderCard(item) {
    this._renderer(item)
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.append(card);
  }

  addItemPrepend(element) {
    const card = this._renderer(element);
    this._container.prepend(card);
  }
}
