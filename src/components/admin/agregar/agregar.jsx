'use client';
import { useState } from "react";
import { Toaster, toast } from 'sonner'
import { auth } from "../../../../firebase";
import {app} from '../../../../firebase';
import { ref, set, child, get} from "firebase/database";
import Contraseña from "@/components/admin/contraseña";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Agregar(props){
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
        <div className={`${props.agregar === true?'bloque':'hidden'}`}>
            <Toaster richColors visibleToasts={4} closeButton />
            <div className="flex justify-center mt-10">
                <div className="flex-1 md:max-w-xl lg:max-w-2xl bg-white p-4 lg:p-6 border border-gray-200">
                    <h1 className="text-center">Agregar colaboradores</h1>
                    <form className='mt-10'>
                        <h1 className="font-bold mt-5 text-sm">Nombre completo *</h1>
                        <div className='flex flex-wrap items-center gap-3 lg:gap-2 mt-2'>
                            <input value={nombres} onChange={captarCambiosNombres} type='text' className={`focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 input text-xs w-full h-10 px-2 border border-gray-300`} placeholder='Nombres' required/>
                            <input value={apellidos} onChange={captarCambiosApellidos} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 border border-gray-300 input text-xs w-full h-10 px-2' placeholder='Apellidos' required/>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">Correo *</h1>
                                <input value={email} onChange={captarCambiosEmail} type='email' className='focus:outline-none focus:border-green-500 focus:ring-1 focus:invalid:border-red-500 focus:invalid:ring-red-500 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='gmorante@walshp.com.pe' required/>
                            </div>
                            <div className="w-full lg:flex-1 mt-3 lg:mt-0">
                                <h1 className="font-bold text-sm">Nombre de usuario *</h1>
                                <input value={user} onChange={captarCambiosUser} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='gmorante' required/>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">Contraseña * <span className="text-xs text-gray-600">Mínimo 6 caracteres</span></h1>
                                <Contraseña password={password} captarCambiosPassword={captarCambiosPassword} />
                            </div>
                            <div className="w-full lg:flex-1 mt-3 lg:mt-0">
                                <h1 className="font-bold text-sm">DNI *</h1>
                                <input value={dni} onChange={captarCambiosDni} type='number' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' required/>
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">Cargo *</h1>
                                <input value={cargo} onChange={captarCambiosCargo} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2' placeholder='Director General'required />
                            </div>
                        </div>
                        <h1 className="font-bold mt-5 text-sm">Hora * <span className="text-gray-600 text-xs">Formato de 24 horas</span></h1>
                        <div className='flex flex-wrap items-center gap-3 lg:gap-2 mt-2'>
                            <select onChange={captarCambiosHoraE} name="Area" className="mt-2 text-gray-600 flex-1 cursor-pointer input h-10 text-xs px-2 border border-gray-300">
                                <option value="seleccionar" defaultValue>Seleccionar</option>
                                <option value="08:00">08:00</option>
                                <option value="08:30">08:30</option>
                                <option value="09:00">09:00</option>
                                <option value="09:30">09:30</option>
                            </select>
                            <select onChange={captarCambiosHoraS} name="Area" className="mt-2 text-gray-600 flex-1 cursor-pointer input h-10 text-xs px-2 border border-gray-300">
                                <option value="seleccionar" defaultValue>Seleccionar</option>
                                <option value="08:00">17:00</option>
                                <option value="08:30">17:30</option>
                                <option value="09:00">18:00</option>
                                <option value="09:30">18:30</option>
                            </select>

                        </div>
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">Área *</h1>
                                <select onChange={captarCambiosArea} name="Area" className="mt-2 text-gray-600 w-full cursor-pointer input h-10 text-xs px-2 border border-gray-300">
                                    <option value="seleccionar" defaultValue>Seleccionar</option>
                                    <option value="DIRECCIÓN DE ESTUDIOS SOCIALES">DIRECCIÓN DE ESTUDIOS SOCIALES</option>
                                    <option value="DIRECCIÓN DE ESTUDIOS AMBIENTALES">DIRECCIÓN DE ESTUDIOS AMBIENTALES</option>
                                    <option value="DIRECCIÓN DE OPERACIONES">DIRECCIÓN DE OPERACIONES</option>
                                    <option value="DIRECCIÓN DE DESARROLLO DE NEGOCIO">DIRECCIÓN DE DESARROLLO DE NEGOCIOS</option>
                                    <option value="GERENCIA DE RECURSOS HUMANOS">GERENCIA DE RECURSOS HUMANOS</option>
                                    <option value="GERENCIA DE RECURSOS HÍDRICOS E INGENIERÍA">GERENCIA DE RECURSOS HÍDRICOS E INGENIERÍA</option>
                                    <option value="GERENCIA DE ADMINISTRACIÓN Y ABASTECIMIENTO">GERENCIA DE ADMINISTRACIÓN Y ABASTECIMIENTO</option>
                                    <option value="GERENCIA DE CONTABILIDAD Y FINANZAS">GERENCIA DE CONTABILIDAD Y FINANZAS</option>
                                    <option value="GERENCIA DE SIG E INNOVACIÓN">GERENCIA DE SIG E INNOVACIÓN</option>
                                    <option value="SOPORTE-JHSE">SOPORTE-JHSE</option>
                                </select>
                            </div>
                            <div className="w-full lg:w-56 mt-3 lg:mt-0">
                                <h1 className="font-bold text-sm">Siglas *</h1>
                                <select onChange={captarCambiosSiglas} name="Area" className="mt-2 text-gray-600 w-full cursor-pointer input h-10 text-xs px-2 border border-gray-300">
                                    <option value="seleccionar" defaultValue>Seleccionar</option>
                                    <option value="DES">DES</option>
                                    <option value="DEA">DEA</option>
                                    <option value="DOP">DOP</option>
                                    <option value="DDN">DDN</option>
                                    <option value="GRRHH">GRRHH</option>
                                    <option value="GRHI">GRHI</option>
                                    <option value="GAA">GAA</option>
                                    <option value="GCF">GCF</option>
                                    <option value="GSI">GSI</option>
                                    <option value="JHSE">JHSE</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={Registrar} className='py-3 mt-5 w-full text-sm color-walsh text-white'>Registrar colaborador</button>
                    </form>
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
                    set(ref(app, 'Staff/' + userName.toLowerCase()), {
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