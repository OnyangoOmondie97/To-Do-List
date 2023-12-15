$(document).ready(function () {
    const currentDate = new Date();
    let selectedDate = currentDate;
    let tasks = [];
    let reminders = [];
  
    const renderLists = () => {
      $('#app').html(`
        <div class="todo-app">
          <h1>Google-Inspired To-Do List</h1>
          <div class="calendar">
            <h2>${formatDate(selectedDate)}</h2>
            <button onclick="navigate('yesterday')">Yesterday</button>
            <button onclick="navigate('today')">Today</button>
            <button onclick="navigate('tomorrow')">Tomorrow</button>
          </div>
          <div class="lists-container">
            <div class="list">
              <h2>Tasks</h2>
              ${tasks.map((task, index) => renderTask(task, index)).join('')}
            </div>
            <div class="list">
              <h2>Reminders</h2>
              ${reminders.map((reminder, index) => renderReminder(reminder, index)).join('')}
            </div>
          </div>
          <div class="add-task">
            <input type="text" placeholder="Add task..." onkeypress="addTask(event)">
            <div class="button-container">
              <input type="time" class="time-picker" onchange="updateTaskTime(this.value)">
              <button onclick="clearTaskTime()">Clear Time</button>
            </div>
          </div>
          <div class="add-reminder">
            <input type="text" placeholder="Add reminder..." onkeypress="addReminder(event)">
            <div class="button-container">
              <input type="time" class="time-picker" onchange="updateReminderTime(this.value)">
              <button onclick="clearReminderTime()">Clear Time</button>
            </div>
          </div>
        </div>
      `);
    };
  
    const renderTask = (task, index) => `
      <div class="task">
        <span>${task.title}</span>
        <p>${task.description}</p>
        <div class="button-container">
          <button onclick="deleteItem('tasks', ${index})">Delete</button>
        </div>
      </div>
    `;
  
    const renderReminder = (reminder, index) => `
      <div class="reminder">
        <span>${reminder.title}</span>
        <p>${reminder.description}</p>
        <div class="button-container">
          <button onclick="deleteItem('reminders', ${index})">Delete</button>
          <button onclick="setTune(${index})">Set Tune</button>
        </div>
      </div>
    `;
  
    const navigate = (direction) => {
      if (direction === 'yesterday') {
        selectedDate = new Date(selectedDate.getTime() - 86400000);
      } else if (direction === 'today') {
        selectedDate = currentDate;
      } else if (direction === 'tomorrow') {
        selectedDate = new Date(selectedDate.getTime() + 86400000);
      }
      renderLists();
    };
  
    const deleteItem = (type, index) => {
      if (type === 'tasks') {
        tasks.splice(index, 1);
      } else if (type === 'reminders') {
        reminders.splice(index, 1);
      }
      renderLists();
    };
  
    const addTask = (event) => {
      if (event.key === 'Enter' && event.target.value.trim() !== '') {
        const newTask = { title: event.target.value.trim(), description: '', time: '' };
        tasks.push(newTask);
        event.target.value = '';
        renderLists();
      }
    };
  
    const addReminder = (event) => {
      if (event.key === 'Enter' && event.target.value.trim() !== '') {
        const newReminder = { title: event.target.value.trim(), description: '', time: '' };
        reminders.push(newReminder);
        event.target.value = '';
        renderLists();
      }
    };
  
    const setTune = (index) => {
      const tune = prompt('Enter tune for reminder:');
      if (tune) {
        // Here you can implement logic to set the tune for the reminder
        console.log(`Tune set for "${reminders[index].title}": ${tune}`);
      }
    };
  
    const formatDate = (date) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };
  
    const updateTaskTime = (time) => {
      tasks[tasks.length - 1].time = time;
      renderLists();
    };
  
    const clearTaskTime = () => {
      tasks[tasks.length - 1].time = '';
      renderLists();
    };
  
    const updateReminderTime = (time) => {
      reminders[reminders.length - 1].time = time;
      renderLists();
    };
  
    const clearReminderTime = () => {
      reminders[reminders.length - 1].time = '';
      renderLists();
    };
  
    renderLists();
  });
  