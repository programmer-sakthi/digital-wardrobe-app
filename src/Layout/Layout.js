import React from 'react'
import Header from './Header'

function Layout(props) {
  return (
    <div>
        <header>
            <Header />  
        </header>
        <main>
            {props.children}
        </main>

    </div>
  )
}

export default Layout