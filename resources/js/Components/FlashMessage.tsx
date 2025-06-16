import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
  const { id, message, status } = usePage().props.flash;

  useEffect(() => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: undefined,
      showDuration: 300,
      hideDuration: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (status && message) {
        if (status === 'success') {
          toastr.success(message);
        } else if (status === 'error') {
          toastr.error(message);
        } else if (status === 'warning') {
          toastr.warning(message);
        } else {
          toastr.info(message);
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

  return null;
}
