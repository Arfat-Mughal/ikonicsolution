import React, {useEffect} from "react";
import Header from "../header";
import Footer from "../footer";
import avatar from "../../assets/images/avatar.png"
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {
    AUTH_USER_DATA, FORGET_PASSWORD_URL, GET_AUTH_URL,
    PROFILE_IMAGE_UPLOAD_URL,
    PROFILE_UPDATE_URL,
    TOKEN
} from "../../config/constants";
import {useForm} from "react-hook-form";

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function Profile() {
    const [auth_user, set_auth_user] = useState(null);
    const {register, handleSubmit, formState: {errors}, setError, setValue} = useForm();
    const [disable, setdisable] = useState(false);
    const [disablePassword, setdisablepassword] = useState(false);
    const [message, setmessage] = useState("");
    const [error, seterror] = useState("");

    useEffect(() => {
        if (disable || error || message || setdisablepassword) {
            simulateNetworkRequest().then(() => {
                setdisable(false);
                seterror("");
                setmessage("");
                setdisablepassword(false);
            });
        }
    }, [disable, error, message,disablePassword]);

    let location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0)
        if (location.state == null) {
            getAuthUserInformation()
        } else {
            set_auth_user(location.state)
        }

    }, []);

    async function getAuthUserInformation(){
        const token = localStorage.getItem(TOKEN)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        await fetch(GET_AUTH_URL, {method: 'GET', headers})
            .then(response => response.json())
            .then(data => {
                console.log("dataaaaa",data.data.auth_user)
                localStorage.setItem(AUTH_USER_DATA, JSON.stringify(data.data.auth_user))
                set_auth_user(data.data.auth_user)
                setValue('username', data.data.auth_user.username);
                setValue('email', data.data.auth_user.email);
                setValue('name', data.data.auth_user.name);
                setValue('gender', parseInt(data.data.auth_user.gender));
                setValue('birth', data.data.auth_user.birth);
            });
    }

    const onSubmit = (data) => {
        console.log("data", data)
        post_request(data)
    };

    async function loadFile(event){
        const token = localStorage.getItem(TOKEN)
        console.log(event.target.files[0])
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        await axios.post(
            PROFILE_IMAGE_UPLOAD_URL,
            formData, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then((res) => {
                console.log("res", res.data)
                if (!res.data.error) {
                    getAuthUserInformation()
                }
            }).catch((err) => console.log(err));
    }

    async function post_request(formData) {
        setdisable(true);
        const token = localStorage.getItem(TOKEN)
        axios.postForm(PROFILE_UPDATE_URL, formData, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then((res) => {
                console.log("rdddddddes", res.data)
                if (!res.data.error) {
                    getAuthUserInformation()
                }
            }).catch((err) => {
            console.log(err)
            let res = err.response.data
            if (res && res.errors && res.errors.email) {
                seterror(res.errors.email[0])
            } else if (res && res.errors && res.errors.username) {
                seterror(res.errors.username[0])
            } else {
                seterror("oops something went wrong")
            }
        });
    }

    console.log("errors", errors)

    async function forget_password_request() {
        setdisablepassword(true)
        axios.post(FORGET_PASSWORD_URL, {email: auth_user && auth_user.email}, {
            headers: {'Content-Type': 'application/json'}
        })
            .then((res) => {
                setmessage(res.data.data)
            }).catch((err) => {
            let res = err.response.data
            if (res && res.errors && res.errors.email) {
                setError('email', {type: 'error', message: res.errors.email[0]});
            }
        });
    }

    return (
        <>
            <Header authUser={auth_user}/>
            <section className="section">
                <div className="container">
                    <p className="p-4"><Link to={'/'} className="text-success">Home</Link> > Settings</p>
                    <div className="row">
                        <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mt-4 pt-2">
                            <div className="card ms-lg-5">
                                <div className="profile-pic">
                                    <input id="pro-img" name="profile-image" type="file" className="d-none"
                                           onChange={loadFile}/>
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={auth_user && auth_user.image ? `${auth_user.image}` : avatar}
                                            className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                                            id="profile-image" alt="avatar"/>
                                        <label className="icons position-absolute bottom-0 end-0"
                                               htmlFor="pro-img"><span
                                            className="btn btn-icon btn-sm btn-pills btn-success"><i
                                            data-feather="camera" className="icons"></i></span></label>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-muted mb-0">We recommend an image of at least 400X400. GIFs work
                                        too.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7 col-12 order-2 order-md-1 mt-4 pt-2">
                            <div className="rounded-md shadow">
                                <div className="p-4 border-bottom">
                                    <h4 className="mb-0">Profile</h4>
                                </div>

                                <div className="p-4">
                                    <form className="profile-edit" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-12 mb-4">
                                                <label className="form-label h6">User name <span
                                                    className="text-danger">*</span></label>
                                                <input name="username"
                                                       id="username"
                                                       type="text"
                                                       className="form-control"
                                                       {...register("username", {
                                                           required: {
                                                               value: true,
                                                               message: "*Please Enter Username*"
                                                           },
                                                           maxLength: {
                                                               value: 32,
                                                               message: "*Username Text Limit exceed.*"
                                                           }
                                                       })}
                                                />
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label className="form-label h6">Your name</label>
                                                <input name="name" id="name" type="text" className="form-control"
                                                       {...register("name")}
                                                />
                                            </div>

                                            <div className="col-12 mb-4">
                                                <label className="form-label h6">Gender</label>
                                                <select className="form-control" name="gender" id="gender"
                                                        {...register("gender")}
                                                        aria-label="Default select example">
                                                    <option value={0}>Select Option</option>
                                                    <option value={1}>Male</option>
                                                    <option value={2}>Female</option>
                                                </select>
                                            </div>

                                            <div className="col-12 mb-4">
                                                <label className="form-label h6">Birth Year</label>
                                                <input name="age" id="age" type="date" className="form-control"
                                                       {...register("birth")}
                                                />
                                            </div>

                                            <div className="col-12 mb-4">
                                                <label className="form-label h6">Email address <span
                                                    className="text-danger">*</span></label>
                                                <input name="email" id="email" type="text" className="form-control"
                                                       {...register("email", {
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
                                                               message: "*Email Should be greater than 4.*"
                                                           }
                                                       })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            {
                                                disable && error === "" &&
                                                <div className="alert alert-info text-center">
                                                    Please Wait Profile Is Updating
                                                </div>
                                            }
                                            {
                                                error.length > 0 &&
                                                <div className="alert alert-danger text-center">
                                                    {error}
                                                </div>
                                            }
                                            <div className="col-12">
                                                <button type="submit" id="submit" name="send" disabled={disable}
                                                        className={`btn ${disable ? "btn-secondary" : "btn-success"} rounded-md`}> {
                                                    disable ? "Updating..." : "Update Profile"
                                                }
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <div className="rounded-md shadow mt-4">
                                <div className="p-4 border-bottom">
                                    <h4 className="mb-0">Password</h4>
                                </div>

                                <div className="p-4">
                                    <h6 className="mb-0">reset password will send you a link to your email address on
                                        file</h6>
                                    {
                                        message.length > 0 ?
                                            <div className="alert alert-info text-center">
                                                {message}
                                            </div> :
                                            errors.email &&
                                            <div
                                                className='alert alert-warning error_message'>{"Please wait for 5 minutes to send another password recovery email"}</div>
                                    }
                                    <div className="mt-4">
                                        <button onClick={forget_password_request} disabled={disablePassword}
                                                className={`btn ${disablePassword ? "btn-secondary" : "btn-success"} rounded-md`}>
                                            {disablePassword ? "Please wait..." : "Reset Password"
                                        }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-md shadow mt-4">
                                <div className="p-4 border-bottom">
                                    <h4 className="mb-0">Invitation ({auth_user && auth_user.invitation})</h4>
                                </div>

                                <div className="p-4">
                                    <h6 className="mb-0">Invite your friends by sharing the following code, 5 invites
                                        per user.</h6>
                                    <h2 className="mb-0">
                                        <span className="text-success">{auth_user && auth_user.invitation_code}</span>
                                    </h2>
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