import axios from "axios";

const url = "http://localhost:3000/crops";

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
}

export default EverGreenService;
