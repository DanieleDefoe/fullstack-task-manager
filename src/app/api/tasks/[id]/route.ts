import { prisma } from '@/utilities';
import { auth } from '@clerk/nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params: { id } }: DeleteReqParams
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const task = await prisma.task.delete({ where: { id } });

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.log('ERROR DELETING A TASK: ', error);
    return NextResponse.json(
      { error: 'Error deleting a task' },
      { status: 500 }
    );
  }
}
