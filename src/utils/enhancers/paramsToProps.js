import { withProps } from 'recompose';
import R from 'ramda';

const getParam = (props, paramName) => R.path(
    ['navigation', 'state', 'params', paramName],
    props,
);

const paramsToProps = (...paramNames) => 
    withProps(props => ({
        ...(paramNames.reduce((acc, paramName) => {
            const param = getParam(props, paramName);

            if(typeof param !== 'undefined') {
                acc[paramName] = param;
            }

            return acc;
        }, {})
        ),
    }));

export default paramsToProps;