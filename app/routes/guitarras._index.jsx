import { getGuitarras } from "~/models/guitarras.server"
import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "../components/listado-guitarras"

export function meta(){
  return[
    {title:'GuitarLA - Tienda de Guitarras',
    description:'Pantalla para adquirir una guitarra'}
  ]
}

export async function loader(){
  
  const guitarras = await getGuitarras()

  return guitarras.data
}

function Tienda() {
  const guitarras = useLoaderData()
  console.log(guitarras)
  return (
      <ListadoGuitarras 
        guitarras={guitarras}
      />
  )
}

export default Tienda
