import axios from "axios";

const url = "http://localhost:3000/crops";
const urlParcelas = "http://localhost:3000/plots"; 

/* eslint-disable no-async-promise-executor */

class EverGreenService {

  static cultivos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static registrarCultivo(values) {
    const test = axios.post( url, {startDate : values.fechaInicio, estimatedEndDate: values.fechaFinal, seed: values.semilla, plot:values.parcela})

    test.then( function confirmacion() {console.log('successful');} ).catch( function (err) {console.log(err);} );
  }

  static eliminarCultivo(id) {
    return axios.delete(`${url}/${id}`);
  }

  static parcelas() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(urlParcelas);
        const data = res.data
        const parcelas = [];
        for (const parcela in data) {
          if (data[parcela]['status'] == "free"){
            parcelas.push(data[parcela]); 
          }
        }
        resolve(
          parcelas
        )
      } catch (err) {
        reject(err);
      }
    });
  }

}



export default EverGreenService;
