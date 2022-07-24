import './App.css';
import React from 'react';
import Wrapper from "./components/Wrapper";
import Button from "./components/Button";


const ButtonSunds = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

export default class App extends React.Component{


constructor(props) {
  super(props);

  this.state = {
    power: false,
    volume: 0.3,
    screen: ""
  };

  this.changePower = this.changePower.bind(this);
  this.changeVolume = this.changeVolume.bind(this);
  this.clearScreen = this.clearScreen.bind(this);
  this.playSound = this.playSound.bind(this);

}

changePower() {
  this.setState({
    power: !this.state.power,
    screen: this.state.power ? "Power is off" : "Power is on"
  });

  this.state.power ?
  document.getElementById("power-button").style.backgroundColor = 'rgb(212, 207, 248)' :
  document.getElementById("power-button").style.backgroundColor = 'rgb(250, 250, 93)';

}

changeVolume(event) {
  if (this.state.power) 
  {
    this.setState({
      volume: event.target.value / 100,
      screen: "Volume: " + event.target.value
    });
    setTimeout(() => this.clearScreen(), 1000)
  }
}

clearScreen() {
  this.setState({
    screen: ""
  });
}


playSound(event) {
  if (this.state.power) 
  {
    document.getElementById(event.target.value).volume = this.state.volume;
    document.getElementById(event.target.value).pause();
    document.getElementById(event.target.value).currentTime = 0;
    document.getElementById(event.target.value).play();


    this.setState({
      screen: ButtonSunds[ButtonSunds.findIndex(x => x.keyTrigger === event.target.value)].id
    });
  }



}

render(){
  return (
    <div className="App">
      <div className='container' id="wrapper">
        <Wrapper id="button-wrapper">
          {
            ButtonSunds.map((btn) => {
              return (
                <Button value={btn.keyTrigger} className={this.state.power ? "button on" : "button off"} src={btn.url}  
                onClick={this.playSound}/>
              );
            })
          }
        </Wrapper>

        <Wrapper id="display-wrapper">
          <div id='screen'>
            {this.state.screen}
          </div>
          <button id="power-button" onClick={this.changePower}>
            {this.state.power ? "ON" : "OFF"}
          </button>
          <div >
            <h1>Volume</h1>
            <input id="volume-slider" type="range" min="0" max="100" value={this.state.volume * 100} onChange={this.changeVolume} />
          </div>
          
        </Wrapper>
      </div>
    </div>

  );}
}

