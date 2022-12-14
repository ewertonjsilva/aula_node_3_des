// Ewerton 
const { json } = require("express");
const db = require("../database/connection"); 

module.exports = {
    async listarCidades(request, response) { 
        try {
            const { cidade = '%%', estado = '%%' } = request.body; 
            // console.log(cidade);
            const sql = 'SELECT cid_id, cid_nome, cid_uf FROM cidades WHERE cid_nome like ? AND cid_uf = ? ORDER BY cid_nome ASC; ';  
            const values = [cidade, estado];
            const cidades = await db.query(sql, values); 
            return response.status(200).json({confirma: 'Sucesso', nResults: cidades[0].length, message: cidades[0]});    
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },  
    async listarEstados(request, response) { 
        try {
            const sql = 'SELECT DISTINCT cid_uf FROM cidades ORDER BY cid_uf ASC; ';  
            const estados = await db.query(sql); 
            return response.status(200).json({confirma: 'Sucesso', nResults: estados[0].length, message: estados[0]});    
        } catch (error) { 
            return response.status(500).json({confirma: 'Erro', message: error});
        }
    },
};
