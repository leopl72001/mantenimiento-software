// ========== CLASE TASKMANAGER ==========
class TaskManager {
	constructor() {
		this.tasks = [];
		this.form = document.getElementById('form-tarea');
		this.titleInput = document.getElementById('titulo');
		this.detailInput = document.getElementById('detalle');
		this.taskList = document.getElementById('tareas');
		this.emptyMsg = document.getElementById('empty-msg');

		this.init();
	}

	// ========== INICIALIZAR ==========
	init() {
		this.form.addEventListener('submit', (e) => this.handleSubmit(e));
		this.render();
	}

	// ========== MANEJAR ENVÍO DEL FORMULARIO ==========
	handleSubmit(e) {
		e.preventDefault();
		const title = this.titleInput.value.trim();
		const detail = this.detailInput.value.trim();

		// Validar que el título no esté vacío
		if (!title) {
			alert('El título no puede estar vacío');
			this.titleInput.focus();
			return;
		}

		// Crear la tarea
		this.createTask(title, detail);

		// Limpiar formulario
		this.form.reset();
		this.titleInput.focus();
	}

	// ========== CREAR TAREA ==========
	createTask(title, detail) {
		const task = {
			id: Date.now(),
			title: title,
			detail: detail,
			createdAt: new Date().toLocaleString('es-ES')
		};

		// Guardar en el arreglo
		this.tasks.unshift(task);

		// Renderizar en pantalla
		this.render();
	}

	// ========== ELIMINAR TAREA ==========
	deleteTask(id) {
		const taskElement = document.querySelector(`[data-id="${id}"]`);
		if (taskElement) {
			taskElement.classList.add('task-delete');
			// Esperar a que termine la animación antes de eliminar
			setTimeout(() => {
				this.tasks = this.tasks.filter(task => task.id !== id);
				this.render();
			}, 600);
		}
	}

	// ========== RENDERIZAR TAREAS EN PANTALLA ==========
	render() {
		// Limpiar lista
		this.taskList.innerHTML = '';

		// Si no hay tareas, mostrar mensaje vacío
		if (this.tasks.length === 0) {
			this.emptyMsg.style.display = 'block';
			return;
		}

		this.emptyMsg.style.display = 'none';

		// Recorrer cada tarea y crear elemento HTML
		this.tasks.forEach(task => {
			const li = document.createElement('li');
			li.className = 'task-item';
			li.dataset.id = task.id;

			// Contenedor principal
			const main = document.createElement('div');
			main.className = 'task-main';

			// Título
			const titleEl = document.createElement('p');
			titleEl.className = 'task-title';
			titleEl.textContent = task.title;

			// Detalle (si existe)
			const detailEl = document.createElement('p');
			detailEl.className = 'task-detail';
			detailEl.textContent = task.detail || '(Sin detalles)';

			main.appendChild(titleEl);
			main.appendChild(detailEl);

			// Contenedor de acciones
			const meta = document.createElement('div');
			meta.className = 'task-meta';

			// Botón eliminar
			const deleteBtn = document.createElement('button');
			deleteBtn.className = 'btn icon';
			deleteBtn.type = 'button';
			deleteBtn.textContent = 'Eliminar';
			deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

			meta.appendChild(deleteBtn);

			// Agregar al item
			li.appendChild(main);
			li.appendChild(meta);

			// Agregar a la lista
			this.taskList.appendChild(li);
		});
	}
}

// ========== INICIALIZAR CUANDO CARGA EL DOM ==========
document.addEventListener('DOMContentLoaded', () => {
	new TaskManager();
});
