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


const productById = async(req=request, res=response) => {

    const {pid} = req.params;
    const id = Number(pid)
    const product = await Producto.findOne({ id });

    if(product === null){
        res.json({
            message: 'producto no encontrado'
        })
    }else{
        res.json({
            product
        })
    }


}

const productDelete = async( req=request, res=response ) => {
    const {pid} = req.params;

    const product = await Producto.findOneAndDelete({ id: pid })

    res.json({
        product
    })
}

const productPut = async(req=request, res=response) => {
    const {pid} = req.params;
    const id = Number(pid)
    const {code, title, description, price, thumbnail, stock} = req.body;

    const product = await Producto.findOneAndUpdate( {id: id}, {title, description, price, thumbnail, stock});
    res.json({
        product
    })

}

export {
    productPost,
    productGet,
    productDelete,
    productById,
    productPut
}