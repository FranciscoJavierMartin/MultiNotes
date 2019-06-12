import React from 'react';
import T from 'prop-types';
import {View} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {getParamOr} from '../../utils/navHelper';
import {globalStyles, headerStyles, headerStyle} from '../../styles';
import {MediaList, AudioPlayer} from '../../components';
import {AudioItem, VideoItem} from './components';
import s from './styles';

const tabs = ['Audio', 'Video'];

const LibraryScreenView = ({
    selectedTabIndex,
    audioItems,
    playingAudio,
    playAudio,
    stopPlayingAudio,
    removeAudio,
    isPlaying,
    position,
    duration,
    isLoading,
    onTogglePlaying,
    onCompleteSliding,
    onStartSliding,
    showPlayer,
    videoItems,
    playVideo,
    removeVideo,
}) => (
    <View style={[globalStyles.fillAll, globalStyles.withWhiteBackground]}>
        <View style={s.container}>
            {selectedTabIndex === 0 && (
                <View style={s.container}>
                    <MediaList
                        items={audioItems}
                        playAudio={playAudio}
                        stopPlayingAudio={stopPlayingAudio}
                        noItemsTitle="There are no items yet"
                        noItemsCaption="Your recorded audio will be appear here"
                        ListItem={AudioItem}
                        playingAudio={playingAudio() && playingAudio().id}
                        removeAudio={removeAudio}
                        needSeparator/>
                    {showPlayer && 
                        <AudioPlayer
                            title={playingAudio() && playingAudio().title}
                            isPlaying={isPlaying}
                            position={position}
                            duration={duration}
                            isLoading={isLoading}
                            onTogglePlaying={onTogglePlaying}
                            onCompleteSliding={onCompleteSliding}
                            onStartSliding={onStartSliding}/>}
                </View>
            )}
            {selectedTabIndex === 1 && (
                <MediaList
                    items={videoItems}
                    onPress={playVideo}
                    noItemsTitle="There are not items yet"
                    noItemsCaption="Your recorded video will be appear here"
                    ListItem={VideoItem}
                    removeVideo={removeVideo}
                    rowDirection/>
            )}
        </View>
    </View>
);

LibraryScreenView.navigationOptions = ({navigation}) => ({
    headerTitle: (
        <SegmentedControlTab
            values={tabs}
            selectedIndex={getParamOr(navigation, 'selectedTabIndex', 0)}
            onTabPress={getParamOr(navigation, 'changeTab', () => {})}
            tabsContainerStyle={s.tabsContainer}
            tabTextStyle={s.tabText}
            activeTabStyle={s.activeTab}
            tabStyle={s.tabStyle}/>
    ),
    ...headerStyle,
    title: 'Library',
});

export default LibraryScreenView;