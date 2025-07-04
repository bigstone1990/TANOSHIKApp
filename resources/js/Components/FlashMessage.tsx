import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

export default function FlashMessage() {
  const { id, message, status } = usePage().props.flash

  useEffect(() => {
    if (!id || !message || !status) return

    requestAnimationFrame(() => {
      switch (status) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        default:
          toast.info(message)
      }

      const state = { ...window.history.state }
      if (state?.page?.props?.flash) {
        state.page.props.flash = {}
        window.history.replaceState(state, '')
      }
    })
  }, [id])

  return <Toaster />
}
