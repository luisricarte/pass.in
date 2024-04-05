import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table"
import { TableHeader } from "./table-header"
import { TableCell } from "./table-cell"
import { TableRow } from './table-row'
export function AttendeeList() {
    return (
        <div className=" flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participante</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300"/>
                    <input className="bg-transparent flex-1 outline-none border-0 p-0 text-sm " type="text" placeholder="Buscar Participante..."  />
                </div>

            </div>
            <Table>
                <thead>
                    <TableRow >
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
                    {Array.from({length: 8}).map((_,i)=>{
                        return(
                            <TableRow key={i}>
                            <TableCell>
                                <input type="checkbox"  className="size-4 bg-black/20 rounded border-white/10"/>
                            </TableCell>
                            <TableCell>
                                12383
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-white">Duds Ricarte</span>
                                    <span>lsuircarite@cccufcgedbbr</span>
                                </div>
                            </TableCell>
                            <TableCell>7 dias atrás</TableCell>
                            <TableCell>3 dias atrás</TableCell>
                            <TableCell>
                                <IconButton transparent><MoreHorizontal className="size-4"/></IconButton>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de 228 itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8 ">
                                <span>Página 1 de 23</span>  
                                <div className="flex gap-1.5">
                                <IconButton><ChevronsLeft className="size-4"/></IconButton>
                                <IconButton><ChevronLeft className="size-4"/></IconButton>
                                <IconButton><ChevronRight className="size-4"/></IconButton>
                                <IconButton><ChevronsRight className="size-4"/></IconButton>
                                </div>
                            </div>

                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>

    )
}