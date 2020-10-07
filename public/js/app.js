class App extends React.Component {
  state = {
    chosenCharacterId: null,
    username: null,
    content: {},
    comments: [],
    comment: "",
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

  //DELETE -- DELETE COMMENT
    deleteComment = (event) => {
        event.preventDefault()
        axios.delete('/:id' + event.target.value).then(response =>
        this.setState({
            comment: response.data
        })
      )}

    updateComment = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/:id' + id, this.state).then(response => {
            this.setState({
                comment: response.data,
                officeCharacters: '',
            }
      )}
  )}

  //ON COMMENT SUBMIT

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
    score: 0,
    newchar1: "",
    newchar2: "",
    newchar3: ""
  }

  getQuote = () => {
    axios("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/quotes/random").then(quote => {

      this.setState({
        quote:quote.data.data,
        showQuestion: false,
      })
      axios("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/characters").then(char => {
        console.log('hello');
        this.setState({
          officeCharacters: char.data.data,
          randomChar1:findRandom(char.data.data.length),
          randomChar2:findRandom(char.data.data.length),
          /*character1:this.state.officeCharacters[this.state.randomChar1].firstname+ this.state.officeCharacters[this.state.randomChar1].lastname,
          character2: this.state.quote.character.firstname+ this.state.quote.character.lastname*/
        })
        ;
        this.randomize()
      })
    })


}

randomize = () => {
  let char1 = this.state.officeCharacters[this.state.randomChar1].firstname + ' ' +  this.state.officeCharacters[this.state.randomChar1].lastname
  let char2 = this.state.quote.character.firstname + ' ' + this.state.quote.character.lastname
  let char3 = this.state.officeCharacters[this.state.randomChar2].firstname + ' ' + this.state.officeCharacters[this.state.randomChar2].lastname

  const charArr = [char1, char2, char3].sort()
  this.setState({
    newchar1: charArr[2],
    newchar2: charArr[1],
    newchar3: charArr[0]
  })
  console.log(charArr);
}

 decrease = () => {
 this.setState({ score: this.state.score - 100 })
  }


increase = () => {
  this.setState({ score: this.state.score + 100 })
  }


checkAnswer = () => {
  if (event.target.value === this.state.quote.character.firstname + " " + this.state.quote.character.lastname) {
    alert('correct answer')
    this.increase()
    this.getQuote()
  } else {
    alert('wrong answer')
    this.decrease()
    this.getQuote()
  }

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
                 <button className="btn btn-outline-success" id="button1" value={this.state.newchar1} onClick={this.checkAnswer}>{this.state.newchar1}</button>
                  <button className="btn btn-outline-success" value={this.state.newchar2} id="button2" onClick={this.checkAnswer}>{this.state.newchar2}</button>
                  <button className="btn btn-outline-success" value={this.state.newchar3} id="button3" onClick={this.checkAnswer}>{this.state.newchar3}</button>
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
 state = {
   comments: []
  }

    render = () => {
        return <div className="create-container">
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
          <form onSubmit={this.handleSubmit}>
            <h2 id="NewC"className="text-center">New Comment</h2>
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
        <label htmlFor="content"></label>
        <textarea className="form-control" id="comment" rows="3" placeholder="Your comment goes here" onChange={this.handleChange}/>
        <br />
        &nbsp;
           <button type="submit" className="btn btn-primary" >Submit</button>
           </form>
           <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>

           <h2  id="postedComments" className="text-center">Comments</h2>
           {this.state.comments.map(comment => {
             return <div>
             <h5 key="key">{comment}</h5>

             </div>
           })}
           <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
       </div>
    }

    handleSubmit = event => {
      event.preventDefault()
      event.currentTarget.reset()
      this.setState({
        comments: [...this.state.comments,this.state.comment]
      })
          console.log(this.state.comment);
      }

    //ON COMMENT CHANGE
    handleChange = event => {
          this.setState({
            [event.target.id]: event.target.value
          })
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
