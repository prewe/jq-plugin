import $ from 'jquery'
import './scss/index.scss'

class EventEmitter {
  constructor() {
    this._events = {};
  }
  on(evt, listener) {
    (this._events[evt] || (this._events[evt] = [])).push(listener);
    return this;
  }
  emit(evt, arg) {
    (this._events[evt] || []).slice().forEach(lsn => lsn(arg));
  }
}

class Model extends EventEmitter {
  constructor(options) {
    super();
    this._settings = $.extend({min: 0, max: 10, step: 1, value: 0}, options);
  }

  log() {
    console.log(this._settings);
  }
}

class View extends EventEmitter {
  constructor(model) {
    super();
    this._model = model;
    this._element = $('.slider');
    this._slider = $(`<input type="range" min="${this._model._settings.min}" max="${this._model._settings.max}" step="${this._model._settings.step}" value="${this._model._settings.value}">`);

    this._slider.on('input', e => this.emit('valueChanged', e.target.value));
  }

  

  createSlider() {
    this._element.append(this._slider);
  }

  log() {
    console.log(this._element);
  }
}

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('valueChanged', value => this._model._settings.value = value);
  }

  getValue() {
    console.log(this._model._settings.value);
  }
}

const model = new Model({value: 3})
const view = new View(model)
const controller = new Controller(model, view)
model.log();
view.log();
view.createSlider();
controller.getValue();





