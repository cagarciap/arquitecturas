<template>
  <form class="card" action="" method="post">
    <h4 class="form__title">Registrar sembrado</h4>
    <label for="Fecha de Inicio"></label>
    <input v-model="values.fechaInicio" type="text" id="fechaInicio" name="fechaInicio" placeholder="Fecha de Inicio del Cultivo"><br>

    <label for="Fecha Final Estimada"></label>
    <input v-model="values.fechaFinal" type="text" id="fechaFinal" name="fechaFinal" placeholder="Fecha Final Estimada"><br>

    <label for="Semilla"></label>
    <input v-model="values.semilla" type="text" id="semilla" name="semilla" placeholder="Semilla a cultivar"><br>

    <label for="Parcela"></label>
    <select v-model="values.parcela">
      <option 
        v-for="parcela in parcelas" 
        :value="parcela._id" 
        v-bind:key="parcela._id">
          Latitud: {{parcela.latitude}} - Longitud: {{parcela.longitude}}
      </option>
    </select>

    <!--<label for="Parcela2"></label>
    <input v-model="values.parcela" type="text" id="parcela" name="parcela" placeholder="Parcela de cultivo"><br>-->

    <input @click="registrarCultivo" class="enviar" type="button" value="Enviar">
  </form>
  <div class="container">
    <div class="title-section">
      <h4 class="title">Cultivos Registrados</h4>
    </div>
    <div v-for="value in values" :key="value._id">
        <div class="card">
            <p><b>Fecha de Inicio del Cultivo: </b>{{value.startDate}}</p>
            <p><b>Fecha Final Estimada del Cultivo: </b>{{value.estimatedEndDate}}</p>
            <p><b>Semilla: </b>{{value.seed}}</p>
            <div v-for="(parcela,index) in value.plot" :key="parcela._id">
              <div v-if="index == '_id'">
                <p><b>Parcela: <i>{{value.plot['_id']}}</i></b></p>
              </div>
              <div v-if="index == 'area'">
                <b><i>Area:</i></b> {{value.plot['area']}}
              </div>
              <div v-if="index == 'latitude'">
                <b><i>Latitud:</i></b> {{value.plot['latitude']}}
              </div>
              <div v-if="index == 'longitude'">
                <b><i>Longitud:</i></b> {{value.plot['longitude']}}
              </div>
              <div v-if="index == 'status'">
                <b><i>Estado:</i></b> {{value.plot['status']}}
              </div>
            </div>

            <button @click="eliminar(value._id)" class="eliminar">Eliminar</button>
            <!--<button @click="eliminar(value._id)" class="eliminar">Eliminar</button>-->
        </div>
    </div>
  </div>
</template>

<script>
import EverGreenService from '@/EverGreenService.js';
import "@/assets/styles/global.css";

export default {
  name: 'Sembrado',
  data() {
    return {
      values: {
        fechaInicio: '',
        fechaFinal: '',
        semilla: '',
        parcela: '',
      },
      parcelas: {
        _id: '',
        area: '',
        logitude: '',
        latitude: '',
        status: '',
      },
      error: '',
      text: ''
    }
  },
  async created() {
      try {
        this.values = await EverGreenService.cultivos();
        this.parcelas = await EverGreenService.parcelas()
      }
      catch(err) {
        this.error = err.message;
      }
  },
  methods: {
      async registrarCultivo() {
        await EverGreenService.registrarCultivo(this.values);
        this.values = await EverGreenService.cultivos();
        window.location.reload();
      },
      async eliminar(id) {
        await EverGreenService.eliminarCultivo(id);
        this.values = await EverGreenService.cultivos();
        window.location.reload();
      },
  },
}
</script>
