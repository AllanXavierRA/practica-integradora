import { Schema, model } from "mongoose";

const ProductoSchema = Schema({
    id: {
        type: Number,
        required: true,
        // unique: true
    },
    title: {
        type: String,
        required: [true, 'EL titulo es obligatorio']
    },
    description: {
        type: String, 
        required: [true, 'La descripcion es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        required: [true, 'El codigo es obligatorio'],
        unique: true
    },
    stock: {
        type: Number,
        required: [true, 'EL stock es obligatorio']
    }
})


export const Producto = model('Producto', ProductoSchema);
