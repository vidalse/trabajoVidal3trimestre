/* 
web o pagina: JavaScript / jQuery
autor: Vidal Segura
fecha: Marzo 2021
*/


function irAtras(){
	window.history.back();
}



function ponerModo(opcion){
		// obtengo el modo que se está aplicando con Jquery y
		// hago los cambios y lo registro en la variable modo
		var modoActual;
		var modoFuturo;
		
		
		if(opcion == "") {
			modoActual = $(':root').css('--modo');
		}
		
		if (modoActual=="noche") {
			$(':root').css("--color", $(':root').css('--colorDia'));
			$(':root').css("--colorBg", $(':root').css('--colorBgDia'));
			$(':root').css("--modo", "dia");
			modoActual = "dia";
			modoFuturo = "noche";
		}
		else {
			$(':root').css("--color", $(':root').css('--colorNoche'));
			$(':root').css("--colorBg", $(':root').css('--colorBgNoche'));
			$(':root').css("--modo", "noche");
			modoActual = "noche";
			modoFuturo = "dia";
		}

		$(':root').css("color",$(':root').css('--color'));
		$(':root').css("background-color",$(':root').css('--colorBg'));
		$('#modo').text();
		$('#mensajeBoton').text('VISION: '+modoActual + ', si desea cambiar a visión: '+modoFuturo+', haga click.');

	}

	function cambiar(){
		// obtengo el modo que se está aplicando con Jquery y
		// hago los cambios y lo registro en la variable modo
		if ($(':root').css('--modo')=="noche") {
			$(':root').css("--color", $(':root').css('--colorDia'));
			$(':root').css("--colorBg", $(':root').css('--colorBgDia'));
			$(':root').css("--modo", "dia");
			$('#mensajeBoton').text('Cambiar a modo Noche');
		}
		else {
			$(':root').css("--color", $(':root').css('--colorNoche'));
			$(':root').css("--colorBg", $(':root').css('--colorBgNoche'));
			$(':root').css("--modo", "noche");
			$('#mensajeBoton').text('Cambiar a modo Dia');		
		}

		$(':root').css("color",$(':root').css('--color'));
		$(':root').css("background-color",$(':root').css('--colorBg'));
		

	}



	function cambiarJS(){
		// obtengo el modo que se está aplicando
		var bodyStyles = window.getComputedStyle(document.body);
		
		// hago los cambios y lo registro en la variable modo
		if (bodyStyles.getPropertyValue('--modo')=="noche") {
			document.body.style.setProperty('--color', bodyStyles.getPropertyValue('--colorDia'));
			document.body.style.setProperty('--colorBg', bodyStyles.getPropertyValue('--colorBgDia'));
			document.body.style.setProperty('--modo', "dia");
			$('#mensajeBoton').text('Cambiar a modo Noche');
		}
		else {
			document.body.style.setProperty('--color', bodyStyles.getPropertyValue('--colorDiaNoche'));
			document.body.style.setProperty('--colorBg', bodyStyles.getPropertyValue('--colorBgNoche'));
			document.body.style.setProperty('--modo', "noche");
			$('#mensajeBoton').text('Cambiar a modo Dia');		
		}
		

	}



$(document).ready(function(){

	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		}
	});

});

function contClicks(){
  if(typeof(Storage) !== "undefined") {

    if (sessionStorage.clickcount) {
      sessionStorage.clickcount = Number(sessionStorage.clickcount)+1;
    } else {
      sessionStorage.setItem("clickcount",1);
    }
$("#contador").text('Has cargado '+sessionStorage.clickcount+' veces la pagina');
}}


let usrIntentando = "";
let claveIntentando = "";

function controlar(){
	$("#ingresar").show();
	$("#desconectar").hide();
			
	if (sessionStorage.getItem("usuarioLogueado")) {
		$("#ingresar").hide();
		$("#desconectar").show();	
		
	} else {
		if (sessionStorage.getItem("usuarioIntentando")) {
			validarXML();
			for(let timer=1;timer<1000000;timer++);
			location.reload();
			
		} else {
			$("#ingresar").show();
			$("#desconectar").hide();
		}
	}
}
	
	function intentar(){
		if (typeof(Storage) !== "undefined") {
		  
		  $("#ingresar").hide();
		  var x=document.forms["miFormulario"]["formUsuario"].value;
		  var y=document.forms["miFormulario"]["formClave"].value;
		  sessionStorage.setItem("usuarioIntentando", x);
		  sessionStorage.setItem("claveIntentando", y);
		  

		} else {
		  document.getElementById("mensaje").innerHTML = "Este navegador no soporta web storage...";
		}
	}
	
	function validarXML() {
		
		usuarioIntentando=sessionStorage.getItem("usuarioIntentando");
		claveIntentando=sessionStorage.getItem("claveIntentando");
		sessionStorage.removeItem("usuarioIntentando");
		sessionStorage.removeItem("claveIntentando");
		

		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://vidalse.github.io/trabajoVidal3trimestre/proyecto/xml/registrados.xml", true);
		xhr.responseType = 'document';
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				miFuncion(this);
			}
		};
		xhr.send();
	}

	function miFuncion(xml) {
	  var i;
	  var usrNom;
	  var usrPsw;
	  var usuario = [];
	  var xmlDoc = xml.responseXML;
	  var x = xmlDoc.getElementsByTagName("usuario");
	  sessionStorage.removeItem("usuarioLogueado");
	  
	  for (i = 0; i <x.length; i++) { 
		
		usrNom = x[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
		usrPsw = x[i].getElementsByTagName("clave")[0].childNodes[0].nodeValue;
		
		if ((usrNom == usuarioIntentando) && (usrPsw == claveIntentando)) {
		
		  sessionStorage.setItem("usuarioLogueado",usuarioIntentando);
		}
	  }
	}

	function desconectar(){
		sessionStorage.removeItem("usuarioLogueado");
		sessionStorage.removeItem("usuarioIntentando");
		sessionStorage.removeItem("claveIntentando");
		location.reload();
	}
	
	
