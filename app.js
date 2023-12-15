$(document).ready(function () {
    const currentDate = new Date();
    let selectedDate = currentDate;
    let tasks = [];
    let reminders = [];
    let customTunes = [];

    // Schedule Section
    const renderSchedule = () => {
        $('#app').html(`
        <div class="schedule">
            <h2>Schedule</h2>
            <div class="calendar">
                <button onclick="navigate('yesterday')">Yesterday</button>
                <h3>${formatDate(selectedDate)}</h3>
                <button onclick="navigate('today')">Today</button>
                <button onclick="navigate('tomorrow')">Tomorrow</button>
            </div>
            <div class="add-task">
                <input type="text" placeholder="Add task..." onkeypress="addTask(event)">
                <div class="button-container">
                    <input type="time" class="time-picker" onchange="updateTaskTime(this.value)">
                    <button onclick="clearTaskTime()">Clear Time</button>
                </div>
            </div>
        </div>
      `);
    };

    // Tasks Section
    const renderTasks = () => {
        $('.schedule').append(`
        <div class="tasks">
            <h2>Tasks</h2>
            <div class="list">
                ${tasks.map((task, index) => renderTask(task, index)).join('')}
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

    // Reminder Tunes Section
    const renderReminderTunes = () => {
        $('.schedule').append(`
        <div class="reminder-tunes">
            <h2>Reminder Tunes</h2>
            <div class="add-reminder-tune">
                <select id="tuneSelect">
                    <option value="">Select Tune</option>
                    ${renderTuneOptions()}
                </select>
                <button onclick="setCustomTune()">Add Custom Tune</button>
            </div>
        </div>
      `);
    };

    const renderTuneOptions = () => {
        const defaultTunes = ['Tune 1', 'Tune 2', 'Tune 3', 'Tune 4', 'Tune 5'];
        return [...defaultTunes, ...customTunes].map((tune, index) => `<option value="${tune}">${tune}</option>`).join('');
    };

    const setCustomTune = () => {
        const newTune = prompt('Enter custom tune:');
        if (newTune && !customTunes.includes(newTune)) {
            customTunes.push(newTune);
            renderReminderTunes();
        }
    };

    // Notes Section
    const renderNotes = () => {
        $('.schedule').append(`
        <div class="user-notes">
            <h2>User Notes</h2>
            <input type="text" id="noteTitle" placeholder="Note Title...">
            <textarea id="noteContent" placeholder="Add your notes..."></textarea>
        </div>
      `);
    };

    // Navigation and Helper Functions
    const navigate = (direction) => {
        if (direction === 'yesterday') {
            selectedDate = new Date(selectedDate.getTime() - 86400000);
        } else if (direction === 'today') {
            selectedDate = currentDate;
        } else if (direction === 'tomorrow') {
            selectedDate = new Date(selectedDate.getTime() + 86400000);
        }
        renderSchedule();
        renderTasks();
        renderReminderTunes();
        renderNotes();
    };

    const deleteItem = (type, index) => {
        if (type === 'tasks') {
            tasks.splice(index, 1);
        } else if (type === 'reminders') {
            reminders.splice(index, 1);
        }
        renderTasks();
    };

    const addTask = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            const newTask = { title: event.target.value.trim(), description: '', time: '' };
            tasks.push(newTask);
            event.target.value = '';
            renderTasks();
        }
    };

    const updateTaskTime = (time) => {
        tasks[tasks.length - 1].time = time;
        renderTasks();
    };

    const clearTaskTime = () => {
        tasks[tasks.length - 1].time = '';
        renderTasks();
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Initial Rendering
    renderSchedule();
    renderTasks();
    renderReminderTunes();
    renderNotes();
});
