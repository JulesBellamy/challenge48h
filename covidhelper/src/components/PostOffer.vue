<template>
  <div class="hello">
    <h1>Bienvenue</h1>
    <a href="#" v-on:click="goProfil()">Vers le profil</a> |
    <a href="#" v-on:click="goAnnonces()">Retour annonces</a>

    <p>Vous voulez publier une demande ou une offre ?</p>

<div>
  <input type="radio" id="offre" name="spec" value="huey"
     checked>
  <label for="offre">Offre</label>
</div>

<div>
  <input type="radio" id="dewey" name="spec" value="">
  <label for="dewey">Demande</label>
</div>


 <!--   
    <div class="form-group">
    <br />
      <select v-model="character.theidClass">
      <label for="lg_class" class="sr-only">
      Classe du personnage</label>
      <option disabled value="">Choisir une classe</option>
        <option
        v-for="oneclass in univclasses"
        :value="oneclass.idClass"
        class="form-control"
        id="lg_class"
        name="lg_class"
        v-bind:key="oneclass.idClass"
        placeholder="Type de personnage"
        >
        {{ oneclass.name }}
        </option>
      </select>
-->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  
  name: 'PostOffer',
  data () {
    return {
      profil: '',
      listCategOff: ''
    }
  },
  mounted(){
    this.getSpecial();
  },
  methods: {
    goAnnonces(){
      this.$router.push({ name: "menu" });
    },
    goProfil(){
      this.$router.push({ name: "profil" });
    },
    getSpecial(){
      axios
        .get(`http://localhost:3042/categories?key=challenge`)
        .then(response => {
          console.log(response.data)
          this.listCategOff = response.data
          this.listCategDem = response.data
          console.log("ALL OFF",this.listCategOff)
      })
    }
  }
  
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

/* Profile box */

.member-box {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    max-width: 300px;
    margin: 100px auto;
    font-family: 'Raleway', sans-serif;
    background-color: whitesmoke;
}
.member-box .shape {
    width: 200px;
    height: 200px;
    background: var(--primary);
    opacity: 0.2;
    position: absolute;
    top: 0;
    right: -100px;
    transform: rotate(45deg);
}

.member-box .card-img-top {
    position: relative;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin: 20px auto;
    text-align: center;
    box-shadow: 0px 0px 0px 8px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.3s ease;
}

.member-box:hover .card-img-top {
    box-shadow: 0px 0px 0px 12px rgba(0, 0, 0, 0.1)
}

.member-box .member-degignation {
    color: var(--green);
}

.member-box .member-title {
    
}

.member-box small {
    font-size: 12px;
}

.member-box .social a {
    font-size: 15px;
    color: var(--green);
    padding: 10px;
}

.member-box .card-footer {
    background-color: transparent;
    border: 0;
}
</style>
