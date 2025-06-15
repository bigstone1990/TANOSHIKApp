import AuthenticatedLayout from '@/Layouts/UserAuthenticatedLayout';
import MainContentLayout from '@/Layouts/MainContentLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sample
                </h2>
            }
        >
            <Head title="Sample" />

            <MainContentLayout>
                Sample Page!
            </MainContentLayout>
        </AuthenticatedLayout>
    );
}
