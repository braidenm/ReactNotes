import React, { Component } from 'react'

interface SearchProps{
  search(keyWord: string): void;
}

interface SearchState{
  keyWord: string;
}

export default class Search extends Component<SearchProps, SearchState> {

  constructor(props: any){
    super(props);

    this.state = {
      keyWord: ''
    }

    this.search = this.search.bind(this);
  }

  search(event: any){
    this.props.search(event.target.value);

    this.setState({keyWord: event.target.value})
  }


  render() {
    
    return (
        <div className="col-lg 6 search">
          <form>
            <input className='form-control' value={this.state.keyWord} placeholder="Search" onChange={this.search} type="text" name="search" />
          </form>
        </div>
    );
  }
}

