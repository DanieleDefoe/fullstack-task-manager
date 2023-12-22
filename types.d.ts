interface LayoutProps {
  children: React.ReactNode;
}

interface TaskModel {
  id: string;
  title: string;
  description: string | null;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface TaskReqBody {
  title: string;
  description?: string;
  date: string;
  isCompleted?: boolean;
  isImportant?: boolean;
}

interface TaskResponse {
  error?: string;
  task?: TaskModel;
  tasks?: Array<TaskModel>;
}

interface DeleteReqParams {
  params: {
    id: string;
  };
}
