const MOCK_TASKS = [
  { id: 1, title: "Изучить паттерн MVC", isDone: false },
  { id: 2, title: "Подготовить моковые данные", isDone: true },
];

// хранение данных, бизнес-логика
const model = {
  tasks: MOCK_TASKS,
  addTask() {},
  deleteTask() {},
  toggleTask() {},
};

// отображение данных: рендер списка задач, размещение обработчиков событий
const view = {
  renderTasks(tasks) {
    let list = document.querySelector(".list");
    const tasksHTML = "";
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      tasksHTML += `<li><span>${task.title}</span><button>Удалить</button></li>`;
      list.innerHTML = tasksHTML;
    }
  },
};

// обработка действий пользователя, обновление модели
const controller = {
  addTask() {},
  deleteTask() {},
  toggleTask() {},
};
