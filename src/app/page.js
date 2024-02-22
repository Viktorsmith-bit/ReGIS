'use client';
import { Fragment, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase';
import Registro from '@/components/marcaciones/registro';

export default function Home() {
  const [cor, setCor] = useState('')
  const [con, setCon] = useState('')
  const [vis, setVis] = useState(true)
  const [email, setEmail] = useState('');
  const [not, setNot] = useState('');

  async function Login(e){
      e.preventDefault();
      await signInWithEmailAndPassword(auth, cor, con)
      .then((userCredential) => {
          setEmail(userCredential.user.email)
      })
      .catch((error) => {
        setNot('Correo o contraseña incorrecta')
        setTimeout(()=>{
          setNot('')
        }, 4000)
      });
  }

  function captarCambiosCor(e){e.preventDefault(), setCor(e.target.value)}
  function captarCambiosCon(e){e.preventDefault(), setCon(e.target.value)}
  function visualizar(e){e.preventDefault(), setVis(false)}
  function ocultar(e){e.preventDefault(), setVis(true)}
  function limpiar(e){e.preventDefault(), setCor('')}
  function cerrarSesion(e){e.preventDefault(), setEmail('')}
  
  return (
    <Fragment>
      {
        email === '' &&  <div className='flex'>
            <div className='flex-1 flex flex-col justify-between items-center h-screen py-10 px-4 lg:px-0'>
              <div className='flex justify-end px-4 w-full lg:px-0 lg:w-8/12'>
                <Link href="/panel">
                  <div className='flex items-center gap-1 cursor-pointer'>
                    <h1 className='text-base font-bold'>Panel</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                    </svg>
                  </div>
                </Link>
              </div>
              <div className='px-4 lg:px-0 lg:w-8/12'>
                <div className='flex items-center justify-center'>
                  <Image src='/Logo_Walsh_Version_Corporativa.png' className='image' width={250} height={250} alt='Walsh Perú' priority/>
                </div>
                <h1 className='font-black text-center text-3xl mt-5'>Bienvenido a ReGIS</h1>
                <h1 className='text-center text-sm text-gray-500 mt-2'>Registro de horas de ingreso y salida bajo la modalidad del teletrabajo</h1>
                <form className='mt-10'>
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
                  <div className='w-full lg:flex-1 mt-3'>
                    <div className='flex items-center mt-1 border border-gray-300'>
                      <div className='flex items-center justify-center w-12 h-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
                        </svg>
                      </div>
                      <input onChange={captarCambiosCon} type={`${vis?'password':'text'}`} className='input text-xs w-full h-10 px-1' placeholder='Contraseña' />
                      {
                        vis?<div onClick={visualizar} className='flex items-center justify-center w-12 h-10 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                        </svg>
                        </div>:<div onClick={ocultar} className='flex items-center justify-center w-12 h-10 cursor-pointer'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          </svg>
                        </div>
                      }
                    </div>
                  </div>
                  <h1 className='mt-2 h-6 text-xs text-gray-500'>{not}</h1>
                  <div className='flex justify-end'>
                    <Link href={"/restablecer"}>
                      <h1 className='mt-2 text-sm text-gray-500 text-end'>¿Olvidaste tu contraseña?</h1>
                    </Link>
                  </div>
                  <button onClick={Login} className='py-3 mt-5 w-full text-sm back-color text-white'>Iniciar sesión</button>
                </form>
              </div>
              <div className='px-4 lg:px-0 lg:w-8/12'>
                <h1 className='text-xs mt-4 text-gray-500 text-center'>Re<span className='font-extrabold'>G</span>IS v.3.0 </h1>
                <h1 className='text-xs text-gray-500 text-center'>Web application developed by Gerencia de SIG e Innovación - Walsh Perú - 2023</h1>
              </div>
            </div>
          <div className='flex-1 flex items-center justify-center py-10 h-screen image-background hidden md:block lg:block'>
            
          </div>
        </div>
      }
      
      {
        email !== '' && <Registro email={email} cerrarSesion={cerrarSesion} />
      }
    </Fragment>
  )
}
