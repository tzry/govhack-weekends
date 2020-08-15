import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import { Row, Col, Checkbox, Select } from 'antd';
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
                zoom: 11
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
                    id: 1,
                    lat: '-33.8296632',
                    lon: '151.126016',
                    name: "Alcohol",
                    hot: 5
                },
                {
                    id: 1,
                    lat: '-33.8296832',
                    lon: '151.126616',
                    name: "Alcohol",
                    hot: 1
                }
            ],
            gambling: false,
            distance: 5
        };

    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    showPosition=(position)=>{
        console.log(position)
        this.setState(
            {
                pos:{
                    center:{
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    zoom:11
                }
            }
        );
    }

    onGamblingChange=(e)=>{
        this.setState({
            gambling: e.target.checked
        });
    }

    handleDistanceChange=(value)=>{
        this.setState({
            distance: value
        })
    }

    render() {

        return (
            <div className="index-content">
                <Row style={{height:"40px"}}>
                    <Col span={3}>
                    </Col>
                    <Col span={6} style={{lineHeight:"28px"}}>
                        <Checkbox onChange={this.onGamblingChange}
                                  checked={this.state.gambling}
                        >Gambling</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Select defaultValue="5" style={{ width: "150px" }} onChange={this.handleDistanceChange}>
                            <Option value="5">Around 5 km</Option>
                            <Option value="10">Around 10 km</Option>
                            <Option value="20">Around 20 km</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                    </Col>
                </Row>
                <Row style={{height:"calc(100vh - 120px)"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCyUX-TouPrmvcSdbaDN7h59gSNlKKfp2Q'}}
                        defaultCenter={this.state.pos.center}
                        defaultZoom={this.state.pos.zoom}
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
                </Row>
            </div>
        );
    }
}
export default Index;
