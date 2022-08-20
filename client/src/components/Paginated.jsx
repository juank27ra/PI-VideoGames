import React from 'react'
import style from '../css/Paginated.module.css'

export default function Paginated({allVideogames, vgPerPage, paginado, currentPage, prevHandler, nextHandler}) {
    const pageNumber = []

    for (let i = 1; i<=Math.ceil(allVideogames / vgPerPage); i++) {        
        pageNumber.push(i)                                            
    }
    
    return (
        <div className={style.num}>
            <ul className={style.paginadoul}>
                    <button className={style.number} onClick={e => prevHandler(e)}>Prev</button> 
                {pageNumber &&                                             
                pageNumber.map(number =>(
                    <li className={style.number} key={number}> 
                    <button  className={currentPage === number ? style.active : style.page}  onClick={() => paginado(number)}>{number}</button>
                        </li>
                                                                        
                    ))
                }
                    <button className={style.number} onClick={ e =>nextHandler(e)}>Next</button>
            </ul>
        </div>
    )
}

