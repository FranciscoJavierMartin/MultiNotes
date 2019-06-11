import {
    lifecycle
} from 'recompose';

const setParamsOnWillMount = params =>
    lifecycle({
        componentWillMount(){
            this.props.navigation.setParams(
                typeof params === 'function'
                ? params(this.props)
                : params,
            );
        },
    });

export default setParamsOnWillMount;