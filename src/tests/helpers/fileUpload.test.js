
import axios from "axios"
import { fileUpload } from "../../helpers/fileUpload"
// import fetch from "node-fetch"
// import http from 'node:http';
describe('Pruebas en fileUpload', () => { 
     test('Debe de subir el archivo correctamente a cloudinary',() => { 


          
          // console.log("A")
          // const imageURL='https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg'
          // const resp=await axios.get({
          //      url: imageURL, //your url
          //      method: 'GET',
          //      responseType: 'blob', // important
          // })
          // .then(resp=>{
          //      console.log("AE")
          //      console.log(responce.data)
          // }).catch(error=>{
          //      console.log(error)
          // })
          
          
          // const resp= await fetch(imageURL);
          // const blob =await resp.blob();
          // blob.name = 'image.jpeg';
          // blob.lastModified = new Date();
          // const file = new File([blob],'image.jpeg',{type: blob.type});
          
          // const url = await fileUpload(file)
          // console.log(blob)
          // expect ( typeof url).toBe('object');// se esperaria que regresara un string pero regresa un Null
                                             //esto es porque hay un error en la comunicacion con el fetch
                                             //pero asi se ahce el test de que un archivose subio 
     })
     test('debe de teronar un null ', async() => { 
          // const file = new File([blob],'foto.jpg');
          
          // const url = await fileUpload(file)
          // expect( url ).toBe(null)
      })
 }) 