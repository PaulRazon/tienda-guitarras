import { useLoaderData } from '@remix-run/react'
import { getGuitarras} from '../models/guitarras.server'
import {getPosts} from '../models/posts.server'
import ListadoGuitarras from '../components/listado-guitarras'
import stylesGuitarras from '../styles/guitarras.css'
import ListadoPosts from '../components/listado-posts'
import stylesPosts from '../styles/blog.css'
import { getCurso } from '../models/curso.server'
import Curso from '../components/curso'
import styleCurso from '../styles/curso.css'
export function meta(){

}

export function links(){
  return[
    {
      rel:'stylesheet',
      href:stylesGuitarras
    },
    {
      rel:'stylesheet',
      href:stylesPosts
    },
    {
      rel:'stylesheet',
      href:styleCurso
    }
  ]
}

export async function loader(){
  const [guitarras,posts,curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

  


  return{
    guitarras:guitarras.data,
    posts:posts.data,
    curso: curso.data
  }
}

function Index() {
  const {guitarras, posts,curso} = useLoaderData()
  
  return (
    <>
      <main className="contenedor">
          <ListadoGuitarras
            guitarras={guitarras}
          />

          <Curso
            curso={curso.attributes}
          />
          <ListadoPosts
            posts={posts}
          />
      </main> 

    </>
  )
}

export default Index
