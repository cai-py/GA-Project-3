class App extends React.Component {
    state = {
        content: {},
        character: {},
        show: false
    }

    findData = (event) => {
      event.preventDefault();
      axios.get("https://cors-anywhere.herokuapp.com/https://officeapi.dev/api/quotes/random").then(
        (response) => {
          console.log(response)
          this.setState(
            {
              content:response.data.data,
              character:response.data.data.character,

            }
          )
        }
      )
    }

    //DELETE -- DELETE
    deleteOffice = (event) => {

    }

    //UPDATE -- PUT
    updateOffice = (event) => {

    }

    //HOW TO SET THE CHANGES
    handleChange = (event) => {

    }

    //HOW TO ADD AFTER SUBMIT -- GET THE INFO AFTER POST & ADD IT, PREVENT AUTO REFRESH
    handleSubmit = (event) => {

    }

    //TOGGLE FORM
    toggleForm = (event) => {
        toggleForm = (event) => {
          this.setState({
            show: !this.state.show
          })
      }
    }

    //HOW THE INFO SHOULD DISPLAY ON SCREEN, COMBINING HTML w/ JS USING REACT

    render = () => {
        return(
            <div>
             <Data> 
              {this.state.show ?<div quote={this.state.content.content} 
              firstname={this.state.character.firstname}
              lastname={this.state.character.lastname}> </div> : null}
            </Data>
            
            <Create>
            </Create>
            <form onClick={this.findData}>
            <button type="button" name="button">Get Question</button>
            </form> 
            </div>
        )
    }
}


class Data extends React.Component {
  render = () => {
    return <dl>
    <dt>Quote:</dt>
    <dd>{this.props.quote}</dd>

    <dt>Answer</dt>
    <dd>{this.props.firstname} {this.props.lastname}</dd>
    </dl>
  }
}


class Create extends React.Component {
    render = () => {
        return <h2>Create Your Own Trivia!</h2>
        <label htmlFor="content">Content: </label>
        <input id="content" onChange={this.props.quote} type="text"/>
        <br />
        <label htmlFor="answer">Answer: </label>
        <input class="answer" onChange={this.props.firstname}
    }
}

ReactDOM.render(
  <App/>,
  document.querySelector('main'))
