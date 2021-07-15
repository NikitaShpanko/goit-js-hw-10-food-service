# goit-js-hw-10-food-service
Функционал смены тем реализован в классе [ThemeSwitcher](./src/js/themeswitcher.js), конструктор которого принимает следующие параметры:
``` js
ThemeSwitcher(elem, controller, themes, localParam = 'theme', defaultIndex = 0)
```
|Параметр|Описание|
|----|----|
| `elem` | DOM-элемент или селектор DOM-элемента, к которому применяется смена тем. |
| `controller` | экземпляр субкласса `ThemeSwitcher.Controller`, описывающий взаимодействие с переключателем тем (в нашем случае, с `input#theme-switch-toggle`). |
| `themes` | объект формата `{'название-темы': 'css-селектор-темы', }`, количество тем неограниченно. |
| `localParam` | имя ключа, под которым в local storage будет храниться текущее `название-темы`. |
| `defaultIndex` | номер темы, которая загрузится, если в local storage нет валидного `localParam`. |

У класса `ThemeSwitcher` два публичных свойства, которые с помощью геттеров и сеттеров осуществляют полный функционал смены темы:
|Свойство|Описание|
|----|----|
| `name` | имя текущей темы. |
| `index` | индекс текущей темы, как если бы `themes` был массивом. |

Эти свойства нужны в основном для взаимодействия с субклассом `ThemeSwitcher.Controller`, изменять их вручную в коде, скорее всего, не будет необходимости.

Конструктор субкласса `ThemeSwitcher.Controller` принимает следующие параметры:
``` js
ThemeSwitcher.Controller(elem, elemEvent, elemProperty, themeProperty)
```
|Параметр|Описание|
|----|----|
| `elem` | DOM-элемент или селектор DOM-элемента, который является переключателем тем. |
| `elemEvent` | имя события срабатывания переключателя. |
| `elemProperty` | имя свойства переключателя, которое задаёт новую тему в виде названия или индекса. |
| `themeProperty` | имя свойства класса `ThemeSwitcher`, которое нужно изменить, чтобы задать новую тему (`'name'`, если `elemProperty` возвращает имя, или `'index'`, если `elemProperty` возвращает индекс). |

У класса `ThemeSwitcher.Controller` два публичных метода, с помощью которых обеспечивается его связь с тем экземпляром класса `ThemeSwitcher`, к которому он подключён.
|Метод|Описание|
|----|----|
| `reportTo(themeObj)` | добавляет обработчик события `elemEvent`, который и будет изменять тему. |
| `updateFrom(themeObj)` | принудительно изменяет параметр `elemProperty`, чтобы его значение отражало текущую тему. |

В обоих случаях, `themeObj` – экземпляр класса `ThemeSwitcher`. Этот экземпляр автоматически вызывает методы, когда это нужно, поэтому применять их вручную в коде нет необходимости.

Значения `elemEvent`, `elemProperty` и `themeProperty` одинаковы для каждого отдельно взятого типа DOM-элементов (один набор для чекбокса, другой –  для списка, третий для текстового поля и т. д.), поэтому целесообразно создать классы наследники `ThemeSwitcher.Controller`, которые в конструкторе принимали бы только DOM-элемент или селектор DOM-элемента, а остальные параметры подставляли исходя из его типа. На данный момент создан только подкласс `ThemeSwitcher.Checkbox`, обеспечивающий работу элементов типа чекбокс.