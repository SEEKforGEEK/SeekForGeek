$(document).ready(function(){
	$("#navbarTemplate").css("display","none");

	$('#loginInRegister').click(loginInRegister);
	$('#registerInLogin').click(registerInLogin);
	$('#btnForgotPass').click(registerInLogin);


});

function loginInRegister(){
	$("#closeRegister").trigger("click");
}
function registerInLogin(){
	$("#closeLogIn").trigger("click");
}
