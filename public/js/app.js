class App extends React.Component {
  state = {
    chosenCharacterId: null,
    username: 'hello',
    content: {},
    character: {},
    users: []
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
    event.preventDefault()
    // console.log(event.target.username.value)
    this.setState({username: event.target.username.value})
    axios
      .post('/user/new', this.state)
      .then(response => 
        this.setState({
          users: response.data
        })
      )
    
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
                <Login
                  login={this.login}>
                </Login>
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
                <Comment>
                </Comment>
                {/* <DeleteAndEdit> 
                </DeleteAndEdit> */}
              </div>
            }
      </div>
    )
  }
}

class Login extends React.Component {
  render = () => {
    return (
      <div className="login-container">
        <form onSubmit={this.props.login}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username"></input>

          <input type="submit" value="play"/>
        </form>
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


class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange = (event) => {
    this.setState({
      comments: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault() 
    // fetch(this.props.formAction)
    // axios
    //   .post('/:id', this.props.comments)
    //   .then
    //   (response => this.setState({
    //     comments: response.data
    //   }))
      alert("a name" + this.state.comments);
  }


    render = () => {
        return <div className="create-container">
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
             <form onSubmit={this.handleSubmit}>
            <h2 id="NewC"className="text-center">New Comment</h2>
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
        <label htmlFor="content"></label>
        <textarea className="form-control" id="content" rows="3" placeholder="Your comment goes here" value={this.state.comments}onChange={this.handleChange}/>
        <br />
        &nbsp;
           <button type="submit" className="btn btn-primary" >Submit</button>
           </form> 
           <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
           
           <h2 id="postedComments" className="text-center">Comments</h2>
           <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
           
       </div>
    }
}

class DeleteAndEdit extends React.Component {

      deleteComment = (event) => {
        event.preventDefault()
        axios.delete('/:id' + event.target.value).then(response =>
          this.setState({
            comment: response.data
          })
        )
      }

      updateComment = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/:id' + id, this.state).then(response => {
          this.setState({
            comment: response.data
          })
        })
      }
    render = () => {
        <ul>
            {this.props.comments.map(comment => {
        return <li key={comment._id}>
            <p>{comment.comment}</p>
            <button className="btn btn-danger" value={comment._id} onClick={this.props.deleteComment}>Delete
            </button>
            <details>
              <summary>
                  <i className="fas fa-pencil-alt"></i>
              </summary>
              <form onSubmit={this.props.updateComment} id={comment._id}>
                <label className="form-group" htmlFor="comment">Title: </label>
                  <br />
                  <input className="form-control" type="textarea" id="comment" onChange={this.props.handleChange} value={this.props.comment} />
                  <br />
                  <input className="btn btn-success" type="submit" value="Update Comment" />
              </form>
              </details>
          </li>
        
        })}
        </ul>
        
    }
}

class Scoreboard extends React.Component {
    state = {
        score: 0
    }
    updateScore = (event) => {
        let action = event.target.id
        switch (action) {
            case 'decrease':
                this.setState({ score: this.state.score - 1 })
                break
            case 'increase':
                this.setState({ score: this.state.score + 1 })
                break
            case 'reset':
                this.setState({ score: 0 })
                break
            default:
                break
        }
    }
    render = () => {
        return (
            <div className="scoreboard">
                <h2>Current Score: {this.state.score}</h2>
                <div className="score-buttons">
                    <button id="decrease" onClick={this.updateScore}>Decrease</button>
                    <button id="increase" onClick={this.updateScore}>Increase</button>
                    <button id="reset" onClick={this.updateScore}>Reset</button>
                </div>
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
