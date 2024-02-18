import React, {useEffect} from "react";
import Footer from "../footer";
import Header from "../header";
export default function Privacy(){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <>
            <Header/>
            <section className="d-table w-100 pt-5">
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <h5 className="heading fw-semibold sub-heading text-white title-dark">Privacy
                                    Policy
                                </h5>
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
                                    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
                                    <p><br/></p>
                                    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                                    <h2 id="contact-us">Contact Us</h2>
                                    <p><br/></p>
                                    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                                    <p>Email: hi@ikonicsolution.com</p>
                                    <p>last updated on FEB 18th, 2024.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
);
}