import jQuery from 'jquery'
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

  changeValue(value) {
    this._settings.value = value;
    this.emit('valueChanged', value);
    console.log(this._settings.value);
  }

  getValue() {
    return this._settings.value;
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
    this._display = $(`<input type="number" value="${this._model._settings.value}">`);

    this._model.on('valueChanged', value => this.createSlider())
                .on('valueChanged', value => this.createDisplay());
                

    this._slider.on('input', e => this.emit('sliderChanged', e.target.value));
                
    this._display.on('change', e => this.emit('sliderChanged', e.target.value));
                  

    
  }

  show() {
    this.createSlider();
    this.createDisplay();
  }

  createSlider() {
    const value = parseInt(this._model.getValue(), 10);
    const slider = this._slider;
    slider.attr('value', value);
    this._element.append(slider);
  }

  createDisplay() {
    const value = parseInt(this._model.getValue(), 10);
    const display = this._display;
    display.attr('value', value);
    this._element.append(display);
  }

  log() {
    console.log(this._element);
  }
}

class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;

    view.on('sliderChanged', value => this._model.changeValue(value));
  }

  
}



(function( $ ) {

  const model = new Model(),
        view = new View(model),
        controller = new Controller(model, view);

  
  

  $.fn.myPlugin = function() {
  
      return this.each(() => view.show());

  };
})(jQuery);

$('.slider').myPlugin();


