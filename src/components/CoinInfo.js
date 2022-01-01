import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const CoinInfo = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        props.logos? setLoading(false) : setLoading(true)
    
	}, [])
    
    // using the logo urls passed as props, map the logos into JSX list items
    const allLinks = 
        props.logos.map((l, i)=>{
        // console.log(l.id)
            return (
                <div className="col">
                    <Card style={{minWidth: "400px", padding: "20px", border: "none"}}>
                        <li key={i} style={{listStyle: "none", display: "inline"}}>
                            <img src= {l.logo} alt="crypto logo"/>
                            <h4>{l.name}</h4>
                            <Card.Body>{l.description}</Card.Body>
                        </li>
                    </Card>
                </div>
            ) 
        })

   
	return (
        <>
            {props.loading? (
                <div>Loading...</div>
            ) : (
                <div className="favorites-display" style={{textAlign: "center"}}>
                    <div className="subtitle">
                        <h3><strong>Explore the top coins and tokens</strong></h3>
                        <p>Explore the basic information of the top ten meme tokens and coins, including: price, supply, number of active markets, and daily volume traded. For additional information about each cryptocurrency, please see the website included in each description.</p>
                     </div>
                    <div className="row">
                        {props.logos? allLinks : console.log("no data")}
                    </div>
                </div>
            )}
        </>
	)
}

export default CoinInfo