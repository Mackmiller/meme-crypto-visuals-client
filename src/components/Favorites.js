import React, { useEffect } from 'react'

const Favorites = (props) => {

  // update favorites from database on page render
  useEffect(() => {
    props.getFavorites(props.user)
  }, [])

  // return a list of coin names from props
  const mapNames = props.favorites.favorites.map((favorite, i)=> {
    return <li key={i}>{favorite.name} ({favorite.symbol})</li>
  })

  return(
    <div>
      <h1>{mapNames}</h1>
    </div>
  )
}
export default Favorites