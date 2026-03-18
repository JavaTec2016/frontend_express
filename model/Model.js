const conexion = require("../config/database");

class Model {
    constructor(tabla, data) {
        this.tabla = tabla;
        this.campos = new Map();

        for (const campo in data) {
            this.campos.set(campo, data[campo]);
        }
    }
    data(){
        const out = {};
        this.campos.forEach((dato, field)=>{out[field] = dato});
        return out;
    }
    create(callback = (err, result, fields) => { }) {
        if (this.tabla == null) throw new Error("ERROR: la tabla del modelo '" + this.constructor.name + "' no esta definida");

        conexion.query("INSERT INTO " + this.tabla + " SET ?", [data()], (err, results, fields) => {
            if (err) console.error("Error de consulta: \n", err);
            console.log("Insercion exitosa");
            callback(err, results, fields);
        });
    }
    delete(primaryName, primary, callback = (err, results, fields) => { }) {
        conexion.query("DELETE FROM " + this.tabla + " WHERE " + primaryName + " = ?", [primary], (err, results, fields) => {
            if (err) console.error("Error de consulta: \n", err);
            console.log("Eliminacion exitosa");
            callback(err, results, fields);
        })
    }
    update(data, filter, callback = (err, results, fields) => { }) {
        conexion.query(
            "UPDATE " + this.tabla + " SET " +
            this.getQueryParams(data) +
            " WHERE " +
            this.getQueryParams(filter)
            , [...Object.values(data), ...Object.values(filter)], (err, results, fields) => {
                if (err) console.error("Error de consulta: \n", err);
                console.log("Cambio exitoso");
                callback(err, results, fields);
            });
    }
    findBy(field, value, selection = ['*'], callback = (err, results, fields) => { }) {
        conexion.query(
            "SELECT " + selection.join(", ") + "FROM " + this.tabla +
            " WHERE " + field + "= ?",
            [value], (err, results, fields) => {
                if (err) console.error("Error de consulta: \n", err);
                console.log("Consulta exitosa");
                callback(err, results, fields);
            });
    }
    findAll(callback=(err, results, fields)=>{}){
        conexion.query("SELECT * FROM " + this.tabla, (err, results, fields)=>{
            if (err) console.error("Error de consulta: \n", err);
            console.log("Consulta todota");
            callback(err, results, fields);
        })
    }
    getQueryParams(fields = []) {
        let params = [];
        fields.forEach(campo => { params.push(campo + " = ?") })
        return params.join(", ");
    }
}

module.exports = Model;