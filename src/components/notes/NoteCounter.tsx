import React, { Component } from "react";

interface NoteCounterProps {
    count: number
}

interface NoteCounterState {
    colorOfBox: String
}

export default class NoteCounter extends Component<NoteCounterProps, NoteCounterState> {

constructor(props:NoteCounterProps){
    super(props);

    this.state = {
        //safe warning danger
        colorOfBox: 'safe'
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
}

componentDidMount(){
      this.setState({colorOfBox: this.dangerLevel(this.props.count)})
}

componentDidUpdate(prevProps: any){
    if(prevProps !== this.props){
      this.setState({colorOfBox: this.dangerLevel(this.props.count)})

    }
}

dangerLevel(count:number) {
  if (count >= 6) {
    return 'danger';
  }
  if (count >= 4) {
    return 'warning';
  }
  return 'safe';

}



  render() {
    return (
        <div className="col-lg-6">
          <h1>
            <label>Notes</label> <span className={'count ' + this.state.colorOfBox}>{this.props.count}</span>{" "}
          </h1>
        </div>
    );
  }
}
