import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends React.Component{
   state={
      fishes : {},
      order:{}
   }
   componentWillMount(){
     this.ref=base.syncState(`${this.props.params.StoreId}/fishes`, {
       context: this,
       state: 'fishes'
     })
     const localStorageRef = localStorage.getItem(`order-${this.props.params.StoreId}`)
     if(localStorageRef){
      this.setState({order: JSON.parse(localStorageRef)})
     }
   }
   componentWillUnmount(){
     base.removeBinding(this.ref)
   }
   componentWillUpdate(nextProps, nextState){
     localStorage.setItem(`order-${this.props.params.StoreId}`, JSON.stringify(nextState.order))
   }
   addFish = (fish)=>{
      const fishes = {...this.state.fishes}
      const timestamp = Date.now()
      fishes[`fish-${timestamp}`]=fish
      this.setState({fishes})
    }
    removeFish = (key)=>{
       const fishes = {...this.state.fishes}
       fishes[key]=null
       this.setState({fishes})
     }
   editFish = (key, updatedFish)=>{
     const fishes = {...this.state.fishes}
     fishes[key]=updatedFish
     this.setState({fishes})
   }
   addToOrder = (key)=>{
      const order = {...this.state.order}
      order[key] = order[key] ? order[key]+1 : 1
      this.setState({order})
   }
   removeFromOrder = (key)=>{
      const order = {...this.state.order}
      order[key] = null
      delete order[key]
      this.setState({order})
   }
   loadSample = ()=>{
     const fishes = sampleFishes
     this.setState({fishes})
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
            <Order order={this.state.order} removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} params={this.props.params}/>
            <Inventory addFish={this.addFish} editFish={this.editFish} removeFish={this.removeFish} fishes={this.state.fishes} loadSample={this.loadSample}/>
         </div>
      )
   }
}

export default App
