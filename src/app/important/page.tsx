'use client';

import { Tasks } from '@/components';
import { useGlobalState } from '@/context';

function Important() {
  const { importantTasks } = useGlobalState();

  return <Tasks title="Important Tasks" tasks={importantTasks!} />;
}

export default Important;
