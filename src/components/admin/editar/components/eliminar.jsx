import { Fragment, useEffect, useState } from "react";
import {app} from '../../../../../firebase';
import { auth } from "../../../../../firebase";
import { deleteUser } from "firebase/auth";
import { ref, onValue, remove, get, child} from "firebase/database";
import { Toaster, toast } from 'sonner'

export default function Eliminar(props){
    const [datos, setDatos] = useState({email:'',usuario:'',nombres:'',apellidos:'',dni:'',cargo:'',horaE:'',horaS:'',area:'',siglas:''})

    useEffect(()=>{
        function GetData(){
            const starCountRef = ref(app, `Staff/${props.borrar}`);
            onValue(starCountRef, (snapshot) => {
                if(snapshot.exists()){
                    setDatos({
                        email:snapshot.val().Correo,
                        usuario:snapshot.key,
                        nombres:snapshot.val().Nombres,
                        apellidos:snapshot.val().Apellidos,
                        cargo:snapshot.val().Cargo,
                    })
                }else{
                    console.log('éxito')
                }
            });
        }
        return GetData();
    },[props.borrar])

    return(
        <div className={`absolute top-0 left-0 h-screen flex items-center justify-center w-full ${props.borrar === ''?'hidden':'bloque'}`}>
            <Toaster richColors visibleToasts={4} closeButton />
            <div className="fixed flex items-center justify-center h-screen w-full opacity px-4 lg:px-0">
                <div className=" bg-white p-4 lg:p-8 w-full md:w-7/12 lg:w-4/12 rounded-sm">
                    <h1 className="font-bold">Borrar cuenta</h1>
                    <div className="mt-5">
                        <div className="flex items-center gap-3 border border-red-500 bg-red-50 p-2">
                            <div className="section">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#DD524C" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </div>
                            <h1 className="text-xs text-red-500">Después de borrar esta cuenta, los datos se borrarán de manera permanente. Esta acción no se puede deshacer.</h1>
                        </div>
                    </div>
                    <h1 className=" text-sm text-gray-600 mt-5">Cuenta de usuario</h1>
                    <div className="section p-3 mt-1 bg-gray-100 rounded-sm">
                        {
                            datos.email === undefined?<h1 className="text-sm">La cuenta ya no existe</h1>:<Fragment>
                                <h1 className="font-medium mt-.5">{datos.nombres + ' ' + datos.apellidos}</h1>
                                <h1 className="text-gray-600 text-xs mt-.5">{datos.email}</h1>
                            </Fragment>
                        }
                    </div>
                    <div className="flex justify-center gap-2 mt-8">
                        <button onClick={props.cancelarEdicion} className="text-sm bg-gray-200 py-2 w-24 rounded-sm">Cancelar</button>
                        <button onClick={eliminar} className="text-sm bg-red-500 py-2 w-24 text-white rounded-sm">Borrar</button>
                    </div>    
                </div>
            </div>          
        </div>
    )

    function eliminar(e){
        e.preventDefault()
        const starCountRef = ref(app);
        get(child(starCountRef, 'Staff/' + props.borrar)).then((snapshot) => {
            if (snapshot.exists()) {
                deleteUser(auth.currentUser, datos.email).then(() => {
            
                }).catch((error) => {
                    toast.warning('La cuenta no ha podido ser eliminada')
                });
                remove(ref(app, `Staff/` + props.borrar)).then(() => {
                    toast.success('La cuenta ha sido elimado con éxito')
                }).catch((error) => {
                    toast.warning('La cuenta no ha podido ser eliminada')
                });
            } else {
                toast.info('Esta cuenta ya no existe')
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}