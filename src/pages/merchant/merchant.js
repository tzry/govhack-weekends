import React, { useState, useEffect, Component } from "react";
import {List, Row, Col} from 'antd'
import './merchant.css'
import availableSvg from '../../assert/available.svg'
import insideSvg from '../../assert/inside.svg'
import axios from 'axios';
import {PREMISES} from "../../api/address";
import weekendsLogo from '../../assert/weekends-logo.jpeg'

class Merchant extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            img: weekendsLogo,
            name:'',
            goods:[
            ],
            inside:0,
            available:0,
            address:""
        };
    }

    componentDidMount() {
        this.requestData();
    }

    requestData = ()=>{
        axios.get(PREMISES+"/"+this.state.id,{
            params:{
            }
        })
            .then((res)=>{

                let list = [];
                if(res.data.data.drinks) {
                    list = res.data.data.drinks.map((drink, i) => (
                        {
                            id: drink.id,
                            name: drink.name,
                            price: drink.real_price,
                        }
                    ));
                }

                this.setState(
                    {
                        name: res.data.data.name,
                        goods: list,
                        inside: res.data.data.inside,
                        available: res.data.data.available,
                        address: res.data.data.address + " " + res.data.data.suburb + " NSW " +res.data.data.post_code
                    });
            })
            .catch((err)=>{
                console.log(err);
            });
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
                    <p className="store-address">{this.state.address}</p>
                </div>
                <Row>
                    <Col span="12">
                        <div className="store-available">
                            <img src={insideSvg} />
                            <p>Inside</p>
                            <p className="value">{this.state.inside}</p>
                        </div>
                    </Col>
                    <Col span="12">
                        <div className="store-available">
                            <img src={availableSvg} />
                            <p>Available</p>
                            <p className="value">{this.state.available}</p>
                        </div>
                    </Col>
                </Row>
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
