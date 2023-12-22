import { authMiddleware } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default authMiddleware({});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
