'use client';
import { useState } from "react";
import Link from "next/link";
import Agregar from "@/components/admin/agregar/agregar";
import Editar from "@/components/admin/editar/editar";
import Consultar from "@/components/admin/consultar/consultar";

export default function Admin(){
    const [agregar, setAgregar] = useState(true)
    const [editar, setEditar] = useState(false)
    const [consultar, setConsultar] = useState(false)
    const [logout, setLogout] = useState('close')
    
    function openCloseSesion(e){e.preventDefault(),setLogout(logout === 'open'?'close':'open')}
    function openCloseAgregar(e){
        e.preventDefault()
        setAgregar(true)
        setEditar(false)
        setConsultar(false)
    }
    function openCloseEditar(e){
        e.preventDefault()
        setAgregar(false)
        setEditar(true)
        setConsultar(false)
    }
    function openCloseConsultar(e){
        e.preventDefault()
        setAgregar(false)
        setEditar(false)
        setConsultar(true)
    }

    return(
        <div className="section">
            <div className="flex items-center justify-between px-4 lg:px-10 h-20 w-full color-walsh">
                <h1 className="text-white text-2xl">Walsh Perú</h1>
                <svg onClick={openCloseSesion} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="cursor-pointer bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <div className={`absolute top-16 right-4 lg:right-10 p-2 bg-white rounded-sm border border-gray-200 ${logout === 'close'?'hidden':'bloque'}`}>
                    <Link href='/login'>
                        <h1 className="text-sm">Cerrear sesión</h1>
                    </Link> 
                </div>
            </div>
            <div className="px-4 py-10 lg:px-0 lg:py-16 bg-gray-100">
                <h1 className="font-black text-center text-3xl">Panel</h1>
                <div className="flex justify-center mt-5">
                    <div className="flex gap-5">
                        <div onClick={openCloseAgregar} className={`flex gap-1 items-center cursor-pointer h-10 ${agregar === true?'border-b-2 border-gray-700':'border-b-2 border-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <h1 className="text-base">Agregar</h1>
                        </div>
                        <div onClick={openCloseEditar} className={`flex gap-1 items-center cursor-pointer h-10 ${editar === true?'border-b-2 border-gray-700':'border-b-2 border-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                            <h1 className="text-base">Editar</h1>
                        </div>
                        <div onClick={openCloseConsultar} className={`flex gap-1 items-center cursor-pointer h-10 ${consultar === true?'border-b-2 border-gray-700':'border-b-2 border-gray-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                            <h1  className="text-base">Consultar</h1>
                        </div>
                    </div>
                </div>
                <Agregar agregar={agregar} />
                <Editar editar={editar} />
                <Consultar consultar={consultar} />
            </div>
        </div>
    )
}