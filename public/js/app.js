class App extends React.Component {
    state = {
      officeCharacters: null,
      chosenCharacterId: null,
      username: 'null',
      content: {},
      character: {},
    }
    
    componentDidMount = () => {
      axios.get("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/characters").then(
        (response) => {
          this.setState(
            {
              officeCharacters: response.data.data
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
      this.newQuote()
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
                    officeCharacters={this.state.officeCharacters}
                    quoteCharacterId={this.state.character._id}
                    chosenCharacterId={this.state.chosenCharacterId}
                    checkAnswer={this.checkAnswer}
                    newQuote={this.newQuote}>
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

class Options extends React.Component {
  render = () => {
    return <div className="options-container">
      {(this.props.officeCharacters === null) ? null: 
        <div>
          {this.props.officeCharacters.map(character => {return(
            <button key={character._id} id={character._id} onClick={this.props.checkAnswer}>{character.firstname} {character.lastname}</button>
          )})}
          {(this.props.chosenCharacterId === this.props.quoteCharacterId) 
            ?alert('correct')
            :null
          }
        </div>
        
        
      }
      
    </div>
  }
}


ReactDOM.render(
  <App/>,
  document.querySelector('main'))
