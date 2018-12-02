
function PageLayout(type)
{
	switch(type)
	{
		case "admin":
		{
			AdminLayout();
		}
		break;
		case "staff":
		{
			StaffLayout();
		}
		break;
		case "student":
		{
			StudentLayout();
		}
		break;
		default:
		{
			window.location = "/";
			$('#main_div_1').html('Invalid user type');
		}
	}
}

function InfoLoad()
{
	var text='Current interviews status: ';
	$.ajax({
		url:'/data/info',
		type:"post",
		dataType:'json',
		success: function(data)
		{
			$.each(data, function(key, val)
			{
				text+=val.status+': '+val.num+' ';
			})
			$('#info_div').html(text);
		}
	});
}
//admin
function AdminLayout()
{
	var html='<div><div id="tab_1" style="float:left;padding-right:25px;">\
	<button type="button" class="btn btn-info btn-sm" onclick="UserManage()">Users</button>\
	<button type="button" class="btn btn-info btn-sm" onclick="InterviewManage()">Interview</button>\
	<button type="button" class="btn btn-info btn-sm" onclick="SchedulesOverview()">Schedules</button>\
	</div><div id="info_div" style="">Loading data ...</div></div>';
	$('#main_div_1').html(html);
	UserManage();
	InfoLoad();
}

//users management
function UserManage()
{
	//insert into placeholder_div appropriate content
	$.ajax({
		url:'/data/users',
		type:"post",
		dataType:'json',
		success: function(data)
		{
			//console.log(data);
			var html='<table class="table">';
			html+='<tr><td colspan="8" align="right"><div class="col-md-10"><button name="m_insert" id="m_insert" class="btn btn-info btn-sm" onclick="InsertModal()">Add new user</button></div></td></tr>';
			var type='';
			$.each(data, function(key, val)
			{
				//console.log(val);
				if(type=='' || type!=val.type)
				{
					//tip red
					switch(val.type)
					{
						case "admin":
						{
							html+='<tr><th colspan="8">Administrator</th></tr>';
							html+='<tr><td>Name</td><td>Email</td><td>Phone number</td><td>Created</td><td>Last change</td><td colspan="3">Status</td></tr>';
						}
						break;
						case "staff":
						{
							html+='<tr><th colspan="8">Staff</th></tr>';
							html+='<tr><td>Name</td><td>Email</td><td>Phone number</td><td>Created</td><td>Last change</td><td colspan="3">Status</td></tr>';
						}
						break;
						case "student":
						{
							html+='<tr><th colspan="8">Student</th></tr>';
							html+='<tr><td>Name</td><td>Email</td><td>Phone number</td><td>Created</td><td>Last change</td><td colspan="3">Status</td></tr>';
						}
						break;
						default:
						{
							html+='<tr><th colspan="8">'+val.type+'</th></tr>';
							html+='<tr><td>Name</td><td>Email</td><td>Phone number</td><td>Created</td><td>Last change</td><td colspan="3">Status</td></tr>';
						}
					}
					type=val.type;
				}
				//console.log(html);
				
				var status='';
				switch(val.active)
				{
					case 1:{status='Active'}break;
					case 0:{status='Inactive'}break;
				}
				var name=val.last_name+', '+val.first_name;
				var created=val.created_at;
				var updated=val.updated_at;
				if(updated==null)
				{
					updated='';
				}

				html+='<tr id=\'user_'+val.id+'\'><td id=\'user_name_'+val.id+'\'>'+name+'</td><td id=\'user_email_'+val.id+'\'>'+val.email+'</td>\
				<td id=\'user_phone_'+val.id+'\'>'+val.phone+'</td><td>'+created+'</td><td>'+updated+'</td>\
				<td id=\'user_status_'+val.id+'\'>'+status+'</td>\
				<td><button type="button" class="btn btn-info btn-sm" onclick="CallModal('+val.id+')">Edit data</button></td>\
				<td><button type="button" class="btn btn-info btn-sm" onclick="DeleteUser('+val.id+')">Delete user</button></td>\
				<td style="display:none;" id=\'user_type_'+val.id+'\'>'+type+'</td></tr>';
			})
			html+='</table><hr/>';
			$('#placeholder_div').html(html);
		}
	});
}
function CallModal(id)
{
	var type=$('#user_type_'+id).html().trim();
	$.ajax({  
	    url:"/data/user_types",  
	    method:"POST",  
	    dataType:"json",  
	    success:function(data)
	    {
	    	$('#m_type').empty();
	    	$.each(data, function(key, val)
	    	{
				$('#m_type').append($('<option>').text(val.type).attr('value', val.name));
	    	})
	    	$('#m_type option[value='+type+']').attr('selected','selected');
	    	//$("#m_type option:contains("+type+")").attr('selected', 'selected');
	    }  
	});

	name=$('#user_name_'+id).html();
	name_1=name.split(',');
	var first_name=name_1[1].trim();
	var last_name=name_1[0].trim();
	$('#m_fname').val(first_name);
	$('#m_lname').val(last_name);
	$('#m_email').val($('#user_email_'+id).html().trim());
	$('#m_phone').val($('#user_phone_'+id).html().trim());
	$("#m_status option:contains("+$('#user_status_'+id).html()+")").attr('selected', 'selected');
	$('#employee_id').val(id);
	$('#update_data_Modal').modal('show');
}
function UpdateModal()
{
	$('#m_update').prop("disabled",true);
	$('.m_wait').html('Please wait, processing.');
	$.ajax({  
	    url:"/data/edit_user",  
	    method:"POST",  
	    data:{id:$('#employee_id').val(), first_name:$('#m_fname').val().trim(), last_name:$('#m_lname').val().trim(), email:$('#m_email').val().trim(), phone:$('#m_phone').val().trim(),type:$("#m_type option:selected").val(), status:$("#m_status option:selected").val()},  
	    dataType:"json",  
	    success:function(data){
	    	$('.m_wait').html('');
	    	UserManage();
	    	$('#m_update').prop("disabled",false);
	    	$('#update_data_Modal').modal('hide');
	    }  
	});
}
function InsertModal()
{
	$.ajax({  
	    url:"/data/user_types",  
	    method:"POST",  
	    dataType:"json",  
	    success:function(data)
	    {
	    	$('#m_type_add').empty();
	    	$.each(data, function(key, val)
	    	{
				$('#m_type_add').append($('<option>').text(val.type).attr('value', val.name));
	    	})
	    	$("#m_type_add option:contains('Student')").attr('selected', 'selected');
	    	$('#add_data_Modal').modal('show');
	    }  
	});
}
function InsertDataModal()
{
	$('#m_insert_user').prop("disabled",true);
	$('.m_wait').html('Please wait, processing.');
	$.ajax({  
	    url:"/data/add_user",  
	    method:"POST",  
	    data:{first_name:$('#m_fname_add').val().trim(), last_name:$('#m_lname_add').val().trim(), email:$('#m_email_add').val().trim(), phone:$('#m_phone_add').val().trim(), pass:$('#m_pass_add').val(),type:$("#m_type_add option:selected").val(), status:$("#m_status_add option:selected").val()},  
	    dataType:"json",  
	    success:function(data){
	    	$('.m_wait').html('');
	    	UserManage();
	    	$('#m_insert_user').prop("disabled",false);
	    	$('#add_data_Modal').modal('hide');
	    	$('#m_fname_add').val('');
	    	$('#m_lname_add').val('');
	    	$('#m_email_add').val('');
	    	$('#m_phone_add').val('');
	    	$('#m_pass_add').val('');
	    	$("#m_type_add option:contains('Student')").attr('selected', 'selected');
			$("#m_status_add option:contains('Inactive')").attr('selected', 'selected');
	    }  
	});
}
function DeleteUser(id)
{
	$('#delete_user_Modal').modal('show');
	$('#delete_employee_id').val(id);
}
function DeleteUserConfirmed()
{
	$.ajax({  
	    url:"/data/delete_user",  
	    method:"POST",  
	    data:{id:$('#delete_employee_id').val()},  
	    dataType:"json",  
	    success:function(data){
	    	UserManage();
	    }  
	});
}

//interviews
function InterviewManage()
{
	$.ajax({  
	    url:"/data/interviev_types_list",  
	    method:"POST",  
	    dataType:"json",  
	    success:function(data)
	    {
	    	var html='<table class="table">';
	    	html+='<tr><td colspan="8" align="right"><div class="col-md-10"><button name="m_insert" id="m_insert" class="btn btn-info btn-sm" onclick="InsertInterviewTypeModal()">Add new interview</button></div></td></tr>';
			html+='<tr><td>Type</td><td>Status</td><td>Description</td><td>Created</td><td>Last change</td><td colspan="2"></td></tr>';
			var type='';
			$.each(data, function(key, val)
			{
				var created=val.created_at;
				var updated=val.updated_at;
				if(updated==null)
				{
					updated='';
				}
				switch(val.active)
				{
					case 1:
					{
						var active='Active';
					}
					break;
					case 0:
					{
						var active='Inactive';
					}
					break;
					default:
					{
						var active='Status DB error';
					}
				}
				html+='<tr id=\'int_'+val.id+'\'><td id=\'int_type_'+val.id+'\'>'+val.type+'</td><td id=\'int_status_'+val.id+'\'>'+active+'</td>\
				<td id=\'int_desc_'+val.id+'\'>'+val.description+'</td><td>'+created+'</td><td>'+updated+'</td>\
				<td><button type="button" class="btn btn-info btn-sm" onclick="CallIntUpdModal('+val.id+')">Edit data</button></td>\
				<td><button type="button" class="btn btn-info btn-sm" onclick="DeleteInterview('+val.id+')">Delete</button></td>\
				<td style="display:none;" id=\'user_type_'+val.id+'\'>'+type+'</td></tr>';
			})
			html+='</table><hr/>';
			$('#placeholder_div').html(html);
	    }  
	});
}
function InsertInterviewTypeModal()
{
	$('#add_interview_Modal').modal('show');
}
function InsertInterviewModal()
{
	$('#m_i_insert').prop("disabled",true);
	$('.m_wait').html('Please wait, processing.');
	$.ajax({  
	    url:"/data/add_interview",  
	    method:"POST",  
	    data:{type:$("#m_i_name_add").val(), status:$("#m_i_status_add option:selected").val(), desc:$("#m_i_desc_add").val()},  
	    dataType:"json",
	    success:function(data){
	    	$('.m_wait').html('');
	    	InterviewManage();
	    	$('#m_i_insert').prop("disabled",false);
	    	$('#add_interview_Modal').modal('hide');
	    	$('#m_i_name_add').val('');
	    	$('#m_i_status_add').val('');
	    	$('#m_i_desc_add').val('');
	    	$("#m_i_status_add option:contains('Inactive')").attr('selected', 'selected');
	    }  
	});
}
function CallIntUpdModal(id)
{
	$('#m_i_name_upd').val($('#int_type_'+id).html().trim());
	$('#m_i_desc_upd').val($('#int_desc_'+id).html().trim());
	$("#m_i_status_upd option:contains("+$('#int_status_'+id).html()+")").attr('selected', 'selected');
	$('#m_i_id').val(id);
	$('#update_interview_Modal').modal('show');
}
function UpdateInterviewModal()
{
	$('#m_i_update').prop("disabled",true);
	$('.m_wait').html('Please wait, processing.');
	var name=$('#m_i_name_upd').val();
	var desc=$('#m_i_desc_upd').val();
	var status=$("#m_i_status_upd option:selected").val();
	var id=$('#m_i_id').val();

	$.ajax({  
	    url:"/data/edit_interview",  
	    method:"POST",  
	    data:{id:id, name:name,desc:desc, status:status},  
	    dataType:"json",  
	    success:function(data){
	    	$('.m_wait').html('');
	    	InterviewManage();
	    	$('#m_i_update').prop("disabled",false);
	    	$('#update_interview_Modal').modal('hide');
	    }  
	});
}
function DeleteInterview(id)
{
	$('#delete_interview_Modal').modal('show');
	$('#delete_interview_id').val(id);
}
function DeleteInterviewTypeConfirmed()
{
	$.ajax({  
	    url:"/data/delete_interview",  
	    method:"POST",  
	    data:{id:$('#delete_interview_id').val()},  
	    dataType:"json",  
	    success:function(data){
	    	InterviewManage();
	    }  
	});
}


function SchedulesOverview()
{
	//insert into placeholder_div appropriate content
	$('#placeholder_div').html('Table of present schedules');
	$.ajax({  
	    url:"/data/interviews_overview",  
	    method:"POST",
	    dataType:"json",  
	    success:function(data){
	    	
	    	var html='<table class="table">';
	    	html+='<tr><th>Requested by</th><th>Interview type</th><th>Status</th><th>Requested period</th>\
	    	<th>Request created</th><th>Answered by</th><th>Answer time</th></tr>';
			var type='';
			$.each(data, function(key, val)
			{
				var created=val.created_at;
				var updated=val.updated_at;
				if(updated==null)
				{
					updated='';
				}
				var answer_time=val.answered;
				if(answer_time==null)
				{
					if(val.status=='pending')
					{
						answer_time='Not processed yet.';
					}
					else
					{
						answer_time='Time missing.';
					}
					
				}
				var req_time=val.requested_time;
				if(req_time=='')
				{
					req_time='requested time missing';
				}
				else
				{
					req_time=val.requested_date+' at '+val.requested_time;
				}
				var answered_n='';
				if(val.a_l_n===null || val.a_f_n===null)
				{
					answered_n='';
				}
				else
				{
					answered_n=val.a_l_n+', '+val.a_f_n;
				}
				
				html+='<tr><td>'+val.r_l_n+', '+val.r_f_n+'</td><td>'+val.type+'</td><td>'+val.status+'</td>\
				<td>'+req_time+'</td><td>'+val.created+'</td><td>'+answered_n+'</td><td>'+answer_time+'</td>';
			})
			html+='</table><hr/>';
			$('#placeholder_div').html(html);
	    }  
	});
}


//staff
function StaffLayout()
{
	var html='<div><div id="tab_1" style="float:left;padding-right:25px;">\
	</div><div id="info_div" style="">Loading data ...</div></div>';
	SchedulesStaffOverview();
	InfoLoad();
}
function SchedulesStaffOverview()
{
	//insert into placeholder_div appropriate content
	$('#placeholder_div').html('Table of present schedules');
	$.ajax({  
	    url:"/data/interviews_overview",  
	    method:"POST",
	    dataType:"json",  
	    success:function(data){
	    	//console.log(data);

	    	var html='<table class="table">';
	    	html+='<tr><th>Requested by</th><th>Interview type</th><th>Status</th><th>Requested period</th>\
	    	<th>Request created</th><th>Answered by</th><th>Answer time</th><th colspan="2"></th></tr>';
			var type='';
			$.each(data, function(key, val)
			{
				var created=val.created_at;
				var updated=val.updated_at;
				if(updated==null)
				{
					updated='';
				}
				var answer_time=val.answered;
				if(answer_time==null)
				{
					if(val.status=='pending')
					{
						answer_time='Not processed yet.';
					}
					else
					{
						answer_time='Time missing.';
					}
				}
				var req_time=val.requested_time;
				if(req_time=='' || req_time==null)
				{
					req_time='requested time missing';
				}
				else
				{
					req_time=val.requested_date+' at '+val.requested_time;
				}
				var answered_n='';
				if(val.a_l_n===null || val.a_f_n===null)
				{
					answered_n='';
				}
				else
				{
					answered_n=val.a_l_n+', '+val.a_f_n;
				}
				
				html+='<tr><td>'+val.r_l_n+', '+val.r_f_n+'</td><td>'+val.type+'</td><td>'+val.status+'</td>\
				<td>'+req_time+'</td><td>'+val.created+'</td><td>'+answered_n+'</td><td>'+answer_time+'</td>';

				if(val.status=='pending')
				{
					html+='<td><button type="button" class="btn btn-info btn-sm" onclick="Accept('+val.id+')">Accept</button></td>\
					<td><button type="button" class="btn btn-warning btn-sm" onclick="RefuseModal('+val.id+')">Refuse</button></td>';
				}
				else
				{
					if(val.description==null)
					{
						val.description='';
					}
					html+='<td colspan="2">'+val.description+'</td>';
				}
			})
			html+='</table><hr/>';
			$('#placeholder_div').html(html);
	    }  
	});
}
function Accept(id)
{
	$.ajax({  
	    url:"/data/accept_interview",  
	    method:"POST",  
	    data:{id:id, logged_id:logged_id},  
	    dataType:"json",  
	    success:function(data){
	    	SchedulesStaffOverview();
	    }  
	});
}

function RefuseModal(id)
{
	$('#staff_refusal_Modal').modal('show');
	$('#refuse_interview_id').val(id);
}
function Refuse()
{
	$.ajax({  
	    url:"/data/refuse_interview",  
	    method:"POST",  
	    data:{id:$('#refuse_interview_id').val(), logged_id:logged_id, reason:$('#m_i_refuse').val()},
	    dataType:"json",  
	    success:function(data){
	    	SchedulesStaffOverview();
	    }  
	});
}

//students
function StudentLayout()
{
	//$('#main_div_1').html('Student layout');
	html='<div><p>Interviews are sheduled from 9AM to 3PM.</p>\
	<p id="date_message">Schedule for today</p></div><div class="col-md-10" id="time_boxes"></div>';
	$('#placeholder_div').html(html);
	/*
	var today = new Date();
	var dd = today.getDate();

	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	if(dd<10) 
	{
	    dd='0'+dd;
	} 

	if(mm<10) 
	{
	    mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
	console.log(today)
	*/
}
function TimeBoxes(search_date, message)
{
	if(search_date===undefined)
	{
		var today = new Date();
		var dd = today.getDate();

		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		if(dd<10) 
		{
		    dd='0'+dd;
		} 

		if(mm<10) 
		{
		    mm='0'+mm;
		} 
		search_date = yyyy+'-'+mm+'-'+dd;
	}
	
	var html='';
	start=['9AM - 10AM','10AM - 11AM','11AM - 12AM','12AM - 1PM','1PM - 2PM','2PM - 3PM'];
	$.ajax({  
	    url:"/data/check_timebox",  
	    method:"POST",  
	    data:{date:search_date},
	    dataType:"json",  
	    success:function(data){
	    	$('#date_message').html('Schedult for day: '+search_date);
	    	if(data.lenght<1)
	    	{
	    		for(var i=0;i<start.length;i++)
				{
					html+='<div align="center" style="float:left;border:2px solid gray;width:'+(100/start.length)+'%;padding:20px;" onclick="RequestTimeModal(\''+start[i]+'\',\'free\',\''+search_date+'\')">'+start[i]+'</div>';
				}
				html+='';
				$('#time_boxes').html(html);
	    	}
	    	else
	    	{
	    		var used=false;
	    		for(var i=0;i<start.length;i++)
				{
					for(var j=0;j<data.length;j++)
					{
						if(data[j].requested_time==start[i])
						{
							html+='<div align="center" style="background:red;color:white;float:left;border:2px solid gray;width:'+(100/start.length)+'%;padding:20px;" onclick="RequestTimeModal(\''+start[i]+'\',\'taken\',\''+search_date+'\')">'+start[i]+'</div>';
							used=true;
							break;
						}
					}
					if(used==false)
					{
						html+='<div align="center" style="float:left;border:2px solid gray;width:'+(100/start.length)+'%;padding:20px;" onclick="RequestTimeModal(\''+start[i]+'\',\'free\',\''+search_date+'\')">'+start[i]+'</div>';
					}
					used=false;
				}
				html+='';
				html+='<br><div id="date_place">\
				<form method=\'post\'><label>Choose another day</label><input id="f_date" type="date"/>\
				<input type="button" value="Submit" class="btn btn-sm btn-info" onclick="getFDate()"/></form>\
				</div><div id="confirm_schedule_mess"></div>';

				$('#time_boxes').html(html);
				$('#confirm_schedule_mess').html(message);
	    	}
	    }
	});
}

function getFDate()
{
	var d=$('#f_date').val();
	if(d!='')
	{
		TimeBoxes(d);
	}
	
}

function RequestTimeModal(time,status,search_date)
{
	if(status=='free')
	{
		$.ajax({  
		    url:"/data/interviev_types",  
		    method:"POST",  
		    dataType:"json",  
		    success:function(data)
		    {
		    	$('#r_type_time').empty();
		    	$.each(data, function(key, val)
		    	{
					$('#r_type_time').append($('<option>').text(val.type).attr('value', val.name));
		    	})
		    	$('#int_time').html(time);
		    	$('#int_date').html(search_date);
				$('#request_time_Modal').modal('show');
		    }  
		});
	}
}
function ConfirmSchedule()
{
	//user id, time, add schedule
	var time=$('#int_time').html();	
	$.ajax({
	    url:"/data/request_interview",
	    method:"POST",
	    data:{time:$('#int_time').html(), logged_id:logged_id, type:$('#r_type_time').val(),date:$('#int_date').html()},
	    dataType:"json",
	    success:function(data)
	    {
	    	conf_mess='You have submitted request for interview '+$('#int_date').html()+' in period '+$('#int_time').html();
	    	TimeBoxes($('#int_date').html(),conf_mess);
	    }
	});
}