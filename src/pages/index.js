import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import { Row, Col, Checkbox, Select, InputNumber } from 'antd';
import AlcoholMarker from './AlcoholMarker';
import axios from 'axios';
import './index.css'
import {PREMISES} from "../api/address";

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
            ],
            gambling: false,
            distance: "3",
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
            case "3":
                zoom = 13;
                break;
            case "5":
                zoom = 12;
                break;
            default:
                zoom = 12;
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
            },this.requestData
        );
    }

    requestData = ()=>{
        let params={
            longitude: this.state.pos.center.lat,
            latitude: this.state.pos.center.lng,
            range: this.state.distance,
            customer_count: this.state.capacity,
        };
        if(this.state.gambling){
            params.params = true;
        }
        axios.get(PREMISES,{
            params:params
        })
            .then((res)=>{
                let list = res.data.data.map((store,i)=>(
                    {
                        id: i,
                        lat: store.longitude,
                        lon: store.latitude,
                        name: store.name,
                        hot: store.heat
                    }
                ));
                this.setState({
                    alcoholList: list
                })
            })
            .catch((err)=>{
                console.log(err);
            })
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
                <Row align="middle" style={{height:"40px"}}>
                    <Col span={1}>
                    </Col>
                    <Col span={6} style={{lineHeight:"28px"}}>
                        <Checkbox onChange={this.onGamblingChange}
                                  checked={this.state.gambling}
                        >Gambling</Checkbox>
                    </Col>
                    <Col span={9}>
                        <Select defaultValue="3" style={{ width: "140px" }} onChange={this.handleDistanceChange}>
                            <Option value="3">Around 3 km</Option>
                            <Option value="5">Around 5 km</Option>
                            <Option value="10">Around 10 km</Option>
                        </Select>
                    </Col>
                    <Col span={8} style={{textAlign:"center"}}>
                        <InputNumber min={1}
                                     style={{width:"40%"}}
                                     max={1000}
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
                                            alcohol.hot>50?"red":(
                                                alcohol.hot>10?"yellow":"blue"
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
