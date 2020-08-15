import React, { useState, useEffect, Component } from "react";
import './merchant.css'

class Merchant extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id
        };
    }

    render() {
        return (
            <div className="index-content">
                This is merchant
            </div>
        );
    }
}
export default Merchant;
