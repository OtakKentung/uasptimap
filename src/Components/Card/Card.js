import React from 'react';
import './Card.css';
import fotoAnton from './fotoAnton.jpg';
import fotoIwa from './fotoIwa.jpg';
import fotoVallen from './fotoVallen.jpg';

function Card() {
    return (
        <div className="container">
            <div className="card">
                <div className="imgBx">
                    <img src={fotoAnton}></img>
                </div>
                <div className="content">
                    <h3>Antonius Kevin</h3>
                    <h5>00000045444</h5>
                    <p>CSS, Navbar, Directions, Find Address, 3D Globe</p>
                </div>
            </div>
            <div className="card">
                <div className="imgBx">
                    <img src={fotoIwa}></img>
                </div>
                <div className="content">
                    <h3>Vanness Iwata</h3>
                    <h5>00000046190</h5>
                    <p>React, Map, Globe, Search Place</p>
                </div>
            </div>
            <div className="card">
                <div className="imgBx">
                    <img src={fotoVallen}></img>
                </div>
                <div className="content">
                    <h3>Vallencius Gavriel</h3>
                    <h5>00000045651</h5>
                    <p>Gallery Maps, Map, Satellite Map, JS</p>
                </div>
            </div>
        </div>
    );
}
export default Card;