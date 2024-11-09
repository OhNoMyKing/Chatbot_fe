import React from "react";
import UserService from "../service/UserService";
import { Link, useNavigate } from "react-router-dom";


function Menu() {
    const navigate = useNavigate();
    const isAdmin = UserService.isAdmin();

    const isAuthenticated = UserService.isAuthenticated();
    const adminOnly = UserService.adminOnly();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();

        }
    };
    const handleManagerClick = () => {

        navigate('/manager'); // Chuyển hướng đến /admin
    };
    return (

        <div>


            <div className="site-mobile-menu">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>

            <div className="site-navbar" role="banner">

                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-11 col-xl-2">
                            <h1 className="mb-0 site-logo"><a className="text-white mb-0"><strong>.</strong>Jisoo</a></h1>
                        </div>
                        <div className="col-12 col-md-10 d-none d-xl-block">
                            <nav className="site-navigation position-relative text-right" role="navigation">

                                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                                    <li className="active"><a href="/home"><span><i class="fa-solid fa-house-chimney"></i> Home</span></a></li>
                                    {isAuthenticated && (

                                        <li className="has-children">
                                            <a href="about.html"><span>Dropdown</span></a>
                                            <ul className="dropdown arrow-top">
                                                <li><a href="#">Menu One</a></li>
                                                <li><a href="#">Menu Two</a></li>
                                                <li><a href="#">Menu Three</a></li>
                                                <li className="has-children">
                                                    <a href="#">Dropdown</a>
                                                    <ul className="dropdown">
                                                        <li><a href="#">Menu One</a></li>
                                                        <li><a href="#">Menu Two</a></li>
                                                        <li><a href="#">Menu Three</a></li>
                                                        <li><a href="#">Menu Four</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                    {isAuthenticated && (
                                        <li><a href="/order"><span><i class="fa-solid fa-truck-fast"></i> Orders</span></a></li>
                                    )}
                                    {isAuthenticated && (
                                        <li><a href="/cart-user"><span><i class="fa-solid fa-cart-shopping"></i> Cart</span></a></li>
                                    )}
                                    {adminOnly && (
                                        <li><a href="/manager" onClick={handleManagerClick} id="manager-link" ><span><i class="fa-solid fa-list-check"></i> Manager</span></a></li>
                                    )}
                                    {!isAuthenticated && <li><a href="/login" id="login-link"><span><i class="fa-solid fa-arrow-right-to-bracket"></i> Log In</span></a></li>}
                                    {isAuthenticated && <li><Link to={"/home"} onClick={handleLogout}><span><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</span></Link></li>}

                                </ul>
                            </nav>
                        </div>


                        <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" ><a href="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a></div>

                    </div>

                </div>

            </div>




        </div>
    )
}
export default Menu;