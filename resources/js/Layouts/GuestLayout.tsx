import ApplicationLogo from '@/Components/ApplicationLogo';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import FlashMessage from '@/Components/FlashMessage';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <FlashMessage />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex items-center gap-2 self-center font-medium">
                        <div className="flex w-80 items-center justify-center rounded-md">
                            <ApplicationLogo />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
