import React from 'react'
import style from '../css/Paginated.module.css'

export default function Paginated({allVideogames, vgPerPage, paginado, currentPage}) {
    const pageNumber = []

    for (let i = 1; i<=Math.ceil(allVideogames / vgPerPage); i++) {        //numero redondo del totasl de vg dividido el nuem ro que quiero por pagina 
        pageNumber.push(i)                                            //para que me de un arreglo de numero que van a ser mis páginas
     }
     
     return (
        <div className={style.num}>
            <ul className={style.paginadoul}>
                {pageNumber &&                                              //si tengo este arreglo mapeo y devulva cada numero que te devuelva el paginado
                pageNumber.map(number =>(
                    <li className={style.number} key={number}>                    
                    <button className={currentPage === number ? style.active : style.page}  onClick={() => paginado(number)}>{number}</button>
                    
                        </li>
                                                                        
                    ))
                }
            </ul>
        </div>
    )
}

// console.log(Paginated())