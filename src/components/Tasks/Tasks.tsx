'use client';

import { useGlobalState } from '@/context';
import styled from 'styled-components';
import { CreateContent, EditContent, Modal, TaskItem } from '..';
import { plus } from '@/utilities';

const TasksStyled = styled.main`
  max-width: 100%;
  width: 100%;

  padding: 2rem;

  background-color: ${(props) => props.theme.colorBg2};
  color: ${(props) => props.theme.colorWhite};

  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    width: max-content;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey1};
    }
  }

  .tasks {
    margin: 2rem 0;
  }
`;

interface Props {
  title: string;
  tasks: Array<TaskModel>;
}

export function Tasks({ title, tasks }: Props) {
  const {
    theme,
    isLoading,
    openCreateModal,
    createModal,
    editModal,
    editingTask,
  } = useGlobalState();

  return (
    <TasksStyled theme={theme}>
      {createModal && (
        <Modal>
          <CreateContent />
        </Modal>
      )}

      {editModal && (
        <Modal>
          <EditContent task={editingTask as TaskModel} />
        </Modal>
      )}

      <h1>{title}</h1>
      {isLoading && (
        <div className="loader-container">
          <span className="loader" />
        </div>
      )}
      {!isLoading && (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <div className="create-task" onClick={openCreateModal!}>
            {plus}
            Add New Task
          </div>
        </div>
      )}
    </TasksStyled>
  );
}
