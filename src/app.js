import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import productRoute from './routes/products.js'
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();


 mongoose.connect('mongodb+srv://user_eccomerce_coderHouse:LwnOfgElXt94eLP6@eccomercecoderhouse.vsk6ewh.mongodb.net/eccomerceCoderHouse', error => {
  if(error){
    console.log(`No se pudo conectar a la base de datos ${error}`);
    process.exit()
  }
 })

const httpServer = app.listen(8080, () => {
  console.log('server runing in port 8080')
});

export const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter)
app.use('/api/products', productRoute);



socketServer.on('connection', socket => {
  console.log(`Nuevo Cliente`);

  socket.on('message', data => {
    console.log(data);
  })
})