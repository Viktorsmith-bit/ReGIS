'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../../../firebase';

export default function ResetPassword() {
  const [cor, setCor] = useState('');
  const [not, setNot] = useState('');
  const [alert, setAlert] = useState(true)

  async function Reset(e){
      e.preventDefault();
      await sendPasswordResetEmail(auth,cor)
      .then(() => {
        setAlert(false)
      })
      .catch((error) => {
        setNot('El correo ingresado no se encuentra registrado.')
        setTimeout(()=>{
          setNot('')
        }, 4000)
          const errorCode = error.code;
          const errorMessage = error.message;
      });
  }

  function captarCambiosCor(e){
      e.preventDefault();
      setCor(e.target.value)
  }

  function limpiar(e){
      e.preventDefault();
      setCor('')
  }

  function closeAlert(e){
    e.preventDefault();
    setAlert(true)
  }

  return (
        <div className='flex items-center justify-center h-screen px-4 lg:px-0' >
          <div className='flex-1 max-w-lg border border-gray-200 rounded-md p-4 shadow-md bg-white'>
            <div className='flex justify-center w-full'>
              <Image src='/Logo_Walsh_Version_Corporativa.png' className='image' width={230} height={100} alt='Walsh Perú' priority/>
            </div>
            <h1 className='text-center'>Restablecer la contraseña</h1>
            <form className='mt-5'>
              <div className='w-full lg:flex-1'>
                <div className='flex items-center mt-1 border border-gray-300'>
                  <div className='flex items-center justify-center w-12 h-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                    </svg>
                  </div>
                  <input value={cor} onChange={captarCambiosCor} type='email' className='input text-xs w-full h-10 px-1' placeholder='Correo' />
                  <div className='flex items-center justify-center w-12 h-10'>
                    <svg onClick={limpiar} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="cursor-pointer bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className='mt-2 h-6 text-xs text-gray-500'>{not}</h1>
              <button onClick={Reset} className='py-2 mt-2 w-full text-white rounded-md text-sm' style={{backgroundColor:'rgb(69, 128, 94)'}}>Enviar enlace</button>
            </form>
            <Link href={"/"}>
              <button className='bg-gray-200 py-2 mt-2 w-full rounded-md text-sm'>Volver</button>
            </Link>
            <h1 className='text-xs mt-4 text-gray-400 text-center'>ReGIS v.3.0 </h1>
            <h1 className='text-xs text-gray-400 text-center'>Web application developed by Gerencia de SIG e Innovación - Walsh Perú - 2023</h1>
          </div>
          {
            alert?null:<Alert closeAlert={closeAlert} />
          }
        </div>
  )
}

function Alert(props){
  return(
    <div className='absolute top-0 left-0 flex items-center justify-center h-screen opacity w-full px-4 md:px-0 lg:px-0'>
      <div className='flex flex-col items-center rounded-md border border-gray-300 p-5 max-w-md bg-white'>
        <div className='flex items-center gap-5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#45805E" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
          <h1 className='text-sm lg:text-base'>Se ha enviado con éxito el enlace a su correo para restablecer su contraseña.</h1>
        </div>
        <button onClick={props.closeAlert} className='py-2 px-4 border border-gray-300 rounded-md back-color text-sm lg:text-base'>Aceptar</button>
      </div>
    </div>
  );
}