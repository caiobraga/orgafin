

import React, { Component } from 'react';
import M from "materialize-css";
import { Chart } from 'chart.js';
import { get_data, close_modal, Moeda, isEmpty, open_modal, convert_data } from '../tools/functions'
import NavBar from '../Components/Navbar'
import Sidenav from '../Components/SIde_NavBar'
import src from './configFetch/index.js';


class Painel extends Component {

     
    constructor(props) {
        super(props);
        this.state = {
            items:{},
            categorias:{},
            movimentacoes: []

        };

    }
    async mostrarMovimentacao() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "iduser": localStorage.getItem("id") })
        }
        fetch(src+'/movimentacoes/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
               
                if(data.status != "erro"){
                    this.items =  data.dados;
                    return this.setState({ lista_ordens: data.dados })
                }
            }).catch(
            err=> {
              console.log(err);
            }
            )
    }
    async mostrarCategorias() {
        
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"iduser":  localStorage.getItem("id")})
        }
        fetch(src+'/categorias/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
            if(data.status != "erro"){
                this.categorias =  data.dados;
                return this.setState({ lista_ordens: data.dados })
            }
               

            }).catch(
            err=> {
              M.toast({html: err});
              console.log(err);
            }
            )

    }
    async movimentacoes() {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ "iduser": localStorage.getItem("id") })
        }
        fetch(src+'/movimentacoes/mostrar/', requestOptions)
            .then(response => response.json())
            .then(data=> {
                if(data.status != "erro"){
                    this.setState({ movimentacoes: data.dados })
                    return this.rotina_grafico(data.dados)
                }
            }).catch(
            err=> {
              M.toast({html: "um erro ocorreu: "+err});
              console.log(err);
            }
            )
    }

    componentDidMount() {
        this.movimentacoes()
        this.mostrarMovimentacao()
        this.mostrarCategorias()

    }



    rotina_grafico(itens) {
        let labels = []
        let labels_value = []
        let datas=[]
        let valores=[]
        let total = 0
        
            itens.map(item => {
                    labels.push(convert_data(item.data))  
                    labels_value.push(item.valor ? Number(item.valor) : 0.00)
                    datas = labels.filter(function(este, i) {
                        return labels.indexOf(este) === i;
            })
            labels_value.map(item=>{
                if(labels_value.indexOf(item) >= datas.length){
                    valores.push(labels_value[labels_value.indexOf(item)] + labels_value[labels_value.indexOf(item)-1])
                    labels_value.pop();
                     labels_value.pop();
                     labels_value.push(valores[0]);
                } 
            })
            
            })
               
            
          


           
       
            
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: datas,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Movimentações',
                    data: labels_value,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    cardInformationNumber(item) {
        return (
            <>

                <div class="col s12 m3">
                    <div class="painel card horizontal hoverable">

                        <div class="icon">
                            <i class="medium material-icons">assignment</i>
                        </div>
                        <div>

                            <span> {item.nome ? item.nome : "Sem nome"}</span>
                            <p>{item.tipo ? item.tipo : "Tipo não informado"}</p>

                        </div>

                    </div>
                </div>
            </>
        )
    }
    cardChart() {


        return (
            <>
                <div class="col s12 m12">
                    <div class="card darken-1">
                        <div class="card-content ">


                            <canvas id="myChart"></canvas>

                        </div>

                    </div>
                </div>
            </>
        )

    }

    cardTable() {
        return (
            <>
                <span class="card-title">Plantios</span>

                <table>
                    <thead>
                        <tr>
                            <th>Cultura</th>
                            <th>Data semeadura</th>
                            <th>Data colheita</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>COENTRO</td>
                            <td>01/10/2020</td>
                            <td>30/11/2020</td>
                        </tr>
                        <tr>
                            <td>ALFACE</td>
                            <td>01/10/2020</td>
                            <td>15/11/2020</td>
                        </tr>
                        <tr>
                            <td>BETERRABA</td>
                            <td>01/10/2020</td>
                            <td>30/01/2021</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    paineis() {
        return (
            <>

                
                <div class="row"> {this.cardChart()}</div>

            </>
        )
    }

    render() {

        return (
            <>
                <NavBar />
                <Sidenav />
                <div class="login forms">
                    <div class="row">
                        <div class="col s12 m3 l3" />
                        <div class="col s12 m6">
                            {this.paineis()}
                        </div>
                    </div>
                </div>

            </>)

    }


}
export default Painel;