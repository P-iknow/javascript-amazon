import { controller as config } from './config.js';
import { debounce } from '../../PLib/index.js';

const { delay } = config;

class Controller {
  constructor() {
    this.inputEl = document.querySelector(config.inputEl);
    this.handelSuggestions = debounce(this.handelSuggestions.bind(this), delay);
    this.init();
  }

  init() {
    this.attatchEvent();
  }

  attatchEvent() {
    this.inputEl.addEventListener('keyup', e => {
      this.doByInputKey(e);
    });
    this.inputEl.addEventListener('focus', _ => {
      this.resultView.renderRecentQuery(Array.from(this.model.recentQueryList));
    });
  }

  doByInputKey(e) {
    switch (e.keyCode) {
      case 40:
      case 38:
        // enters
        break;
      case 13:
        this.model.addRecentQuery(e.target.value);
        break;

      default:
        this.handelSuggestions(e.target.value);
    }
  }

  handelSuggestions(query) {
    const { suggesionData, recentQueryList } = this.model;
    if (query.trim() === '')
      this.resultView.renderRecentQuery(Array.from(recentQueryList));
    else {
      suggesionData.then(data => {
        this.resultView.renderSuggestion(data, query);
      });
    }
  }
}

export default Controller;
