const MOCK_TASKS = [
  { id: 1, title: "Изучить паттерн MVC", isDone: false },
  { id: 2, title: "Подготовить моковые данные", isDone: false },
];

// хранение данных, бизнес-логика
const model = {
  tasks: [],
  addTask(title) {
    const newTask = { title: title, isDone: false, id: Math.random() };
    // то же, что { title: title, isDone: isDone, id: id }

    this.tasks.push(newTask);

    view.renderTasks(model.tasks); // Обновляем представление
  },
  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    view.renderTasks(model.tasks);
  },
  toggleTask(taskId) {
    // воспользуемся методом map
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        task.isDone = !task.isDone;
      }
      return task;
    });

    view.renderTasks(model.tasks); // Обновляем представление
  },
  clearTasks() {
    this.tasks = this.tasks.filter((task) => !task.isDone) 
    view.renderTasks(model.tasks)
  }
};

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  init() {
    // 1
    this.renderTasks(model.tasks);
    //2
    // const tasks = controller.getTasks();
    // this.renderTasks(tasks);
    const form = document.querySelector(".form");
    const input = document.querySelector(".input");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы
      // const title = input.value
      controller.addTask(input.value); // Вызываем метод addTask контроллера

      input.value = ""; // Очищаем поле ввода
    });
    const list = document.querySelector(".list");
    list.addEventListener("click", function (event) {
      // проверяем, что кликнули на название задачи
      if (event.target.classList.contains("task-title")) {
        // id задачи хранится в id родительского элемента
        // +, используем унарный плюс для преобразования типа в number
        const taskId = +event.target.parentElement.id;
        controller.toggleTask(taskId);
      }
      if (event.target.classList.contains("delete-button")) {
        const taskId = +event.target.parentElement.id;
        // 2. вызываем метод контроллера для удаления задачи
        controller.deleteTask(taskId);
      }
    });
    const clearButton = document.querySelector(".clear");
    list.addEventListener("click", function (event) {
      controller.clearTasks()
    })
  },
  renderTasks(tasks) {
    let list = document.querySelector(".list");
    let tasksHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      tasksHTML =
        tasksHTML +
        `
      <li id="${task.id}" class="${task.isDone ? "done" : ""}">
          <b class="task-title">${task.title}</b>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>`;
      list.innerHTML = tasksHTML;
    }
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  getTasks() {
    return model.tasks;
  },
  addTask(title) {
    if (title.trim() !== "") {
      model.addTask(title);
    }
  },
  deleteTask(id) {
    model.deleteTask(id);
  },
  toggleTask(id) {
    model.toggleTask(id);
  },
  clearTasks() {
    model.clearTasks()
  }
};

function viewDefault() {
  view.init();
}
viewDefault();
