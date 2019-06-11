import {createFactory, Component} from 'react';
import {setDisplayName, wrapDisplayName} from 'recompose';

const withClassVariable = (
    getClassVariableName,
    setClassVariable,
    initialValue = null,
) => (BaseComponent) => {
    const factory = createFactory(BaseComponent);
    class withClassVariable extends Component {
        constructor(props, context){
            super(props, context);
            this._classVariable = initialValue;
            this.setClassVariable = this.setClassVariable.bind(this);
        }

        setClassVariable(value){
            this._classVariable = value;
        }

        render() {
            return factory({
                ...this.props,
                [getClassVariableName]: () => this._classVariable,
                [setClassVariable]: this.setClassVariable,
            });
        }
    }

    let res;

    if(process.env.NODE_ENV !== 'production'){
        res = setDisplayName(wrapDisplayName(BaseComponent, 
            'WithClassVariable'))(withClassVariable);
    } else {
        res = withClassVariable;
    }

    return res;
};

export default withClassVariable;