import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import { Row, Col, Checkbox, Select, InputNumber } from 'antd';
import AlcoholMarker from './AlcoholMarker'
import './index.css'
const { Option } = Select;

class Index extends Component {

    constructor(props){
        super(props);
        this.state={
            pos:{
                center: {
                    lat: -33.8296832,
                    lng: 151.126016
                },
                zoom: 17
            },
            alcoholList:[
                {
                    id: 1,
                    lat: '-33.8296832',
                    lon: '151.126016',
                    name: "Alcohol",
                    hot: 11
                },
                {
                    id: 2,
                    lat: '-33.8296632',
                    lon: '151.126016',
                    name: "Alcohol",
                    hot: 5
                },
                {
                    id: 3,
                    lat: '-33.8296832',
                    lon: '151.126616',
                    name: "Alcohol",
                    hot: 1
                }
            ],
            gambling: false,
            distance: "5",
            capacity: 1
        };

    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    autoScale = ()=>{
        let zoom = 17;
        switch(this.state.distance){
            case "5":
                zoom = 17;
                break;
            case "10":
                zoom = 16;
                break;
            default:
                zoom = 15;
                break;
        }
        this.setState(
            {
                pos:{
                    center: this.state.pos.center,
                    zoom:zoom
                }
            }
        );
    }

    showPosition=(position)=>{
        console.log(position.coords)
        this.setState(
            {
                pos:{
                    center:{
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    zoom:this.state.pos.zoom
                }
            },this.autoScale
        );
    }

    requestData = ()=>{
        this.autoScale();
    }

    onGamblingChange=(e)=>{
        this.setState({
            gambling: e.target.checked
        },this.requestData);
    }

    handleDistanceChange=(value)=>{
        this.setState({
            distance: value
        },this.requestData)
    }

    handleCapacityChange=(value)=>{
        this.setState({
            capacity: value
        },this.requestData)
    }

    render() {

        return (
            <div className="index-content">
                <Row style={{height:"40px"}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6} style={{lineHeight:"28px"}}>
                        <Checkbox onChange={this.onGamblingChange}
                                  checked={this.state.gambling}
                        >Gambling</Checkbox>
                    </Col>
                    <Col span={9}>
                        <Select defaultValue="5" style={{ width: "140px" }} onChange={this.handleDistanceChange}>
                            <Option value="5">Around 5 km</Option>
                            <Option value="10">Around 10 km</Option>
                            <Option value="20">Around 20 km</Option>
                        </Select>
                    </Col>
                    <Col span={8} style={{textAlign:"center"}}>
                        <InputNumber min={1}
                                     style={{width:"40%"}}
                                     max={10}
                                     defaultValue={1}
                                     precision={0}
                                     step = {1}
                                     onChange={this.handleCapacityChange} />
                                     People
                    </Col>
                </Row>
                <div style={{height:"calc(100vh - 140px)"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCyUX-TouPrmvcSdbaDN7h59gSNlKKfp2Q'}}
                        center={this.state.pos.center}
                        zoom={this.state.pos.zoom}
                    >
                        {
                            this.state.alcoholList.map((alcohol,i)=>{
                                return (
                                    <AlcoholMarker
                                        lat={alcohol.lat}
                                        lng={alcohol.lon}
                                        name={alcohol.name}
                                        key={alcohol.id}
                                        merchantId={alcohol.id}
                                        history={this.props.history}
                                        color={
                                            alcohol.hot>10?"red":(
                                                alcohol.hot>5?"yellow":"blue"
                                            )
                                        }
                                    />
                                    )
                            })
                        }
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}
export default Index;
