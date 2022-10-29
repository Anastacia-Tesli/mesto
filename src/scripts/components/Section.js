export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector);
    }
    renderItems(items) {
        return items.forEach((item) => {
            this._renderer(item);
        })
    }
    addItems(item) {
        this._container.prepend(item);
    }
}