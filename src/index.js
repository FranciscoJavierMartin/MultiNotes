import React from 'react';
import T from 'prop-types';
import {AppLoading, Permissions} from 'expo';
import {BackHandler, View, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import {
    compose,
    withState,
    withHandlers,
    lifecycle
} from 'recompose';
import {NavigationActions} from 'react-navigation';
import store from './store';
import {globalStyles} from './styles';
import Navigator from './navigation';

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const App = ({
    showLoading,
    setLoadingStatus,
    asyncJob,
}) => {
    const screen = showLoading ?
    (<AppLoading 
        startAsync={asyncJob} 
        onFinish={() => setLoadingStatus(false)}
        onError={console.warn}/>) :
    (<Provider store={store}>
        <View style={globalStyles.fillAll}>
            <Navigator/>
        </View>
    </Provider>);

    return screen;
};

App.propTypes = {
    showLoading: T.bool,
    setLoadingStatus: t.func,
    asyncJob: T.func,
};

const enhance = compose(
    withState('showLoading', 'setLoadingStatus', true),
    withHandlers({
        asyncJob: () => async () => {
            await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            await Permissions.askAsync(Permissions.CAMERA);
        },
        navigateBack: () => () => {
            const {navigation} = store.getState();
            const currentStackScreen = navigation.index;
            const currentTab = navigation.routes[0].index;
            let res = false;

            if(currentTab !== 0 || currentStackScreen !== 0){
                store.dispatch(NavigationActions.back({key: null}));
                res = true;
            }

            return res;
        },
    }),
    lifecycle({
        componentWillMount(){
            BackHandler.addEventListener('hardwareBackPress', this.props.navigateBack);
        }
    }),
);

export default enhance(App);