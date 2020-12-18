export default class Moeda {

    static convert( valor ) {
        if (valor != null)   return valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return 0;
    }

}