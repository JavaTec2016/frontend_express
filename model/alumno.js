const Model = require("./Model");

class Alumno extends Model {
    constructor(data){
        super(data);
        this.tabla = "alumnos";
    }   
}
module.exports = Alumno;