export class ThemeSwitcher {
  #elem;
  #controller;
  #themes;
  #localParam;
  #name;
  #currentClass;
  constructor(elem, controller, themes, localParam = 'theme', defaultIndex = 0) {
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
    if (this.#currentClass) this.#elem.classList.remove(this.#currentClass);
    const newClass = this.#themes[themeName];
    this.#elem.classList.add(newClass);
    this.#currentClass = newClass;
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
  }

  get index() {
    return Object.keys(this.#themes).indexOf(this.#name);
  }

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

  static Checkbox = class extends ThemeSwitcher.Controller {
    constructor(elem) {
      super(elem, 'change', 'checked', 'index');
    }
  };
}
