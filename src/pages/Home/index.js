import React from 'react'
import Drawer from '../../components/Drawer/Drawer'
import ClassCard from '../../components/ClassCard/ClassCard'
import './styles.scss'

function Home() {
  return (
    <>
      <Drawer />
      <div className="home">
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        <ClassCard />
        
      </div>
    </>
  )
}

export default Home
