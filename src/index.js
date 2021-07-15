//import './css/styles.css';
import menu from './menu.json';
import cards from './cards.hbs';
import { ThemeSwitcher } from './js/themeswitcher';

const themeSwitcher = new ThemeSwitcher('body', new ThemeSwitcher.Checkbox('#theme-switch-toggle'));

const cardList = document.querySelector('.js-menu');
cardList.innerHTML = cards(menu);
// console.log(cards(menu))
//const checkboxTheme = document.querySelector('#theme-switch-toggle');
// const currentTheme = localStorage.getItem('theme');
// console.log(themeSwitcher.name);
// console.log(themeSwitcher.index);
