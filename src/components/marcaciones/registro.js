'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Alert } from './alert';
import { AlertDouble } from './alert';
import { AlertRetornoA } from './alert';
import {app} from '../../../firebase';
import { ref, onValue, child, get, update} from "firebase/database";

export default function Registro(props) {
    const router = useRouter();
    const [siglas, setSiglas] = useState('')
    const [alert, setAlert] = useState(false)
    const [alertDo, setAlertDo] = useState(false)
    const [alertRA, setAlertRA] = useState(false)
    const [state, setState] = useState('');
    const [nom, setNom] = useState('');
    const [ape, setApe] = useState('');
    const [ent, setEnt] = useState('');
    const [ar, setAr] = useState('');
    const [car, setCar] = useState('');
    const [dni, setDni] = useState('');
    const [not, setNot] = useState('');
    const [ga, setGa] = useState('');
    const [hor, setHor] = useState('');
    const [cor, setCor] = useState('');
    const [notify, setNotify] = useState(false);
    const [horaE, setHoraE] = useState('');
    const [horaSA, setHoraSA] = useState('');
    const [horaRA, setHoraRA] = useState('');
    const [horaS, setHoraS] = useState('');

    function captarCambios(e){e.preventDefault(), setState(e.target.value)}

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            const starCountRef = ref(app, `Staff/${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setNom(snapshot.val().Nombres)
                    setApe(snapshot.val().Apellidos)
                    setAr(snapshot.val().Area)
                    setCar(snapshot.val().Cargo)
                    setDni(snapshot.val().Dni)
                    setSiglas(snapshot.val().Siglas)
                    setCor(correo)
                    setEnt(snapshot.val().HoraE)
                } else {
                    console.log("No data available");
                }
            });
        }
        return GetDatos();
    }, [props.email])

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            let hoy = new Date();
            let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() : '0' + '' + (hoy.getMonth() + 1)
            let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate() 
            let id = hoy.getFullYear().toString() + mes.toString() + dia.toString();
            const starCountRef = ref(app, `marcaciones/${id}-${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setHoraE(snapshot.val().horaE)
                    setHoraS(snapshot.val().horaS)
                    setHoraSA(snapshot.val().horaSA)
                    setHoraRA(snapshot.val().horaRA)
                } else {
                    setHoraE('')
                    setHoraS('')
                    setHoraSA('')
                    setHoraRA('')
                }
            });
        }
        return GetDatos();
    }, [props.email])

    function closeAlert(e){e.preventDefault(), setAlert(false)}
    function closeAlertDo(e){e.preventDefault(), setAlertDo(false)}
    function closeAlertRA(e){e.preventDefault(), setAlertRA(false)}

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex-1 max-w-xl px-4 lg:px-0'>
                <form className='p-4 border border-gray-300 bg-white'>
                    <select onChange={captarCambios} name="select" className='w-full lg:flex-1 text-sm px-2 h-10 w-full border border-gray-300 rounded-md mt-6 cursor-pointer'>
                        <option value="seleccion" defaultValue>Seleccione una opción</option>
                        <option value="entrada">1. Entrada al teletrabajo</option>
                        <option value="horaA">2. Salida al refrigerio</option>
                        <option value="retornoA">3. Retorno del refrigerio</option>
                        <option value="salida">4. Salida del teletrabajo</option>
                    </select>
                    <h1 className='flex gap-1 text-sm h-6 mt-2'><span className='flex items-center'>*</span>Por favor, verifique sus datos antes de registrar su hora.</h1>
                    <div className='flex flex-wrap gap-3 mt-5'>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Nombres</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full' placeholder={nom} disabled/>
                        </div>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Apellidos</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full' placeholder={ape} disabled/>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 mt-3 lg:mt-5 '>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>DNI</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full' placeholder={dni} disabled/>
                        </div>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Área</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full' placeholder={ar} disabled/>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-3 mt-3 lg:mt-5 '>
                        <div className='w-full lg:flex-1'>
                            <h1 className='text-sm'>Cargo</h1>
                            <input className='h-10 px-3 rounded-md text-sm border border-gray-300 mt-2 w-full' placeholder={car} disabled/>
                        </div>
                    </div>
                    <div className='p-4 border border-gray-300 mt-5 rounded-md'>
                        <h1 className='text-sm underline'>Historial del registro de horas</h1>
                        {
                            horaE === undefined?<h1></h1>:<div className={`flex gap-1 mt-2 ${horaE == ''?'hidden':'block'}`}>
                                <h1 className='text-sm'>1. Hora de entrada al teletrabajo: <span className='font-bold'>{horaE} {(parseInt(horaE.toString().slice(0,2))*60 + parseInt(horaE.toString().slice(3,5))) <= 720?'a.m.':'p.m.'}</span></h1>
                            </div>
                        }
                        {
                            horaSA === undefined?<h1></h1>:<div className={`flex gap-1 mt-2 ${horaSA == ''?'hidden':'block'}`}>
                                <h1 className='text-sm'>2. Hora de salida al refrigerio: <span className='font-bold'>{horaSA} {(parseInt(horaSA.toString().slice(0,2))*60 + parseInt(horaSA.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                            </div>
                        }
                        {
                            horaRA === undefined?<h1></h1>:<div className={`flex gap-1 mt-2 ${horaRA == ''?'hidden':'block'}`}>
                                <h1 className='text-sm'>3. Hora de retorno del refrigerio: <span className='font-bold'>{horaRA} {(parseInt(horaRA.toString().slice(0,2))*60 + parseInt(horaRA.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                            </div>
                        }
                        {
                            horaS === undefined?<h1></h1>:<div className={`flex gap-1 mt-2 ${horaS == ''?'hidden':'block'}`}>
                                <h1 className='text-sm'>4. Hora de salida del teletrabajo: <span className='font-bold'>{horaS} {(parseInt(horaS.toString().slice(0,2))*60 + parseInt(horaS.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                            </div>
                        }
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center w-full mt-5'>
                        {
                            state === 'entrada'?<button onClick={entrada} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar entrada al teletrabajo</button>:
                            state === 'horaA'?<button onClick={salidaA} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar salida al refrigerio</button>:
                            state === 'retornoA'?<button onClick={retornoA} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar retorno del refrigerio</button>:
                            state === 'salida'?<button onClick={salida} className='text-sm w-full back-color h-10 rounded-md text-center cursor-pointer hover:animate-pulse w-full border border-gray-300 text-white' style={{backgroundColor:'rgb(69, 128, 94)'}}>Marcar salida del teletrabajo</button>:
                            <div className='flex w-full items-center justify-center text-sm bg-gray-200 h-10 rounded-md text-gray-400 cursor-pointer w-full border border-gray-300 cursor-not-allowed'>Seleccione una opción</div>
                        }
                        <button onClick={router.reload} className='text-sm h-10 text-white rounded-md text-center cursor-pointer w-full back-color'>Cerrar sesión</button>
                            
                    </div>
                </form>
                {!alert?null:<Alert not={not} ga={ga} hor={hor} closeAlert={closeAlert} />}
                {!alertDo?null:<AlertDouble notify={notify} closeAlertDo={closeAlertDo} />}
                {!alertRA?null:<AlertRetornoA alertRA={alertRA} closeAlertRA={closeAlertRA} />}
            </div>
        </div>
    )

    async function entrada(e){
        e.preventDefault();
        let hoy = new Date();
        let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() : '0' + '' + (hoy.getMonth() + 1)
        let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate()
        let id = hoy.getFullYear().toString() + mes.toString() + dia.toString();
        let fecha = hoy.getFullYear() + '-' + mes + '-' + dia;
        let getDia = hoy.getDay() 

        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD_WALSH',
                "listMarcas":[
                    {
                        "fotocheck":`${dni}`,
                        "cod_reloj":"02",
                        "fecha":`${fecha}`,
                        "marca":`${registro}`
                    }
                ]
            },
            {
                auth: {
                    username: 'u_walsh',
                    password: 'ca@s1st3m4sw4@lsh'
                }
            }
        ).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
        const starCountRef = ref(app);
        get(child(starCountRef, 'marcaciones/' + id + '-' + cor)).then((snapshot) => {
            if (snapshot.exists()) {
                if(snapshot.val().hasOwnProperty('horaE')){
                    setNotify('hora de entrada al teletrabajo')
                    setAlertDo(true)
                }else {
                    update(ref(app, 'marcaciones/' + id + '-' + cor), {
                        nombres: nom,
                        apellidos: ape,
                        area:siglas,
                        fecha: fecha,
                        dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                        horaE: printHora,
                        tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,2))*60 + parseInt(ent.toString().slice(3,5)) + 10)? 'Si':'No'
                    })
                    setNot('hora de entrada al teletrabajo')
                    setGa('a.m.')
                    setHor(printHora)
                    setHoraE(printHora)
                    setHoraS('')
                    setHoraSA('')
                    setHoraRA('')
                    setAlert(true)
                }
            } else{
                update(ref(app, 'marcaciones/' + id + '-' + cor), {
                    nombres: nom,
                    apellidos: ape,
                    area:siglas,
                    fecha: fecha,
                    dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                    horaE: printHora,
                    tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,2))*60 + parseInt(ent.toString().slice(3,5)) + 10)? 'Si':'No'
                })
                setNot('hora de entrada al teletrabajo')
                setGa('a.m.')
                setHor(printHora)
                setHoraE(printHora)
                setHoraS('')
                setHoraSA('')
                setHoraRA('')
                setAlert(true)
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    async function salida(e){
        e.preventDefault();
        let hoy = new Date();
        let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() : '0' + '' + (hoy.getMonth() + 1)
        let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate() 
        let id = hoy.getFullYear().toString() + mes.toString() + dia.toString();
        let fecha = hoy.getFullYear() + '-' + mes + '-' + dia;
        let getDia = hoy.getDay() 

        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD_WALSH',
                "listMarcas":[
                    {
                        "fotocheck":`${dni}`,
                        "cod_reloj":"02",
                        "fecha":`${fecha}`,
                        "marca":`${registro}`
                    }
                ]
            },
            {
                auth: {
                    username: 'u_walsh',
                    password: 'ca@s1st3m4sw4@lsh'
                }
            }
        ).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
        const starCountRef = ref(app);
        get(child(starCountRef, 'marcaciones/' + id + '-' + cor)).then((snapshot)=>{
            if (snapshot.exists()) {
                if(snapshot.val().hasOwnProperty('horaS')){
                    setNotify('hora de salida del teletrabajo')
                    setAlertDo(true)
                }else{
                    update(ref(app, 'marcaciones/' + id + '-' + cor), {
                        nombres: nom,
                        apellidos: ape,
                        area:siglas,
                        fecha: fecha,
                        dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                        horaS: printHora
                    })
                    setNot('hora de salida del teletrabajo')
                    setGa('p.m.')
                    setHor(printHora)
                    setHoraS(printHora)
                    setAlert(true)
                }
            } else{
                update(ref(app, 'marcaciones/' + id + '-' + cor), {
                    nombres: nom,
                    apellidos: ape,
                    area:siglas,
                    fecha: fecha,
                    dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                    horaS: printHora
                })
                setNot('hora de salida del teletrabajo')
                setGa('p.m.')
                setHor(printHora)
                setHoraS(printHora)
                setAlert(true)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    async function salidaA(e){
        e.preventDefault();
        let hoy = new Date();
        let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() : '0' + '' + (hoy.getMonth() + 1)
        let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate() 
        let id = hoy.getFullYear().toString() + mes.toString() + dia.toString();
        let fecha = hoy.getFullYear() + '-' + mes + '-' + dia;
        let getDia = hoy.getDay() 

        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD_WALSH',
                "listMarcas":[
                    {
                        "fotocheck":`${dni}`,
                        "cod_reloj":"02",
                        "fecha":`${fecha}`,
                        "marca":`${registro}`
                    }
                ]
            },
            {
                auth: {
                    username: 'u_walsh',
                    password: 'ca@s1st3m4sw4@lsh'
                }
            }
        ).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
        const starCountRef = ref(app);
        get(child(starCountRef, 'marcaciones/' + id + '-' + cor)).then((snapshot)=>{
            if (snapshot.exists()) {
                if(snapshot.val().hasOwnProperty('horaSA')){
                    setNotify('hora de salida al refrigerio')
                    setAlertDo(true)
                }else {
                    update(ref(app, 'marcaciones/' + id + '-' + cor), {
                        nombres: nom,
                        apellidos: ape,
                        area:siglas,
                        fecha: fecha,
                        dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                        horaSA: printHora
                    })
                    setNot('hora de salida al refrigerio')
                    setGa('p.m.')
                    setHor(printHora)
                    setHoraSA(printHora)
                    setAlert(true)
                }
            } else{
                update(ref(app, 'marcaciones/' + id + '-' + cor), {
                    nombres: nom,
                    apellidos: ape,
                    area:siglas,
                    fecha: fecha,
                    dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                    horaSA: printHora
                })
                setNot('hora de salida al refrigerio')
                setGa('p.m.')
                setHor(printHora)
                setHoraSA(printHora)
                setAlert(true)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    async function retornoA(e){
        e.preventDefault();
        let hoy = new Date();
        let mes = parseInt(hoy.getMonth() + 1) >= 10? hoy.getMonth() : '0' + '' + (hoy.getMonth() + 1)
        let dia = parseInt(hoy.getDate()) >= 10? hoy.getDate() : '0' + hoy.getDate() 
        let id = hoy.getFullYear().toString() + mes.toString() + dia.toString();
        let fecha = hoy.getFullYear() + '-' + mes + '-' + dia;
        let getDia = hoy.getDay() 

        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        let horaRetorno = horaSA.toString().slice(0,2);
        let minutosRetorno = horaSA.toString().slice(3,5);
        let printRetorno = parseInt(horaRetorno)*60 + parseInt(minutosRetorno);
        
        const starCountRef = ref(app);
        if(parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes()) - printRetorno >= 45){
            get(child(starCountRef, 'marcaciones/' + id + '-' + cor)).then((snapshot)=>{
                if(snapshot.exists()){
                    if(snapshot.val().hasOwnProperty('horaRA')){
                        setNotify('hora de retorno del refrigerio')
                        setAlertDo(true)
                    }else{
                        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
                            {
                                "database":'PROD_WALSH',
                                "listMarcas":[
                                    {
                                        "fotocheck":`${dni}`,
                                        "cod_reloj":"02",
                                        "fecha":`${fecha}`,
                                        "marca":`${registro}`
                                    }
                                ]
                            },
                            {
                                auth: {
                                    username: 'u_walsh',
                                    password: 'ca@s1st3m4sw4@lsh'
                                }
                            }
                        ).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)})
                        update(ref(app, 'marcaciones/' + id + '-' + cor), {
                            nombres: nom,
                            apellidos: ape,
                            area:siglas,
                            fecha: fecha,
                            dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                            horaRA: printHora
                        })
                        setNot('hora de retorno del refrigerio')
                        setGa('p.m.')
                        setHor(printHora)
                        setHoraRA(printHora)
                        setAlert(true)
                    }
                }else{
                    update(ref(app, 'marcaciones/' + id + '-' + cor), {
                        nombres: nom,
                        apellidos: ape,
                        area:siglas,
                        fecha: fecha,
                        dia:getDia === 0?'Domingo':getDia === 1?'Lunes':getDia === 2?'Martes':getDia === 3?'Miércoles':getDia === 4?'Jueves':getDia === 5?'Viernes':getDia === 6?'Sábado':null,
                        horaRA: printHora
                    })
                    setNot('hora de retorno del refrigerio')
                    setGa('p.m.')
                    setHor(printHora)
                    setHoraRA(printHora)
                    setAlert(true)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            setAlertRA(true)
        }
    }
}