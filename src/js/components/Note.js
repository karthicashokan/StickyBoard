import React from "react";
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

const DEFAULT_CONTENT = "Write Something...";
const DEFAULT_TITLE = "Title...";


export default class Note extends React.Component {
/*
  var x = Math.round(Math.random() * 400);
  var y = Math.round(Math.random() * 500);
  var color = this.props.color;
*/
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this)
  }

  _updateNotePosition(x, y) {
    this.setState({x: x, y: y});
  }

  handleStop(event) {
    this.setState({x: event.pageX, y: event.pageY});
    this.props.updateNotePosition(event);
  }

  handleDrag(event) {
    //xconsole.log("handleDrag");
  }

  handleClose(event) {
    //alert(event.target.id);
    this.props.closeNote(event);
  }

  handleChange(event) {
    if(event.target.className == "content") {
      if(event.target.value == "")
        event.target.value = DEFAULT_CONTENT;
    } else if (event.target.className == "noteTitle") {
      if(event.target.value == "")
        event.target.value = DEFAULT_TITLE;
    }
    this.props.changeText(event);
  }

  handleFocus(event) {
    if(event.target.className == "content") {
      if(event.target.value == DEFAULT_CONTENT)
        event.target.value = "";
    } else if (event.target.className == "noteTitle") {
      if(event.target.value == DEFAULT_TITLE)
        event.target.value = "";
    }
  }

  render() {

  var ThisNoteStyle = {
    zIndex: this.props.id,
    backgroundColor: this.props.color,
  }

    return (
      <Draggable
        axis="both"
        handle=".note"
        zIndex={this.props.key}
        onStop={this.handleStop.bind(this)}
        onDrag={this.handleDrag.bind(this)}
        defaultPosition={{x: this.props.x, y: this.props.y}}>
        <div className="note" id={this.props.id} style={ThisNoteStyle}>
          <textarea className="noteTitle" style={ThisNoteStyle} defaultValue={this.props.title} onFocus={this.handleFocus.bind(this)} onBlur={this.handleChange.bind(this)}/>
          <div className="closebutton" id={this.props.id} onClick={this.handleClose.bind(this)}></div>
          <textarea className="content" style={ThisNoteStyle} defaultValue={this.props.content} onFocus={this.handleFocus.bind(this)} onBlur={this.handleChange.bind(this)}/>
        </div>
        </Draggable>
    );
  }
}