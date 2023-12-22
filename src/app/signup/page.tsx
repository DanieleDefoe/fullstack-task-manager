'use client';

import { SignUp } from '@clerk/nextjs';

function Signup() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <SignUp />
    </div>
  );
}

export default Signup;
