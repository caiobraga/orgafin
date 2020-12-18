import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import src from '../pages/configFetch/index.js'
function SidenavLogin(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    useEffect(() => {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {});
    })


    async function create_account(){
        if(email == "") return M.toast({html: 'Preencha o email'})
        if(password == "") return M.toast({html: 'Preencha a senha'})
       return  cadastrar();
        
       
    }
    
    async function cadastrar(){
   
        fetch(src+"/usuarios/cadastrar/", {
            method: "POST",
            body: JSON.stringify({ "email": email, "senha":password })
          })
            .then(response => console.log(response.json))
            .then(data =>  M.toast({html: 'Cadastro realizado'})
         );
    
    }

    return (
    <>
        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li>
                <div class="user-view blue darken-4">
                    <div class="background">
                    </div>
                    <a href="" ><img class="circle" src={"https://blog.nexxera.com/wp-content/uploads/2015/09/ThinkstockPhotos-477498910.png"} /></a>
                    <a href=""><span class="white-text name">Orgafin</span></a>
                    <a href=""><span class="white-text email">Orgafin@gmail.com</span></a>
                </div>
            </li>
            <div class="login forms">
                <div class="row">
                    <div class="col s12 m12 l12">
                        <div class="card hoverable" >
                        <div class="center card-content logo">
                                <img src={"https://blog.nexxera.com/wp-content/uploads/2015/09/ThinkstockPhotos-477498910.png"} width="200px" />
                            </div>
                            <div class="center">
                                <pre>Digite o email e senha.</pre>
                            </div>
                            <div class="card-content lighten-4 row">
                                <div class="input-field col s12">
                                    <input
                                        class="input-group form-control"
                                        placeholder="email@email.com"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <label class="active" for="last_name">Email</label>
                                </div>

                                <div class="input-field password col s12">


                                    <input
                                        class="input-group form-control"
                                        type="password"
                                        placeholder=""
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                create_account()
                                            }
                                        }}
                                    />
                                    <label class="active" for="last_name">Senha</label>

                                </div>
                            </div>
                            <div class="card-action">
                                <a class="color_secundaria" onClick={() => create_account()} > Cadastre-se </a>
                            </div>
                        </div>
                        <div class="col s1 m3 l3"></div>

                    </div>
                </div>
            </div>


        </ul>
    </>
    )
}
export default SidenavLogin;