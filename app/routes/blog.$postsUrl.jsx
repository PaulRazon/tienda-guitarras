import { useLoaderData } from "@remix-run/react"
import { getPost } from "../models/posts.server"
import { formatearFecha } from "../utils/helpers"


export function meta({data}){
    if(!data){
      return[{
        title:'GuitarLA - Entrada No encontrada',
        description: `Entrada, Entr no encontrada`
      }]
    }
    return[
      {
        title:`GuitarLA - ${data.data[0].attributes.titulo}`,
        description: `Entrada, Entrada ${data.data[0].attributes.titulo}`
      }
    ]
  }

export async function loader({params}){
    const {postsUrl} = params
    
    const post = await getPost(postsUrl)
    if(post.data.length===0){
        throw new Response('',{
          status:404,
          statusText:'Blog no encontrado'
        })
      }
    return post
}


function Post() {
  const post= useLoaderData()
  console.log(post)
  const {titulo,contenido,imagen,publishedAt} = post.data[0].attributes
  return (
    <article className="post mt-3">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido[0].children[0].text}</p>
           
        </div>
    </article>
  )
}

export default Post
