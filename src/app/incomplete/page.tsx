'use client';

import { Tasks } from '@/components';
import { useGlobalState } from '@/context';

function Incomplete() {
  const { incompleteTasks } = useGlobalState();

  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks!} />;
}

export default Incomplete;
