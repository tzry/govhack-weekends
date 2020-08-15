import React, { useState, useEffect, Component } from "react";
import './GamblingMarker.css'

const GamblingMarker = (props) => {
    const { color, name, id } = props;
    return (
        <div>
            <div
                className="pin bounce"
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className="pulse" />
        </div>
    );
};

export default GamblingMarker;
