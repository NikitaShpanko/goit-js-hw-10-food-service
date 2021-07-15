import menu from './menu.json';
import cards from './cards.hbs';
import { ThemeSwitcher } from './js/themeswitcher';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const themeSwitcher = new ThemeSwitcher(
  'body',
  new ThemeSwitcher.Checkbox('#theme-switch-toggle'),
  Theme,
);

const cardList = document.querySelector('.js-menu');
cardList.innerHTML = cards(menu);
