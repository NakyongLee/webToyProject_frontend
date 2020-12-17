import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://localhost:3000/diaries" className="navbar-brand">Emotional Diary App</a></div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;