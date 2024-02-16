import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import Dialog from 'react-native-dialog';

const DialogPrompt = ({ title, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  const handleSave = () => {
    console.log('Input value:', inputValue);
    closeDialog();
  };

  return (
    <View>
      <Button title="Set" onPress={openDialog} />
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Input
          placeholder={placeholder}
          onChangeText={text => setInputValue(text)}
        />
        <Dialog.Button label="Cancel" onPress={closeDialog} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
    </View>
  );
};

export default DialogPrompt;
