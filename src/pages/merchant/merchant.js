import React, { useState, useEffect, Component } from "react";
import './merchant.css'

class Merchant extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            img: "https://www.coles.com.au/content/dam/coles/about-coles/our-businesses/images/our-businesses-liquorland-800x480px.jpg",
        };
    }

    render() {
        return (
            <div className="index-content">
                <div>
                    <img className="merchant-bg-img" src={this.state.img} />
                </div>
            </div>
        );
    }
}
export default Merchant;
