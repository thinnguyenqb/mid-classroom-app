import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import './styles.scss'

function Home() {
  return (
    <>
      <Drawer />
      <div className="home">
        <h1>ClassCard</h1>
      </div>
    </>
  )
}

export default Home
