'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  // Placeholder component that will never render
  return null;
};

export default Redirect;
