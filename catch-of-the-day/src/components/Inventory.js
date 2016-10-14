import React from 'react'
import AddFishForm from './AddFishForm'

class Inventory extends React.Component{
  constructor(){
    super()
    this.renderInventory = this.renderInventory.bind(this)
    this.updateInventory = this.updateInventory.bind(this)
  }
  updateInventory(e, key){
    const fish = this.props.fishes[key]
    const updatedFish = {
      ...fish,
      [e.target.name]:e.target.value
    }
    this.props.editFish(key, updatedFish)
  }
  renderInventory(key){
    var fish = this.props.fishes[key];
    return(
      <div className="fish-edit" key={key}>
        <input
        onChange={(e)=>this.updateInventory(e, key)}
        type="text"
        name="name"
        placeholder="fish name"
        defaultValue={fish.name}/>
        <input
        onChange={(e)=>this.updateInventory(e, key)}
        type="text"
        name="price"
        placeholder="fish price"
        defaultValue={fish.price}/>
        <select name="status"
          defaultValue={fish.status}
          onChange={(e)=>this.updateInventory(e, key)}>
           <option value="available">Fresh!</option>
           <option value="unavailable">Sold out!</option>
        </select>
        <textarea
        name="desc"
        onChange={(e)=>this.updateInventory(e, key)}
        placeholder="Fish Desc"
        defaultValue={fish.desc}></textarea>
        <input
        onChange={(e)=>this.updateInventory(e, key)}
        type="text"
        name="image"
        placeholder="fish image"
        defaultValue={fish.image} />
        <button onClick={(e)=>this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }
   render(){
      return (
         <div>
            <h2>Inventory</h2>
            {Object.keys(this.props.fishes).map(this.renderInventory)}
            <AddFishForm addFish={this.props.addFish}/>
            <button onClick={()=>this.props.loadSample()}>Load Samples</button>
         </div>
      )
   }
}

export default Inventory
