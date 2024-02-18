import React, {useState} from "react";
// import "../../assets/css/style.min.css";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo-light.png"
import {useForm} from 'react-hook-form';
import {AUTH_USER_DATA, LOGIN_URL, TOKEN} from "../../config/constants";
import {useEffect} from "react";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
}


export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [state, setState] = useState("");
    let navigate = useNavigate();
    const onSubmit = data => {
        login_request(data)
    };

    useEffect(() => {
        if (state) {
            simulateNetworkRequest().then(() => {
                setState("")
            });
        }
    }, [state]);

    async function login_request(data) {
        const response = await fetch(LOGIN_URL, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        let result = await response.json();
        console.log(result)
        if (result.error) {
            setState(result.message);
        }else {
            localStorage.setItem(TOKEN,result.data.token,30000)
            localStorage.setItem(AUTH_USER_DATA, JSON.stringify(result.data.authUser))
            navigate(`/user/${result.data.authUser.id}/profile`,{state:result.data.authUser, replace:true})
        }
    }

    console.log(errors);
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
                                <div className="form-signin px-4 py-5 bg-white rounded-md shadow-sm">
                                    {errors.email ?
                                        <div className='alert alert-warning error_message'>{errors.email.message}</div>:
                                        errors.password ?
                                            <div className='alert alert-warning error_message'>{errors.password.message}</div>:
                                            state.length > 0 &&
                                            <div className='alert alert-warning error_message'>{state}</div>
                                    }
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <h5 className="mb-4">Login</h5>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-floating mb-2">
                                                    <input type="text" className="form-control"
                                                           placeholder="Email" {...register("email", {
                                                        required: {
                                                            value:true,
                                                            message:"*Please Enter your Email*"
                                                        },
                                                        maxLength: {
                                                            value: 32,
                                                            message: "*Email need to be  5 - 32 Characters.*"
                                                        },
                                                        minLength:{
                                                            value: 5,
                                                            message: "*Email need to be  5 - 32 Characters.*"
                                                        }
                                                    })}/>
                                                    <label htmlFor="Email">Email</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control" id="LoginPassword"
                                                           placeholder="Password" {...register("password", {
                                                        required: {
                                                            value:true,
                                                            message:"*Please Enter your Password*"
                                                        },
                                                        maxLength: {
                                                            value: 15,
                                                            message: "*Password length need to be 4 - 15 characters.*"
                                                        },
                                                        minLength:{
                                                            value: 4,
                                                            message: "*Password length need to be 4 - 15 characters.*"
                                                        }
                                                    })}/>
                                                    <label htmlFor="LoginPassword">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="d-flex justify-content-between">
                                                    <div className="mb-3">
                                                        <div className="form-check align-items-center d-flex mb-0">
                                                            <input className="form-check-input mt-0" type="checkbox"
                                                                   value="" id="RememberMe"/>
                                                            <label className="form-check-label text-muted ms-2"
                                                                   htmlFor="RememberMe">Remember me</label>
                                                        </div>
                                                    </div>
                                                    <small className="text-muted mb-0"><Link to={'/resetpassword'}
                                                                                             className="text-muted fw-semibold">Forgot
                                                        password ?</Link></small>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <button className="btn btn-success rounded-md w-100"
                                                        type="submit">Login
                                                </button>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                                                <small><span className="text-muted me-2">Have an invite ?</span> <Link
                                                    to={'/signup'} className="text-dark fw-bold">Sign Up</Link></small>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <footer>
                                <div className="container">
                                    <div className="row  text-center text-white mb-4">
                                        <div className="col-sm-12 mb-4">
                                            <span className="list-inline-item mb-0"><Link to={'/privacy'}
                                                                                          className="text-foot me-2">Privacy</Link></span> |
                                            <span className="list-inline-item mb-0"><Link to={'/terms'}
                                                                                          className="text-foot me-2">Terms</Link></span> |
                                            <span className="list-inline-item mb-0"><Link to={'/contact'}
                                                                                          className="text-foot">Contact</Link></span>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                                <p className="mb-2 fw-bold small mb-2 text-white">Copyright
                                                    © <script>2024</script> ikonicsolution.com.
                                                    All Rights Reserved.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}