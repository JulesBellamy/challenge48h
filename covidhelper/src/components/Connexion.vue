<template>
<div class="wrapper">
	<div class="container">
    <img class="logo" src="./../assets/covid_helper.png">
		
		<form class="form">
      <a href='#' class="unavailable" v-on:click="reloadGeo()">{{ msg }}</a>
			<input type="text" placeholder="Email">
			<input type="password" placeholder="Mot de passe">
			<button type="submit" id="login-button" v-on:click="goConnect()">Connexion</button>
      <br/><br/><hr/><br/>
      <a href="#" v-on:click="goInscription()">Inscription</a>
		</form>
	</div>
	
	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>


    <b-modal ref="my-modal" hide-footer ok-only ok-variant="secondary" ok-title="Cancel">
      <div slot="modal-title">
      </div>
      <div class="d-block text-center">
<div class="login-wrap">
  <div class="closeModal">
    <a href="#" class="closeText" v-on:click="hideModal()">Fermer la fenêtre</a>
  </div>
	<div class="login-html">
		<input id="tab-2" type="radio" name="tab" class="sign-up" checked><label for="tab-2" class="tab">Création de compte</label>
		<div class="login-form">
			<div class="sign-up-htm">
        <p class="displayMessageError">{{ displayMessageError }}</p>
				<div class="group">
					<label for="firstname" class="label">Prénom</label>
					<input id="firstname" type="text" class="input" v-model="prenom" placeholder="Entrez votre prénom">
				</div>
				<div class="group">
					<label for="lastname" class="label">Nom</label>
					<input id="lastname" type="text" class="input" v-model="nom" placeholder="Entrez votre nom">
				</div>
				<div class="group">
					<label for="mail" class="label">Adresse mail</label>
					<input id="mail" type="text" class="input" v-model="email" placeholder="Entrez votre adresse mail">
				</div>
				<div class="group">
					<label for="pass" class="label">Mot de passe</label>
					<input id="pass" type="password" class="input" v-model="password" placeholder="Entrez votre mot de passe">
				</div>
        <div class="group">
					<label for="passverif" class="label">Répétez le mot de passe</label>
					<input id="passverif" type="password" class="input" v-model="passverif" placeholder="Répétez votre mot de passe ici">
				</div>
        <div class="group">
					<label for="contact" class="label">Contact</label>
					<input id="contact" type="text" class="input" v-model="contact" placeholder="Entrez ici un moyen de vous contacter (téléphone, point de RDV, etc ...)">
				</div>
        <div class="group">
					<label for="city" class="label">Ville</label>
					<input id="city" type="text" class="input" v-model="ville" placeholder="Entrez le nom de votre ville">
				</div>
        <div class="group">
					<label for="cp" class="label">Code postal</label>
					<input id="cp" type="text" class="input" v-model="code_postal" placeholder="Entrez votre code postal">
				</div>
        <div class="group">
					<label for="rue" class="label">Rue</label>
					<input id="rue" type="text" class="input" v-model="rue" placeholder="Entrez votre rue">
				</div>
				<div class="hr"></div>
        <div class="group">
					<a href="#" class="button submitform" v-on:click="createAccount()">Inscription</a>
				</div>
			</div>
		</div>
	</div>
</div>
      </div>

    </b-modal>

</div>
</template>

<script>
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vue from "vue";
import axios from "axios";

Vue.use(BootstrapVue);

export default {
  name: 'connexion',
  data () {
    return {
      email: '',
      nom: '',
      prenom: '',
      contact: '',
      ville: '',
      code_postal: '',
      rue: '',
      password: '',
      passverif: '',
      lat: '',
      lon: '',
      msg: '',
      displayMessageError: ''
    }
  },
  mounted() {
      this.getCity();
  },
  methods: {
    goConnect: function() {
      this.$router.push({ name: "menu" });
    },
    goInscription: function() {
      this.$refs["my-modal"].show();
    },
    hideModal: function() {
      this.$refs["my-modal"].hide();
    },
    createAccount: function() {
      this.displayMessageError = "";
      if(this.lat == "" || this.lon == ""){
        alert("La géolocalisation n'est pas activé.")
        this.displayMessageError =
          this.displayMessageError +
          "La géolocalisation n'est pas activé.";             
      }
      else if(this.email == "" || this.nom == "" || this.prenom == "" || this.contact == "" || this.ville == "" || this.rue == "" || this.code_postal == "" || this.password == ""){
        alert("Remplissez tout les champs.")
        this.displayMessageError =
          this.displayMessageError +
          "Remplissez tout les champs.";        
      }
      else if (this.password != this.passverif) {
        alert("Votre mot de passe et sa confirmation ne concordent pas.")
        this.displayMessageError =
          this.displayMessageError +
          "Votre mot de passe et sa confirmation ne concordent pas.";
      } else {
      axios
        .post(`http://localhost:3042/clients?key=challenge`, {
          data: {
            email: this.email,
            nom: this.nom,
            prenom: this.prenom,
            contact: this.contact,
            ville: this.ville,
            code_postal: this.code_postal,
            rue: this.rue,
            position_LAT: this.lat,
            position_LONG: this.lon,
            password: this.password
          }
        })
        .then(response => {
          console.log(response.data);
          alert(response.data)
          if (response.data == false) {
            this.msg =
              "Erreur lors de la création.";
          } else {
            alert("Création de l'utilisateur effectuée !");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    getCity: function() {
      if (navigator.geolocation) {
      this.idGeo = navigator.geolocation.watchPosition(this.tellPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
      if(this.lat == "" || this.lon == ""){
        this.msg = "Cette application a besoin de votre localisation."
      }
    },
    reloadGeo: function(){
      alert("Dans votre barre de recherche, cliquez sur le bouton de géolocalisation pour autoriser l'application.")
      alert("Si le message disparait sur l'écran d'accueil, c'est que votre localisation est activée !")
    },
    tellPosition: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
      this.msg = ''
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  width: 300px;
  z-index:99;
}
.submitform{
  text-align: center;
}
.displayMessageError{
  color: red;
}
.closeModal {
  width: 99%;
  position: fixed;
  z-index: 100;
  background: rgb(40, 57, 98);
  height: 4%;
  margin-top: -1%;
  text-align: center;
}
.closeText {
  background: rgb(40, 57, 98);
  color: white;
  padding: 7px 27em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: 2px;
  border-radius: 20px;
}
.closeText:hover, .closeText:active {
  background-color: #79A9D1;
  color: white;
   transition-duration: .5s;
}
hr{
  border: 1px solid #53e3a6;
  width: 250px;
  margin: 0 auto 10px auto;
  border-radius: 5px;
}
a{
  color: #004E64;
}
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 200;
  src: local('Source Sans Pro ExtraLight'), local('SourceSansPro-ExtraLight'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf) format('truetype');
}
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 300;
  src: local('Source Sans Pro Light'), local('SourceSansPro-Light'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf) format('truetype');
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #50a3a2;
  background: -webkit-gradient(linear, left top, right bottom, from(#50a3a2), to(#53e3a6));
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: -200px;
  overflow: hidden;
  margin: 0;
}
.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
          transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
          transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
  font-weight: 200;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 15s infinite;
  animation: square 15s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 10s;
          animation-delay: 10s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}

/** MODAL STYLE */

.login-wrap{
	width:100%;
	margin:0;
	max-width:100%;
	min-height:670px;
  position:relative;
  margin-top: -50%;
}
.login-html{
	width:99%;
	height:87%;
	position:fixed;
	padding:90px 70px 50px 70px;
  background:rgba(40,57,101,.9);
  overflow-y: scroll;
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
	top:0;
	left:0;
	right:0;
	bottom:0;
	position:absolute;
	transform:rotateY(180deg);
	backface-visibility:hidden;
	transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
	color:#fff;
	border-color:#1161ee;
}
.login-form{
	min-height:345px;
	position:relative;
	perspective:1000px;
	transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .input,
.login-form .group .button{
	border:none;
	padding:15px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}
.login-form .group input[data-type="password"]{
	text-security:circle;
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
}
.login-form .group .button{
	background:#1161ee;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check:checked + label .icon{
	background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
	transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
	transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
	transform:rotate(0);
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}
</style>
