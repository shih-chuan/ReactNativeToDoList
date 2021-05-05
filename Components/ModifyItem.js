import React, { useState } from 'react';
import { TextInput , Button  } from 'react-native-paper';
import { StyleSheet , View, Modal} from 'react-native'

const ModifyItem = (props) => {

    return(
        <Modal visible = {props.visible} animationType = {'fade'}>
            <View style = {styles.mainview}>
                <TextInput
                    autoFocus           
                    label='Modify'
                    style = {styles.textinput}
                    mode = 'outlined'
                    value = {props.value}
                    onChangeText ={props.onChanged}
                />
                <View style ={styles.btnview}>
                    <Button mode="outlined" style = {styles.btn} onPress={props.modifypress}>
                        Modify
                    </Button>
                    <Button mode="outlined" style = {styles.btn} onPress={props.cancelhandle}>
                        Cancel
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

export default ModifyItem;

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
        flex : 1
    },
    btnview : {
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "center",
    }
})