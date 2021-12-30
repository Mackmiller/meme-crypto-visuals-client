import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const CoinInfo = (props) => {
    
    // using the logo urls passed as props, map the logos into JSX list items
    const allLinks = 
        props.logos.map((l, i)=>{
        // console.log(l.id)
            return (
                <div className="col">
                    <Card style={{minWidth: "400px"}}>
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
                <div style={{textAlign: "center"}}>
                    <div className="subtitle">
                        <h3><strong>Explore the top coins and tokens</strong></h3>
                        <p>test</p>
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