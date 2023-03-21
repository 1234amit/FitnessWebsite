import { Box } from '@mui/material'
import React, { useState } from 'react'
import Exercises from '../components/Exercises'
import HeroBanner from '../components/HeroBanner'
import ReactHorizontalScrollbar from '../components/ReactHorizontalScrollbar'
import SearchExercises from '../components/SearchExercises'

const Home = () => {
  const [exercises, setExercises] = useState([])
  const [bodyPart, setBodyPart] = useState('all')
  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      {/* <ReactHorizontalScrollbar /> */}
      <Exercises />
    </Box>
  )
}

export default Home