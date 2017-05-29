import React, {PropTypes, Component} from 'react';
import { Provider, connect } from 'react-redux'
import {LXi18n} from './index';

/**
 * Internationalised Span - This is to be used whenever a label is to be international.
 */
class ISpan extends Component{
    render(){
        return <span style={this.props.style}>{this.props.localisedChildren}</span>
    }
}

export let ISpan = connect((state, ownProps) => {
    let i18n = new LXi18n(state.i18n.currentLanguageKey);
    return {
        localisedChildren: i18n.localise(ownProps.localisationId, ownProps.defaultValue, ownProps.options)
    }
})(ISpan);
