//import './css/styles.css';
import menu from './menu.json';
import cards from './cards.hbs';

const cardList = document.querySelector('.js-menu');
cardList.innerHTML = cards(menu);
// console.log(cards(menu))