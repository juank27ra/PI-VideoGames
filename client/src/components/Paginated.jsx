import React from 'react'
import css from '../css/Paginated.module.css'

export default function Paginated({allVideogames, vgPerPage, paginado, currentPage}) {
    const pageNumber = []

    for (let i = 1; i<=Math.ceil(allVideogames / vgPerPage); i++) {        //numero redondo del totasl de vg dividido el nuem ro que quiero por pagina 
        pageNumber.push(i)                                            //para que me de un arreglo de numero que van a ser mis páginas
     }
     
     return (
        <nav>
            <ul className={css.paginado}>
                {pageNumber &&                                              //si tengo este arreglo mapeo y devulva cada numero que te devuelva el paginado
                pageNumber.map(number =>(
                    <li className={css.number} key={number}>                    
                    <button style={ currentPage === number ? {backgroundColor:"black", color:"white", border:"white"} : {}} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

// console.log(Paginated())