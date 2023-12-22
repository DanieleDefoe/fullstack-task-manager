'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { themes } from '.';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

const GlobalContext = createContext<Partial<GlobalContextTypes>>({});

const GlobalUpdateContext = createContext<Partial<GlobalUpdateContextTypes>>(
  {}
);

export const GlobalProvider = ({ children }: LayoutProps) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<TaskModel>>([]);
  const [editingTask, setEditingTask] = useState<TaskModel | {}>({});
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { user } = useUser();

  const theme = themes[selectedTheme];

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<TaskResponse>('/api/tasks');

      if (res.data.tasks) {
        const sorted = res.data.tasks.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setTasks(sorted);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete<TaskModel>(`/api/tasks/${id}`);
      toast.success('Task deleted');
      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const updateTask = async (task: TaskModel) => {
    try {
      await axios.put(`/api/tasks`, task);
      toast.success('Task updated');

      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const openCreateModal = () => {
    setCreateModal(true);
  };

  const openEditModal = (task: TaskModel) => {
    setEditingTask(task);
    setEditModal(true);
  };

  const closeAllModals = () => {
    setEditingTask({});
    setCreateModal(false);
    setEditModal(false);
  };

  useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]);

  const completedTasks = useMemo(
    () => tasks.filter(({ isCompleted }) => isCompleted),
    [tasks]
  );

  const importantTasks = useMemo(
    () => tasks.filter(({ isImportant }) => isImportant),
    [tasks]
  );

  const incompleteTasks = useMemo(
    () => tasks.filter(({ isCompleted }) => !isCompleted),
    [tasks]
  );

  const collapseMenu = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        updateTask,
        isLoading,
        allTasks,
        completedTasks,
        importantTasks,
        incompleteTasks,
        createModal,
        editModal,
        closeAllModals,
        openCreateModal,
        openEditModal,
        collapsed,
        collapseMenu,
        editingTask,
      }}
    >
      <GlobalUpdateContext.Provider
        value={{ setTheme: setSelectedTheme, setEditingTask }}
      >
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
