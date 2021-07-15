//import './css/styles.css';
import menu from './menu.json';
import cards from './cards.hbs';

class ThemeSwitcher {
  static LIGHT = 'light-theme';
  static DARK = 'dark-theme';

  static Controller = class {
    #elem;
    #elemEvent;
    #elemProperty;
    #themeProperty;

    constructor(elem, elemEvent, elemProperty, themeProperty) {
      this.#elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
      this.#elemEvent = elemEvent;
      this.#elemProperty = elemProperty;
      this.#themeProperty = themeProperty;
    }

    reportTo(themeObj) {
      this.#elem.addEventListener(this.#elemEvent, () => {
        themeObj[this.#themeProperty] = this.#elem[this.#elemProperty];
      });
    }

    updateFrom(themeObj) {
      this.#elem[this.#elemProperty] = themeObj[this.#themeProperty];
    }
  };

  #elem;
  #controller;
  #themes;
  #localParam;
  #name;
  constructor(
    elem,
    controller,
    themes = { light: ThemeSwitcher.LIGHT, dark: ThemeSwitcher.DARK },
    localParam = 'theme',
    defaultIndex = 0,
  ) {
    this.#elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
    this.#controller = controller;
    this.#themes = themes;

    this.#controller.reportTo(this);

    this.#localParam = localParam;
    const localValue = localStorage.getItem(this.#localParam);
    if (localValue) this.name = localValue;
    if (!this.name) this.index = defaultIndex;
  }

  set name(themeName) {
    if (!(themeName in this.#themes)) return;
    this.#name = themeName;
    this.#elem.className = this.#themes[themeName];
    localStorage.setItem(this.#localParam, themeName);
    this.#controller.updateFrom(this);
  }

  get name() {
    return this.#name;
  }

  set index(themeIndex) {
    themeIndex += 0;
    if (themeIndex < 0) return;
    const nameList = Object.keys(this.#themes);
    if (themeIndex >= nameList.length) return;
    this.name = nameList[themeIndex];
    //console.log(nameList);
  }

  get index() {
    return Object.keys(this.#themes).indexOf(this.#name);
  }
}

class CheckBox extends ThemeSwitcher.Controller {
  constructor(elem) {
    super(elem, 'change', 'checked', 'index');
  }
}

const themeSwitcher = new ThemeSwitcher('body', new CheckBox('#theme-switch-toggle'));

const cardList = document.querySelector('.js-menu');
cardList.innerHTML = cards(menu);
// console.log(cards(menu))
//const checkboxTheme = document.querySelector('#theme-switch-toggle');
// const currentTheme = localStorage.getItem('theme');
// console.log(themeSwitcher.name);
// console.log(themeSwitcher.index);
