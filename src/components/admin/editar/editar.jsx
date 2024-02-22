import { useEffect, useState, Fragment } from "react"
import {app} from '../../../../firebase';
import { ref, onValue} from "firebase/database";
import Datos from "./components/datos";
import Eliminar from "./components/eliminar";

export default function Editar(props){
    const [buscar, setBuscar] = useState('')
    const [colaborador, setColaborador] = useState()
    const [user, setUser] = useState('')
    const [select, setSelect] = useState('usuario')
    const [borrar, setBorrar] = useState('')

    function capatarCambiosBuscar(e){e.preventDefault(),setBuscar(e.target.value)}
    function cancelarEdicion(e){ e.preventDefault(),setUser(''),setBorrar('')}
    function limpiar(e){e.preventDefault(), setBuscar('')}
    function captarCambiosUser(i){setUser(i)}
    function captarCambiosBorrar(i){setBorrar(i)}
    function captarCambiosSelect(e){e.preventDefault(), setSelect(e.target.value)}

    useEffect(()=>{
        function GetData(){
            const starCountRef = ref(app, `Staff`);
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

    return(
        <div className={`${props.editar === true?'bloque':'hidden'}`}>
            <div className="flex justify-center mt-10">
                <div className="flex-1 md:max-w-xl lg:max-w-2xl bg-white p-4 lg:p-6 border border-gray-200">
                    <h1 className="text-center">Editar colaboradores</h1>
                    {
                        colaborador === undefined?<h1></h1>:<h1 className="mt-5">{'Total: ' + colaborador.length}</h1>
                    }
                    <div className="flex items-center border border-gray-200 mt-5">
                        <div className="flex items-center justify-center h-6 w-12 border-r border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </div>
                        <input onChange={capatarCambiosBuscar} value={buscar} name="buscar" type="text" className="input w-full px-2 text-sm text-gray-600 h-10" placeholder={`${select === 'usuario'?'Usuario':select === 'nombres'?'Nombres':'Apellidos'}`} />
                        <div className='flex items-center justify-center w-12 h-10 '>
                            <svg onClick={limpiar} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <select onChange={captarCambiosSelect} name="Selecciar" className="cursor-pointer input h-6 text-sm px-2 border-l border-gray-200">
                            <option value="usuario" defaultValue>Usuario</option>
                            <option value="nombres">Nombres</option>
                            <option value="apellidos">Apellidos</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-4 border border-gray-200 mt-5" style={{height:'600px'}}>
                        {
                            colaborador === undefined?<h1>Cargando</h1>:<Fragment>
                                {
                                    colaborador.map((item)=>{
                                        if(select === 'usuario'?item.key.includes(buscar):select === 'nombres'?item.data.Nombres.toLowerCase().includes(buscar):item.data.Apellidos.toLowerCase().includes(buscar)){
                                            return <div key={item.key} className="flex items-center justify-between py-2 px-3 bg-gray-100">
                                                <div className="section">
                                                    <h1 className="text-gray-600 text-xs">{item.data.Cargo}</h1>
                                                    <h1 className="mt-.5 font-medium text-sm lg:text-base">{item.data.Nombres + ' ' + item.data.Apellidos}</h1>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div onClick={()=>captarCambiosUser(item.key)} className="flex items-center justify-center h-8 w-8 rounded-full bg-white cursor-pointer ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                        </svg>
                                                    </div>
                                                    <div onClick={()=>captarCambiosBorrar(item.key)} className="flex items-center justify-center h-8 w-8 rounded-full bg-red-500 cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    })
                                }
                            </Fragment>
                        }
                    </div>
                    <Datos cancelarEdicion={cancelarEdicion} user={user} />
                    <Eliminar borrar={borrar} cancelarEdicion={cancelarEdicion} />
                </div>
            </div>
        </div>
    )
}