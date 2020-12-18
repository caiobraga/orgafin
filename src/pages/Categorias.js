
import React, { Component } from 'react'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import M from "materialize-css";
import { get_data, close_modal, Moeda,isEmpty, open_modal,  convert_data } from '../tools/functions'

import src from './configFetch/index.js';

class Categoria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item_update : {},
            item_create : {},
            items:{}
        }
    }


   async componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {});
          });

          document.addEventListener('DOMContentLoaded', function() {
            var select = document.querySelectorAll('select');
            M.FormSelect.init(select, {});
          });
          document.addEventListener('DOMContentLoaded', function() {
            var elems_modal = document.querySelectorAll('.modal');
            M.Modal.init(elems_modal, {});
          });
    }

    async mostrarCategorias() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "iduser": localStorage.getItem("id") })
        }
        fetch(src+'/categorias/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                if(data.status !="erro"){
                    this.items =  data.dados;
                    return this.setState({ lista_ordens: data.dados })
                }

            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )

    }



    salve_update(id_item){
        const { item_update } = this.state;
        if(isEmpty(item_update)) return M.toast({ html: "Preencha os campos"})
        if(isEmpty(item_update.tipo)) return M.toast({ html: "Selecione o tipo"})

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"id": id_item, "iduser": localStorage.getItem("id"), "tipo": item_update.tipo ,"nome": item_update.nome})
        }
        fetch(src+'/categorias/editar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                M.toast({ html: data.dados})
                close_modal('modal1', this)
                this.mostrarCategorias()

            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )
        close_modal('modal1', this)
        this.mostrarCategorias();
        this.mostrarCategorias();
    }
    excluir_categoria(id_item){
        const { item_update } = this.state
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"id": id_item, "iduser": localStorage.getItem("id")})
        }
        fetch(src+'/categorias/excluir/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                M.toast({ html: data.dados})
                close_modal('modal1', this)
                this.mostrarCategorias()

            }).catch(
            err=> {
              M.toast({html: "um erro ocorru :( "});
              console.log(err);
            }
            )
            close_modal('modal1', this)
            this.mostrarCategorias()
    }    
    modal() {
        const { item_update } = this.state
        var item = item_update
        return (
            <div id="modal1" class="modal white">
                <div class="modal-content card">
                <div class="card-content">
                <span class="card-title center">{item_update.nome ? item_update.nome.toUpperCase() : ""}</span>
                    <div class="row">
                        <div class="col s12 l12">

                            <div class="input-field password col s12 m6">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="Ex: livro"
                                    value={item_update.nome? item_update.nome : ""}
                                    onChange={e => {
                                        item.nome = e.target.value;
                                        this.setState({ item_update: item })
                                    }}
                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="col s12 m6">
                                <label>Selecione o tipo</label>
                                <div class="row">
                                    <label class="col s6">
                                        <input
                                            checked={item.tipo == "entrada" ? true : false}
                                            type="radio"
                                            onChange={e => {
                                                item.tipo = 'entrada';
                                                this.setState({ item_update: item })
                                            }}
                                        />
                                        <span>Entrada</span>
                                    </label>
                                    <label class="col s6">
                                        <input 
                                          checked={item.tipo == "saida" ? true : false}
                                          type="radio"
                                          onChange={e => {
                                              item.tipo = 'saida';
                                              this.setState({ item_update: item })
                                          }}
                                        />
                                        <span>Saída</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer white">
                    <a style={{cursor:"pointer"}} onClick={()=> this.salve_update(item.id)} class="waves-effect waves-green btn-flat white-text green">Salvar</a>
                    <a style={{cursor:"pointer"}} onClick={()=> close_modal('modal1', this)} class="left waves-effect btn-flat white-text red">Descartar</a>
                </div>
            </div>
        )
    }


     create_categoria(){
        const { item_create } = this.state;
        if(isEmpty(item_create)) return M.toast({ html: "Preencha os campos"})
        if(isEmpty(item_create.tipo)) return M.toast({ html: "Selecione o tipo"})

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "nomeMov": item_create.nome, "tipo":item_create.tipo,"iduser": localStorage.getItem("id") })
        }
        fetch(src+'/categorias/cadastrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                M.toast({ html: data.dados})
                console.log(data.dados);
                this.mostrarCategorias()

            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )
      
    }



     forms() {
        const { item_create } = this.state
        var item = item_create
        return (
            <div class="card hoverable" >
                <div class="card-content">
                    <div class="row">
                        <div class="col s12 l12">

                            <div class="input-field password col s12 m6">
                                <input
                                    class="input-group form-control"
                                    type="text"
                                    placeholder="Ex: livro"
                                    value={item_create.nome? item_create.nome : ""}
                                    onChange={e => {
                                        item.nome = e.target.value;
                                        this.setState({ item_create: item })
                                    }}
                                />
                                <label class="active" for="last_name">Nome</label>

                            </div>
                            <div class="col s12 m6">
                                <label>Selecione o tipo</label>
                                <div class="row">
                                    <label class="col s6">
                                        <input
                                            checked={item.tipo == "entrada" ? true : false}
                                            type="radio"
                                            onChange={e => {
                                                item.tipo = 'entrada';
                                                this.setState({ item_create: item })
                                            }}
                                        />
                                        <span>Entrada</span>
                                    </label>
                                    <label class="col s6">
                                        <input 
                                          checked={item.tipo == "saida" ? true : false}
                                          type="radio"
                                          onChange={e => {
                                              item.tipo = 'saida';
                                              this.setState({ item_create: item })
                                          }}
                                        />
                                        <span>Saída</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" card-action center">
                    <a onClick={()=> this.create_categoria()}>Cadastrar</a>
                </div>
            </div>
        )
    }

card(){
if(this.items){
    return(
        <div>
            {
               
               this.items.map((item, id) =>{
                return (
                    <div key={id} onClick={() => {
                        this.setState({ item_update: item })
                        open_modal('modal1')}} class="card white darken-1 hoverable">
                    <div class="card-content black-text ">
                        <span class="card-title">{item.nome ? item.nome : "Sem nome"}</span>
                        <div class="divider" />
                        <div class="row">
                            <div class="col s6">Tipo</div>
                            <div class="col s6">Categoria</div>
                        </div>
                        <div class="row">
                        <div class="col s6">{item.nome ? item.nome : "TIpo não definido"}</div>
                            <div class="col s6">{item.tipo ? item.tipo : "TIpo não definido"}</div>
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="#" onClick={()=> {this.excluir_categoria(item.id)}} class="red-text" >Deletar</a>
                        <a href="#" class="blue-text">Editar</a>
                    </div>
                </div>
                )
               })
            }
        </div>
    );
}else{
    this.mostrarCategorias();
}

}


    render(){


    return (
        <>
            <NavBar />
            <Sidenav />
            <div class="login forms">
                <div class="row">
                    <div class="col s12 m3 l3" />
                    <div class="col s12 m6">
                        {this.forms()}
                        {this.card()}
                        {this.modal()}
                    </div>
                </div>
            </div>
        </>
    )
    }

}


export default Categoria;