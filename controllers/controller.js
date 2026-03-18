'use strict';
const Model = require('../model/Model');
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.create = function(req, res){
    if(req.body.constructor === Object && Object.keys(req.body).length == 0){
        res.status(400).send({error:true, message:'No hay datos de creacion'})
    }
    const body = req.body;
    const tabla = body.tabla;

    const data = body.model;
    
    const model = new Model(tabla, data);

    model.create((err, result, fields)=>{
        console.log("Creando...");
        if(err) res.send(err);

        req.flash('message', "Insercion exitosa");
        res.redirect('/');
    })

}

exports.delete = function(req, res){
    const field = req.params.field;
    const valor = req.params.value;

    new Model(tabla, {}).delete(field, valor, (err, res, fields)=>{
        if(err) res.send(err);
        req.flash('message', "Eliminacion exitosa");
        res.redirect('/');
    });
}

exports.update = function(req, res){
    const field = req.params.field;
    const valor = req.params.value;
    const model = new Model(req.body.tabla, {});

    model.findBy(field, valor, ['*'], (err, res, fields)=>{
        const data = req.body.model;
        const filter = {};
        filter[field] = valor;
        console.log("Actualizando: ", data);
        
        model.update(data, filter, (err, res, fields)=>{
            if(err) res.send(err);
            req.flash('message', "Modificacion exitosa");
            req.redirect('/');
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