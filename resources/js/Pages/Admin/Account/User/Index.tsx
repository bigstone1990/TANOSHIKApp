import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { useState, useMemo, useCallback } from 'react'

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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import DataTable from '@/Components/DataTable'
import { createColumns } from './columns'

import { PageProps } from '@/types'

const columnLabelMap: Record<string, string> = {
    id: "ID",
    name: "名前",
    kana: "かな",
    email: "メールアドレス",
    office_name: "所属事業所",
    can_manage_job_postings: "求人管理機能",
    can_manage_groupings: "グループ分け管理機能",
}

type User = {
    id: number
    office_id: number
    name: string
    kana: string
    email: string
    can_manage_job_postings: boolean
    can_manage_groupings: boolean
    office: {
        id: number
        name: string
    }
}

type IndexProps = PageProps<{
    staff: User[]
    members: User[]
    others: User[]
}>

export default function Index({ staff, members, others }: IndexProps) {
    const [activeTab, setActiveTab] = useState('staff')

    const { delete: destroy, processing } = useForm({})

    const staffTableData = useMemo(() => staff.map((user) => ({
        id: user.id,
        name: user.name,
        kana: user.kana,
        email: user.email,
        office_name: user.office?.name || '未所属',
        can_manage_job_postings: user.can_manage_job_postings,
        can_manage_groupings: user.can_manage_groupings,
    })), [staff])

    const memberTableData = useMemo(() => members.map((user) => ({
        id: user.id,
        name: user.name,
        kana: user.kana,
        email: user.email,
        office_name: user.office?.name || '未所属',
        can_manage_job_postings: user.can_manage_job_postings,
        can_manage_groupings: user.can_manage_groupings,
    })), [members])

    const otherTableData = useMemo(() => others.map((user) => ({
        id: user.id,
        name: user.name,
        kana: user.kana,
        email: user.email,
        office_name: user.office?.name || '未所属',
        can_manage_job_postings: user.can_manage_job_postings,
        can_manage_groupings: user.can_manage_groupings,
    })), [others])

    const searchableColumns = ['id', 'name', 'kana', 'email', 'office_name']

    const keywordPlaceholder = "キーワード検索（ID、 名前、 かな、メールアドレス、所属事業所）"

    const initialColumnVisibility = {
        kana: false,
        can_manage_job_postings: false,
        can_manage_groupings: false,
    }

    const handleDelete = useCallback((id: number) => {
        destroy(route('admin.account.users.destroy', { user: id }), {
            preserveScroll: true,
        })
    }, [destroy])

    const columns = useMemo(() => createColumns({
        onDelete: handleDelete,
        isProcessing: processing
    }), [handleDelete, processing])

    return (
        <AuthenticatedLayout>
            <Head title="ユーザー一覧" />

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>ユーザー一覧</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-end">
                        <Link
                            href={route('admin.account.users.create')}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            新規作成
                        </Link>
                    </div>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="staff">スタッフ</TabsTrigger>
                            <TabsTrigger value="member">メンバー</TabsTrigger>
                            <TabsTrigger value="other">その他</TabsTrigger>
                        </TabsList>
                        <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <div style={{ display: activeTab === 'staff' ? 'block' : 'none' }}>
                                <DataTable
                                    data={staffTableData}
                                    columns={columns}
                                    searchableColumns={searchableColumns}
                                    keywordPlaceholder={keywordPlaceholder}
                                    columnLabelMap={columnLabelMap}
                                    initialColumnVisibility={initialColumnVisibility}
                                    bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                    deleteDialogDisplayField="name"
                                />
                            </div>
                            <div style={{ display: activeTab === 'member' ? 'block' : 'none' }}>
                                <DataTable
                                    data={memberTableData}
                                    columns={columns}
                                    searchableColumns={searchableColumns}
                                    keywordPlaceholder={keywordPlaceholder}
                                    columnLabelMap={columnLabelMap}
                                    initialColumnVisibility={initialColumnVisibility}
                                    bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                    deleteDialogDisplayField="name"
                                />
                            </div>
                            <div style={{ display: activeTab === 'other' ? 'block' : 'none' }}>
                                <DataTable
                                    data={otherTableData}
                                    columns={columns}
                                    searchableColumns={searchableColumns}
                                    keywordPlaceholder={keywordPlaceholder}
                                    columnLabelMap={columnLabelMap}
                                    initialColumnVisibility={initialColumnVisibility}
                                    bulkDestroyRouteName="admin.account.users.bulk-destroy"
                                    deleteDialogDisplayField="name"
                                />
                            </div>
                        </div>
                    </Tabs>
                </div>
            </SidebarInset>
        </AuthenticatedLayout>
    )
}
