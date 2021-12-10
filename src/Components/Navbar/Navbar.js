import React, { useEffect } from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

function Navbar() {

    function animation() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find(".active");
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function () {
            $("#navbarSupportedContent ul li").removeClass("active");
            $(this).addClass("active");
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position();
            var itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "top": itemPosNewAnimTop.top + "px",
                "left": itemPosNewAnimLeft.left + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    useEffect(() => {
        animation();
        $(window).on('resize', function () {
            setTimeout(function () {
                animation();
            }, 500);
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">
            <Link className="navbar-brand navbar-logo pink" to="/" exact>
                <i className="fas fa-map-marked-alt"></i> PythMap
            </Link>

            <button className="navbar-toggler" type="button"
                onClick={function () {
                    setTimeout(function () {
                        animation();
                    });
                }}
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>

                    <li className="nav-item active">
                        <Link className="nav-link" to="/" exact>
                            <i className="fas fa-home"></i> Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/aboutus" exact>
                            <i className="far fa-address-book"></i> About Us
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/map1" exact>
                            <i className="fas fa-cubes"></i> 3D Globe
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/map2" exact>
                            <i className="fas fa-route"></i> Directions
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/map3" exact>
                            <i className="fas fa-satellite"></i> Satellite Map
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/map4" exact>
                            <i className="fas fa-compass"></i> Navigation Map
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/map5" exact>
                            <i className="fas fa-globe"></i> Globe
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;