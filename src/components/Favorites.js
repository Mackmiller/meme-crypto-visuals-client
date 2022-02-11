import React, { useEffect } from 'react'

const Favorites = (props) => {

  // update favorites from database on page render
  useEffect(() => {
    props.getFavorites(props.user)
  }, [])

  // return a list of coin names from props
  const mapNames = props.favorites.map((favorite, i)=> {
    let date = new Date(favorite.createdAt)
    let d = date.getDate()
    let m = date.getMonth()+1
    let y = date.getFullYear()
    return <li key={i} style={{listStyle: "none"}} className="favorites-list">
              <h4>{favorite.name} ({favorite.symbol})</h4>
              <p>Date bookmarked: {m}/{d}/{y}</p>
              <p>Price bookmarked: $ {favorite.price}</p>
            </li>
  })

  return(
    <div className="favorites-display">
      <h3 style={{textAlign: "center"}}><strong>Bookmarked coins and prices</strong></h3>
      <div className="subtitle">
          <p>Below is a list of all bookmarked crytpocurrencies and prices from your account, for your personal use and tracking of prices. Please note that these prices were bookmarked at the time listed and may no longer be accurate; please check our homepage or Explore Coins for the most update-t0-date information.</p>
      </div>
      <div>{mapNames}</div>
    </div>
  )
}

export default Favorites