import ApplicationLogo from '@/Components/ApplicationLogo';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import FlashMessage from '@/Components/FlashMessage';

export default function Guest({ children }: PropsWithChildren) {
    const appName = usePage().props.appName;
    return (
        <>
            <FlashMessage />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div className="flex items-center gap-2 self-center font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                        </div>
                        {appName}
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}
