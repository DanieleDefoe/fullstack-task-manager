'use client';

import { Tasks } from '@/components';
import { useGlobalState } from '@/context';

function Completed() {
  const { completedTasks } = useGlobalState();

  return <Tasks title="Completed Tasks" tasks={completedTasks!} />;
}

export default Completed;
