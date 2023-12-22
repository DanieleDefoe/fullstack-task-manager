'use client';

import { useGlobalState } from '@/context';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, ModalContentStyled } from '..';
import { plus } from '@/utilities';

interface Props {
  task: TaskModel;
}

export function EditContent({ task }: Props) {
  const { allTasks, theme, closeAllModals } = useGlobalState();
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(
    task.description || ''
  );
  const [date, setDate] = useState<string>(task.date);
  const [isCompleted, setCompleted] = useState<boolean>(task.isCompleted);
  const [isImportant, setImportant] = useState<boolean>(task.isImportant);

  const handleChange =
    (name: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      switch (name) {
        case 'title':
          setTitle(event.target.value);
          break;
        case 'description':
          setDescription(event.target.value);
          break;
        case 'date':
          setDate(event.target.value);
          break;
        case 'completed':
          setCompleted((event.target as HTMLInputElement).checked);
          break;
        case 'important':
          setImportant((event.target as HTMLInputElement).checked);
          break;
        default:
          break;
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body: Partial<TaskModel> = {
      id: task.id,
      title,
      description,
      date,
      isCompleted,
      isImportant,
    };

    try {
      const res = await axios.put<TaskResponse>('/api/tasks', body);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.task) {
        toast.success('Task edited successfully.');
        closeAllModals!();
        await allTasks!();
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <ModalContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Edit a Task</h1>
      <fieldset className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title || ''}
          name="title"
          onChange={handleChange('title')}
          placeholder="прим. Получить оффер..."
        />
      </fieldset>
      <fieldset className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description || ''}
          name="description"
          rows={4}
          onChange={handleChange('description')}
          placeholder="прим. Получить оффер..."
        />
      </fieldset>
      <fieldset className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date || ''}
          name="date"
          onChange={handleChange('date')}
          placeholder="прим. Получить оффер..."
        />
      </fieldset>
      <fieldset className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          checked={isCompleted || false}
          name="completed"
          onChange={handleChange('completed')}
        />
      </fieldset>
      <fieldset className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          type="checkbox"
          id="important"
          checked={isImportant || false}
          name="important"
          onChange={handleChange('important')}
        />
      </fieldset>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Edit Task"
          icon={plus}
          padding={'0.8rem 2rem'}
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          background={theme!.colorGreenDark}
          color=""
        />
      </div>
    </ModalContentStyled>
  );
}
