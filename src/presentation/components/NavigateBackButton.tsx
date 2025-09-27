"use client";

// This is an example of a client component

// Every client component must have the 'use client' directive at file top level

// This is the only way to use client functions with react hooks like:
// - useState
// - useEffect
// - useRef

// In this case, we are using the navigation hook from next to create
// a back button effect

// WARNING - YOU CAN USE SERVER FUNCTIONS IN CLIENT COMPONENT BUT
// JUST THE ONES WHO HAVE THE 'use server' DIRECTIVE AT FUNCTION OR FILE LEVEL!

import { useRouter } from "next/navigation";

export const NavigateBackButton = () => {
  const { back } = useRouter();

  function handleBack() {
    back();
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="text-gray-contrast bg-secondary py-1 px-4 rounded-md"
    >
      Navigate back
    </button>
  );
};
