import React from "react";
import logo from "../../assets/images/logo-light.png"
import {Link, useNavigate} from "react-router-dom";
import Footer from "../footer"
import {useForm} from "react-hook-form";
import axios from "axios";
import {useState, useEffect} from "react";
import {AUTH_USER_DATA, REGISTER_URL, TOKEN} from "../../config/constants";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
}

function Signup() {
    const [disable, setdisable] = useState(false);
    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    let navigate = useNavigate();
    const onSubmit = data => {
        post_request(data)
    };

    useEffect(() => {
        if (disable) {
            simulateNetworkRequest().then(() => {
                setdisable(false);
            });
        }
    }, [disable]);

    async function post_request(data) {
        axios.post(REGISTER_URL, data, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => {
                console.log("res", res)
                localStorage.setItem(TOKEN, res.data.data.token, 30000)
                localStorage.setItem(AUTH_USER_DATA, JSON.stringify(res.data.data.authUser))
                navigate(`/user/${res.data.data.authUser.id}/profile`, {state: res.data.data.authUser, replace: true})
            }).catch((err) => {
            let res = err.response.data
            if (res && res.errors && res.errors.email) {
                setError('email', {type: 'error', message: res.errors.email[0]});
            } else if (res && res.errors && res.errors.username) {
                setError('username', {type: 'error', message: res.errors.username[0]});
            } else {
                setError('invitation_code', {type: 'error', message: res.message});
            }
        });
    }

    return (
        <>
            <div className="text-center pt-5 mb-4">
                <Link to={'/'}><img src={logo} height="64" className="l-light" alt="logo-light"/></Link>
            </div>
            <div className="title-heading text-center my-auto mb-4">
                <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors.username ?
                            <div className='alert alert-warning error_message'>{errors.username.message}</div>
                            : errors.email ?
                                <div className='alert alert-warning error_message'>{errors.email.message}</div>
                                : errors.password ?
                                    <div className='alert alert-warning error_message'>{errors.password.message}</div> :
                                    errors.invitation_code
                                        ? <div
                                            className='alert alert-warning error_message'>{errors.invitation_code.message}</div> :
                                        errors.AcceptT ?
                                            <div
                                                className='alert alert-warning error_message'>{errors.AcceptT.message}</div> : null
                        }

                        <h5 className="mb-4">Register Your Account</h5>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="RegisterName"
                                           placeholder="username" {...register("username", {
                                        required: {
                                            value: true,
                                            message: "*Please Enter Username*"
                                        },
                                        maxLength: {
                                            value: 32,
                                            message: "*Username need to be  5 - 32 Characters.*"
                                        },
                                        minLength:{
                                            value: 5,
                                            message: "*Username need to be  5 - 32 Characters.*"
                                        }
                                    })}/>
                                    <label htmlFor="RegisterName">User Name</label>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="RegisterPassword"
                                           placeholder="Password" {...register("password", {
                                        required: {
                                            value: true,
                                            message: "*Please Enter the password*"
                                        },
                                        maxLength: {
                                            value: 15,
                                            message: "*Password length need to be 4 - 15 characters.*"
                                                    },                                               
                                        minLength: {
                                            value: 4,
                                            message: "*Password length need to be 4 - 15 characters.*"
                                        }
                                    })}/>
                                    <label htmlFor="RegisterPassword">Password</label>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="RegisterEmail"
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
                                            message: "*Email text is limited to 64 characters.*"
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "*Email address need to have at least 5 characters.*"
                                        }
                                    })}/>
                                    <label htmlFor="RegisterEmail">Email Address</label>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-floating mb-2">
                                    <input type="text" className="form-control" id="Invite"
                                           placeholder="Invitation code" {...register("invitation_code", {
                                        required: {
                                            value: true,
                                            message: "*Please Enter your Invitation code*"
                                        }
                                    })}/>
                                    <label htmlFor="Invite">Invitation code</label>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-check align-items-center d-flex mb-3">
                                    <input className="form-check-input mt-0" type="checkbox" value=""
                                           id="AcceptT&C" {...register("AcceptT", {
                                        required: {
                                            value: true,
                                            message: "*Please Accept the terms and condition*"
                                        }
                                    })}/>
                                    <label className="form-check-label text-muted ms-2" htmlFor="AcceptT&C">I
                                        Accept <Link
                                            to={'/terms'} className="text-success">Terms And Condition</Link></label>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <button className="btn btn-success rounded-md w-100" type="submit">Register</button>
                            </div>

                            <div className="col-12 text-center mt-4">
                                <small><span className="text-muted me-2">Already have an account ? </span> <Link
                                    to={'/login'} className="text-dark fw-bold">Login</Link></small>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Signup;
