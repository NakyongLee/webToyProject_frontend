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
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/diaries">Mood Diary App</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/calendar">Calendar</a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;