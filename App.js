import React from 'react';
import { StyleSheet, Text, View, Platform, Slider } from 'react-native';
import Constants from 'expo-constants';

class ColorControl extends React.Component {
  constructor(props){
    super(props);
    this.state = props
  }

  render(){
    return(
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Text>{this.props.title}</Text>
      <Slider onValueChange = { (val) => {
          this.props.onValueChanged(val) }}
          value={this.props.value} step = {1} minimumValue = {0} maximumValue = {255} style={styles.slider} />
      <Text style={styles.textValue}>{this.props.value}</Text>
    </View>
    )}
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      red: 100,
      green: 150,
      blue: 200
    }
  }
  onSliderValueChange = (color) => {
      this.setState(color)
  }

  renderHeader = () => {
    return(
      <View style={styles.header}>
        <Text style={styles.headerText}>Color Picker</Text>
      </View>
    )}
  
  render() {
    return (
      <View style={styles.container}>

        {this.renderHeader()}
        
        <View style={{flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center'}}>
          <View style = {{width: 300, height: 350}}>
            <View style={{flex: 1}}>
                <ColorControl title = 'R' value = {this.state.red} onValueChanged = {(val) => {
                      const currentColor = this.state;
                      const newColor = {...currentColor, red: val}
                      this.onSliderValueChange(newColor)
                }}/>
                <ColorControl title = 'G' value = {this.state.green} onValueChanged = {(val) => {
                      const currentColor = this.state;
                      const newColor = {...currentColor, green: val}
                      this.onSliderValueChange(newColor)}} />
                <ColorControl title = 'B' value = {this.state.blue} onValueChanged = {(val) => {
                  const currentColor = this.state;
                  const newColor = {...currentColor, blue: val}
                  this.onSliderValueChange(newColor)}}/>
            </View>

            <View style={{flex: 1, backgroundColor: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`}}>

            </View>
          </View>
              
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Constants.statusBarHeight
  },
  header: {
    height: 60,
    backgroundColor: '#98AFC7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    elevation: 10  //for displaying shadow in android
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    ...Platform.select({
      ios: {
        marginTop: 15,
      },
      android: 
      {
        marginTop: 0,
      }
    })
  },
  slider: {
    width: 200,
    marginLeft: 5,
    marginRight: 5
  },
  textValue: {
    width: 50, 
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
