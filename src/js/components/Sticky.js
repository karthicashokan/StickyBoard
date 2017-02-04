import React from "react";
import Note from "./Note";
import Sidebar from "./Sidebar";
import update from 'immutability-helper';


const DEFAULT_CONTENT = "Write Something...";
const DEFAULT_TITLE = "Title...";


var _notes = []
var _id_counter = 0
//localStorage.setItem('id_counter', "0");
//localStorage.setItem('notes', null);

if(localStorage.getItem('return') != null)
{
	_id_counter = parseInt(localStorage.getItem('id_counter'));

	if(localStorage.getItem('notes') != null)
		_notes = JSON.parse(localStorage.getItem('notes'));

}
else
{
  //Check for private browsing:
  try {
    localStorage.setItem('return', "True");
    localStorage.setItem('id_counter', 0);
    localStorage.setItem('notes', null);
  }
  catch(err) {
      alert("Sorry, our site currently doesn't support Private Browsing.");
  }
}


export default class Sticky extends React.Component {
	constructor() {
		super();

		this.state = {
			numNotes: _id_counter,
			notes: [],
		};

		this.addNote = this.addNote.bind(this);
		this.closeNote = this.closeNote.bind(this);
		this.closeAllNotes = this.closeAllNotes.bind(this);
		this.updateNotePosition = this.updateNotePosition.bind(this);
		this.changeText = this.changeText.bind(this);
		this.save = this.save.bind(this);
		this.loadNotes();
	}

	addNote(event) {
		var i = _id_counter + 1;
		_id_counter = _id_counter + 1;
		//alert(i);
		localStorage.setItem('id_counter', i.toString());

    //Determining the color:
    var thisNoteColor = "#FFFFA5" //Default is yellow
    switch(event.target.id)
    {
    	case "color1":
        thisNoteColor = "#FFFFA5"; //yellow
        break;

        case "color2":
        thisNoteColor = "#D9F0FF"; //blue*
        break;

        case "color3":
        thisNoteColor =  "#c4f0c4"; //green
        break;

        case "color4":
        thisNoteColor =  "#f7d1cf"; //red
        break;
      }

      var x = Math.round(Math.random() * 800);
      var y = Math.round(Math.random() * 800);
      var content = DEFAULT_CONTENT;
      var title = DEFAULT_TITLE;

      this.state.notes.push(<Note changeText={this.changeText.bind(this)} updateNotePosition={this.updateNotePosition.bind(this)} closeNote={this.closeNote.bind(this)} x={x} y={y} id={i} color={thisNoteColor} title={title} content={content} key={i} />);
      this.setState({
       numNotes: _id_counter + 1
     });

    //localStorage.setItem('notes', JSON.stringify(this.state_NoteArray_to_list()));
    this.sync_LocalStorage_and_State();
  }

  closeNote(event) {

   if (this.state.notes.length == 1)
   {
    this.closeAllNotes();
  }
  else {
    this.setState({
     notes: update(this.state.notes, {$splice: [[event.target.id -1, 1]]})
   })

    this.setState({
     notes: update(this.state.notes, {$splice: [[event.target.id -1, 1]]}),
     numNotes: this.state.numNotes - 1 }, function afterStateChange () {
				//console.log(this.state.notes)
				_id_counter = _id_counter - 1;
				localStorage.setItem('id_counter', _id_counter);
				this.sync_LocalStorage_and_State();
  			//alert(_id_counter);
  		});  	
  }
}

loadNotes() {
	//console.log("loadNotes");
  	//alert("loadNotes");
  	if(localStorage.getItem('notes') != null) {
  		_notes = JSON.parse(localStorage.getItem('notes'));
  		//console.log(_notes);
  		
  		for(var i in _notes) {
  			//alert(_notes[i]["x"]);
  			//alert(_notes[i]["y"]);
  			var this_note = new Note
  			this.state.notes.push(<Note changeText={this.changeText.bind(this)} updateNotePosition={this.updateNotePosition.bind(this)} closeNote={this.closeNote.bind(this)} x={_notes[i]["x"]} y={_notes[i]["y"]} id={_notes[i]["id"]} color={_notes[i]["color"]} title={_notes[i]["title"]} content={_notes[i]["content"]} key={_notes[i]["id"]} />);
  		}
  		
  	}
  }

  sync_LocalStorage_and_State() {
  	var json_object = []
  	//console.log("state_NoteArray_to_list");
  	//console.log(this.state.notes);
  	if(this.state.notes.length > 0) {
  		for(var i in this.state.notes) {
  			var this_note = {}
  			this_note["id"] = this.state.notes[i]["key"];
  			this_note["color"] = this.state.notes[i]["props"]["color"];
  			this_note["x"] = this.state.notes[i]["props"]["x"];
  			this_note["y"] = this.state.notes[i]["props"]["y"];
  			this_note["title"] = this.state.notes[i]["props"]["title"];
  			this_note["content"] = this.state.notes[i]["props"]["content"];
  			json_object[i] = this_note;
  		}
  	//console.log("json_object = " + JSON.stringify(json_object));
  	//return json_object
  	localStorage.setItem('notes', JSON.stringify(json_object));
  }
}

closeAllNotes(event) {
  var r = confirm("This will clear all sticky notes. Are you sure?");
  if (r == true) {
   this.setState({
    notes: [],
    numNotes: 0 }, function afterStateChange () {

     _id_counter = 0;
     localStorage.setItem('id_counter', "0");
     localStorage.setItem('notes', null);
   });  
 }
}

updateNotePosition(event) {

  	//The values returned by element.getBoundingClientRect() are relative to the viewport.
  	var rect = event.target.getBoundingClientRect();
  	//console.log(rect.top, rect.left);

  	_notes = JSON.parse(localStorage.getItem('notes'));
  	//console.log(_notes);

  	for(var i in _notes) {
  		if(event.target.id == _notes[i]["id"]) {
  			_notes[i]["x"] = rect.left - 8;
  			_notes[i]["y"] = rect.top - 8;
  			break;
  		}
  	}
  	localStorage.setItem('notes', JSON.stringify(_notes));
  }


  changeText(event) {

  	_notes = JSON.parse(localStorage.getItem('notes'));
  	//console.log(_notes);

  	for(var i in _notes) {
  		if(event.target.parentNode.id == _notes[i]["id"]) {
  			if(event.target.className == "content") {
  				_notes[i]["content"] = event.target.value;
  			} else if (event.target.className == "noteTitle") {
  				_notes[i]["title"] = event.target.value;
  			}
  			break;
  		}
  	}
  	localStorage.setItem('notes', JSON.stringify(_notes));
  }

  save(){
  	this.sync_LocalStorage_and_State();
  	alert("Your Stickies have been saved to your Browser's local storage.")
  }


  render() {
  	return (
  		<div>
  		{this.state.notes}
  		<Sidebar save={this.save.bind(this)} addNote={this.addNote.bind(this)} closeAllNotes={this.closeAllNotes.bind(this)}/>
  		</div>
  		);
  }

}