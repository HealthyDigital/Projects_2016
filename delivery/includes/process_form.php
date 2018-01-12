<?php
if(!empty($_POST)) {
	$deliveryData = array();
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$delivery_date = $_POST['deliveryDate'];
	$delivery_time = $_POST['deliveryTime'];
	$user_state = $_POST['deliveryState'];
	$contact_service = $_POST['contactService'];
	$contact_email = $_POST['contactEmail'];
	$contact_phone = $_POST['phoneNumber'];
	$instructions = $_POST['instructions'];
	////include only non-empty fields
	empty($firstname) ?: $deliveryData['firstname'] = $firstname;
	empty($lastname) ?: $deliveryData['lastname'] = $lastname;
	empty($delivery_date) ?: $deliveryData['deliveryDate'] = $delivery_date;
	empty($delivery_time) ?: $deliveryData['deliveryTime'] = $delivery_time;
	empty($user_state) ?: $deliveryData['deliveryState'] = $user_state;
	empty($contact_service) ?: $deliveryData['contactService'] = $contact_service;
	empty($contact_email) ?: $deliveryData['contactEmail'] = $contact_email;
	empty($contact_phone) ?: $deliveryData['phoneNumber'] = $contact_phone;
	empty($instructions) ?: $deliveryData['instructions'] = $instructions;
	
	if(count($deliveryData) > 7) {
		require_once('./calendar.php');
		echo $user_state.'<br>';
		////print date('d M Y', strtotime($deliveryData['deliveryDate']));
		////create delivery calendar
		$delivery = new Delivery(date('d M Y', strtotime($deliveryData['deliveryDate'])), $deliveryData['deliveryState']);
		$delivery->create_calendar();
	}else {
		
	}

}