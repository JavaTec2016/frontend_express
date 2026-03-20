'use strict';
const Model = require('../model/Model');
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = function(req, res){
    console.log(req.body)
    if(req.body.constructor === Object && Object.keys(req.body).length == 0){
        res.status(400).send({error:true, message:'No hay datos de creacion'})
    }
    const data = req.body;
    const tabla = req.params.tabla;
    
    const model = new Model(tabla, data);

    model.create((err, result, fields)=>{
        console.log("Creando...");
        if(err) res.send(err);

        req.flash('message', "Insercion exitosa");
        res.redirect('/');
    })

}

exports.delete = function(req, res){
    console.log('ELIMINANDO: ', req.body);
    const field = req.params.field;
    const valor = req.params.value;

    new Model(req.params.tabla, {}).delete(field, valor, (err, result, fields)=>{
        if(err) res.send(err);
        req.flash('message', "Eliminacion exitosa");
        res.redirect('/');
    });
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.update = function(req, res){
    console.log('ACTUALIZANDO: ', req.body, req.params);
    const field = req.params.field;
    const valor = req.params.value;
    const model = new Model(req.params.tabla, {});

    model.findBy(field, valor, ['*'], (err, result, fields)=>{
        const data = req.body;
        const filter = {};
        filter[field] = valor;
        console.log("Actualizando: ", data);
        
        model.update(data, filter, (err, result, fields)=>{
            if(err) res.send(err);
            req.flash('message', "Modificacion exitosa");
            res.redirect('/');
        });
    });
}
/**
 * 
 * @param {Request} req 
 * @param {Response<any, Record<string, any>, number>} res 
 */
exports.findAll = function(req, res){
    console.log(req.query);
    const model = new Model(req.query.tabla, {});

    model.findAll((err, result, fields)=>{
        if(err) res.send(err);
        res.status(200).send(result);
    })
}

exports.findBy = function(req, res){
    const tabla = req.params.tabla;
    const field = req.params.field;
    const valor = req.params.value;
    const model = new Model(tabla, {});

    model.findBy(field, valor, ['*'], (err, result, fields)=>{
        if(err) res.send(err);
        res.json(result);
    });
    
}