import React from 'react'


const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <header className="app-title">
        <h2>Todo </h2>
      </header>
      {children}
    </div>
  )
}

export default Layout