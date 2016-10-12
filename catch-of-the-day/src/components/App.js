import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'

class App extends React.Component{
   constructor(){
      super()
      this.addFish = this.addFish.bind(this);
      this.addToOrder = this.addToOrder.bind(this);
      this.state={
         fishes : sampleFishes,
         order:{}
      }
   }
   addFish(fish){
      const fishes = {...this.state.fishes}
      const timestamp = Date.now()
      fishes[`fish-${timestamp}`]=fish
      this.setState({fishes})
   }
   addToOrder(key){
      const order = {...this.state.order}
      order[key] = order[key] ? order[key]+1 : 1
      this.setState({order})
   }
   render(){
      const fishArr = Object.keys(this.state.fishes)
      const fishes = this.state.fishes
      return (
         <div className="catch-of-the-day">
            <div className="menu">
               <Header tagLine="Fresh Seafood Market"/>
               <ul className="list-of-fishes">
                  {fishArr.map((fish)=><Fish key={fish} id={fish} details={fishes[fish]} addToOrder={this.addToOrder}></Fish>)}
               </ul>
            </div>
            <Order order={this.state.order} fishes={fishes}/>
            <Inventory addFish={this.addFish} />
         </div>
      )
   }
}

export default App
