import { PropsWithChildren } from 'react'
import FlashMessage from '@/Components/FlashMessage'
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function Authenticated({
    children,
}: PropsWithChildren) {
    return (
        <>
            <FlashMessage />
            <SidebarProvider>
                <AppSidebar />
                {children}
            </SidebarProvider>
        </>
    )
}
