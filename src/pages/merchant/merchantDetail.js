import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import './merchantDetail.css'
import AlcoholMarker from "../AlcoholMarker";
import {Col, Row, Descriptions} from "antd";
import {PhoneOutlined} from '@ant-design/icons'
import axios from "axios";
import {PREMISES} from "../../api/address";

class MerchantDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            name:'',
            pos:{
                center: {
                    lat: 0,
                    lng: 0
                },
                zoom: 18
            },
            address: '',
            close_time: ""
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
                    res.data.data.drinks.map((drink, i) => (
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
                        pos:{
                            center:{
                                lat: res.data.data.longitude,
                                lng: res.data.data.latitude
                            },
                            zoom: 17
                        },
                        address: res.data.data.address + " " + res.data.data.suburb + " NSW " +res.data.data.post_code,
                        close_time: res.data.data.close_time
                    });
            })
            .catch((err)=>{
                console.log(err);
            });
    }


    render() {
        return (
            <div className="index-content">
                <div style={{height: '250px'}}>
                    <iframe
                        width="100%"
                        height="250px"
                        frameBorder="0"
                        style={{border: 0}}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCyUX-TouPrmvcSdbaDN7h59gSNlKKfp2Q
    &q=${this.state.address}`} allowFullScreen>
                    </iframe>
                </div>
                <Descriptions bordered>
                    <Descriptions.Item label="Name">{this.state.name}</Descriptions.Item>
                    <Descriptions.Item label="Gambling">{this.state.gaming?"Allowed":"Restricted"}</Descriptions.Item>
                    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
                    <Descriptions.Item label="Close Time">{this.state.close_time}</Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}
export default MerchantDetail;
