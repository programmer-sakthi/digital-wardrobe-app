import React from 'react'
import Header from './Header'

function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Header />  
      </header>
      <main>
        {children}
      </main>
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        main {
          flex: 1;
          padding: 20px;
        }
        @media (max-width: 768px) {
          main {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default Layout