interface GlobalContextTypes {
  theme: Record<string, string>;
  tasks: Array<TaskModel>;
  completedTasks: Array<TaskModel>;
  importantTasks: Array<TaskModel>;
  incompleteTasks: Array<TaskModel>;
  isLoading: boolean;
  collapsed: boolean;
  createModal: boolean;
  editModal: boolean;
  editingTask: TaskModel | {};
  closeAllModals(): void;
  openCreateModal(): void;
  openEditModal(task: TaskModel): void;
  deleteTask(id: string): Promise<void>;
  allTasks: () => Promise<void>;
  updateTask(task: Partial<TaskModel>): Promise<void>;
  collapseMenu(): void;
}

interface GlobalUpdateContextTypes {
  setTheme: React.Dispatch<React.SetStateAction<number>>;
  setEditingTask: React.Dispatch<React.SetStateAction<TaskModel>>;
}
