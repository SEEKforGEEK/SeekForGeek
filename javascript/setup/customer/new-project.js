'use strict';

var NewProjectModule = function(settings){
	var options = {
		parse: {
		},
		currentUser: {
		},
		selectors: {
			btnDetailsNext: '#details-next',
			btnDescriptionNext: '#description-next',
			description: '#description',
			payment: '#payment',
			descriptionLink: '#description-link',
			paymentLink: '#payment-link',
			detailsLink: '#details-link',
			btnDone: '#done',
			title: '#title',
			task: '#task',
			datePicker: '#datepicker',
			titleForm: '#describe-title-form',
			taskForm: '#describe-task-form',
			dateForm: '#describe-date-form',
			paymentPrice: '#payment-price',
			paymentEmail: '#payment-email',
			paymentPhone: '#payment-phone',
			paymentPriceForm: '#payment-price-form',
			paymentPhoneForm: '#payment-phone-form',
			paymentEmailForm: '#payment-email-form',
			radioDetails: '#radioDetails',
			picture: '#picture',
			files: '#files',
			projectDetails: '#project-details'
		},
		variables: {
			patternForEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
		}
	},

	initialize = function(){
		jQuery(".navbarTemplate")
			.removeClass("templateNone")
			.addClass("templateOn");
		jQuery("#footerTemplate")
			.removeClass("templateNone")
			.addClass("templateOn");

		date();
		options.parse.currentUser = Parse.User.current();
		options.currentUser.email = options.parse.currentUser.get('email');
		options.currentUser.UserName = options.parse.currentUser.get('username');

		jQuery(options.selectors.paymentEmail).val(options.currentUser.email);
		jQuery(options.selectors.btnDetailsNext).on('click', detailsNext);
		jQuery(options.selectors.btnDescriptionNext).on('click',descriptionNext);
		jQuery(options.selectors.btnDone).on('click', isDone);
	},

	date = function(){
		var dateToday = new Date();
		var dates = jQuery("#datepicker").datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			minDate: dateToday,
			onSelect: function(selectedDate) {
				var option = this.id == "from" ? "minDate" : "maxDate",
					instance = $(this).data("datepicker"),
					date = $.datepicker.parseDate(instance.settings.dateFormat
						|| $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
				dates.not(this).datepicker("option", option, date);
			}
		});
	},

	detailsNext = function(){
		jQuery(options.selectors.descriptionLink).attr('href', options.selectors.description)
			.attr('data-toggle', 'tab')
			.attr('aria-expanded', true)
			.addClass('tabs');
		jQuery(options.selectors.projectDetails).css('display','none');
		jQuery(options.selectors.descriptionLink).trigger('click');
		jQuery(options.selectors.detailsLink).removeAttr('href')
			.removeAttr('aria-expanded')
			.removeAttr('data-toggle');

	},

	descriptionNext = function(){
		if (validateDetails()) {
			jQuery(options.selectors.paymentLink).attr('href', options.selectors.payment)
				.attr('data-toggle', 'tab')
				.attr('aria-expanded', true)
				.addClass('tabs');

			jQuery(options.selectors.paymentLink).trigger('click');

			jQuery(options.selectors.descriptionLink).removeAttr('href')
				.removeAttr('aria-expanded')
				.removeAttr('data-toggle')
				.removeClass('tabs');
		}
	},

	isDone = function(){
		if (validatePayment()) {
			sendData();
		}
	},

	validateDetails = function(){
		var title = jQuery(options.selectors.title).val();
		var task = jQuery(options.selectors.task).val();
		var	date = jQuery(options.selectors.datePicker).val();
		var titleForm = jQuery(options.selectors.titleForm);
		var taskForm = jQuery(options.selectors.taskForm);
		var dateForm = jQuery(options.selectors.dateForm);
		if (title == '') {
			if (titleForm.hasClass('has-success')) {
				titleForm.removeClass('has-success');
			}
			titleForm.addClass('has-error');
			return false;
		}else{
			if (titleForm.hasClass('has-error')) {
				titleForm.removeClass('has-error');
			}
			titleForm.addClass('has-success');
		}
		if (task == '') {
			if (taskForm.hasClass('has-success')) {
				taskForm.removeClass('has-success');
			}
			taskForm.addClass('has-error');
			return false;
		}else{
			if (taskForm.hasClass('has-error')) {
				taskForm.removeClass('has-error');
			}
			taskForm.addClass('has-success');
		}
		if (date == '') {
			if (dateForm.hasClass('has-success')) {
				dateForm.removeClass('has-success');
			}
			dateForm.addClass('has-error');
			return false;
		}else{
			if (dateForm.hasClass('has-error')) {
				dateForm.removeClass('has-error');
			}
			dateForm.addClass('has-success');
		}
		return true;
	},

	validatePayment = function() {
		var price = jQuery(options.selectors.paymentPrice).val();
		var email = jQuery(options.selectors.paymentEmail).val();
		var phone = jQuery(options.selectors.paymentPhone).val();
		var priceForm = jQuery(options.selectors.paymentPriceForm);
		var emailForm = jQuery(options.selectors.paymentEmailForm);
		var phoneForm = jQuery(options.selectors.paymentPhoneForm);
		var patternForEmail = options.variables.patternForEmail;

		if (price == '' && parseInt(price) < 0) {
			if (priceForm.hasClass('has-success')) {
				priceForm.removeClass('has-success');
			}
			priceForm.addClass('has-error');
			return false;
		}else{
			if (priceForm.hasClass('has-error')) {
				priceForm.removeClass('has-error');
			}
			priceForm.addClass('has-success');
		}
		if (!email.match(patternForEmail)) {
			if (emailForm.hasClass('has-success')) {
				emailForm.removeClass('has-success');
			}
			emailForm.addClass('has-error');
			return false;
		}else{
			if (emailForm.hasClass('has-error')) {
				emailForm.removeClass('has-error');
			}
			emailForm.addClass('has-success');
		}
		if (phone == '') {
			if (phoneForm.hasClass('has-success')) {
				phoneForm.removeClass('has-success');
			}
			phoneForm.addClass('has-error');
			return false;
		}else{
			if (phoneForm.hasClass('has-error')) {
				phoneForm.removeClass('has-error');
			}
			phoneForm.addClass('has-success');
		}
		return true;
	},

	sendData = function() {
		var details = {
			title: jQuery(options.selectors.title).val(),
			task: jQuery(options.selectors.task).val(),
			date: jQuery(options.selectors.datePicker).val(),
			type: jQuery('input[name=radioButtons]:checked', options.selectors.radioDetails).val(),
			price: jQuery(options.selectors.paymentPrice).val(),
			phone: jQuery(options.selectors.paymentPhone).val(),
			email: jQuery(options.selectors.paymentEmail).val()
		};
		var fileUploadControl = jQuery(options.selectors.picture)[0];

		if (fileUploadControl.files.length > 0) {
			var file = fileUploadControl.files[0];
			var name = 'picture.png';

			var parseFile = new Parse.File(name, file);
			parseFile.save()
				.then(function() {
					var fileUploadControlFiles = jQuery(options.selectors.files)[0];
					if (fileUploadControlFiles.files.length > 0) {
						var files = fileUploadControlFiles.files[0];
						var nameFiles = "project-files.zip";
						var parseFiles = new Parse.File(nameFiles, files);
						parseFiles.save()
							.then(function(){
								var Projects = new Parse.Object("Projects");
								Projects.set("title", details.title);
								Projects.set('task', details.task);
								Projects.set('endDate', details.date);
								Projects.set('type', details.type);
								Projects.set('price', parseInt(details.price));
								Projects.set('phone', details.phone);
								Projects.set("picture", parseFile);
								Projects.set('files', parseFiles);
								Projects.set('owner', options.currentUser.UserName);
								Projects.set('ownerEmail', details.email);
								Projects.save();
								toastr.success('You successfully create new project!');
								jQuery(location).attr('href','/#/customer/projects');
							},
							function(){
								toastr.error('Something happen, please try later!');
							});
					}
				}, function() {
					toastr.error('Something happen, please try later!');
				});
		}
	};

	return{
		initialize: initialize
	};

};

jQuery(document).ready(function(){
	NewProjectModule().initialize();
});
