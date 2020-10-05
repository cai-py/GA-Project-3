class App extends React.Component {
  state = {
    officeCharacters: null,
    chosenCharacterId: null,
    username: null,
    content: {},
    character: {},
    answers: []
  }

  componentDidMount = () => {
    axios.get("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/characters").then(
      (response) => {
        this.setState(
          {
            officeCharacters: response.data.data,
            randomChar1:findRandom(response.data.data.length),
            character:response.data.data.character,
            randomChar2:findRandom(response.data.data.length),
            randomChar3:findRandom(response.data.data.length)
          }
        )
        // console.log(this.state.officeCharacters)
      }
    )
    axios.get("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/quotes/random").then(
      (response) => {
        this.setState(
          {
            content:response.data.data,
            character:response.data.data.character,
          }
        )
      }
    )
  }

  newQuote = (event) => {
    // event.preventDefault();
    axios.get("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/quotes/random").then(
      (response) => {
        this.setState(
          {
            content:response.data.data,
            character:response.data.data.character,
          }
        )
      }
    )
  }

  checkAnswer = (event) => {
    event.preventDefault()
    const id = event.target.id
    this.setState({
      chosenCharacterId: id
    })
  }

  login = (event) => {
    console.log(event.target.username.value)
    this.setState({username: event.target.username.value})
  }

  reset = () => {
    this.setState({
      content: {},
      character: {}
    })
    this.newQuote()
  }
  //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT
  render = () => {
      return(
          <div className="container">
            {(this.state.username === null)
              ?<div>
                {/* <button onClick={this.login}>Login</button> */}
                <form onSubmit={this.login}>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username"></input>

                  <input type="submit" value="play"/>
                </form>
              </div>
              :<div>
                {console.log(this.state.character)}
                <Nav
                  username={this.state.username}>
                </Nav>
                <Quote
                  quote={this.state.content.content}
                  firstname={this.state.character.firstname}
                  lastname={this.state.character.lastname}
                  findData={this.findData}>
                </Quote>
                <Options
                  index1={this.state.randomChar1}
                  correctfirst={this.state.character.firstname}
                  correctlast={this.state.character.lastname}
                  index2={this.state.randomChar2}
                  index3={this.state.randomChar3}
                  officeCharacters={this.state.officeCharacters}
                  quoteCharacterId={this.state.character._id}
                  chosenCharacterId={this.state.chosenCharacterId}
                  checkAnswer={this.checkAnswer}
                  newQuote={this.newQuote}
                  reset={this.reset}>
                </Options>
              </div>
            }

          </div>
      )
  }
}

class Nav extends React.Component {
render = () => {
  return <div className="nav-container">
    <img className="navImg" src="https://iamavig.files.wordpress.com/2018/05/the-office-logo-e1527162138936.jpg?w=529" alt="The Office"></img>
    {/* <li className="navLi"><a href="#">Create</a></li> */}
    {/* <li className="navLi"><a href="#">Sign Up</a></li>
    <li className="navLi"><a href="#">Log In</a></li> */}
    <p className="welcome">Welcome, {this.props.username}</p>
  </div>
}
}

class Quote extends React.Component {
render = () => {
  return <div className="quote-container">
    <dl>
      <dt>Quote:</dt>
      <dd className="quote-text">{this.props.quote}</dd>

      {/* <dt>Answer</dt>
      <dd>{this.props.firstname} {this.props.lastname}</dd> */}
    </dl>
  </div>

}
}

const findRandom = (max) => {
return Math.floor(Math.random() * max)
}

const characters = () => {
  return this.props.officeCharacters
}

class Options extends React.Component {

render = () => {
  return <div>

  <dl>
    <dt>Choose your answer:</dt>
    <dd><button key={characters._id} id={characters._id}  onClick={this.props.checkAnswer}>{this.props.officeCharacters[this.props.index1].firstname} {this.props.officeCharacters[this.props.index1].lastname}
     </button>
    <button id={characters._id} onClick={this.props.checkAnswer}>
    {this.props.correctfirst} {this.props.correctlast}
    </button>
    <button id={characters._id} onClick={this.props.checkAnswer}>
      {this.props.officeCharacters[this.props.index2].firstname} {this.props.officeCharacters[this.props.index2].lastname}
    </button>
    <button id={characters._id} onClick={this.props.checkAnswer}>
      {this.props.officeCharacters[this.props.index3].firstname} {this.props.officeCharacters[this.props.index3].lastname}
      </button>
    </dd>
  </dl>
  {(this.props.chosenCharacterId === this.props.quoteCharacterId)
           ?alert('correct')
           :null
  }
</div>

}
}
ReactDOM.render(
<App/>,
document.querySelector('main'))
