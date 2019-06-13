import React from 'react';
import T from 'prop-types';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Camera} from 'expo';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import {Button} from 'react-native-elements';
import {Icon} from '../../components';
import {durationToStr} from '../../utils/dateHelper';
import s from './styles';
import {colors} from '../../styles';

const RecordVideoScreen = ({
    cameraType,
    isRecording,
    setCameraReady,
    toggleCameraType,
    setCameraRef,
    duration,
    toggleRecording,
    stopRecording,
    isDoneRecording,
    onSubmit,
    videoName,
    setVideoName,
    onCancelSave,
}) => {
    let res;

    if(isDoneRecording){
        res = (
        <View style={s.inputContainer}>
            <TouchableOpacity onPress={onCancelSave} style={s.cancelCross}>
                <Icon size={36} color={colors.red} IconSet={Ionicons} iconName="md-close"/>
            </TouchableOpacity>
            <TextInput
                style={s.inputStyle}
                placeholder="Give a name for your video"
                value={videoName}
                onChangeText={setVideoName}
                onSubmitEditing={onSubmit}
                underlineColorAndroid={colors.transparent}
                autoCorrect={false}
                returnKeyType="done"
                autoFocus/>
            <Button
                textStyle={s.submitText}
                buttonStyle={s.submitButton}
                title="Continue"
                onPress={onSubmit}
                disabled={!videoName}/>
        </View>
        );
    } else {
        res = (
        <View style={s.container}>
            <View style={s.innerContainer}>
                <Camera
                    type={cameraType}
                    onCameraReady={setCameraReady}
                    style={s.camera}
                    ref={setCameraRef}/>
                <View style={s.footer}>
                    {isRecording && (
                        <TouchableOpacity
                            style={s.left}
                            onPress={stopRecording}>
                            <Text style={s.cancel}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        style={[s.recordButton, s.center]}
                        onPress={toggleRecording}>
                        {isRecording ? (
                            <Icon size={34} color={colors.recordVideo.recording}
                                IconSet={FontAwesome} iconName="stop"/>
                        ) : (
                            <View style={s.record}/>
                        )}
                    </TouchableOpacity>
                    <View style={s.right}>
                        {isRecording ? (
                            <Text style={s.duration}>
                                {durationToStr(duration)}
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={toggleCameraType}>
                                <Icon size={62}
                                IconSet={Ionicons}
                                iconName="ios-reverse-camera-outline"/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
        );
    }
    return res;
}

RecordVideoScreen.navigationOptions = () => ({
    header: null,
    gesturesEnabled: false,
});

export default RecordVideoScreen;