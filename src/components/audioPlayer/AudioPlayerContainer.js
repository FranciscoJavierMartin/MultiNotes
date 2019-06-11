import {
    lifecycle,
    withStateHandlers,
    withHandlers,
    componse
} from 'recompose';

import {Audio} from 'expo';
import AudioPlayerView from './AudioPlayerView';

const enhancer = componse(

);

export default enhancer(AudioPlayerView);