import React, { Component } from 'react';

import { Link } from 'react-router';

class NavLink extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Link
                {...this.props}
                activeClassName="active"
                style={{
                    textDecoration: 'none'
                }}
            />
        );
    }
}

export default NavLink;
