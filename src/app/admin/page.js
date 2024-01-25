'use client';
import { useState } from "react";
import { updateEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { Toaster, toast } from 'sonner'
import { auth } from "../../../firebase";
import {app} from '../../../firebase';
import { ref, set, onValue, child, get} from "firebase/database";
import Contraseña from "@/components/admin/contraseña";

export default function Admin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [user, setUser] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [dni, setDni] = useState('')
    const [cargo, setCargo] = useState('')
    const [horaE, setHoraE] = useState('')
    const [horaS, setHoraS] = useState('')
    const [area, setArea] = useState('')
    const [siglas, setSiglas] = useState('')

    function captarCambiosEmail(e){e.preventDefault(), setEmail(e.target.value)}
    function captarCambiosPassword(e){e.preventDefault(), setPassword(e.target.value)}
    function captarCambiosConfirmPassword(e){e.preventDefault(), setConfirmPassword(e.target.value)}
    function captarCambiosUser(e){e.preventDefault(), setUser(e.target.value)}
    function captarCambiosNombres(e){e.preventDefault(), setNombres(e.target.value)}
    function captarCambiosApellidos(e){e.preventDefault(), setApellidos(e.target.value)}
    function captarCambiosDni(e){e.preventDefault(), setDni(e.target.value)}
    function captarCambiosCargo(e){e.preventDefault(), setCargo(e.target.value)}
    function captarCambiosHoraE(e){e.preventDefault(), setHoraE(e.target.value)}
    function captarCambiosHoraS(e){e.preventDefault(), setHoraS(e.target.value)}
    function captarCambiosArea(e){e.preventDefault(), setArea(e.target.value)}
    function captarCambiosSiglas(e){e.preventDefault(), setSiglas(e.target.value)}
   
    return(
        <div className="px-4 py-10 lg:px-0 lg:py-20 bg-gray-100">
            <Toaster richColors visibleToasts={4} closeButton />
            <h1 className="font-black text-center text-3xl">Registro de nuevos colaboradores</h1>
            <div className="flex justify-center">
                <div className="flex gap-5 mt-10">
                    <div className="flex gap-1 items-center pb-2 border-b-2 border-gray-700 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        <h1 className="">Agregar</h1>
                    </div>
                    <div className="flex gap-1 items-center pb-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        <h1 className="">Editar</h1>
                    </div>
                    <div className="flex gap-1 items-center pb-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        <h1 className="">Consultar</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="flex-1 max-w-2xl">
                    <div className="flex-1 bg-white p-4 lg:p-10 border border-gray-200">
                        <h1 className="text-gray-600 text-center">Complete el siguiente formulario</h1>
                        <form className='mt-10'>
                            <h1 className="font-bold mt-5">Nombre completo *</h1>
                            <div className='flex flex-wrap items-center gap-3 lg:gap-2 mt-2'>
                                <input value={nombres} onChange={captarCambiosNombres} type='text' className={`focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 input text-xs w-full h-10 px-2 border border-gray-300`} placeholder='Nombres' />
                                <input value={apellidos} onChange={captarCambiosApellidos} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 border border-gray-300 input text-xs w-full h-10 px-2' placeholder='Apellidos' />
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-5'>
                                <div className="w-full lg:flex-1">
                                    <h1 className="font-bold">Correo *</h1>
                                    <input value={email} onChange={captarCambiosEmail} type='email' className='focus:outline-none focus:border-green-500 focus:ring-1 focus:invalid:border-red-500 focus:invalid:ring-red-500 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='gmorante@walshp.com.pe' />
                                </div>
                                <div className="w-full lg:flex-1 mt-5 lg:mt-0">
                                    <h1 className="font-bold">Nombre de usuario *</h1>
                                    <input value={user} onChange={captarCambiosUser} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='gmorante' />
                                </div>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-5'>
                                <div className="w-full lg:flex-1">
                                    <h1 className="font-bold">Contraseña * <span className="text-xs text-gray-600">Mínimo 6 caracteres</span></h1>
                                    <Contraseña password={password} captarCambiosPassword={captarCambiosPassword} />
                                </div>
                                <div className="w-full lg:flex-1 mt-5 lg:mt-0">
                                <h1 className="font-bold">DNI *</h1>
                                    <input value={dni} onChange={captarCambiosDni} type='number' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='' />
                                </div>
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-5'>
                                <div className="w-full lg:flex-1 mt-5 lg:mt-0">
                                    <h1 className="font-bold">Cargo *</h1>
                                    <input value={cargo} onChange={captarCambiosCargo} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='Director General' />
                                </div>
                            </div>
                            <h1 className="font-bold mt-5">Hora * <span className="text-gray-600 text-xs">Formato de 24 horas</span></h1>
                            <div className='flex flex-wrap items-center gap-3 lg:gap-2 mt-2'>
                                <input value={horaE} onChange={captarCambiosHoraE} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 lg:flex-1 input text-xs w-full h-10 px-2' placeholder='Entrada 08:00' />
                                <input value={horaS} onChange={captarCambiosHoraS} type='emtextail' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 lg:flex-1 input text-xs w-full h-10 px-2' placeholder='Salida 17:00' />
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-5'>
                                <div className="w-full lg:flex-1">
                                    <h1 className="font-bold">Área *</h1>
                                    <input value={area} onChange={captarCambiosArea} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='Direccción General' />
                                </div>
                                <div className="w-full lg:w-56 mt-5 lg:mt-0">
                                    <h1 className="font-bold">Siglas *</h1>
                                    <input value={siglas} onChange={captarCambiosSiglas} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='DG' />
                                </div>
                            </div>
                            <button onClick={Registrar} className='py-3 mt-5 w-full text-sm back-color text-white'>Registrar colaborador</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

    function Registrar(e){
        e.preventDefault()
        const starCountRef = ref(app);
        const userName = user.toString().replace("@walshp.com.pe","")
        if(nombres === '' || apellidos === '' || cargo === '' || area === '' || siglas === '' || dni === '' || email === '' || password.length < 6){
            toast.error(password.length < 6 ?'La contraseña debe contener 6 caracteres como mínimo':'Complete todos los campos')
        }else{
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    console.log('Usuario registrado con éxito')
                }).catch((error) => {
                    console.log(error)
            });
            get(child(starCountRef, 'Staff/' + userName)).then((snapshot) => {
                if (snapshot.exists()) {
                    toast.info('Este usuario ya está registrado')
                } else {
                    set(ref(app, 'Staff/' + userName), {
                        Nombres: `${nombres.toUpperCase()}`,
                        Apellidos: `${apellidos.toUpperCase()}`,
                        Correo: email,
                        HoraE: horaE,
                        HoraS: horaS,
                        Dni: dni,
                        Cargo: `${cargo.toUpperCase()}`,
                        Area: `${area.toUpperCase()}`,
                        Siglas: `${siglas.toUpperCase()}`,
                    })
                    toast.success('El usuario ha sido registrado con éxito')
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

}