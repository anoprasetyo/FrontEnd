import React, { Component } from 'react';

class ContentBertasbih extends Component {
    render () {
        return (
            <center>
                <h1>{this.props.contentHeader}</h1>
                {/* <p>{this.props.children}</p> */}
            </center>
        )
    }
}

export default ContentBertasbih;