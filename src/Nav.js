import React, {Component} from 'react'
class Nav extends Component {

  render() {
    return (
      <nav>
        <h1>Chatty</h1>
        <div>{this.props.userCounts} Users Online</div>
      </nav>
    )
  }
}



export default Nav;
