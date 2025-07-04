import ApplicationLogo from '@/Components/ApplicationLogo'
import { PropsWithChildren } from 'react'
import FlashMessage from '@/Components/FlashMessage'

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <FlashMessage />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex items-center gap-2 self-center font-medium">
                        <div className="flex justify-center">
                            <ApplicationLogo className="w-80 h-auto"/>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}
