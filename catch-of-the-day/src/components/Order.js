import React from 'react'
import {formatPrice} from '../helpers'

class Order extends React.Component{
   renderOrder(key){
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      console.log(key, this.props.fishes, count)

      if(!fish || fish.status === 'unavailable'){
         return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is currently out of stock.</li>
      }
      return (
         <li key={key}>
            <span>{count}lbs {fish.name}</span>
            <span className="price">{formatPrice(count*fish.price)}</span>
         </li>
      )
   }
   render(){
      const order = this.props.order
      const fishes = this.props.fishes
      console.log(order, fishes)
      const orderIds = Object.keys(order);
      const total = orderIds.reduce((prev, key)=>{
        const fish = fishes[key]
        const count = order[key]
        const isAvailable = fish && fish.status === 'available';
        if(isAvailable) {
          return prev+ (count * fish.price || 0)
        }
        return prev;
      }, 0)
      return (
         <div className="order-wrap">
            <h2>Your Order</h2>
            <ul className="order">
               {orderIds.map((fish)=> this.renderOrder(fish))}
               <li className="total"><strong>Total:</strong>{formatPrice(total)}</li>
            </ul>
         </div>
      )
   }
}

export default Order
