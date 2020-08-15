import React, { useState, useEffect, Component } from "react";
import GoogleMapReact from 'google-map-react';
import { Row, Col } from 'antd';
import './index.css'
import AlcoholMarker from './AlcoholMarker'
import GamblingMarker from './GamblingMarker'

class Index extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    constructor(props){
        super(props);
        this.state={
            alcoholList:[
                {
                    id: 1,
                    lat: '59.955413',
                    lon: '30.337844',
                    name: "Alcohol"
                }
            ],
            gamblingList:[
                {
                    id: 2,
                    lat: '58.955413',
                    lon: '30.337844',
                    name: "Gambling"
                }
            ],
        };
    }

    render() {
        return (
            <div className="index-content">
                <Row style={{height:"40px"}}>
                    <Col span={6}>
                        a
                    </Col>
                    <Col span={6}>
                        b
                    </Col>
                    <Col span={6}>
                        3
                    </Col>
                    <Col span={6}>
                        4
                    </Col>
                </Row>
                <Row style={{height:"calc(100vh - 120px)"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCyUX-TouPrmvcSdbaDN7h59gSNlKKfp2Q'}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
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
                                        color="red"
                                    />
                                    )
                            })
                        }
                        {
                            this.state.gamblingList.map((gambling,i)=>{
                                return (
                                    <GamblingMarker
                                        lat={gambling.lat}
                                        lng={gambling.lon}
                                        name={gambling.name}
                                        key={gambling.id}
                                        color="blue"
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
