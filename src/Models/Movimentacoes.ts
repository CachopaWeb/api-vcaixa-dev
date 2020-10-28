interface IMovimentacao{
    mov_codigo?: number;

    mov_data: Date;

    mov_descricao: String;
    
    mov_categoria: String;
    
    mov_entrada: number;
    
    mov_saida: number;
    
    mov_saldo_anterior: number;
}

export default IMovimentacao;