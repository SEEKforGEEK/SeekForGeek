$(document).ready(function(){
	$("#navbarTemplate").css("display","none");

	$('#loginInRegister').click(loginInRegister);
	$('#registerInLogin').click(registerInLogin);
	$('#btnForgotPass').click(registerInLogin);

	$('#registerButton').click(registerForm);


});

function loginInRegister(){
	$("#closeRegister").trigger("click");
}
function registerInLogin(){
	$("#closeLogIn").trigger("click");
}
function registerForm(){

	var type;
	if($('#register-hire').is(':checked')){
		type = 'customer';
	}
	if($('#register-work').is(':checked')) {
		type = 'geek';
	}

	var registerData = {
		email: $('#register-email').val(),
		username:  $('#register-username').val(),
		password: $('#register-pass').val(),
		type: type
	};

	if(validateRegisterForm(registerData)){
		//todo save in parse.com
	}else{
		//todo
	}
}

function validateRegisterForm(registerData){
	var patternForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	var confirmPassword = $("#register-conf-pass").val();

	if(!registerData.email.match(patternForEmail) || registerData.username.length < 6){
		//todo red div
		return false;
	}
	if(registerData.password.length < 6){
		return false;
	}
	if(registerData.type != 'customer' && registerData.type != 'geek'){
		return false;
	}
	if(registerData.password !== confirmPassword){
		return false;
	}
	return true;
}