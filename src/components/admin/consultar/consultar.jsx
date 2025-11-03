import { useState, useEffect, Fragment } from "react"
import Image from "next/image";
import {app} from '../../../../firebase';
import { ref, onValue} from "firebase/database";
import { utils , writeFile} from 'xlsx';
import { Toaster, toast } from 'sonner'

let hoy = new Date();
let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() + 1 : '0' + '' + (hoy.getMonth() + 1)
let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate() 
let fecha = hoy.getFullYear() + '-' + mes + '-' + dia;

export default function Consultar(props){
    const [buscar, setBuscar] = useState('')
    const [colaborador, setColaborador] = useState()
    const [fechaInicio, setFechaInicio] = useState(fecha)
    const [fechaFin, setFechaFin] = useState(fecha)
    const [fecha1, setFecha1] = useState('2024-01-01')
    const [fecha2, setFecha2] = useState('')
    const [select, setSelect] = useState('usuario')
    const [tarde, setTarde] = useState('seleccionar')
    const [area, setArea] = useState('seleccionar')

    function capatarCambiosBuscar(e){e.preventDefault(),setBuscar(e.target.value)}
    function limpiar(e){e.preventDefault(), setBuscar('')}
    function captarCambiosSelect(e){e.preventDefault(), setSelect(e.target.value)}
    function captarCambiosTarde(e){e.preventDefault(), setTarde(e.target.value)}
    function captarCambiosArea(e){e.preventDefault(), setArea(e.target.value)}
    function capatarCambiosFechaInicio(e){ e.preventDefault(),setFechaInicio(e.target.value)}
    function capatarCambiosFechaFin(e){ e.preventDefault(),setFechaFin(e.target.value)}
    function buscarFecha(e){ e.preventDefault(),setFecha1(fechaInicio), setFecha2(fechaFin)}

    useEffect(() => {
        const staffRef = ref(app, "Staff");
        const marcacionesRef = ref(app, "marcaciones");

        let unsubscribeStaff;
        let unsubscribeMarc;

        unsubscribeStaff = onValue(staffRef, (staffSnap) => {
            let staffData = {};
            staffSnap.forEach((item) => {
                staffData[item.key] = item.val();
            });

            unsubscribeMarc = onValue(marcacionesRef, (marcSnap) => {
                const rec = [];
                marcSnap.forEach((item) => {
                    const data = item.key;
                    const userKey = data.split("-")[1]; // 👈 aquí tomamos el nombre del usuario que está dentro del registro (ej. "vmedina")
                    const staffInfo = staffData[userKey] || {}; // 👈 buscamos en Staff por ese nombre

                    rec.push({
                    key: item.key,
                        data: {
                            ...item.val(),
                            DNI: staffInfo.Dni || "N/A",
                        },
                    });
                });
                setColaborador(rec);
            });

        });

        // 👇 devolvemos una función de limpieza
        return () => {
            if (unsubscribeStaff) unsubscribeStaff();
            if (unsubscribeMarc) unsubscribeMarc();
        };
    }, []);

    console.log(colaborador)

    return(
        <div className={`${props.consultar === true?'bloque':'hidden'}`}>
            <Toaster richColors visibleToasts={4} closeButton />
            <div className="flex justify-center mt-10">
                <div className="flex-1 w-full lg:max-w-5xl bg-white p-4 lg:p-6 border border-gray-300">
                    <h1 className="text-center">Consultar marcaciones</h1>
                    <div className="flex justify-end items-center mt-10">
                        {
                            colaborador !== undefined?<div onClick={(e)=>{
                                e.preventDefault()
                                const ws = utils.json_to_sheet(
                                    colaborador.filter((item)=>{
                                        if(select === 'usuario'?item.key.includes(buscar):select === 'nombres'?item.data.nombres.toLowerCase().includes(buscar):item.data.apellidos.toLowerCase().includes(buscar)){
                                            if(fecha1 === '2024-01-01'?item.data.fecha:item.data.fecha >= fecha1 && item.data.fecha <= fecha2){
                                                if(tarde === 'seleccionar'?item.data.tarde:item.data.tarde === tarde){
                                                    if(area === 'seleccionar'?item.data.area:item.data.area === area){
                                                        return item
                                                    }
                                                }
                                            }
                                        }
                                }).flatMap((item) => {
                                    const base = {
                                        Nombres: item.data.nombres + ' ' + item.data.apellidos,
                                        DNI: item.data.DNI,
                                        Dia: item.data.dia,
                                        Área: item.data.area
                                    };

                                    return [
                                        { ...base, Registro: 'Entrada', Hora: item.data.horaE ? `${item.data.fecha} ${item.data.horaE}` : 'Sin registro' },
                                        { ...base, Registro: 'SalidaA', Hora: item.data.horaSA ? `${item.data.fecha} ${item.data.horaSA}` : 'Sin registro' },
                                        { ...base, Registro: 'RetornoA', Hora: item.data.horaRA ? `${item.data.fecha} ${item.data.horaRA}` : 'Sin registro' },
                                        { ...base, Registro: 'Salida', Hora: item.data.horaS ? `${item.data.fecha} ${item.data.horaS}` : 'Sin registro' }
                                    ];
                                })
                                )
                                const wb = utils.book_new();
                                utils.book_append_sheet(wb, ws, "Data");
                                writeFile(wb, "Reporte ReGIS.xlsx");
                                toast.success('El reporte se ha exportado con éxito')
                            }} className="flex items-center justify-center gap-2 cursor-pointer h-10 w-32 bg-gray-200 rounded-sm">
                                <h1 className="text-sm">Exportar</h1>
                                <Image src={'/sobresalir.png'} width={16} height={16} alt="Excel" />
                            </div>:null
                        }
                    </div>
                    <div className="flex flex-wrap justify-between items-end gap-2 p-4 mt-2 border border-gray-300 rounded-sm w-full">
                        <div className="w-full lg:flex-1">
                            <select onChange={captarCambiosSelect} name="Selecciar" className="cursor-pointer input h-8 text-sm px-2 bg-gray-200">
                                <option value="usuario" defaultValue>Usuario</option>
                                <option value="nombres">Nombres</option>
                                <option value="apellidos">Apellidos</option>
                            </select>
                            <div className="flex items-center border border-gray-300 w-full h-10 mt-2">
                                <input onChange={capatarCambiosBuscar} value={buscar} name="buscar" type="text" className="input w-full px-2 text-sm text-gray-600 h-9" placeholder={`${select === 'usuario'?'Usuario':select === 'nombres'?'Nombres':'Apellidos'}`} />
                                <div className='flex items-center justify-center w-12 h-10 '>
                                    <svg onClick={limpiar} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <h1 className="text-sm">Área</h1>
                            <select onChange={captarCambiosArea} name="Area" className="mt-1 cursor-pointer input h-10 text-sm px-2 border border-gray-300">
                                <option value="seleccionar" defaultValue>Opción</option>
                                <option value="DES">DES</option>
                                <option value="DEA">DEA</option>
                                <option value="GSI">GSI</option>
                                <option value="DOP">DOP</option>
                                <option value="GAA">GAA</option>
                                <option value="GCF">GCF</option>
                                <option value="GRHI">GRHI</option>
                                <option value="JHSE">JHSE</option>
                                <option value="DDN">DDN</option>
                                <option value="GRRHH">GRRHH</option>
                            </select>
                        </div>
                        <div className="section">
                            <h1 className="text-sm">Tarde</h1>
                            <select onChange={captarCambiosTarde} name="Tarde" className="mt-1 cursor-pointer input h-10 text-sm px-2 border border-gray-300">
                                <option value="seleccionar" defaultValue>Opción</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="section">
                            <h1 className="text-sm">Inicio</h1>
                            <input onChange={capatarCambiosFechaInicio} value={fechaInicio} type="date" min="2023-03-01" className="mt-1 text-sm border border-gray-300 h-10 px-2 input rounded-sm" />
                        </div>
                        <div className="section">
                            <h1 className="text-sm">Fin</h1>
                            <input onChange={capatarCambiosFechaFin} value={fechaFin} type="date" className="mt-1 text-sm border border-gray-200 h-10 px-2 input rounded-sm" />
                        </div>
                        <button onClick={buscarFecha} className="text-sm color-walsh text-white px-3 h-10 rounded-sm">Filtrar fecha</button>
                    </div>
                    <div className="overflow-y-auto overflow-x-auto p-4 mt-2 border border-gray-300 rounded-sm w-full" style={{height:'600px'}}>                        
                        {
                            colaborador === undefined?<h1 className="text-sm">Cargando</h1>:<table className="table-auto w-full ">
                                <thead>
                                    <tr className="h-10 text-sm">
                                        <th className="text-start">Nombres</th>
                                        <th className="text-start">DNI</th>
                                        <th className="text-start">Día</th>
                                        <th className="text-start">Tarde</th>
                                        <th className="text-start">Entrada</th>
                                        <th className="text-start">Salida A.</th>
                                        <th className="text-start">Retorno A.</th>
                                        <th className="text-start">Salida</th>
                                    </tr>
                                </thead>
                                <tbody>                                  
                                    {
                                        colaborador.map((item)=>{
                                            if(select === 'usuario'?item.key.includes(buscar):select === 'nombres'?item.data.nombres.toLowerCase().includes(buscar):item.data.apellidos.toLowerCase().includes(buscar)){
                                                if(fecha1 === '2024-01-01'?item.data.fecha:item.data.fecha >= fecha1 && item.data.fecha <= fecha2){
                                                    if(tarde === 'seleccionar'?item.data.tarde:item.data.tarde === tarde){
                                                        if(area === 'seleccionar'?item.data.area:item.data.area === area){
                                                            return <Fragment key={item.key}>
                                                                <tr className={`h-10 text-sm ${item.data.tarde === 'Si'?'border border-red-600 bg-red-50 rounded-sm':'border border-green-600 bg-green-50 rounded-sm'}`}>
                                                                    <td className="px-2">{item.data.nombres.charAt(0).toUpperCase().split(' ', 1) +  item.data.nombres.slice(1).toLowerCase().split(' ', 1) + ' ' + item.data.apellidos.charAt(0).toUpperCase().split(' ', 1) + item.data.apellidos.slice(1).toLowerCase().split(' ', 1)}</td>
                                                                    <td>{item.data.DNI}</td>
                                                                    <td>{item.data.dia}</td>
                                                                    <td>{item.data.tarde}</td>
                                                                    <td>{item.data.horaE}</td>
                                                                    <td>{item.data.horaSA}</td>
                                                                    <td>{item.data.horaRA}</td>
                                                                    <td>{item.data.horaS}</td>
                                                                </tr>
                                                            </Fragment>
                                                        }
                                                    }
                                                }
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

{/** 
    Fecha: item.data.fecha,

    useEffect(()=>{
        function GetData(){
            const starCountRef = ref(app, `marcaciones`);
            onValue(starCountRef, (snapshot) => {
                let rec = []
                snapshot.forEach((item)=>{
                    rec.push({key:item.key, "data":item.val()}) 
                })
                setColaborador(rec)
            });
        }
        return GetData();
    },[])

*/}