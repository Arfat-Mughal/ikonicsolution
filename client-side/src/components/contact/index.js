import React, {useEffect, useState} from "react";
import "../../assets/css/style-dark.min.css";
import contact from "../../assets/images/contact.png";
import Footer from "../footer";
import Header from "../header";
import {useForm} from "react-hook-form";
import {CONTACTUS_URL} from "../../config/constants";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function Contact() {
    const [disable, setdisable] = useState(false);
    const [unknown, setUnknown] = useState("");
    const {register, handleSubmit, resetField, formState: {errors}} = useForm();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (disable) {
            simulateNetworkRequest().then(() => {
                setdisable(false);
            });
        }
    }, [disable]);

    const onSubmit = data => {
        post_request(data)
    };

    async function post_request(data) {
        if (unknown.length > 0) {
            resetField("name");
            resetField("email");
            resetField("subject");
            resetField("comments");
            return;
        }
        setdisable(true)
        const response = await fetch(CONTACTUS_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        let result = await response.json();
        console.log(result)
        if (result.error) {
            setdisable(false);
        } else {
            resetField("name");
            resetField("email");
            resetField("subject");
            resetField("comments");
        }
    }

    console.log("unknown", unknown)
    return (
        <>
            <Header/>
            <section className="d-table w-100 pt-5">
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <h5 className="heading fw-semibold sub-heading text-white title-dark">Contact Us</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-6 pt-2 pt-sm-0 order-2 order-md-1">
                            <div className="card shadow rounded border-0">
                                <div className="card-body py-5">
                                    <h4 className="card-title">Get In Touch !</h4>
                                    <div className="custom-form mt-3">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {
                                                disable &&
                                                <div className="alert alert-success text-center">
                                                    Form submitted successfully
                                                </div>
                                            }
                                            {
                                                errors.name ?
                                                    <div
                                                        className='alert alert-warning error_message'>{errors.name.message}</div> :
                                                    errors.email ?
                                                        <div
                                                            className='alert alert-warning error_message'>{errors.email.message}</div> :
                                                        errors.subject ?
                                                            <div
                                                                className='alert alert-warning error_message'>{errors.subject.message}</div> :
                                                            errors.comments ?
                                                                <div
                                                                    className='alert alert-warning error_message'>{errors.comments.message}</div> : null
                                            }
                                            <div id="simple-msg"></div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Name <span
                                                            className="text-danger">*</span></label>
                                                        <input name="name" id="name" type="text"
                                                               className="form-control"
                                                               placeholder="Your Name" {...register("name", {
                                                            required: {
                                                                value: true,
                                                                message: "*Please Enter Your Name*"
                                                            },
                                                            maxLength: {
                                                                value: 64,
                                                                message: "Length Limit exceeded, maximum 64 characters."
                                                            },
                                                            pattern: {
                                                                value: /^[a-zA-Z ]*$/i,
                                                                message: "Only Text Allowed"
                                                            }
                                                        })}/>
                                                        {/*<input name="location"
                                                               className="d-none"
                                                               type="text"
                                                               onChange={(e)=>setUnknown(e.target.value)}
                                                        />*/}
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Email <span
                                                            className="text-danger">*</span></label>
                                                        <input name="email" id="email" type="text"
                                                               className="form-control"
                                                               placeholder="Your Email" {...register("email", {
                                                            required: {
                                                                value: true,
                                                                message: "*Please Enter your Email Address*"
                                                            },
                                                            pattern: {
                                                                value: /^\S+@\S+$/i,
                                                                message: "*Please Enter Valid Email Address.*"
                                                            },
                                                            maxLength: {
                                                                value: 64,
                                                                message: "*Email text is limited to 64 characters*"
                                                            },
                                                            minLength: {
                                                                value: 5,
                                                                message: "*Email address need to have at least 5 characters.*"
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Subject</label>
                                                        <input name="subject" id="subject" className="form-control"
                                                               placeholder="Subject" {...register("subject", {
                                                            maxLength: {
                                                                value: 64,
                                                                message: "Subject Limit exceed."
                                                            },
                                                            pattern: {
                                                                value: /^[a-zA-Z ]*$/i,
                                                                message: "Only Text Allowed"
                                                            }
                                                        })}/>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Message<span
                                                            className="text-danger">*</span></label>
                                                        <textarea name="comments" id="comments" rows="4"
                                                                  className="form-control"
                                                                  placeholder="Your Message"
                                                                  {...register("comments", {
                                                                      required: {
                                                                          value: true,
                                                                          message: "*Please Enter The Comment*"
                                                                      },
                                                                      minLength: {
                                                                          value: 20,
                                                                          message: "*Comment must be minimum 20 character*"
                                                                      },
                                                                      maxLength: {
                                                                          value: 500,
                                                                          message: "*Comment Limit exceed.*"
                                                                      }
                                                                  })}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="d-grid">
                                                        <button type="submit" id="submit" name="send" disabled={disable}
                                                                className={`btn ${disable ? "btn-secondary" : "btn-success"} rounded-md`}> {
                                                            disable ? "Sending..." : "Send Message"
                                                        }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6 order-1 order-md-2">
                            <div className="card border-0">
                                <div className="card-body p-0">
                                    <img src={contact} className="img-fluid d-block mx-auto"
                                         style={{maxWidth: "540px"}} alt="contact_us"/>
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