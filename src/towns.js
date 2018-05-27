/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.
 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 Разметку смотрите в файле towns-content.hbs
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
var cities;

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then((response) => response.json())
    .then((cities) => cities.sort((el1, el2) => (el1.name < el2.name) ? -1 : (el1.name > el2.name) ? 1 : 0))
    .catch((error) => console.error('Error occured :C'))
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов
 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  full = full.toLowerCase().trim();
  chunk = chunk.toLowerCase().trim();
  return full.indexOf(chunk) !== -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function () {
  filterResult.innerHTML = '';
  if (filterInput.value.trim().length !== 0) {
    cities.forEach((item) => {
      if (isMatching(item.name, filterInput.value)) {
        const el = document.createElement('div');
        el.innerText = item.name;
        filterResult.appendChild(el);
      }
    });
  }
});

(function run() {
  loadingBlock.style.display = 'block';
  loadTowns().then((value) => {
    cities = value;
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
  }, () => {
    loadingBlock.style.display = 'none';
    const errorBlock = document.createElement('div');
    errorBlock.setAttribute('id', 'error-block');
    errorBlock.innerHTML = 'Не удалось загрузить города<br><button>Повторить</button>';
    homeworkContainer.appendChild(errorBlock);
    homeworkContainer.querySelector('#error-block button').addEventListener('click', () => {
      run();
      homeworkContainer.removeChild(errorBlock);
    }, {
      once: true
    });
  });
})();

export {
  loadTowns,
  isMatching
};