import React from "react";
import Footer from "../footer";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo-light.png"
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import {FORGET_PASSWORD_URL} from "../../config/constants";


function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function ResetPassword() {
    const {register, handleSubmit, formState: {errors}, setError, clearErrors} = useForm();
    const [disable, setdisable] = useState(false);
    const [message, setmessage] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        if (disable) {
            simulateNetworkRequest().then(() => {
                setdisable(false);
                clearErrors('email');
            });
        }
        if (message) {
            simulateNetworkRequest().then(() => {
                setmessage(false)
                navigate('/')
            });
        }

    }, [disable, message]);

    const onSubmit = data => {
        post_request(data)
    };

    async function post_request(data) {
        setdisable(true);
        axios.post(FORGET_PASSWORD_URL, data, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => {
                setmessage(true)
            }).catch((err) => {
            let res = err.response.data
            if (res && res.errors && res.errors.email) {
                setError('email', {type: 'error', message: res.errors.email[0]});
            }
        });
    }

    return (
        <section className="position-relative">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="d-flex flex-column min-vh-100 p-4">
                            <div className="text-center pt-5 mb-2">
                                <Link to={'/'}><img src={logo} height="64" className="l-light" alt=""/></Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm mb-2">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {errors.email &&
                                            <div
                                                className='alert alert-warning error_message'>{errors.email.message}</div>}
                                        <h5 className="mb-3">Reset Your Password</h5>

                                        <p className="text-muted">Please enter your email address. You will receive an email with a link to create the new password.</p>

                                        <div className="row">
                                            <div className="col-12">
                                                {
                                                    message &&
                                                    <div className="alert alert-info text-center">
                                                        Mail has sent Successfully
                                                    </div>
                                                }
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="floatingInput"
                                                           placeholder="name@example.com" {...register("email", {
                                                        required: {
                                                            value: true,
                                                            message: "*Please Enter your Email Address*"
                                                        },
                                                        pattern: {
                                                            value:/^\S+@\S+$/i,
                                                            message: "*Please Enter a Valid Email Address.*"
                                                        },
                                                        maxLength: {
                                                            value: 64,
                                                            message: "*Email text is limited to 64 characters.*"
                                                        },
                                                        minLength: {
                                                            value: 5,
                                                            message: "*Email address need to have at least 5 characters.*"
                                                        }
                                                    })}/>
                                                    <label htmlFor="floatingInput">Email address</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button type="submit" id="submit" name="send" disabled={disable}
                                                        className={`btn ${disable ? "btn-secondary" : "btn-success"} rounded-md`}> {
                                                    disable ? "Sending..." : "Send"
                                                }
                                                </button>
                                            </div>

                                            <div className="col-12 text-center mt-4">
                                                <small><span
                                                    className="text-muted me-2">Remember your password ? </span><Link
                                                    to={'/login'} className="text-dark fw-bold">Login</Link></small>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}