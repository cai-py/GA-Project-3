class App extends React.Component {
    state = {
      officeCharacters: null,
      chosenCharacterId: null,
      content: {},
      character: {},
      comment: []
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
    //DELETE -- DELETE COMMENT
    deleteComment = (event) => {
        axios.delete('/' + event.target.value).then(response =>
            this.setState({
                comment: response.data
            })
        )
    }

    //UPDATE & POST COMMENT -- PUT
    updateComment = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/' + id, this.state).then(response => {
            this.setState({
                comment: response.data,
                officeCharacters: '',
                chosenCharacterId: '',
                content: '',
                character: '',

            })
        })
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
              officeCharacters={this.state.officeCharacters}
              quoteCharacter={this.state.character}
              chosenCharacterId={this.state.chosenCharacterId}
              checkAnswer={this.checkAnswer}>
            </Options>
            <Comment/>
            </div>
        )
    }
}

class Nav extends React.Component {
  render = () => {
    return <nav>
      <img className="navImg" src="https://iamavig.files.wordpress.com/2018/05/the-office-logo-e1527162138936.jpg?w=529" alt="The Office"></img>
      <ul id="navUl">
        {/* <button onClick={this.props.toggleForm} data-toggle='modal' className="btn btn-light"><i className="fas fa-plus"></i></button> */}
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
      <button onClick={this.props.findData} type="button" name="button">Get Quote</button>
    </div>
    
  }
}

class Options extends React.Component {
  render = () => {
    return <div className="options-container">
      {(this.props.officeCharacters === null) ? null: 
        <div>
          {this.props.officeCharacters.map(character => {return(
            <button id={character._id} onClick={this.props.checkAnswer}>{character.firstname} {character.lastname}</button>
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


class Comment extends React.Component {
    render = () => {
        return <div className="create-container">
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
             <form onSubmit={this.props.handleSubmit}>
            <div className="text-center">
            <h2>Comments</h2>
            <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
            </div>
        <label htmlFor="content"></label>
        <textarea className="form-control" id="content" rows="3" placeholder="Your comment goes here" onChange={this.props.comment}/>
        <br />
        &nbsp;
           <button type="submit" className="btn btn-primary" >Submit</button>
           </form> 
           <hr className="hr-light my-4 wow fadeInDown" data-wow-delay="0.4s"/>
       </div>
    }
}

class DeleteC extends React.Component {
    render = () => {
        return 
    }
}

ReactDOM.render(
  <App/>,
  document.querySelector('main'))
