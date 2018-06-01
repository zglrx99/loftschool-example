/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', () => {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  displayCookies();
});

addButton.addEventListener('click', () => {
  // здесь можно обработать нажатие на кнопку "добавить cookie"
  const key = addNameInput.value,
    value = addValueInput.value;
  let expires;
  expires = new Date();
  expires.setDate(expires.getDate() + 1);
  document.cookie = `${key}=${value};expires=${expires}`;
  displayCookies();
});

listTable.addEventListener('click', e => {
  //Делегирование удаления кукиса
  if (e.target.nodeName === 'BUTTON') {
    const key = e.target.dataset.key,
      tr = listTable.querySelector(`tr[data-key="${key}"]`);
    const date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = `${key}='REMOVED';expires=${date}`;
    tr.parentNode.removeChild(tr);
  }
});

function displayCookies() {
  // Show me the cookies!
  let cookies = document.cookie.split('; ');
  const currentFilterWord = filterNameInput.value;
  if (currentFilterWord.length !== 0) {
    let isMatching = function (full, chunk) {
      full = full.toLowerCase();
      chunk = chunk.toLowerCase();
      return full.indexOf(chunk) !== -1;
    };
    cookies = cookies.filter(cookie => {
      if (cookie.length === 0) {
        return false;
      }
      const [name, value] = cookie.split('=');
      return (isMatching(name, currentFilterWord) || isMatching(value, currentFilterWord));
    });
  }
  listTable.innerHTML = '';
  cookies.forEach(cookie => {
    if (cookie.length === 0) {
      return false;
    }
    const [name, value] = cookie.split('='), tr = document.createElement('tr');
    tr.setAttribute('data-key', name);
    tr.innerHTML = `<td>${name}</td><td>${value}</td><td><button data-key="${name}">Удалить</button></td>`;
    listTable.appendChild(tr);
  });
};

displayCookies();