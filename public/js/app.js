class App extends React.Component {
    state = {
      officeCharacters: null,
      chosenCharacterId: null,
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
          console.log(this.state.character)
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
          console.log(this.state.character)
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

    //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT
    render = () => {
        return(
            <div className="container">
            <Nav/>
            <Data
              quote={this.state.content.content}
              firstname={this.state.character.firstname}
              lastname={this.state.character.lastname}
              findData={this.findData}>
            </Data>
            <Options 
              officeCharacters={this.state.officeCharacters}
              quoteCharacterId={this.state.character._id}
              chosenCharacterId={this.state.chosenCharacterId}
              checkAnswer={this.checkAnswer}
              newQuote={this.newQuote}>
            </Options>
            </div>
        )
    }
}

class Nav extends React.Component {
  render = () => {
    return <nav>
      <img className="navImg" src="https://iamavig.files.wordpress.com/2018/05/the-office-logo-e1527162138936.jpg?w=529" alt="The Office"></img>
      <ul id="navUl">
        {/* <li className="navLi"><a href="#">Create</a></li> */}
        <li className="navLi"><a href="#">Sign Up</a></li>
        <li className="navLi"><a href="#">Log In</a></li>
      </ul>
    </nav>
  }
}

class Data extends React.Component {
  render = () => {
    return <div className="data-container">
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
