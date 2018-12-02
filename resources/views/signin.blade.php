<!DOCTYPE html>
<html>
	<head>
		<title>Login</title>
		<script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
		<script src="{{asset('js/bootstrap.js')}}"></script>
		<script src="{{asset('js/global.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/global.css')}}">
	</head>
	<body>
		<div align='center'>
			<div class="col-md-10" style="padding-top:10%;max-width:300px;">
				<div class="sig_box">
					<form method='post' action='/signin'>
						{{csrf_field()}}
						<div class="form-group">
							<label for="user_fname">First name</label><br>
							<input type="text" id="user_fname" name="user_fname" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_lname">Last name</label><br>
							<input type="text" id="user_lname" name="user_lname" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_email">Email address</label><br>
							<input type='text' id="user_email" name="user_email" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_phone">Phone number</label><br>
							<input type="password" id="user_phone" name="user_phone" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_pass">Password</label><br>
							<input type="password" id="user_pass" name="user_pass" placeholder="">
						</div>
						<button type="submit" class="btn btn-primary btn-sm">Sign in</button>
					</form>
					<br/>
					<form method='get' action='/'>
						<button type="submit" class="btn btn-primary btn-sm">Back</button>
					</form>
					<div class="message_holder">
						@if(Session::has('login_mess'))
						    {{ Session::get('login_mess') }}
						@else
							<br/>
						@endif
					</div>
				</div>
			</div>
		</div>
	</body>
</html>