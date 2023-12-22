import { prisma } from '@/utilities';
import { auth } from '@clerk/nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, date, isCompleted, isImportant } =
      (await req.json()) as TaskReqBody;

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: 'Title must be at least 3 characters long' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: { title, description, date, isCompleted, isImportant, userId },
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.log('ERROR CREATING A TASK: ', error);
    return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({ where: { userId } });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.log('ERROR GETTING TASKS: ', error);
    return NextResponse.json({ error: 'Error getting tasks' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, description, isCompleted, isImportant, date } =
      (await req.json()) as TaskModel;
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, isCompleted, isImportant, date },
    });

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.log('ERROR UPDATING A TASK: ', error);
    return NextResponse.json(
      { error: 'Error updating a task' },
      { status: 500 }
    );
  }
}
