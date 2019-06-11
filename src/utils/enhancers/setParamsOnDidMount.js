import {lifecycle} from 'recompose';

const setParamsOnDidMount = params =>
    lifecycle({
        componentDidMount() {
            this.props.navigation.setParams(
                typeof params === 'function'
                ? params(this.props)
                : params,
            );
        },
    });

export default setParamsOnDidMount;