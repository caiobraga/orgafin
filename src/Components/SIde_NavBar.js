import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function Sidenav(props) {

    const history = useHistory();

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    })

    return (
        <>
            <ul id="slide-out" class="sidenav sidenav-fixed">
                <li>
                    <div class="user-view blue darken-4">
                        <div class="background">
                        </div>
                        <a href="" ><img class="circle" src={"https://ipc.digital/wp-content/uploads/2016/07/icon-user-default.png"} width="200px" /></a>
                        <a href=""><span class="white-text name"></span></a>
                        <a href=""><span class="white-text email">{localStorage.getItem("email")}</span></a>
                    </div>
                </li>

                <li><a onClick={() => history.push('./home')}><i class="material-icons">dashboard</i>Painel</a></li>

                <li><a  onClick={() => history.push('./movimentacao')}><i class="material-icons">receipt</i>movimentação</a></li>
                <li><a onClick={() => history.push('./categorias')} ><i class="material-icons">sticky_note_2</i>Categorias</a></li>

                <li><div class="divider"></div></li>
                <li><a onClick={() => { localStorage.clear(); return history.push("/") }} ><i class="material-icons">power_settings_new</i>Sair</a></li>

            </ul>
        </>
    )
}
export default Sidenav;