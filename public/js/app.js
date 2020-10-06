class App extends React.Component {
  state = {
    chosenCharacterId: null,
    username: null,
    content: {},
    character: "",
    answers: []
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
    // console.log(event.target.username.value)
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
                <Nav
                  username={this.state.username}>
                </Nav>
                <Quote
                  quote={this.state.content.content}
                  findData={this.findData}
                  index1={this.state.randomChar1}
                  character={this.state.character}
                  index2={this.state.randomChar2}
                  officeCharacters={this.state.officeCharacters}>
                </Quote>
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

const findRandom = (max) => {
return Math.floor(Math.random() * max)
}



class Quote extends React.Component {
  state = {
    showQuestion: false,
    quote: {},
    officeCharacters: null,
    score: 0
  }

  getQuote = () => {
    axios("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/quotes/random").then(quote => {
      this.setState({
        quote:quote.data.data,
        showQuestion: false,
      })
    })
    axios("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/characters").then(char => {
      this.setState({
        officeCharacters: char.data.data,
        randomChar1:findRandom(char.data.data.length),
        randomChar2:findRandom(char.data.data.length),
      })
    })

}



 decrease = () => {
 this.setState({ score: this.state.score - 100 })
  }


increase = () => {
  this.setState({ score: this.state.score + 100 })
  }


  rightAnswer = () => {
    alert('Nice, thats the correct answer')
    this.getQuote()
    this.increase()
  }

  wrongAnswer = () => {
    alert('Wrong Answer')
    this.getQuote()
    this.decrease()
  }

  toggleQuote = () => {
    this.setState({
      showQuestion: !this.state.showQuestion
    })
  }
render = () => {
  return(
      <div className="play">
        <div>
        <h2><span>Current Score:</span> {this.state.score}</h2>
        </div>
          <h2><span>Let's Play!</span></h2>
          <button className="btn btn-outline-secondary" onClick={this.getQuote}>Get Trivia!</button><br/>
          {/* checks if a question exists first before rendering the info */ }
          { this.state.quote.content
              ? <div>
                  <h3><span>Quote:</span></h3> {this.state.quote.content}<br/>
                  <button className="btn btn-outline-secondary" onClick={this.toggleQuote}>Show Answer</button>
                <div>
                  <button className="btn btn-outline-success" id="button1" onClick={this.wrongAnswer} >{this.state.officeCharacters[this.state.randomChar1].firstname} {this.state.officeCharacters[this.state.randomChar1].lastname}</button>
                  <button className="btn btn-outline-success" id="button2" onClick={this.rightAnswer}>{this.state.quote.character.firstname} {this.state.quote.character.lastname}</button>
                  <button className="btn btn-outline-success" id="button3" onClick={this.wrongAnswer}>{this.state.officeCharacters[this.state.randomChar2].firstname} {this.state.officeCharacters[this.state.randomChar2].lastname}</button>
                </div>
                  { this.state.showQuestion
                      ? <div><h3><span>Answer:</span></h3> {this.state.quote.character.firstname} {this.state.quote.character.lastname}</div>
                      : null
                  }
                </div>
              : null
          }
      </div>
  )
}
}

ReactDOM.render(
<App/>,
document.querySelector('main'))


/*}  this.state.answers.push(this.state.officeCharacters[this.state.randomChar1].firstname +this.state.officeCharacters[this.state.randomChar1].lastname)
  this.state.answers.push(this.state.quote.character.firstname+ this.state.quote.character.lastname)
  this.state.answers.push(this.state.officeCharacters[this.state.randomChar2].firstname+ this.state.officeCharacters[this.state.randomChar2].lastname)*/
    // console.log(this.state.answers);

//   $(() => {
//     const answers = $('.answers')
//     console.log(answers.children());
//     const child = answers.children()
//     child.detach().sort((a, b) => {
//       return a - b
//     })
//     answers.append(child)
//   })
// }
