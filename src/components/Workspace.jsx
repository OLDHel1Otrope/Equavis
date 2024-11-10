import React, { useState } from 'react';
import data from '../../src/assets/data.json';//this data will be stored in 
// import './Workspace.css';    
const colours = [
    "#00fff7", // Aqua blue
    "#00e5ff", // Light cyan blue
    "#00ccff", // Sky blue
    "#0099ff", // Azure
    "#0066cc", // Bright blue
    "#004c99", // Deep blue
    "#00ff9d", // Mint green
    "#00e58a", // Light green
    "#00cc78", // Soft teal green
    "#009966", // Medium green
    "#00754d", // Forest green
    "#005533", // Dark green
    "#017f6b", // Pine green
    "#028482", // Teal
    "#015a73", // Deep teal
    "#024d50"  // Dark teal
];

const Workspace = () => {
    const gridData = data.slice();
    const columns = 4;

    const getRandomGradient = () => {
        const color1 = colours[Math.floor(Math.random() * colours.length)];
        const color2 = colours[Math.floor(Math.random() * colours.length)];
        const position1 = `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`;
        const position2 = `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`;

        return `radial-gradient(circle at ${position1}, ${color1}, transparent), radial-gradient(circle at ${position2}, ${color2}, transparent)`;
    };

    const handleMouseEnter = (event) => {
        event.currentTarget.style.background = getRandomGradient();
    };

    const handleMouseLeave = (event) => {
        event.currentTarget.style.background = "black";
    };

    return (
        <div className="grail">
            <div className="header"><div></div></div>
            <div className="sb1"></div>
            <div className="content">
                <div className="grid-container" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    <div className="grid-item expand-4">
                        <h3>Welcome <strong>Utkarsh</strong>, Here are your workspaces</h3>
                    </div>
                    {gridData.map((item, index) => (
                        <div
                            key={index}
                            className="grid-item"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div>{item.name}</div>
                            <i><p>{item.description}</p></i>
                        </div>
                    ))}
                    <div className="grid-item">
                        <h3>Add new</h3>
                    </div>
                </div>
            </div>
            <div className="sb2"></div>
            <div className="footer"></div>
        </div>
    );
};

export default Workspace;