import React from "react";
import Footer from "../footer";
import Header from "../header";
import {useEffect} from "react";
export function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header/>
            <section className="d-table w-100 pt-5">
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <h5 className="heading fw-semibold sub-heading text-white title-dark">Term of use</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="card shadow rounded border-0">
                                <div className="card-body">
                                    <div class="card-body">
                                        <p>Please read these terms and conditions carefully before using Our Service.</p>
<p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
                                        <h3 id="contact-us">Contact Us</h3>
                                        <p><br/></p>
                                        <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                                        <p>ikonicsolution.com</p>
                                        <p>last updated on FEB 18th, 2024.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
)
;
}