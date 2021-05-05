import React, { Component } from 'react';
import { StyleSheet , View ,Text} from 'react-native'
import AddItem from './AddItem'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Button  } from 'react-native-paper';

const List = props => (
    <>
        <AddItem handleaddpress = {props.handleaddpress}/>
        <View style = {styles.pending}>
            <Text>Pending {props.removeduplicate(props.list).length} Tasks : </Text>
        </View>
        <View>
            <SwipeListView
                data={props.removeduplicate(props.list)}
                renderItem={ (data) => (
                    <View style={styles.rowFront}>
                        <Text>{data.item.value}</Text>
                    </View>
                )}
                renderHiddenItem={ (data) => (
                    <View style={styles.rowBack}>
                        <Button mode="outlined" style = {styles.btn} onPress={props.handleItemDelete.bind(this, data.item.key)}>
                            Delete
                        </Button>
                        <Button mode="outlined" style = {styles.btn} onPress={() => props.handleModifyOpen(data.item.value, data.item.key)}>
                            Modify
                        </Button>
                    </View>
                )}
                leftOpenValue={100}
                rightOpenValue = {-100}
            />
        </View>
    </>
)

export default List;

const styles = StyleSheet.create({
    pending : {
        marginTop : 10,
        marginBottom : 5,
    },
    hidden : {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center"
    },
    rowBack: {
        padding : 10,
        marginVertical : 5,
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderRadius : 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    rowFront: {
        marginVertical : 5,
        borderColor : "#6200EE",
        borderWidth : 2,
        borderRadius : 10,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 50,
    },
    btn:{
        fontSize: 30,
        height: 50,
        width: 100,
        color: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})
