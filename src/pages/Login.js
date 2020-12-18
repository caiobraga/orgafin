import React, {useEffect, useState} from 'react'
import NavBar from '../Components/Navbar'
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import SidenavLogin from '../Components/Side_NavBar_Login';
import { update_data } from '../tools/functions'
import src from './configFetch/index.js';


function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory();

  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
})
async function saveIDlocal(){

       const requestOptions = {
           method: 'POST',
           body: JSON.stringify({ "email": email, "senha":password })
       }
       fetch(src+'/usuarios/getId/', requestOptions)
           .then(response => response.json())
           .then(data=> {
            localStorage.setItem('id',data.dados[0].id);
           }).catch(
           err=> {
             M.toast({html: "E-mail e senha errados"});
             console.log(err);
           }
           )
   }

async function login(){
  if(email == "") return M.toast({html: 'Preencha o email'})
  if(password == "") return M.toast({html: 'Preencha a senha'})
  localStorage.setItem('email', email)
  var myHeaders = new Headers();
  const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ "email": email, "senha":password })
  }
  fetch(src+'/usuarios/logar/', requestOptions)
      .then(response => response.json())
      .then(data=> {
        M.toast({html: data.dados});
        if(data.dados == "Logado com sucesso"){
            console.log(data.dados)
            saveIDlocal();
            return history.push({
                pathname:"/home",
                state: { 
                    email: email,
                    senha: password
             }
        });
        }
      }).catch(
      err=> {
        M.toast({html: "E-mail e senha errados"});
        console.log(err);
      }
      )

  //return history.push("/home")
}

  return(
    <>
  <NavBar/>
  <SidenavLogin/>
 
  <div class="login forms">
                <div class="row">
                <div class="col s12 m3 l3"/>
                    <div class="col s12 m6 l6">
                        <div class="card hoverable" >

                        <div class="center card-content logo">
                                <img src={"https://blog.nexxera.com/wp-content/uploads/2015/09/ThinkstockPhotos-477498910.png"} width="200px" />
                            </div>
                            <div class="center">
                                <pre>Logar</pre>
                            </div>
                            <div class="card-content lighten-4 row">
                            <div class="input-field col s12">
                                    <input
                                        class="input-group form-control"
                                        placeholder="email@email.com"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onKeyPress={event => {
                                          if (event.key === 'Enter') {
                                              login()
                                          }
                                      }}
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
                                                login()
                                            }
                                        }}
                                    />
                                    <label class="active" for="last_name">Senha</label>

                                </div>
                            </div>
                            <div class="card-action center">
                                <a class="center" onClick={() =>  login()} > Entrar </a>
                            </div>
                        </div>
                        <div class="col s1 m3 l3"></div>

                    </div>
                </div>
            </div>
    </>

  )
}
export default Login;