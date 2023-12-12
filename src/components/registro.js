'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import {app} from '../../firebase';
import { ref, set, onValue, child, get} from "firebase/database";

export default function Registro(props) {
    const params = useParams()
    const router = useRouter();
    const [job, SetJob] = useState('close')
    const [rec, SetRec] = useState()
    const [alert, setAlert] = useState(false)
    const [alertDo, setAlertDo] = useState(false)
    const [alertRA, setAlertRA] = useState(false)
    const [state, setState] = useState('');
    const [nom, setNom] = useState('');
    const [ape, setApe] = useState('');
    const [ent, setEnt] = useState('');
    const [sad, setSad] = useState('');
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
                    setEnt(snapshot.val().HoraE)
                    setSad(snapshot.val().HoraS)
                    setAr(snapshot.val().Area)
                    setCar(snapshot.val().Cargo)
                    setDni(snapshot.val().Dni)
                    setCor(correo)
              } else {
                console.log("No data available");
              }
            });
          }
        return GetDatos();
    }, [])

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            let hoy = new Date();
            let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
            const starCountRef = ref(app, `registro/entrada/${id}-${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setHoraE(snapshot.val().Hora)
                } else {
                    setHoraE('')
                }
            });
          }
        return GetDatos();
    }, [])

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            let hoy = new Date();
            let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
            const starCountRef = ref(app, `registro/salida/${id}-${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setHoraS(snapshot.val().Hora)
                } else {
                    setHoraS('')
                }
            });
          }
        return GetDatos();
    }, [])

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            let hoy = new Date();
            let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
            const starCountRef = ref(app, `registro/salidaA/${id}-${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setHoraSA(snapshot.val().Hora)
                } else {
                    setHoraSA('')
                }
            });
          }
        return GetDatos();
    }, [])

    useEffect(()=>{
        function GetDatos(){
            let correo = props.email.toString().replace("@walshp.com.pe","")
            let hoy = new Date();
            let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
            const starCountRef = ref(app, `registro/retornoA/${id}-${correo}`);
            onValue(starCountRef, (snapshot) => {
                if (snapshot.exists()) {
                    setHoraRA(snapshot.val().Hora)
                } else {
                    setHoraRA('')

                }
            });
          }
        return GetDatos();
    }, [])

    function closeAlert(e){e.preventDefault(), setAlert(false)}
    function closeAlertDo(e){e.preventDefault(), setAlertDo(false)}
    function closeAlertRA(e){e.preventDefault(), setAlertRA(false)}
    function openCloseJob(e){e.preventDefault(), SetJob(job === 'open'?'close':'open')}

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
                        <div className={`flex gap-1 mt-2 ${horaE == ''?'hidden':'block'}`}>
                            <h1 className='text-sm'>1. Hora de entrada al teletrabajo: <span className='font-bold'>{horaE} {(parseInt(horaE.toString().slice(0,2))*60 + parseInt(horaE.toString().slice(3,5))) <= 720?'a.m.':'p.m.'}</span></h1>
                        </div>
                        <div className={`flex gap-1 mt-2 ${horaSA == ''?'hidden':'block'}`}>
                            <h1 className='text-sm'>2. Hora de salida al refrigerio: <span className='font-bold'>{horaSA} {(parseInt(horaSA.toString().slice(0,2))*60 + parseInt(horaSA.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                        </div>
                        <div className={`flex gap-1 mt-2 ${horaRA == ''?'hidden':'block'}`}>
                            <h1 className='text-sm'>3. Hora de retorno del refrigerio: <span className='font-bold'>{horaRA} {(parseInt(horaRA.toString().slice(0,2))*60 + parseInt(horaRA.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                        </div>
                        <div className={`flex gap-1 mt-2 ${horaS == ''?'hidden':'block'}`}>
                            <h1 className='text-sm'>4. Hora de salida del teletrabajo: <span className='font-bold'>{horaS} {(parseInt(horaS.toString().slice(0,2))*60 + parseInt(horaS.toString().slice(3,5))) >= 720?'p.m.':'a.m.'}</span></h1>
                        </div>
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
        let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
        let fecha = hoy.getFullYear()+''+( hoy.getMonth() + 1 )+''+hoy.getDate();
        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD-WALSH',
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
        get(child(starCountRef, 'registro/' + 'entrada/' + id + '-' + cor)).then((snapshot) => {
            if (snapshot.exists()) {
                setNotify('hora de entrada al teletrabajo')
                setAlertDo(true)
            } else {
                set(ref(app, 'registro/' + 'entrada/' + id + '-' + cor), {
                    Nombres: nom,
                    Apellidos: ape,
                    Fecha: fecha,
                    Hora: printHora,
                    Dni: dni,
                    Cargo: car,
                    Area: ar,
                    Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(ent.toString().slice(0,2))*60 + parseInt(ent.toString().slice(3,5)) + 10)? 'Si':'No'
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
        let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
        let fecha = hoy.getFullYear()+''+( hoy.getMonth() + 1 )+''+hoy.getDate();
        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD-WALSH',
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
        get(child(starCountRef, 'registro/' + 'salida/' + id + '-' + cor)).then((snapshot) => {
            if (snapshot.exists()) {
                setNotify('hora de salida del teletrabajo')
                setAlertDo(true)
            } else {
                set(ref(app, 'registro/' + 'salida/' + id + '-' + cor), {
                    Nombres: nom,
                    Apellidos: ape,
                    Fecha: fecha,
                    Hora: printHora,
                    Dni: dni,
                    Cargo: car,
                    Area: ar,
                    Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > (parseInt(sad.toString().slice(0,2))*60 + parseInt(sad.toString().slice(3,5)))? 'Si':'No'
                })
                setNot('hora de salida del teletrabajo')
                setGa('p.m.')
                setHor(printHora)
                setHoraS(printHora)
                setAlert(true)
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    async function salidaA(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
        let fecha = hoy.getFullYear()+''+( hoy.getMonth() + 1 )+''+hoy.getDate();
        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
            {
                "database":'PROD-WALSH',
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
        get(child(starCountRef, 'registro/' + 'salidaA/' + id + '-' + cor)).then((snapshot) => {
            if (snapshot.exists()) {
                setNotify('hora de salida al refrigerio')
                setAlertDo(true)
            } else {
                set(ref(app, 'registro/' + 'salidaA/' + id + '-' + cor), {
                    Nombres: nom,
                    Apellidos: ape,
                    Fecha: fecha,
                    Hora: printHora,
                    Dni: dni,
                    Cargo: car,
                    Area: ar,
                    Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > 780? 'Si':'No'
                })
                setNot('hora de salida al refrigerio')
                setGa('p.m.')
                setHor(printHora)
                setHoraSA(printHora)
                setAlert(true)
            }
          }).catch((error) => {
            console.error(error);
          });
    }

    async function retornoA(e){
        e.preventDefault();
        let hoy = new Date();
        let id = hoy.getFullYear().toString() + ( hoy.getMonth() + 1 ).toString() + hoy.getDate().toString();
        let fecha = hoy.getFullYear()+''+( hoy.getMonth() + 1 )+''+hoy.getDate();
        let hora = hoy.getHours() >= 10? hoy.getHours() : '0' + hoy.getHours()
        let minutos = hoy.getMinutes() >= 10? hoy.getMinutes() : '0' + hoy.getMinutes() 
        let printHora = hora + ':' + minutos
        let registro = fecha + ' ' + printHora
        let horaRetorno = horaSA.toString().slice(0,2);
        let minutosRetorno = horaSA.toString().slice(3,5);
        let printRetorno = parseInt(horaRetorno)*60 + parseInt(minutosRetorno);
        
        const starCountRef = ref(app);
        if(parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes()) - printRetorno >= 45){
            get(child(starCountRef, 'registro/' + 'retornoA/' + id + '-' + cor)).then((snapshot) => {
                if (snapshot.exists()) {
                    setNotify('hora de retorno del refrigerio')
                    setAlertDo(true)
                } else {
                    axios.post('https://app.casistemas.com/erh_api/Asistencia/JalaMarcasMasiva',
                        {
                            "database":'PROD-WALSH',
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
                    set(ref(app, 'registro/' + 'retornoA/' + id + '-' + cor), {
                        Nombres: nom,
                        Apellidos: ape,
                        Fecha: fecha,
                        Hora: printHora,
                        Dni: dni,
                        Cargo: car,
                        Area: ar,
                        Tarde: (parseInt(hoy.getHours())*60 + parseInt(hoy.getMinutes())) > 840? 'Si':'No'
                    })
                    setNot('hora de retorno del refrigerio')
                    setGa('p.m.')
                    setHor(printHora)
                    setHoraRA(printHora)
                    setAlert(true)
                }
              }).catch((error) => {
                console.error(error);
              });
        }else{
            setAlertRA(true)
        }
    }
}

function Alert(props){
    return(
      <div className='absolute top-0 left-0 h-screen '>
        <div className='fixed flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
            <div className='flex items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#45805E" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-sm lg:text-base text-center'>Su <span className='font-bold'>{props.not}</span> se registró satisfactoriamente a las: <span className='font-bold'>{props.hor} {(parseInt(props.hor.toString().slice(0,2))*60 + parseInt(props.hor.toString().slice(3,5))) <= 720?'a.m.':'p.m.'}</span></h1>
                    <h1 className='text-center'>¡Gracias!</h1>
                    <button onClick={props.closeAlert} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base text-white'>Aceptar</button>
                </div>
                
            </div>
        </div>
      </div>
    );
}

function AlertDouble(props){
    return(
      <div className='absolute top-0 left-0 h-screen '>
        <div className='fixed flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
            <div className='flex items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="#E74C3C" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-sm lg:text-base text-center'>Su <span className='font-bold'>{props.notify}</span> ya ha sido registrada. Si se trata de un error, por favor, comunicarse con la <span className='underline'>Gerencia de Recursos Humanos</span>.</h1>
                    <h1 className='text-center'>¡Gracias!</h1>
                    <button onClick={props.closeAlertDo} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base text-white'>Aceptar</button>
                </div>
            </div>
        </div>
      </div>
    );
}

function AlertRetornoA(props){
    return(
      <div className='absolute top-0 left-0 h-screen '>
        <div className='fixed flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
            <div className='flex items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="#E74C3C" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
                <div className='flex flex-col items-center gap-3'>
                    <h1 className='text-sm lg:text-base text-center'>El tiempo mínimo para el <span className='font-bold'>refrigerio</span> es de 45 minutos, no podrá ingresar su hora de retorno mientras este sea menor.</h1>
                    <h1 className='text-center'>¡Gracias!</h1>
                    <button onClick={props.closeAlertRA} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base text-white'>Aceptar</button>
                </div>
            </div>
        </div>
      </div>
    );
}