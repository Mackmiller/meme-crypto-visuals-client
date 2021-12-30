import React from 'react'

const Favorites = (props) => {

  // console.log(props.favorites.favorites)

  const mapNames = props.favorites.favorites.map((favorite, i)=> {
    return <li key={i}>{favorite.name}</li>
  })

  return(
    <div>
      <h1>{mapNames}</h1>
    </div>
  )
}
export default Favorites