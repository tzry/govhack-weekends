import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import './merchantDetail.css'
import AlcoholMarker from "../AlcoholMarker";
import {Col, Row, Descriptions} from "antd";
import {PhoneOutlined} from '@ant-design/icons'

class MerchantDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            id: props.match.params.id,
            img: "https://www.coles.com.au/content/dam/coles/about-coles/our-businesses/images/our-businesses-liquorland-800x480px.jpg",
            name:'test club',
            pos:{
                center: {
                    lat: -33.8296832,
                    lng: 151.126016
                },
                zoom: 18
            },
            hot: 5,
            tel: '0400000000',
            address: '146 Arthur Street North Sydney NSW 2060'
        };
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
                    <Descriptions.Item label="Tel">{this.state.tel}</Descriptions.Item>
                    <Descriptions.Item label="Tel">{this.state.tel}</Descriptions.Item>
                    <Descriptions.Item label="Tel">{this.state.tel}</Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}
export default MerchantDetail;
