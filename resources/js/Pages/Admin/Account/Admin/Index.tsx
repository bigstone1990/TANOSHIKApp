import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import DataTable from '@/Components/DataTable'
import { columns } from './columns'

import { PageProps } from '@/types'

const columnLabelMap: Record<string, string> = {
    id: "ID",
    name: "名前",
    kana: "かな",
    email: "メールアドレス",
}

type Admin = {
    id: number
    name: string
    kana: string
    email: string
}

type IndexProps = PageProps<{
    admins: Admin[]
}>

export default function Dashboard({ admins }: IndexProps) {
    return (
        <AuthenticatedLayout>
            <Head title="管理者一覧" />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>管理者一覧</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-end">
                        <Link
                            href={route('admin.account.admins.create')}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            新規作成
                        </Link>
                    </div>
                    <DataTable
                        columns={columns}
                        data={admins}
                        searchableColumns={['name', 'kana', 'email']}
                        columnLabelMap={columnLabelMap}
                        initialColumnVisibility={{
                            id: false,
                            kana: false,
                        }}
                    />
                </div>
            </SidebarInset>
        </AuthenticatedLayout>
    )
}
