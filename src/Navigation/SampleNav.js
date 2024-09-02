import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function SampleNav() {
  return (
    <div>
        <nav className='navbar'>
        <ul className='nav navbar-nav'>
            <li className='navbar-item text-white'>
                Element 1
            </li>
            <li className='navbar-item text-white'>
                Element 2
            </li>
            <li className='navbar-item text-white'>
                Element 3
            </li>
        </ul>
        </nav>
    </div>
  )
}

export default SampleNav