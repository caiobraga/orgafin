import M from "materialize-css";
import axios from 'axios';
 
const api = axios.create({
    baseURL: 'http://orgafin.orgfree.com/DAO/api/v1/'
});
 

export async function get_data(route) {
    try {
        const response = await api.get(route)
        return response
    } catch (error) {
        const erro = {
            response : {
                statusText : "erro na consulta dos dados",
                status: "500"
            }
        }
        M.toast({ html: erro.response.statusText})
        return erro
    }
}


export async function update_data(route, item){
    try {
        const response = await api.post(route, JSON.stringify(item))
        return response
    } catch (error) {
        const erro = {
            response : {
                statusText : "erro na consulta dos dados",
                status: "500"
            }
        }
        M.toast({ html: erro.response.statusText})
        return erro
    }
}


// Funções úteis //




export function convert_data(date){
    let year = date.substring(4, 0);
    let month = date.substring(7, 5);
    let day = date.substring(10, 8)
    return `${day}/${month}/${year}`
}

export function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

export function Moeda( valor ) {
        if (valor != null)   return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return 0;
    }




// Funções com Modal //

export function open_modal(type) {
    const elem = document.getElementById(type);
    const instance = M.Modal.init(elem, { inDuration: 400 });
    return instance ? instance.open() : 0;
}

export function close_modal(type, context){
    context.setState({item_update: {} })
    context.setState({item_create: {}})
    const elem = document.getElementById(type);
    const instance = M.Modal.init(elem, { inDuration: 400 });
    return instance ? instance.close() : 0;
}




