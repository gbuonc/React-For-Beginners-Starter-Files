import React from 'react'
import {formatPrice} from '../helpers'
import CSSTransitionGroup from 'react-addons-css-transition-group'

class Order extends React.Component{
   renderOrder(key){
    const isFishesEmpty = Object.keys(this.props.fishes).length===0;
    const removeBtn= <button onClick={()=>this.props.removeFromOrder(key)}>&times;</button>
    // do not populate order list if there are no fishes yet (localstorage is faster than firebase!)
     if(isFishesEmpty) return

      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      if(!fish){
         return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available.
         {removeBtn}</li>
      }
      if(fish.status === 'unavailable'){
         return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is currently out of stock.
         {removeBtn}</li>
      }
      return (
         <li key={key}>
            <span>
            <CSSTransitionGroup
            component="span"
            transitionName="count"
            className="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
            </CSSTransitionGroup>
            lbs {fish.name}
            </span>
            <span className="price">{formatPrice(count*fish.price)}</span>
            {removeBtn}
         </li>
      )
   }
   render(){
      const order = this.props.order
      const fishes = this.props.fishes
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
            <CSSTransitionGroup
            className="order" component="ul"
            transitionName="order"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
               {orderIds.map((fish)=> this.renderOrder(fish))}
               <li className="total"><strong>Total:</strong>{formatPrice(total)}</li>
            </CSSTransitionGroup>
         </div>
      )
   }
}

export default Order
