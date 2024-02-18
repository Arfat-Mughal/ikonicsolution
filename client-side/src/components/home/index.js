import React, {Component} from "react";
import {Link} from "react-router-dom";
import imagePath from "../../assets/images/bg/mc.png";
import Header from "../header";
import Footer from "../footer"
import Auth from "../../Auth";

const auth = new Auth();

class home extends Component {
    render() {
        return (
            <>
                <Header/>
                <div className="position-relative zoom-image">
                    <div className="bg-overlay" style={{background: `url('${imagePath}')`}}></div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="d-flex flex-column min-vh-100 p-4">
                                    <div className="title-heading text-center my-auto">
                                        <div className=" fw-bold display-5 text-white title-dark mb-4">Leading Experts in Software Development
                                        </div>
                                        <div className="pt-4 mb-4">
                                            <h5 className="text-white title-dark para-desc mx-auto mb-0">HIRE US</h5>
                                            <h3>https://ikonicsolution.com/</h3>
                                        </div>
                                        <div className="pt-2">
                                            {
                                                !auth.isAuthenticated() &&
                                                <h5 className="text-white title-dark para-desc mx-auto mb-0">Have an
                                                    Invite? <Link to={'/signup'} className="text-success">Sign up</Link>
                                                </h5>
                                            }
                                        </div>
                                    </div>
                                    <Footer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default home;