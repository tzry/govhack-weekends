import React, { useState, useEffect, Component } from "react";
import './AlcoholMarker.css'

const AlcoholMarker = (props) => {
    const { color, name, merchantId, history } = props;
    return (
        <div onClick={()=>{
            if(history!=null){
                history.push('/merchant/'+merchantId);
            }
        }}>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

export default AlcoholMarker;
