import React, {useEffect, useState} from "react";
import logo from "../../assets/images/logo-light.png"
import avatar from  "../../assets/images/avatar.png"
import {NavLink, Link} from "react-router-dom";
import {AUTH_USER_DATA, LOGOUT_URL, TOKEN} from "../../config/constants";

function Header(props) {
    const [auth_user, set_auth_user] = useState(null);
    useEffect(() => {
        if (props.authUser){
            set_auth_user(props.authUser)
        }
        else if (localStorage.getItem(AUTH_USER_DATA) !== null ||
            localStorage.getItem(AUTH_USER_DATA) !== undefined ){
            let data = localStorage.getItem(AUTH_USER_DATA)
            set_auth_user(JSON.parse(data))
        }
    }, []);

    async function _logout(){
        const token = localStorage.getItem(TOKEN)
        const response = await fetch(LOGOUT_URL,{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
        })
        await response.json();
        // console.log("result",result)
        localStorage.removeItem(AUTH_USER_DATA)
        localStorage.removeItem(TOKEN)
        setTimeout(() =>{
            window.location.pathname = '/'
        },1000);
    }

    // console.log("header",auth_user)
    // console.log("props.authUser",props.authUser)
    return (
        <header id="topnav" className="defaultscroll sticky">
            {
                !auth_user ? <div className="container">
                    <NavLink to={'/'} className="logo">
                        <img src={logo} height="56" className="logo-dark-mode" alt="logo"/>
                    </NavLink>
                    <ul className="buy-button list-inline mb-0">
                        <Link to={'/login'} className="btn btn-success rounded-md">Login</Link>
                    </ul>
                </div>:
                    <div className="container">

                        <NavLink to={'/'} className="logo">
                            <img src={logo} height="56" className="logo-dark-mode" alt="logo"/>
                        </NavLink>

                        <ul className="buy-button list-inline mb-0">
                            <li className="list-inline-item mb-0">
                                <div className="dropdown dropdown-success">
                                    <button type="button" className="btn btn-pills dropdown-toggle p-0"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img
                                        src={auth_user && auth_user.image ? `${auth_user.image}`: avatar} className="rounded-pill avatar avatar-sm-sm" alt={auth_user.username}/>
                                    </button>
                                    <div
                                        className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 pb-3 pt-0 overflow-hidden rounded"
                                        style={{minWidth: "200px"}}>
                                        <div className="position-relative">
                                            <div className="pt-5 pb-3 bg-gradient-success"></div>
                                            <div className="px-3">
                                                <div className="d-flex align-items-end mt-n4">
                                                    <img src={auth_user && auth_user.image ? `${auth_user.image}`: avatar}
                                                         className="rounded-pill avatar avatar-md-sm img-thumbnail shadow-md"
                                                         alt="avatar"/>
                                                        <h6 className="text-dark fw-bold mb-0 ms-1">{auth_user && auth_user.username}</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                                               to={`/user/${auth_user && auth_user.id}/profile`}><span className="mb-0 d-inline-block me-1"><i
                                                className="uil uil-cog align-middle h6 mb-0 me-1"></i></span> Settings</Link>
                                            <div className="dropdown-divider border-top"></div>
                                            <button className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                                               onClick={_logout}><span className="mb-0 d-inline-block me-1"><i
                                                className="uil uil-sign-out-alt align-middle h6 mb-0 me-1"></i></span> Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
            }
        </header>
    );
}

export default Header;