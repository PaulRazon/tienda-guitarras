import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta(){
  return[
    {
      title:'GuitarLA - Sobre Nosotros',
    description: 'Venta de guitarras, y algo mas'
    }
  ]
}
export function links(){
  return [
    {
      rel:'stylesheet',
      href:styles
    },
    {
      rel:'preload',
      href:imagen,
      as:'image'
    }
  ]
}

function Nosotros() {
  
  
  return (

    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nostros" />

        <div>
          <p>Lorem Ipsum es simplemente el texto de relleno de 
            las imprentas y archivos de texto. Lorem Ipsum ha sido 
            el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
            (N. del T. persona que se dedica a la imprenta) 
            desconocido usó una galería de textos y los mezcló de tal
             manera que logró hacer un libro de textos especimen.</p>
          
          <p>Lorem Ipsum es simplemente el texto de relleno de 
            las imprentas y archivos de texto. Lorem Ipsum ha sido 
            el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
            (N. del T. persona que se dedica a la imprenta) 
            desconocido usó una galería de textos y los mezcló de tal
             manera que logró hacer un libro de textos especimen.</p>

          <p>Lorem Ipsum es simplemente el texto de relleno de 
            las imprentas y archivos de texto. Lorem Ipsum ha sido 
            el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor 
            (N. del T. persona que se dedica a la imprenta) 
            desconocido usó una galería de textos y los mezcló de tal
             manera que logró hacer un libro de textos especimen.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
