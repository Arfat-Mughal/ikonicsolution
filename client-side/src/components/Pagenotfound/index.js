import React from "react";
import Footer from "../footer";
import {Link} from "react-router-dom";
import errorImage from "../../assets/images/error.png"

export default function Pagenotfound() {
    return (
        <section className="position-relative bg-soft-success">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="d-flex flex-column min-vh-100 p-4">
                            <div className="title-heading text-center my-auto">
                                <img src={errorImage} className="img-fluid" alt="404"/>
                                    <h1 className="heading sub-heading mb-3 mt-5 text-dark">Page Not Found?</h1>
                                    <p className="text-muted">Whoops, this is embarassing. <br/> Looks like the page you
                                        were looking for wasn't found.</p>
                                    <div className="mt-4">
                                        <Link to={'/'} className="back-button btn btn-success">Back to Home</Link>
                                    </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
);
}