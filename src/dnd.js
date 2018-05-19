/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
	const element = document.createElement('div');
    const elementWidth = Math.random() * 100;
    const elementHeight = Math.random() * 100;

    function getColor() {
        const letters = '0123456789ABCDEF';
        let color = '';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        };

        return color;
    }

    element.className = 'draggable-div';
    element.style.cssText = `
	background-color: #${getColor()};
	width: ${elementWidth}px;
    height: ${elementHeight}px;
    left: ${Math.random() * (homeworkContainer.offsetWidth - elementWidth)}px;
    top: ${Math.random() * (homeworkContainer.offsetHeight - elementHeight)}px;
    `;

	return element;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
	target.ondrag = () => {
        return false;
    };

    target.onmousedown = (event) => {
        moveAt(event);

        function moveAt(e) {
            event.target.style.left = `${e.pageX - event.target.offsetWidth / 2}px`;
            event.target.style.top = `${e.pageY - event.target.offsetHeight / 2}px`;
        }

        document.onmousemove = (e) => {
            moveAt(e);
        };
        event.target.onmouseup = () => {
            document.onmousemove = null;
            target.onmouseup = null;
        }
	}
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
