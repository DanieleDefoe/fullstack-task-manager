'use client';

import { useGlobalState } from '@/context';
import { edit, formatDate, trash } from '@/utilities';
import styled from 'styled-components';

interface Props {
  task: TaskModel;
}

const TaskItemStyled = styled.article`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  .date {
    margin-top: auto;
  }

  > h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;

      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }

    .incomplete {
      background: ${(props) => props.theme.colorDanger};
    }
  }
`;

export function TaskItem({ task }: Props) {
  const { title, description, date, isCompleted, id } = task;
  const { theme, deleteTask, updateTask, openEditModal } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted && (
          <button
            className="completed"
            onClick={() => updateTask!({ id, isCompleted: !isCompleted })}
          >
            Completed
          </button>
        )}
        {!isCompleted && (
          <button
            className="incomplete"
            onClick={() => updateTask!({ id, isCompleted: !isCompleted })}
          >
            Incomplete
          </button>
        )}
        <button className="edit" onClick={() => openEditModal!(task)}>
          {edit}
        </button>
        <button className="delete" onClick={() => deleteTask!(id)}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}
