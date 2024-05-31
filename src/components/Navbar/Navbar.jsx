import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
    componentDidMount() {
        var linkItems = document.querySelectorAll('.link-item');
        linkItems.forEach((linkItem) => {
            linkItem.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 992px)').matches) {
                    var navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            });
        });
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-dark bg-dark py-4">
                <div className="container">
                    <a className="navbar-brand" href="/"><strong>Share</strong> Time</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_main"
                        aria-controls="navbar_main" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse offcanvas-collapse justify-content-end" id="navbar_main">
                        <ul className="navbar-nav ml-auto align-items-lg-center">
                            <hr className="divider" style={{ border: 'none', borderTop: '2px solid #ffffff' }} />
                            <h6 className="dropdown-header font-weight-600 d-lg-none px-0">Menu</h6>
                            <li className="nav-item">
                                <Link className="nav-link link-item" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/pages" id="navbarNavDarkDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarNavDarkDropdown">
                                    <li><Link className="dropdown-item link-item" to="/movie">Movie</Link></li>
                                    <li><Link className="dropdown-item link-item" to="/music">Music</Link></li>
                                    <li><Link className="dropdown-item link-item" to="/game">Game</Link></li>
                                    <li><Link className="dropdown-item link-item" to="/book">Book</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-item" to="/board">Board</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-item" to="/">Doc</Link>
                            </li>
                            <hr className="divider" style={{ border: 'none', borderTop: '2px solid #ffffff' }} />
                            <h6 className="dropdown-header font-weight-600 d-lg-none px-0">Social Media</h6>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="https://github.com/TheAsheno" target="_blank" rel="noreferrer"><i
                                    className="bi-github d-none d-lg-block"></i><span className="d-lg-none">Github</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <style jsx="true">{`
                    .dropdown-item:active {
                    background-color: grey !important;
                    }
                    .navbar {
                        z-index: 9999;
                        font-family: soleil;
                    }
                `}</style>
            </nav>
        )
    }
}