
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity,Image, Text } from 'react-native';

export default class DummyApiCalls extends Component {
  constructor(props) {
    super(props)
    console.log("props :- ", props);
    this.state = {
      searchData: [],
      animating: false,
      isLoading:true
    }
  }


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    this.setState({ animating: true })
    fetch("https://itunes.apple.com/search?term=Michael+jackson")
      .then((res) => res.json())
      .then((response) => {
        console.log('response', response)
        this.setState({ animating: false,isLoading:false, searchData: response.results })
      }).catch((error) => {
        this.setState({ animating: false,isLoading:false })
        console.log('error', error)
      })
  }

  delete = (index) => {
    let { searchData } = this.state;
    searchData.splice(index, 1)
    this.setState({ searchData })
  }

  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MusicDetails',{item})}} style={[styles.card,]}>
      <View style={{ flexDirection: 'row',justifyContent:'center' }}>
        <View>
          <Image source={{uri:item.artworkUrl100}} style={{width: 100, height: 100}}/></View>
        <View style={{ flex: 1,marginLeft:25}}>
          
          <Text style={styles.track}>{item.trackName}</Text>
          <Text style={styles.subDetails1}>{item.artistName}</Text>
          <Text style={styles.subDetails2}>{(item.trackTimeMillis/(1000*60)).toFixed(2)} m</Text>
        </View>
      </View>
    </TouchableOpacity >
  )

  render() {
    const { isLoading } = this.state
    return !isLoading ? (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>SONGS</Text>
          </View>
        <View style={styles.mainContainer}>
          <View>
            <FlatList
              data={this.state.searchData}
              extraData={this.state}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              legacyImplementation={true}
            />
            {
              this.state.animating &&
              <View style={styles.container}>
                <ActivityIndicator size="large" />
              </View>
            }
          </View>
        </View>
      </>) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#333"} />
        <Text>Loading...</Text>
      </View>
    );
    
  };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
    padding: 10
  },
  mainContainer:{
    flex:1,
    backgroundColor:'#3f696e',
    width:'100%',
    justifyContent:'center',
    paddingHorizontal:15,
    paddingVertical:10
     },
  italicUnderline: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '90%',
    height: '90%',
  },
  btn:{
    alignSelf:'stretch',
    alignItems:'center',
    marginTop:35,
    backgroundColor:'#11c5d9',
    paddingVertical:20,
    marginBottom:150
  },
  btnText:{
    color:'#fff',
    fontWeight:'bold' 
  },
  track:{
    fontSize:18,
    fontWeight:'bold',
    color:'#11c5d9',
    marginBottom:8
  },
  subDetails1:{
    fontSize:16,
    marginBottom:4
  },
  subDetails2:{
    fontSize:14,
    color:'#525453'
  },
  textHeader:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:18
  },
  headerContainer:{
    paddingVertical:20,
    backgroundColor:'#11c5d9',
    alignItems:'center'
  }
});