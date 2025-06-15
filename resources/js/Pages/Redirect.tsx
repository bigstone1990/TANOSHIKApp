import { useEffect } from 'react';
import { PageProps } from '@/types';

type RedirectProps = PageProps<{
  redirectTo: string;
}>;

export default function Redirect({ redirectTo }: RedirectProps) {
  useEffect(() => {
    alert('ページを再読み込みします');
    window.location.replace(redirectTo);
  }, [redirectTo]);

  return null;
}
