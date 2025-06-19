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
