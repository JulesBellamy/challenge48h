<template>
  <div class="hello">
    <h1>Bienvenue</h1>
    <a href="#" v-on:click="goProfil()">Vers le profil</a> |
    <a href="#" v-on:click="postAnnonces()">Postez une annonce</a>
    <h2>Annonces</h2>
    <a href="#" v-on:click="setStateOffre()">Offre</a>
    <a href="#" v-on:click="setStateDemande()">Demande</a>
    <div class="dashboard-cards" v-for="offre in offresList" v-bind:key="offre.id">
      <div class="card" v-if="state == offre.specialite.libelle">
        <h2 class="card-title">{{ offre.specialite.libelle}}</h2>
        <div class="card-flap1">
          <div class="card-description">
            <ul class="task-list">
              <li>Catégorie : {{ offre.categorie.libelle}}</li>
              <li>Horaire : {{ offre.horaires }}</li>
              <li>Payant : {{ offre.payant }}</li>
              <li>Utilisateur : {{ offre.client.prenom }} {{ offre.client.nom }}</li>
            </ul>
            <hr/>
            <p>Message de l'utilisateur : {{ offre.libelle }}</p>
            <div class="button-div">
              <button class="contact-button" v-on:click="goContact(offre.client.contact)">Contactez cette personne !</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>


<script>
import Vue from "vue";
import axios from "axios";
export default {

  name: 'Menu',
  data () {
    return {
      msg: 'Menu',
      offresList: '',
      state: 'Offre',
      userLat: 0,
      userLong: 0,
    }
  },
  mounted(){
    //console.log(localStorage.searchData)
    this.getUserPosWithId(localStorage.searchData);
    // this.getAllOffresNearMe();
  },
  methods: {
    goProfil(){
      this.$router.push({ name: "profil" });
    },
    postAnnonces(){
      this.$router.push({ name: "postoffer" });
    },
    getAllOffres: async function(){
      axios
        .get('http://localhost:3042/offres/link?key=challenge')
        //http://localhost:3042/offres/5/link?key=challenge
        .then(response => {
          //console.log(response.data)
          this.offresList = response.data
        })
    },
    getAllOffresNearMe: async function(){
      axios
        .post(`http://localhost:3042/offres/around/link?key=challenge`, {
          data: {
            lat: this.userLat,
            long: this.userLong
          }
        })
        .then(response => {
          console.log(response.data)
          this.offresList = response.data
        })
    },
    getUserPosWithId: async function(id){
      axios
      .get(`http://localhost:3042/clients/${id}/?key=challenge`)
      .then(response => {
        //console.log(response.data.position_LAT);
        //console.log(response.data.position_LONG);
        this.userLat = response.data.position_LAT;
        this.userLong = response.data.position_LONG;
      })
      .then(()=>{
        this.getAllOffresNearMe();
      })
    },
    goContact: function(string) {
      alert('L\'utilisateur a indiqué comme contact :\n'+string) 
    },
    setStateOffre: function(){
      this.state = 'Offre';
    },
    setStateDemande: function(){
      this.state = 'Demande';
    },
  }

//Globalement, pour la mécanique, c'est pas trop trop compliqué
//Faut d'abord que tu fasses un booléen, et selon son état, tes if appeleront l'un ou l'autre
//A toi de voir comment tu fais après ça

//Un mec qui arrive sur le site s'attend plus à avoir des offres en vrai
//Principalement c'est qu'il cherche qqchose, celui qui va pour faire des demandes,
//c'est qu'il cherche à faire qqchose
//ok
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /**display: inline-block;*/
  margin: 0 10px;
}
a {
  color: black;
  margin: 5px 5px 5px 5px; 
}
.button-div {
  text-align: center;
  margin-bottom: 10px;
}
.contact-button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  
  background-color: #53e3a6;
  border: 0;
  padding: 10px 15px;
  color: white;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
.contact-button:hover {
  background-color: #4bce98;
}
.hello {
  background: #50a3a2;
  background: -webkit-gradient(linear, left top, right bottom, from(#50a3a2), to(#53e3a6));
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: -200px;
  overflow: scroll;
  margin: 0;
}

.dashboard-cards {
  position: relative;
  padding-bottom: 50px;
  margin: 0 !important;
}
.dashboard-cards .card {
  background: #ffffff;
  display: inline-block;
  -webkit-perspective: 1000;
          perspective: 1000;
  z-index: 20;
  padding: 0 !important;
  margin: 15px 15px 15px 15px;
  position: relative;
  text-align: left;
  -webkit-transition: all 0.3s 0s ease-in;
  transition: all 0.3s 0s ease-in;
  z-index: 1;
  width: calc(33.33333333% - 10px);
  cursor: pointer;
  transition: all 0.3s ease;
}
.dashboard-cards .card:hover {
  box-shadow: 15px 10px 10px rgba(31, 31, 31, 0.5);
  transition: all 0.3s ease;
}
.dashboard-cards .card .card-title {
  background: #ffffff;
  padding: 10px 15px;
  position: relative;
  z-index: 0;
}
.dashboard-cards .card .card-title h2 {
  font-size: 24px;
  letter-spacing: -0.05em;
  margin: 0;
  padding: 0;
}
.dashboard-cards .card .card-title h2 small {
  display: block;
  font-size: 14px;
  margin-top: 8px;
  letter-spacing: -0.025em;
}
.dashboard-cards .card .card-description {
  position: relative;
  font-size: 14px;
  border-top: 1px solid #ddd;
  padding: 10px 15px 0 15px;
}
.dashboard-cards .card .card-actions {
  box-shadow: 0 2px 0px 0 rgba(0, 0, 0, 0.075);
  padding: 10px;
  text-align: center;
}
.dashboard-cards .card .card-flap {
  background: #d9d9d9;
  position: absolute;
  width: 100%;
  -webkit-transform-origin: top;
          transform-origin: top;
  -webkit-transform: rotateX(-90deg);
          transform: rotateX(-90deg);
}
.dashboard-cards .card .flap1 {
  -webkit-transition: all 0.3s 0.3s ease-out;
  transition: all 0.3s 0.3s ease-out;
  z-index: -1;
}
.dashboard-cards .card .flap2 {
  -webkit-transition: all 0.3s 0s ease-out;
  transition: all 0.3s 0s ease-out;
  z-index: -2;
}
.dashboard-cards.showing .card {
  cursor: pointer;
  opacity: 0.6;
  -webkit-transform: scale(0.88);
          transform: scale(0.88);
}
.dashboard-cards .no-touch .dashboard-cards.showing .card:hover {
  opacity: 0.94;
  -webkit-transform: scale(0.92);
          transform: scale(0.92);
}
.dashboard-cards .card.d-card-show {
  opacity: 1 !important;
  -webkit-transform: scale(1) !important;
          transform: scale(1) !important;
}
.dashboard-cards .card.d-card-show .card-flap {
  background: #ffffff;
  -webkit-transform: rotateX(0deg);
          transform: rotateX(0deg);
}
.dashboard-cards .card.d-card-show .flap1 {
  -webkit-transition: all 0.3s 0s ease-out;
  transition: all 0.3s 0s ease-out;
}
.dashboard-cards .card.d-card-show .flap2 {
  -webkit-transition: all 0.3s 0.2s ease-out;
  transition: all 0.3s 0.2s ease-out;
}
.dashboard-cards .card .task-count {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 22px;
  right: 10px;
  background: #ecf0f1;
  text-align: center;
  line-height: 40px;
  border-radius: 100%;
  color: #333333;
  font-weight: 600;
  transition: all .2s ease;
}


.dashboard-cards .task-list {
	padding: 0 !important;
}
.dashboard-cards .task-list li {
  padding: 10px 0;
  padding-left: 10px;
  margin: 3px 0;
	list-style-type: none;
  border-bottom: 1px solid #e9ebed;
  border-left: 3px solid #f36525;
  transition: all .2s ease;
}
.dashboard-cards .task-list li:hover {
  background: #ecf0f1;
  transition: all .2s ease;
}
.dashboard-cards .task-list li span {
  float: right;
  color: #f36525;
  margin-right: 5px;
}
.dashboard-cards.showing .card.d-card-show .task-count {
  color: #ffffff;
  background: #f36525;
  transition: all .2s ease;
}
.dashboard-cards .card-actions .btn {
	color: #333;
}
.dashboard-cards .card-actions .btn:hover {
	color: #f36525;
}
</style>
