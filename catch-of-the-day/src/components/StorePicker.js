import React from 'react'
import {getFunName} from '../helpers.js'

class StorePicker extends React.Component{
   // constructor(props){
   //    super(props)
   //    //this.goToStore = this.goToStore.bind(this)
   // // use initial state instead of refs -----
   //    this.state={
   //       inputVal : getFunName()
   //    }
   // }
   goToStore(e){
      e.preventDefault()
      console.log(e, this)
      console.log(this.storeInput.value)
      this.context.router.transitionTo('/store/'+this.storeInput.value)
      // console.log(this.state.inputVal)
      // grab the text
      // change url
   }
   // get input value instead of refs -----
   // getInput(e){
   //    this.setState({inputVal : e.target.value})
   // }
   render(){
      return(
        <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
           <h2>Please enter a store</h2>
           {/* <input type="text" required placeholder="Store Name" onInput={(e)=>{this.getInput(e)}} defaultValue={this.state.inputVal}  /> */}
           <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(el)=>{this.storeInput = el}} />
           <button type="submit">Visit Store</button>
        </form>
      )
   }
}

StorePicker.contextTypes={
   router: React.PropTypes.Object
}
export default StorePicker
