$(document).ready(function(){
	$("#navbarTemplate").css("display","none");

	$('#loginInRegister').click(loginInRegister);
	$('#registerInLogin').click(registerInLogin);
	$('#btnForgotPass').click(registerInLogin);

	$('#registerButton').click(registerForm);
	$('#register-customer').click(registerFormCustomer);
	$('#register-geek').click(registerFormGeek);


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

		if(registerData.type === 'geek'){
			var Geek = Parse.Object.extend('Geek');

			var newGeek = new Geek();
			newGeek.set('username', registerData.username);
			newGeek.set('email', registerData.email);
			newGeek.set('password', registerData.password);
			newGeek.set('type', registerData.type);

			newGeek.save()
				.then(function(){
					alert('New Geek is created!');
				});
		}else{
			var Customer = Parse.Object.extend('Customer');

			var newCustomer = new Customer();
			newCustomer.set('username', registerData.username);
			newCustomer.set('email', registerData.email);
			newCustomer.set('password', registerData.password);
			newCustomer.set('type', registerData.type);

			newCustomer.save()
				.then(function(){
					alert('New Customer is created!');
				});
		}

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

function registerFormCustomer(){
	$("#register-button").trigger("click");
	$("#register-hire").prop("checked",true);
}
function registerFormGeek(){
	$("#register-button").trigger("click");
	$("#register-work").prop("checked",true);
}