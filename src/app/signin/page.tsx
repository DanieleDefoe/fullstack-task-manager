'use client';

import { SignIn } from '@clerk/nextjs';

function Signin() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <SignIn />
    </div>
  );
}

export default Signin;
