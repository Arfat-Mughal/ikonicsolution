import React from "react";
import {Link} from "react-router-dom";

function footer(){
    return(
        <footer>
            <div className="container">
                <div className="row  text-center mb-4">

                    <div className="col-sm-12 mb-4">
                        <span className="list-inline-item mb-0"><Link to={'/privacy'}
                                                                   className="text-foot me-2">Privacy</Link></span> |
                        <span className="list-inline-item mb-0"><Link to={'/terms'}
                                                                   className="text-foot me-2">Terms</Link></span> |
                         <span className="list-inline-item mb-0"><Link to={'/contact'} className="text-foot">Contact</Link></span>

                    </div>
                    <div className="col-sm-12">
                        <div className="mt-4 mt-sm-0 pt-2 pt-sm-0">

                            <p className="mb-2 fw-bold small mb-2">Copyright © 2024 ikonicsolution.com. All Rights Reserved.<br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer;