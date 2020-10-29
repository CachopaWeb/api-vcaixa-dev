import Categoria from '../Models/Categoria';

class Movimentacao {
    public id: String;

    public data: Date;

    public tipo: string;
    
    public categoria: Categoria;
    
    public descricao: String;
    
    public valor: number;
}

export default Movimentacao;