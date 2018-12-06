import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper purple darken-2">
                    <a href="#" className="brand-logo">
                        Emaily
                    </a>
                    <ul className="right hid-on-mid-and-down">
                        <li>
                            <a href="#">Login With Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
