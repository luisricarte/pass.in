import { IconButton } from "./icon-button"
import { Table } from "./table"
import { TableHeader } from "./table-header"
import { TableCell } from "./table-cell"
import { TableRow } from './table-row'
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendeees"
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br'


dayjs.extend(relativeTime);
dayjs.locale('pt-br')

export function AttendeeList() {

    const [search, setsearch] = useState('');
    const [page, setPage] = useState(1);

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setsearch(event.target.value);
    }

    function goToNextPage() {
        page < Math.ceil(attendees.length/10) && setPage(page+1);
    }
    function goToPreviousPage(){
        page > 1 && setPage(page-1)
    }
    return (
        <div className=" flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participante</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300"/>
                    <input value={search} onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm " type="text" placeholder="Buscar Participante..."  />
                </div>

            </div>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{width:38}}>
                            <input type="checkbox"  className="size-4 bg-black/20 rounded border-white/10 "/>
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data da inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <th style={{width:64}} className="py-3 px-4 text-sm font-semibold text-left "></th>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.slice((page-1) * 10, page * 10).map((attendee)=>{
                        return(
                            <TableRow className="hover:bg-white/10" key={attendee.id}>
                                <TableCell>
                                    <input type="checkbox"  className="size-4 bg-black/20 rounded border-white/10"/>
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent><MoreHorizontal className="size-4"/></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Mostrando {page * 10} de {attendees.length} itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8 ">
                                <span>Página {page} de {Math.ceil(attendees.length/10)}</span>  
                                <div className="flex gap-1.5">
                                    <IconButton><ChevronsLeft className="size-4"/></IconButton>
                                    <IconButton onClick={goToPreviousPage}><ChevronLeft className="size-4"/></IconButton>
                                    <IconButton onClick={goToNextPage}><ChevronRight className="size-4"/></IconButton>
                                    <IconButton><ChevronsRight className="size-4"/></IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </Table>
        </div>

    )
}