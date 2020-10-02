
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
              officeCharacters: response.data.data,
              randomChar1:findRandom(response.data.data.length),
              randomChar2:findRandom(response.data.data.length),
              randomChar3:findRandom(response.data.data.length)
            }
          )
          // console.log(this.state.officeCharacters)
        }
      )
    }



    findData = (event) => {
      event.preventDefault();
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
        chosenCharacter: event.target.id
      })
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
              index1={this.state.randomChar1}
              correctfirst={this.state.character.firstname}
              correctlast={this.state.character.lastname}
              index2={this.state.randomChar2}
              index3={this.state.randomChar3}
              officeCharacters={this.state.officeCharacters}
              quoteCharacter={this.state.character}
              chosenCharacterId={this.state.chosenCharacterId}
              checkAnswer={this.checkAnswer}>
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

          <dt>Answer</dt>
        <dd>{this.props.firstname} {this.props.lastname}</dd>
      </dl>
      <button onClick={this.props.findData} type="button" name="button">Get Quote</button>
    </div>

  }
}

 const findRandom = (max) => {
  return Math.floor(Math.random() * max)
}


class Options extends React.Component {
  render = () => {
    return <div className="options-container">
      {(this.props.officeCharacters === null) ? null:
        <div>
            <div>{this.props.officeCharacters[this.props.index1].firstname} {this.props.officeCharacters[this.props.index1].lastname}
            <br/>
            {this.props.correctfirst} {this.props.correctlast}
            <br/>
            {this.props.officeCharacters[this.props.index2].firstname} {this.props.officeCharacters[this.props.index2].lastname}
            <br/>
            {this.props.officeCharacters[this.props.index3].firstname} {this.props.officeCharacters[this.props.index3].lastname}
            </div><br/>
            {this.props.officeCharacters.map(character => {return(
            <button key={character._id}      onClick={this.props.checkAnswer}>{character.firstname} {character.lastname}</button>
          )})}
          {/* {(this.props.chosenCharacterId === this.props.quoteCharacter.firstname)
            ?<h1>correct</h1>
            :<h1>wrong</h1>
          } */}

        </div>


      }

    </div>
  }
}


ReactDOM.render(
  <App/>,
  document.querySelector('main'))
