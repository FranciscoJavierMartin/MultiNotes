import {createAction } from 'redux-actions';
import * as types form './types';

export const addVideo = createAction(types.ADD_VIDEO);
export const removeVideo = createAction(types.REMOVE_VIDEO);