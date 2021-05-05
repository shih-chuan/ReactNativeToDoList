import React, { Component } from 'react';
import {StyleSheet , View , Text, FlatList} from 'react-native';
import Textinput from './components/Textinput'
import Header from './components/Header'

export default class App extends Component{

  render()
  {
    return(
      <React.Fragment>
      <Header/>
      <View style = {styles.startscreen}>
        <Textinput/>
      </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  startscreen : {
    paddingTop : 15,
    paddingRight : 50,
    paddingLeft : 50,
  }
})