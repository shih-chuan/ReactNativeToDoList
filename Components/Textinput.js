import React, { Component } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, View, Modal } from 'react-native'
import List from './List'
import ModifyItem from './ModifyItem'
import ToDoService from '../services/ToDoService';

class Textinput extends Component{
    state = {
        Value : "",
        list : [],
        visible: false,
        focusPost: '',
        visiblemodify : false,
        valueModify : ''
    }

    componentDidMount(){
        ToDoService.getToDoList().then( res => {
            let newList = res.posts.map(post => {
                return {key: post["id"] , value: post["content"]}
            })
            console.log(newList)
            this.setState({list: newList})
        })
    }

    handleModifyOpen = (value, post) => {
        this.setState({visiblemodify: true, valueModify: value, focusPost: post})
    }

    handleItemAdd = () => {
        ToDoService.postToDo({ title: "Test", content: this.state.Value })
            .then(res => {
                console.log(res.post)
                this.setState({list : [...this.state.list , {key :  res.post.id, value :res.post.content}]});
                this.setState({Value : ''});
                this.setState({visible : false})
            })
    }

    handleModifyValue = (e) => {
        this.setState({valueModify : e});
    }

    handlevalue = (e) =>{
        this.setState({Value : e});
    }

    handleItemDelete = (key) => {
        ToDoService.deleteToDo(key)
            .then(post => {
                let new_arr = this.state.list.filter((item) => item.key !== key)
                this.setState({list: new_arr})
            })
    }

    cancelhandle = () => {
        this.setState({visiblemodify : false});
    }

    modifypress = (new_value) => {
        this.setState({list : [...this.state.list , {key :  post.data.post.id, value : post.data.post.content}]});
        this.setState({visiblemodify : false});
    }

    handleItemUpdate = () => {
        console.log(this.state.focusPost, this.state.valueModify)
        ToDoService.putToDo(this.state.focusPost, {content: this.state.valueModify})
            .then(post => {
                let target = this.state.list.findIndex(post => post.key === this.state.focusPost)
                let updatedList = [...this.state.list]
                updatedList[target].value = this.state.valueModify;
                this.setState({
                    list : updatedList,
                    valueModify : '',
                    visiblemodify : false
                });
            })
    }

    handleaddpress = () => {
        this.setState({visible : true});
    }

    removeduplicate = (arraylist) => {
        for(let i=0;i<arraylist.length ; i++) {
            let obj = arraylist[i];
            for(let j = i+1; j<arraylist.length; j++) {
                if(arraylist[j].value.toLowerCase().trim() === obj.value.toLowerCase().trim()) {
                    arraylist.splice(j,1)
                }
            }
        }
        return arraylist
    }

    render() {
        return(
            <>
                <Modal visible = {this.state.visible} animationType ='slide'>
                    <View style = {styles.mainview}>
                        <TextInput
                            autoFocus           
                            label='Add Item'
                            style = {styles.textinput}
                            mode = 'outlined'
                            onChangeText ={this.handlevalue}
                            value={this.state.Value}
                        />
                        <View style ={styles.btnview}>
                            <Button mode="outlined" style = {styles.btn} onPress={this.handleItemAdd}>
                                Add
                            </Button>
                            <Button mode="outlined" style = {styles.btn} onPress = {() => {this.setState({visible : false})}}>
                                Cancel
                            </Button>
                        </View>
                    </View>
                </Modal>
                <ModifyItem
                    visible = {this.state.visiblemodify} 
                    value = {this.state.valueModify}
                    cancelhandle = {this.cancelhandle}
                    onChanged = {this.handleModifyValue}
                    modifypress = {() => this.handleItemUpdate(this.state.focusPost)}
                />
                <List 
                    visible = {this.state.visible} 
                    list = {this.removeduplicate(this.state.list)}
                    removeduplicate = {this.removeduplicate} 
                    handleModifyOpen = {this.handleModifyOpen}
                    handleItemDelete = {this.handleItemDelete}
                    handleaddpress = {this.handleaddpress}/>
            </>
        )
    }
}

export default Textinput

const styles = StyleSheet.create({
    mainview: {
        flex : 1,
        flexDirection : "column",
        justifyContent : "center",
        padding : 30
    },
    textinput: {
        marginBottom : 10,
    },
    btn : {
        flex : 1,
    },
    btnview : {
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "center",
    }
})