import { useEffect, useState } from "react";
import {app} from '../../../../../firebase';
import { ref, onValue, update} from "firebase/database";
import { Toaster, toast } from 'sonner'

export default function Datos(props){
    const [datos, setDatos] = useState({email:'',usuario:'',nombres:'',apellidos:'',dni:'',cargo:'',horaE:'',horaS:'',area:'',siglas:''})

    function captarCambiosNombres(e){setDatos({...datos, nombres:e.target.value})}
    function captarCambiosApellidos(e){setDatos({...datos, apellidos:e.target.value})}
    function captarCambiosDni(e){setDatos({...datos, dni:e.target.value})}
    function captarCambiosCargo(e){setDatos({...datos, cargo:e.target.value})}
    function captarCambiosHoraE(e){setDatos({...datos, horaE:e.target.value})}
    function captarCambiosHoraS(e){setDatos({...datos, horaS:e.target.value})}
    function captarCambiosArea(e){setDatos({...datos, area:e.target.value})}
    function captarCambiosSiglas(e){setDatos({...datos, siglas:e.target.value})}

    useEffect(()=>{
        function GetData(){
            const starCountRef = ref(app, `Staff/${props.user}`);
            onValue(starCountRef, (snapshot) => {
                if(snapshot.exists()){
                    setDatos({
                        email:snapshot.val().Correo,
                        usuario:snapshot.key,
                        nombres:snapshot.val().Nombres,
                        apellidos:snapshot.val().Apellidos,
                        dni:snapshot.val().Dni, 
                        cargo:snapshot.val().Cargo,
                        horaE:snapshot.val().HoraE,
                        horaS:snapshot.val().HoraS,
                        area:snapshot.val().Area,
                        siglas:snapshot.val().Siglas
                    })
                }
            });
        }
        return GetData();
    },[props.user])
    
    console.log(datos.nombres)

    return(
        <div className={`absolute top-0 left-0 h-screen flex items-center justify-center w-full ${props.user === ''?'hidden':'bloque'}`}>
            <Toaster richColors visibleToasts={4} closeButton />
            <div className="fixed flex items-center justify-center h-screen w-full opacity px-4 lg:px-0">
                <div className=" bg-white p-4 lg:p-8 w-full md:w-8/12 lg:w-5/12 rounded-sm">
                    <h1 className="text-center">Editar datos</h1>
                    <form className='mt-5 w-full'>
                        <h1 className="font-bold mt-5 text-sm">Nombre completo</h1>
                        <div className='flex items-center gap-3 lg:gap-2 mt-2'>
                            <input onChange={captarCambiosNombres} value={datos.nombres} name="nombre" type='text' className={`focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 input text-xs w-full h-10 px-2 border border-gray-300 text-gray-600 rounded-sm`} />
                            <input onChange={captarCambiosApellidos} value={datos.apellidos} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 lg:flex-1 border border-gray-300 input text-xs w-full h-10 px-2 text-gray-60 rounded-sm' />
                        </div>  
                        <div className='flex items-center gap-2 mt-5'>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">DNI</h1>
                                <input onChange={captarCambiosDni} value={datos.dni} type='number' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                            <div className="w-full lg:flex-1">
                                <h1 className="font-bold text-sm">Cargo</h1>
                                <input onChange={captarCambiosCargo} value={datos.cargo} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                        </div>                        
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="flex-1">
                                <h1 className="font-bold text-sm">Entrada</h1>
                                <input onChange={captarCambiosHoraE} value={datos.horaE} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                            <div className="flex-1">
                                <h1 className="font-bold text-sm">Salida</h1>
                                <input onChange={captarCambiosHoraS} value={datos.horaS} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                        </div>
                        <div className='flex flex-wrap items-center gap-2 mt-5'>
                            <div className="flex-1">
                                <h1 className="font-bold text-sm">Área</h1>
                                <input onChange={captarCambiosArea} value={datos.area} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                            <div className="flex-1">
                                <h1 className="font-bold text-sm">Siglas</h1>
                                <input onChange={captarCambiosSiglas} value={datos.siglas} type='text' className='focus:outline-none focus:border-green-500 focus:ring-1 border border-gray-300 input text-xs w-full h-10 px-2 mt-2 text-gray-60 rounded-sm' />
                            </div>
                        </div>
                    </form> 
                    <div className="flex justify-center gap-2 mt-8">
                        <button onClick={props.cancelarEdicion} className="text-sm bg-gray-200 py-2 px-3 rounded-sm">Cancelar</button>
                        <button onClick={Actualizar} className="text-sm color-walsh py-2 px-3 text-white rounded-sm">Actualizar</button>
                    </div>    
                </div>
            </div>          
        </div>
    )

    function Actualizar(e){
        e.preventDefault()
        update(ref(app, `Staff/` + props.user), {
            Nombres: `${datos.nombres.toUpperCase()}`,
            Apellidos: `${datos.apellidos.toUpperCase()}`,
            HoraE: datos.horaE,
            HoraS: datos.horaS,
            Dni: datos.dni,
            Cargo: `${datos.cargo.toUpperCase()}`,
            Area: `${datos.area.toUpperCase()}`,
            Siglas: `${datos.siglas.toUpperCase()}`,
        }).then(() => {
            toast.success('Los datos se han actualizado con éxito')
          })
          .catch((error) => {
            toast.warning('Los datos no se han podido actualizar')
          });
    }
}