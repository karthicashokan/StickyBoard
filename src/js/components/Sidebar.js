import React from "react";

export default class Header extends React.Component {

  constructor() {
    super();

    this.colorClick = this.colorClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
  }

  colorClick(event) {
    //alert(event.target.id);
    //console.log(event.target.id);
    this.props.addNote(event);
    }

  clearClick(event) {
    this.props.closeAllNotes(event);
  }

  saveClick(event) {
    this.props.save(event);
  }



  render() {

    var color1 = "yellow";
    var color2 = "blue";
    var color3 = "green";
    var color4 = "red";

  

    return (
      <div className="sidebar">
          <div className="top-icons">
            <div className="sidebar-icon" id="share">Share</div>
            <div className="sidebar-icon" id="save" onClick={this.saveClick.bind(this)}>Save</div>
          </div>
          <div className="palette">
            <div id="color1" className="palette-color" onClick={this.colorClick.bind(this)}></div>
            <div id="color2" className="palette-color" onClick={this.colorClick.bind(this)}></div>
            <div id="color3" className="palette-color" onClick={this.colorClick.bind(this)}></div>
            <div id="color4" className="palette-color" onClick={this.colorClick.bind(this)}></div>
          </div>
          <div className="bottom-icons">
            <div className="sidebar-icon" id="save" onClick={this.clearClick.bind(this)}>Clear</div>
          </div>
      </div>
    );
  }
}