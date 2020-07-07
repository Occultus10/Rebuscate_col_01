const mongoose=require('mongoose');
const { Schema }=mongoose;

const VacanteSchema=  new Schema({
    trabajo:{
        type: String, required: true
    },
    ciudad: {
        type: String, required: true
    },
    titulo: {
        type: String, required: true
    },
    dinero: {
        type: Number, required: true
    },
    descripcion: {
        type: String, required: true
    },
    usuario_id:{
        type: String, required: true
    },
    date: {
        type: Date , default: Date.now
    }
});

module.exports = mongoose.model('Vacante', VacanteSchema);