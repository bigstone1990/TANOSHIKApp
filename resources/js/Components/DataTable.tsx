import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import InputError from '@/Components/InputError'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchableColumns?: string[]
    columnLabelMap?: Record<string, string>
    initialColumnVisibility?: VisibilityState
    deleteUrl: string
}

export default function DataTable<TData extends { id: number | string }, TValue>({
    columns,
    data,
    searchableColumns = [],
    columnLabelMap = {},
    initialColumnVisibility = {},
    deleteUrl,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(initialColumnVisibility)
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")

    const [open, setOpen] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const errors = usePage().props.errors

    const table = useReactTable({
        data,
        columns,
        getRowId: (row) => String(row.id),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, value) => {
            const columnsToSearch = searchableColumns.length > 0
                ? searchableColumns
                : columns
                    .map(col => {
                        if ('accessorKey' in col && typeof col.accessorKey === 'string') {
                            return col.accessorKey
                        }
                        if ('id' in col && typeof col.id === 'string') {
                            return col.id
                        }
                        return null
                    })
                    .filter((key): key is string => key !== null)

            const keywords = value
                .split(/[\s　]+/)
                .filter((keyword: string) => keyword.trim() !== '')
                .map((keyword: string) => keyword.toLowerCase())

            if (keywords.length === 0) return true

            const rowData = columnsToSearch
                .map(column => {
                    const cellValue = row.getValue(column) as string
                    return cellValue?.toLowerCase() || ''
                })
                .join(' ')

            return keywords.every((keyword: string) => rowData.includes(keyword))
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    })

    const handleBulkDelete: () => void = () => {
        setIsProcessing(true)

        router.post(route(deleteUrl), {
            ids: table.getFilteredSelectedRowModel().rows.map((row) => Number(row.id)),
        }, {
            preserveScroll: true,
            onFinish: () => {
                setOpen(false)
                setIsProcessing(false)
            },
        })
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder="キーワード検索"
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            列 <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {columnLabelMap[column.id] ?? column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredRowModel().rows.length}件中
                    {table.getFilteredSelectedRowModel().rows.length}件を選択中
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.toggleAllRowsSelected(true)}
                        disabled={table.getIsAllRowsSelected()}
                    >
                        全件選択
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.toggleAllRowsSelected(false)}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                    >
                        全件解除
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0 || isProcessing}
                    >
                        一括削除
                    </Button>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{table.getFilteredSelectedRowModel().rows.length}件のデータを削除しますか？</AlertDialogTitle>
                                <AlertDialogDescription>
                                    この操作は取り消すことができません。<br />選択された{table.getFilteredSelectedRowModel().rows.length}件を完全に削除し、すべてのデータが失われます。
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleBulkDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={isProcessing}
                                >
                                    削除する
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            {errors && Object.keys(errors).length > 0 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {Object.entries(errors).map(([field, messages]) => (
                            <div key={field}>
                                {Array.isArray(messages) 
                                    ? messages.map((message: string, index: number) => (
                                        <InputError key={`${field}-${index}`} message={message} />
                                    ))
                                    : <InputError key={field} message={messages} />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    データがみつかりません
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        前へ
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        次へ
                    </Button>
                </div>
            </div>
        </div>
    )
}
