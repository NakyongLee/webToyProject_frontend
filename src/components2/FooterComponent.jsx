import React, { Component } from 'react';
import './footer.css';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className="web2-footer">
                    <span className="text-muted">All Rights Reserved 2020 web2 team</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent