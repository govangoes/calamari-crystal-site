// Todo List App JavaScript
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    cacheDOMElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addButton = document.getElementById('addButton');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        // Add todo events
        this.addButton.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter events
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed event
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTodos());

        // Auto-save on page unload
        window.addEventListener('beforeunload', () => this.saveToStorage());
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            this.showInputError('Please enter a task');
            return;
        }

        if (text.length > 100) {
            this.showInputError('Task too long (max 100 characters)');
            return;
        }

        const todo = {
            id: Date.now() + Math.random(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveToStorage();
        this.render();
        this.updateStats();
        
        // Add success feedback
        this.showSuccessFeedback();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.render();
    }

    clearCompletedTodos() {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
        
        // Add event listeners for the rendered todos
        this.addTodoEventListeners();
    }

    createTodoHTML(todo) {
        const completedClass = todo.completed ? 'completed' : '';
        const checkedClass = todo.completed ? 'checked' : '';
        const checkIcon = todo.completed ? '✓' : '';
        
        return `
            <li class="todo-item ${completedClass}" data-id="${todo.id}">
                <div class="todo-checkbox ${checkedClass}" data-action="toggle">
                    ${checkIcon}
                </div>
                <span class="todo-text">${this.escapeHTML(todo.text)}</span>
                <button class="delete-btn" data-action="delete">Delete</button>
            </li>
        `;
    }

    addTodoEventListeners() {
        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            
            const todoId = parseFloat(todoItem.dataset.id);
            const action = e.target.dataset.action;
            
            if (action === 'toggle') {
                this.toggleTodo(todoId);
            } else if (action === 'delete') {
                this.deleteTodo(todoId);
            }
        });
    }

    renderEmptyState() {
        const messages = {
            all: "No tasks yet. Add one above!",
            active: "No active tasks. Great job!",
            completed: "No completed tasks yet."
        };
        
        this.todoList.innerHTML = `
            <div class="empty-state">
                ${messages[this.currentFilter]}
            </div>
        `;
    }

    updateStats() {
        const activeTodos = this.todos.filter(todo => !todo.completed);
        const count = activeTodos.length;
        const taskText = count === 1 ? 'task' : 'tasks';
        
        this.todoCount.textContent = `${count} ${taskText} remaining`;
        
        // Show/hide clear completed button
        const hasCompleted = this.todos.some(todo => todo.completed);
        this.clearCompleted.style.display = hasCompleted ? 'block' : 'none';
    }

    saveToStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (e) {
            console.error('Could not save to localStorage:', e);
            alert('Could not save your todos. Storage might be full.');
        }
    }

    showInputError(message) {
        this.todoInput.style.borderColor = '#ff6b6b';
        this.todoInput.placeholder = message;
        
        setTimeout(() => {
            this.todoInput.style.borderColor = '';
            this.todoInput.placeholder = 'Enter a new task...';
        }, 2000);
    }

    showSuccessFeedback() {
        this.addButton.textContent = '✓ Added!';
        this.addButton.style.background = '#4caf50';
        
        setTimeout(() => {
            this.addButton.textContent = 'Add Task';
            this.addButton.style.background = '';
        }, 1000);
    }

    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export/Import functionality (bonus features)
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'my-todos.json';
        link.click();
    }

    importTodos(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                if (Array.isArray(importedTodos)) {
                    this.todos = importedTodos;
                    this.saveToStorage();
                    this.render();
                    this.updateStats();
                    alert('Todos imported successfully!');
                } else {
                    throw new Error('Invalid format');
                }
            } catch {
                alert('Error importing todos. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const todoApp = new TodoApp();
    
    // Make app globally accessible for debugging
    window.todoApp = todoApp;
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + / to focus input
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            todoApp.todoInput.focus();
        }
        
        // Escape to clear input
        if (e.key === 'Escape') {
            todoApp.todoInput.blur();
            todoApp.todoInput.value = '';
        }
    });
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.error('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.error('SW registration failed: ', registrationError);
            });
    });
}
