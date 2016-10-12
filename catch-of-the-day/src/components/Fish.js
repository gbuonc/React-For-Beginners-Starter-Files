import React from 'react'
import {formatPrice} from '../helpers'

class Fish extends React.Component{
   orderFish(key){
      this.props.addToOrder(key)
   }
   render(){
      const {details, id} = this.props
      const isAvailable = details.status === 'available';
      const btnText = isAvailable ? 'Add to Order' : 'Sold Out!'
      return (
         <li className="menu-fish">
            <img src={details.image} alt={details.name}/>
            <h3 className="fish-name">{details.name}</h3>
            <span className="price">{formatPrice(details.price)}</span>
            <p>{details.desc}</p>
            <button disabled={!isAvailable} onClick={(e)=>this.orderFish(id)}>{btnText}</button>
         </li>
      )
   }
}

export default Fish
