import React from "react";
import Footer from "../footer";
import {Link, useParams} from "react-router-dom";
import logo from "../../assets/images/logo-light.png"
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import {AUTH_USER_DATA, RESET_PASSWORD_URL, TOKEN} from "../../config/constants";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function Createpassword() {
    const {register, handleSubmit, getValues, formState: {errors}, setError} = useForm();
    const [disable, setdisable] = useState(false);
    const [error, seterror] = useState("");
    const [gotologin, setgotologin] = useState(false);

    let {token} = useParams();

    useEffect(() => {
        if (disable) {
            simulateNetworkRequest().then(() => {
                setdisable(false);
                seterror("");
                localStorage.removeItem(AUTH_USER_DATA)
                localStorage.removeItem(TOKEN)
            });
        }
    }, [disable]);

    const onSubmit = data => {
        post_request(data)
    };

    async function post_request(data) {
        setdisable(true)
        axios.post(RESET_PASSWORD_URL, {
            email: getValues("email"),
            password: getValues("password")
            , token: token
        }, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => {
                setTimeout(()=>{
                    setgotologin(true);
                },2000)
                /*if(res && res.error && res.data && res.data.email ){
                    seterror(res.data.email[0])
                }*/
            }).catch((err) => {
            if (err.response && err.response.data.data && err.response.data.data.email) {
                seterror(err.response.data.data.email[0])
            }
        });
    }

    console.log("error", error)
    return (
        <section className="position-relative">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="d-flex flex-column min-vh-100 p-4">
                            <div className="text-center pt-5">
                                <Link to={'/'}><img src={logo} height="64" className="l-light" alt=""/></Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            errors.password ?
                                                <div
                                                    className='alert alert-warning error_message'>{errors.password.message}</div> :
                                                errors.email ?
                                                    <div
                                                        className='alert alert-warning error_message'>{errors.email.message}</div> :
                                                    error.length > 0 &&
                                                    <div className='alert alert-warning error_message'>{error}</div>
                                        }
                                        {
                                            gotologin ?
                                                <>
                                                    <p className="text-muted">Password reset successfully</p>
                                                    <div className="col-12">
                                                        <Link to={'/login'} className="back-button btn btn-success">Back
                                                            to Login</Link>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <h5 className="mb-3">Reset Your Password</h5>
                                                    <p className="text-muted">Please enter your new password.</p>
                                                    <div className="row">
                                                        <div className="col-12 mb-2">
                                                            {
                                                                disable && error.length < 0 &&
                                                                <div className="alert alert-info text-center">
                                                                    Password Reset Successfully
                                                                </div>
                                                            }
                                                            <div className="form-floating">
                                                                <input type="text" className="form-control"
                                                                       placeholder="name@example.com" {...register("email", {
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
                                                                        message: "*Email Text Limit exceed.*"
                                                                    },
                                                                    minLength: {
                                                                        value: 5,
                                                                        message: "*Email is too Small.*"
                                                                    }
                                                                })}/>
                                                                <label htmlFor="floatingInput">Email address</label>
                                                            </div>
                                                        </div>
                                                        <div className={"col-12 mb-2"}>
                                                            <div className="form-floating">
                                                                <input type="text" className="form-control"
                                                                       placeholder="password" {...register("password", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "*Please Enter your password*"
                                                                    },
                                                                    maxLength: {
                                                                        value: 12,
                                                                        message: "*Password Limit exceed.*"
                                                                    },
                                                                    minLength: {
                                                                        value: 4,
                                                                        message: "*Password is too Small*"
                                                                    }
                                                                })}/>
                                                                <label htmlFor="floatingInput">New Password</label>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <button type="submit" id="submit" name="send"
                                                                    disabled={disable}
                                                                    className={`btn ${disable ? "btn-secondary" : "btn-success"} rounded-md`}> {
                                                                disable ? "Updating..." : "Update Password"
                                                            }
                                                            </button>
                                                        </div>

                                                        <div className="col-12 text-center mt-4">
                                                            <small><span
                                                                className="text-muted me-2">Remember your password ? </span><Link
                                                                to={'/login'} className="text-dark fw-bold">Login</Link></small>
                                                        </div>
                                                    </div>
                                                </>
                                        }
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