/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise(
    function (resolve, reject) {
      setTimeout(() => resolve(), seconds * 1000)
    }
  )
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then((response) => response.json())
    .then((cities) => cities.sort((el1, el2) => (el1.name < el2.name) ? -1 : (el1.name > el2.name) ? 1 : 0))
    .catch((error) => console.error('Error occured :C'))
}

export {
  delayPromise,
  loadAndSortTowns
};