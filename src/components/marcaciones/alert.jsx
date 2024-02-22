export function Alert(props){
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

export function AlertDouble(props){
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

export function AlertRetornoA(props){
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