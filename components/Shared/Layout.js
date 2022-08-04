import React from 'react'
import Drawer from './Drawer'

const Layout = ({children}) => {
  return (
    <div>
        <Drawer/>
        {children}
    </div>
  )
}

export default Layout