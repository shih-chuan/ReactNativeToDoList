import React from 'react';

import { Button  } from 'react-native-paper';
const AddItem = (props) => (
    <Button mode="outlined" onPress = {props.handleaddpress}>
        Add New Task
    </Button>
);

export default AddItem;