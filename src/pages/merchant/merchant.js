import React, { useState, useEffect, Component } from "react";
import {List} from 'antd'
import './merchant.css'

class Merchant extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            img: "https://www.coles.com.au/content/dam/coles/about-coles/our-businesses/images/our-businesses-liquorland-800x480px.jpg",
            name:'test club',
            goods:[
                {
                    id: 1,
                    name: 'Wine',
                    price: '5.24'
                },
                {
                    id: 2,
                    name: 'Red Wine',
                    price: '225.24'
                },
                {
                    id: 3,
                    name: 'Whiskey',
                    price: '35.24'
                },
            ]
        };
    }

    render() {
        return (
            <div className="index-content">
                <div>
                    <img className="merchant-bg-img" src={this.state.img} />
                </div>
                <div className="store-card" onClick={()=>{
                    this.props.history.push("/merchant-detail/"+this.state.id);
                }}>
                    <p className="store-name">{this.state.name}</p>
                </div>
                <div className="store-goods">
                    <List
                        dataSource={this.state.goods}
                        renderItem={item =>
                            <List.Item>
                                <div className="goods">
                                    <p className="goods-name">{item.name}</p>
                                    <p className="goods-price">${item.price}</p>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
            </div>
        );
    }
}
export default Merchant;
