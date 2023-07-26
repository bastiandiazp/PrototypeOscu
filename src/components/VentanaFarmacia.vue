<template>

    <div class="fondo-oscuro">
        <div class="ventana-centros">
            <div class="ventana-header">
                <v-list-item no-gutters>
                    <div class="textTittle">Categorización Triage</div>
                <v-list-item-action>
                    <v-btn icon @click="mostrarTriageAca" class="cerrar">
                    <img src="@/assets/svg/close.svg" alt="close1" />
                    </v-btn>
                </v-list-item-action>
                </v-list-item>
            </div>

        <div class="ventana-body2">
            <v-expansion-panels accordion>

                <v-expansion-panel>
                    <v-expansion-panel-header class="colorC1">
                        <div class="triage-header-left categoria categoria">C1</div>
                        <div class="triage-header-text textContenido">Atención inmediata</div>
                        <div class="triage-header-icon">
                            <img class="icon2" src="@/assets/svg/C1Triage.svg" alt="location1" />
                        </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="colorC1" transition="expand-transition">
                        <div class="textContenido">Situación de riesgo vital que requiere atención inmediata
                            Infarto, hemorragias masivas, quemaduras con riesgo vital.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="colorC2">
                        <div class="triage-header-left categoria">C2</div>
                        <div class="triage-header-text textContenido">Emergencia</div>
                        <div class="triage-header-icon">
                            <img class="icon2" src="@/assets/svg/C2Triage.svg" alt="location1" />
                        </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="colorC2">
                        
                        <div class="textContenido">Paciente debe ser estabilizado por porsible riesgo vital
                            Descompensación de enfermedades, compromiso conciencia.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="colorC3">
                        <div class="triage-header-left categoria">C3</div>
                        <div class="triage-header-text textContenido">Urgente</div>
                        <div class="triage-header-icon">
                            <img class="icon2" src="@/assets/svg/C3Triage.svg" alt="location1" />
                        </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="colorC3">
                        
                        <div class="textContenido">Emergencia relativa, debe recibir tratamiento
                            Fractura, heridas, quemaduras sin riesgo vital, dolor abdominal focalizado.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="colorC4">
                        <div class="triage-header-left categoria">C4</div>
                        <div class="triage-header-text textContenido">Sin riesgo vital inmediato</div>
                        <div class="triage-header-icon">
                            <img class="icon2" src="@/assets/svg/C4Triage.svg" alt="location1" />
                        </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="colorC4">
                        <div class="textContenido">Paciente estable. Puede acudir al SAPU
                            Dolor abdominal, reacciones alérgicas, dolores de espalda o cabeza.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="colorC5">
                        <div class="triage-header-left categoria">C5</div>
                        <div class="triage-header-text textContenido">Atención Médica</div>
                        <div class="triage-header-icon">
                            <img class="icon2" src="@/assets/svg/C5Triage.svg" alt="location1" />
                        </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="colorC5">
                        <div class="textContenido">Sin riesgo vital. Puede acudir a Consultorio
                            Gripes comunes, curaciones.</div>
                    </v-expansion-panel-content>
                </v-expansion-panel>



        </v-expansion-panels>

    </div>



        
        </div>
    </div> 
  
</template>

<script>
export default {
    name: 'Triage',
  methods: {
      closeWindow() {
      this.$emit('close'); // Emitir el evento 'close' para notificar a VentanaCentros.vue que se debe cerrar la ventana emergente
      },
      mostrarTriageAca() {
          this.$emit('mostrar-triage');
      },
  },
  data() {
    return {
    };
  },
};
</script>

<style>
.cursor{
cursor:pointer;
}
.ventana-centros {
position: absolute;
z-index: 1000;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 90%;
height: 70%;
max-width: 400px;
max-height: 700px;
min-height: 540px;
min-width: 300px;
background-color: white;
border-radius: 16px;
box-shadow: 0 0px 4px rgba(0, 0, 0, 0.5);
}

.fondo-oscuro {
position: absolute;
z-index: 10000;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(8px);
display: flex;
justify-content: center;
align-items: center;
}

.ventana-header {
display: flex;
justify-content: space-between;
align-items: center;
}
.cerrar {
position: absolute;
top: 16px;
right: 16px;
display: flex;
justify-content: center;
align-items: center;
width: 29.18px;
height: 29.18px;
border-radius: 50%;
background-color: #ffff;
}
.textContenido {
font-size: 16px;
font-family: 'Roboto', sans-serif;
font-weight: bold;
color: black;
margin-top: 2px;
text-transform: none;
padding: 2px;
}

.textTittle {
  font-size: 26px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
  text-transform: none;
  margin:auto;
  margin-top: 7%;
}
.categoria {
  font-size: 36px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 4px;
  text-transform: none;
  margin-right: 5px;
}


.colorC1{
background-color: #EF4143;
}

.colorC2{
background-color: #F17825;
}

.colorC3{
background-color: #F7AF41;
}

.colorC4{
background-color: #8CC540;
}

.colorC5{
background-color: #3AB644;
}
.ventana-body2{
margin-top: 5%;
}


.triage-header-left {
  position: absolute;
  left: 0;
  margin-left: 6%;
}

.triage-header-text {
    position: absolute;
    left: 0;
    margin-left: 20%;
}

.triage-header-icon {
  flex: 1;
  left: 0;
    margin-left: 60%;
  
 
}
.icon2{
    width: 50px !important;
}
</style>
