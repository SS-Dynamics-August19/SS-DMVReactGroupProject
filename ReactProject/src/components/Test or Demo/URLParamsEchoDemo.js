import React from "react";
import PropTypes from "prop-types";

class URLParamsEchoDemo extends React.Component {
    render() {
        return (
            <p>
                Got &quot;{this.props.match.params.echoText}&quot; from URL.
            </p>
        );
    }
}

URLParamsEchoDemo.propTypes = {
    match: PropTypes.object
};

export default URLParamsEchoDemo;