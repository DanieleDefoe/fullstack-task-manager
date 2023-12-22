'use client';

import { Tasks } from '@/components';
import { useGlobalState } from '@/context';

export default function Home() {
  const { tasks } = useGlobalState();

  return <Tasks title="All tasks" tasks={tasks} />;
}
