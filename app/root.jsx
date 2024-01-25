import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from '@remix-run/react'

import { useEffect, useState } from 'react'
import Header from '~/components/header'
import styles from '~/styles/index.css'
import Footer from '~/components/footer'
//agregando meta
export function meta(){
    return [
        {
            charset:'utf-8',
            title:'GuitarLA-Remix',
            viewport:'width=device-width,initial-scale=1'

        }
    ]
}


//agregando estilos


export function links(){
    return [
        //un objeto por hoja de estilo
        {//agregando normailize para fixear detalles de la pagina
            rel:'stylesheet',
            href:'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel:'stylesheet',
            href:styles
        },//agregando fuentes de google fonts
        {
            rel:'preconnect',
            href:'https://fonts.googleapis.com'
        },
        {
            rel:'preconnect',
            href:'https://fonts.gstatic.com',
            crossOrigin:"true"
        },
        {
            rel:'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        }
    ]
}

//devuelve la pagina inicial
export default function App(){
  //window permite que localstorage que pertenece al cliente se ejecute sin causar problemas al servidor
  //esta condicion nos permite quitar los errores de localStorage
  const carritoLS = typeof window !== 'undefined'? JSON.parse(localStorage.getItem('carrito'))??[] :null
  const [carrito,setCarrito] = useState(carritoLS)

  useEffect(()=>{
    localStorage.setItem('carrito',JSON.stringify(carrito))
  },[carrito])

  const agregandoCarrito =guitarra=>{
    //evitar registros duplicados
    //.some permite iterar en el arreglo de objetos y ver si coinicide uno en existencia
    if(carrito.some(guitarraState => guitarraState.id ===guitarra.id)){

      //iterar sobre el arreglo e identificar el elemento duplicado
      //map no modifica el arreglo original, genera uno nuevo
      const carritoActualizado = carrito.map(guitarraState =>{
        if(guitarraState.id === guitarra.id){
          //reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad
          //si quisieras acumular la cantidad seria de esta foorma
          //guitarraState.cantidad += guitarra.cantidad
        }
        return guitarraState
      })
      //Añadir al carrito modificado
      setCarrito(carritoActualizado)
    }else{
      setCarrito([...carrito,guitarra])
    }
  }

  const actualizarCantidad= guitarra=>{
    const carritoActualizado = carrito.map(guitarraState=>{
      if(guitarraState.id === guitarra.id){
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })

    setCarrito(carritoActualizado)

  }

  const eliminarGuitarra= id =>{
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }
  
  return(
        <Document>
            <Outlet 
              context={{
                agregandoCarrito,
                carrito,
                actualizarCantidad,
                eliminarGuitarra
              }}
            />
        </Document>
    )
}

//Layout principal
function Document({children}){
    return(
        <html lang="es">
            <head>
                <Meta/>
                <Links/>
            </head>
            

            <body>
                <Header/>
                {children}    

                <Scripts/>
                <LiveReload/>
                <Footer/>
            </body>

        </html>
    )
}

/*Manejo de errores */

export function CatchBoundary() {
    const error = useCatch();
    return (
      <Document>
        <section className="content-error">
          <p className="error">
            <span className="status">{error.status}</span>
            <span className="text">{error.statusText}</span>
          </p>
          <Link to="/" className="error-btn">
            Volver al inicio
          </Link>
        </section>
      </Document>
    );
  }
   
  export function ErrorBoundary({}) {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
      return (
        <Document>
          <section className="content-error">
            <p className="error">
              <span className="status">{error.status}</span>
              <span className="text">{error.statusText}</span>
            </p>
            <Link to="/" className="error-btn">
              Volver al inicio
            </Link>
          </section>
        </Document>
      );
    }
  }