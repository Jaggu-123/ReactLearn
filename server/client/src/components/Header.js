import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payments";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return [
                    <li key="1">
                        <Payment />
                    </li>,
                    <li key="3" style={{ margin: "0 10px" }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper purple darken-2">
                    <Link
                        to={this.props.auth ? "/surveys" : "/"}
                        className="brand-logo"
                        style={{ margin: "0 10px" }}
                    >
                        Emaily
                    </Link>
                    <ul className="right hid-on-mid-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
