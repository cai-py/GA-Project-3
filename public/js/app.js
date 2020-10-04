class App extends React.Component {
    state = {
      officeCharacters: null,
      chosenCharacterId: null,
      username: null,
      content: {},
      character: {},
      comment: []
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

    //DELETE -- DELETE COMMENT
    deleteComment = (event) => {
        event.preventDefault()
        axios.delete('/:id' + event.target.value).then(response =>
        this.setState({
            comment: response.data
        })
    )
}

    //UPDATE & POST COMMENT -- PUT
    updateComment = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/:id' + id, this.state).then(response => {
            this.setState({
                comment: response.data,
                officeCharacters: '',
                chosenCharacterId: '',
                content: '',
                character: '',

            })
        })
    }
    //DELETE -- DELETE COMMENT
    deleteComment = (event) => {
        axios.delete('/' + event.target.value).then(response =>
            this.setState({
                comment: response.data
            })
        )
    }

    //UPDATE SCOREBOARD
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
                  <Scoreboard>
                  </Scoreboard>
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
                  <Comment>
                  </Comment>
                  <DeleteAndEdit>
                  </DeleteAndEdit>
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

class Options extends React.Component {
  render = () => {
    return <div className="options-container">
      {(this.props.officeCharacters === null) ? null:
        <div>
        <div>
        <button>{this.props.officeCharacters[this.props.index1].firstname} {this.props.officeCharacters[this.props.index1].lastname}
        </button>
          <button>
          {this.props.correctfirst} {this.props.correctlast}
          </button>
          <button>
          {this.props.officeCharacters[this.props.index2].firstname} {this.props.officeCharacters[this.props.index2].lastname}
          </button>
          <button>
          {this.props.officeCharacters[this.props.index3].firstname} {this.props.officeCharacters[this.props.index3].lastname}
          </button>
          </div><br/>
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


class Comment extends React.Component {
    render = () => {
        return <div className="create-container">
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
             <form onSubmit={this.props.handleSubmit}>
            <h2 id="NewC"className="text-center">New Comment</h2>
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
        <label htmlFor="content"></label>
        <textarea className="form-control" id="content" rows="3" placeholder="Your comment goes here" onChange={this.props.comment}/>
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
    render = () => {
        <ul>
            {this.state.comment.map(comment => {
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

}

ReactDOM.render(
  <App/>,
  document.querySelector('main'))
