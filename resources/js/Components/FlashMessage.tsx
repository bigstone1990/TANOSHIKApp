import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function FlashMessage() {
  const { id, message, status } = usePage().props.flash;

  useEffect(() => {
    requestAnimationFrame(() => {
      if (status && message) {
        if (status === 'success') {
          toast.success(message);
        } else if (status === 'error') {
          toast.error(message);
        } else if (status === 'warning') {
          toast.warning(message);
        } else {
          toast.info(message);
        }

        if (typeof window !== 'undefined') {
          const state = { ...window.history.state };
          if (state?.page?.props?.flash) {
            state.page.props.flash = {};
            window.history.replaceState(state, '');
          }
        }
      }
    });
  }, [id]);

  return (
    <Toaster />
  );
}
