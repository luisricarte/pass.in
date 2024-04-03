import { Search } from "lucide-react"

export function AttendeeList() {
    return (
        <div>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participante</h1>
                <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300"/>
                    <input className="bg-transparent flex-1 outline-none" type="text" placeholder="Buscar Participante..."  />
                </div>

            </div>

            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>
                            Participante
                        </th>
                        <th>
                            Data da inscrição
                        </th>
                        <th>
                            Data do check-in
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" name="" id="" />

                        </td>
                        <td>
                            12383
                        </td>
                        <td>
                            <div>
                                <span>Duds Ricarte</span>
                                <span>lsuircarite@cccufcgedbbr</span>
                            </div>
                        </td>
                        <td>7 dias atrás</td>
                        <td>3 dias atrás</td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>

                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}