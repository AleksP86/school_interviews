<!DOCTYPE html>
<html>
	<head>
		<title>Welcome <?php echo Session::get('user'); ?></title>
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
		<script src="{{asset('js/bootstrap.js')}}"></script>
		<script src="{{asset('js/global.js')}}"></script>
		<script src="{{asset('js/layouts.js')}}"></script>
		<link rel="stylesheet" href="{{asset('css/global.css')}}">
	</head>
	<body>
		<div class="col-md-12" id="nav_div" style="margin-top:10px;">
			<nav>
				<div align="right">
					<button class="btn btn-primary btn-sm" onclick='logout()'>Logout</button>
				</div>
			</nav>
		</div>
		<div class="col-md-12" id="main_div_1">
		</div>
		<br/>
		<div class="col-md-12" id="main_div_2" style=";margin-top:-10px;">
			<div class="col-md-12" id="placeholder_div">
			</div>
		</div>
		<div id="update_data_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
				<div class="modal-header" align='right'>  
					<h4 class="modal-title">Edit user data</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div class="modal-body">  
					<form method="post" id="update_form">  
						<label>First name</label>  
						<input type="text" name="m_fname" id="m_fname" class="form-control" />  
						<br />  
						<label>Last name</label>  
						<input type="text" name="m_lname" id="m_lname" class="form-control"/>  
						<br/>
						<label>Email</label>  
						<input type="text" name="m_email" id="m_email" class="form-control" />  
						<br />
						<label>Phone number</label>  
						<input type="text" name="m_phone" id="m_phone" class="form-control"/>  
						<br />
						<label>Type</label>  
						<select name="m_type" id="m_type" class="form-control">  
						</select>  
						<br />
						<label>Status</label>  
						<select name="m_status" id="m_status" class="form-control">  
							<option value=1>Active</option>
							<option value=0>Inactive</option>
						</select>  
						<br />
						<input type="hidden" name="employee_id" id="employee_id" />  
						<input type="button" name="m_update" id="m_update" value="Update" class="btn btn-success" onclick="UpdateModal()"/>
						<span class="m_wait"></span>
					</form>  
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
				</div>  
				</div>  
			</div>  
		</div>

		<div id="add_data_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
				<div class="modal-header" align='right'>
					<h4 class="modal-title">Create new user</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div class="modal-body">  
					<form method="post" id="update_form">  
						<label>First name</label>  
						<input type="text" name="m_fname_add" id="m_fname_add" class="form-control" />  
						<br />  
						<label>Last name</label>  
						<input type="text" name="m_lname_add" id="m_lname_add" class="form-control"/>  
						<br/>
						<label>Email</label>  
						<input type="text" name="m_email_add" id="m_email_add" class="form-control" />  
						<br />
						<label>Phone number</label>  
						<input type="text" name="m_phone_add" id="m_phone_add" class="form-control"/>  
						<br />
						<label>Password</label>  
						<input type="password" name="m_pass_add" id="m_pass_add" class="form-control"/>  
						<br />
						<label>Type</label>  
						<select name="m_type_add" id="m_type_add" class="form-control">  
						</select>  
						<br />
						<label>Status</label>  
						<select name="m_status_add" id="m_status_add" class="form-control">  
							<option value=1>Active</option>
							<option value=0 selected>Inactive</option>
						</select>  
						<br />
						<input type="button" name="m_insert_user" id="m_insert_user" value="Insert" class="btn btn-success" onclick="InsertDataModal()"/>
						<span class="m_wait"></span>
					</form>  
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
				</div>  
				</div>  
			</div>  
		</div>

		<div id="delete_user_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
					<div class="modal-header" align='right'>
						<h4 class="modal-title">Deleting user</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>  
					</div>  
					<div class="modal-body"> 
						<p>Are you sure you want to delete this user?</p>
						<input type="hidden" name="delete_employee_id" id="delete_employee_id" />
						<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="DeleteUserConfirmed()">Delete</button>
						<button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>  
					</div>
				</div>  
			</div>  
		</div>

		
		<div id="update_interview_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
				<div class="modal-header" align='right'>  
					<h4 class="modal-title">Edit interview type data</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div class="modal-body">  
					<form method="post" id="update_form">  
						<label>Name</label>
						<input type="text" name="m_i_name_upd" id="m_i_name_upd" class="form-control" />
						<br />
						<label>Status</label>
						<select name="m_i_status_upd" id="m_i_status_upd" class="form-control">
							<option value=1>Active</option>
							<option value=0 selected>Inactive</option>
						</select>
						<br />
						<label>Description</label>
						<textarea class="form-control" name="m_i_desc_upd" id="m_i_desc_upd"></textarea>
						<br />
						<input type="hidden" name="m_i_id" id="m_i_id" />
						<input type="button" name="m_i_update" id="m_i_update" value="Update" class="btn btn-success" onclick="UpdateInterviewModal()"/>
						<span class="m_wait"></span>
					</form>  
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
				</div>  
				</div>  
			</div>  
		</div>
		
		
		<div id="add_interview_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
				<div class="modal-header" align='right'>
					<h4 class="modal-title">Create new interview type</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>  
				</div>  
				<div class="modal-body">  
					<form method="post" id="update_form">  
						<label>Name</label>
						<input type="text" name="m_i_name_add" id="m_i_name_add" class="form-control" />
						<br />
						<label>Status</label>
						<select name="m_i_status_add" id="m_i_status_add" class="form-control">
							<option value=1>Active</option>
							<option value=0 selected>Inactive</option>
						</select>
						<br />
						<label>Description</label>
						<textarea class="form-control" name="m_i_desc_add" id="m_i_desc_add"></textarea>
						<br />
						<input type="button" name="m_i_insert" id="m_i_insert" value="Insert" class="btn btn-success" onclick="InsertInterviewModal()"/>
						<span class="m_wait"></span>
					</form>  
				</div>  
				<div class="modal-footer">  
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
				</div>  
				</div>  
			</div>  
		</div>

		<div id="delete_interview_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
					<div class="modal-header" align='right'>
						<h4 class="modal-title">Deleting interview type</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>  
					</div>
					<div class="modal-body">
						<p>Are you sure you want to delete this interview type?</p>
						<input type="hidden" name="delete_interview_id" id="delete_interview_id" />
						<button type="button" class="btn btn-danger" data-dismiss="modal" onclick="DeleteInterviewTypeConfirmed()">Delete</button>
						<button type="button" class="btn btn-success" data-dismiss="modal">Cancel</button>  
					</div>
				</div>  
			</div>  
		</div>

		<div id="staff_refusal_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
					<div class="modal-header" align='right'>
						<h4 class="modal-title">Refusing interview</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>  
					</div>
					<div class="modal-body">
						<p>Please write reason for interview refusal.</p>
						<textarea class="form-control" name="m_i_refuse" id="m_i_refuse"></textarea>
						<br />
						<input type="hidden" name="refuse_interview_id" id="refuse_interview_id" />
						<button type="button" class="btn btn-warning" data-dismiss="modal" onclick="Refuse()">Refuse</button>
						<button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>  
					</div>
				</div>  
			</div>  
		</div>

		<div id="request_time_Modal" class="modal fade">  
			<div class="modal-dialog">  
				<div class="modal-content">  
					<div class="modal-header" align='right'>
						<h4 class="modal-title">Request interview</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>  
					</div>
					<div class="modal-body">
						<p>Do you wish to schedule an interview at this time?</p>
						<p name="int_time" id="int_time"></p><span name="int_date" id="int_date"></span>
						<form>
							<label>Interview type</label>  
							<select name="r_type_time" id="r_type_time" class="form-control">  
							</select>  
							<br />
							<input type="hidden" name="delete_interview_id" id="delete_interview_id" />
							<button type="button" class="btn btn-info" data-dismiss="modal" onclick="ConfirmSchedule()">Yes</button>
							<button type="button" class="btn btn-info" data-dismiss="modal">No</button>
						</form>
					</div>
				</div>
			</div>
		</div>


	</body>
	<script type="text/javascript">
		var type = "<?php echo Session::get('user_type'); ?>";
		var logged_id = "<?php echo Session::get('user_id'); ?>";
		PageLayout(type);
		TimeBoxes();
	</script>  

</script>  
</html>
