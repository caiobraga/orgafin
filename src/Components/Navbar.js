import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import M from "materialize-css";


function NavBar(props) {

    const history = useHistory();

    return (

        <div class="navbar-fixed" >
            <nav class="nav-extended blue darken-4" >
                <div className="navbar-fixed" >
                    <nav className="nav-extended blue darken-4" >
                        <div className="nav-wrapper"  >
                        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                            <a className="brand-logo blue darken-4 center" onClick={() => history.push("/home")}>Orgafin</a>
                        </div>
                    </nav>
                </div>

            </nav>

        </div>
    );




}

export default NavBar;