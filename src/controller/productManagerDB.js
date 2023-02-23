import { request, response } from "express";

import { Producto } from "../dao/model/producto.js";




const productPost = async( req=request, res=response ) => {
    const body = req.body;
    

    const producto = new Producto(body);

    producto.id = await idIncrement();

    await producto.save();

    res.json({
        producto
    })

}


const idIncrement = async() => {
    const lastProduct = await Producto.findOne().sort({ id: -1 }).limit(1);
    const product = lastProduct.id.valueOf();
    
    
    try {
        return Number(product) + 1;
    } catch (error) {
        console.log(error);
    }
}

const productGet = async ( req=request, res=response) => {
    const {limit} = req.query;
    const  productos = await Producto.find()
    .limit(Number(limit))
    

    console.log(pro);
    res.json({
        productos
    })
}



const productDelete = async( req=request, res=response ) => {
    const {pid} = req.params;

    const product = await Producto.findOneAndDelete({ id: pid })

    res.json({
        product
    })
}

export {
    productPost,
    productGet,
    productDelete
}