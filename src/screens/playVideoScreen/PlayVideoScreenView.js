import React from 'react';
import PropsTypes from 'prop-types';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Video} from 'expo';
import {Feather}from '@expo/vector-icons';
import {Icon, NavigationButton} from '../../components';
import {getParam} from '../../utils/navHelper';
import {headerStyle, colors} from '../../styles';
import s from './styles';

const PlayVideoScreen = (props) => {
    const {
        videoUrl,
        isError,
        isLoading,
        isPlaying,
        onError,
        onLoad,
        onTogglePlaying,
    } = props;

    const icon = isError ? (
        <Icon size={50} IconSet={Feather} iconName="refresh-ccw" color={colors.white}/>
    ) : (
        <Icon size={50} IconSet={Feather} iconName="play" color={colors.white} iconStyle={s.playICon}/>
    );

    return (
        <View style={s.root}>
            <Video
                source={{uri: videoUrl}}
                style={s.video}
                shouldPlay={isPlaying}
                resizeMode="contain"
                useNativeControls={isPlaying}
                onLoad={onLoad}
                onError={onError}/>
            {!isPlaying && (
                <TouchableOpacity
                    style={[s.button, isError && s.playButtonError]}
                    onPress={onTogglePlaying}>
                    {isLoading
                        ? <ActivityIndicator size="large" color={colors.white}/>
                        : icon}
                </TouchableOpacity>
            )}
        </View>
    );
};

PlayVideoScreen.propTypes = {
    videoUrl: PropsTypes.string,
    isError: PropsTypes.bool,
    isLoading: PropsTypes.bool,
    isPlaying: PropsTypes.bool,
    onError: PropsTypes.func,
    onLoad: PropsTypes.func,
    onTogglePlaying: PropsTypes.func,
};

PlayVideoScreen.navigationOptions = ({navigation}) => ({
    ...headerStyle,
    title: getParam(navigation, 'title'),
    headerRight: (
        <NavigationButton
            text="Remove"
            enabled
            onPress={() => {
                getParam(navigation, 'remove')();
                navigation.dispatch(NavigationActions.back({key: null}));
            }}
            />
    ),
});

export default PlayVideoScreen;