<!DOCTYPE html>
<html>
	<head>
		<title>Welcome</title>
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
		<script src="{{asset('js/bootstrap.js')}}"></script>
		<script src="{{asset('js/login.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/global.css')}}">
	</head>
	<body>
		<div align='center'>
			<div class="col-md-10" style="padding-top:10%;max-width:400px;">
				<div class="first_box">
					<button type="button" class="btn btn-primary btn-lg" onclick="showLogin()">Log in</button>
					<br/><br/>
					<button type="button" class="btn btn-primary btn-lg" onclick="showSignin()">Sign in</button>
				</div>
				
				<div class="log_box" style="display:none;">
					<form>
						{{csrf_field()}}
						<div class="form-group">
							<label for="user_email">Email</label><br>
							<input type='text' id="user_email" name="user_email" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_pass">Password</label><br>
							<input type="password" id="user_pass" name="user_pass" placeholder="">
						</div>
						<button type="button" class="btn btn-primary btn-sm" onclick="loginSub()">Log in</button>
						<button type="button" class="btn btn-primary btn-sm" onclick="backToChosse()">Back</button>
					</form>
					<div class="message_holder">
					</div>
				</div>
			
				<div class="sig_box" style="display:none;">
					<form>
						{{csrf_field()}}
						<div class="form-group">
							<label for="user_fname_s">First name</label><br>
							<input type="text" id="user_fname_s" name="user_fname_s" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_lname_s">Last name</label><br>
							<input type="text" id="user_lname_s" name="user_lname_s" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_email_s">Email address</label><br>
							<input type='text' id="user_email_s" name="user_email_s" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_phone_s">Phone number</label><br>
							<input type="text" id="user_phone_s" name="user_phone_s" placeholder="">
						</div>
						<div class="form-group">
							<label for="user_pass_s">Password</label><br>
							<input type="password" id="user_pass_s" name="user_pass_s" placeholder="">
						</div>
						<button type="button" id="sign_b" class="btn btn-primary btn-sm" onclick="signIn()">Sign in</button>
						<button type="button" class="btn btn-primary btn-sm" onclick="backToChosse()">Back</button>
					</form>
					<div class="message_holder">
						@if(Session::has('signin_mess'))
						    {{ Session::get('signin_mess') }}
						@else
							<br/>
						@endif
					</div>
				</div>
			
			</div>
		</div>
	</body>
</html>