import React from 'react'
import load from './load.gif'
const Spin =()=>{ 
    return (
      <div className='text-center'>
        <img  src={load} alt='..' style={{width:'70px'}}></img>
      </div>
    )
}
export default Spin;