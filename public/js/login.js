//sign in/ login page
function showLogin()
{
	//show login box
	$('.first_box').hide();
	$('.sig_box').hide();
	$('.message_holder').html('');
	$('.log_box').show();
}

function showSignin()
{
	//show login box
	$('.first_box').hide();
	$('.log_box').hide();
	$('.message_holder').html('');
	$('.sig_box').show();
}

function backToChosse()
{
	//show first box
	$('.sig_box').hide();
	$('.log_box').hide();
	$('.message_holder').html('');
	//flear input fields
	$('.form-group').find('input').each((i, el) => {
	    $(el).val('')
	})
	$('.first_box').show();
}

$(document).keypress(function(e)
{
    if(e.which == 13)
    {
    	if($('.log_box').is(":visible"))
    	{
    		//alert('You pressed enter for login!');
    		loginSub();
    	}
    	if($('.sig_box').is(":visible"))
    	{
    		//alert('You pressed enter for sign in!');
    		signIn();
    	}
        
    }
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function loginSub()
{
	$.ajax({
		url:'/login/check',
		type:"post",
		data: {email:$('#user_email').val().trim(), pass:$('#user_pass').val().trim()},
		dataType:'json',
		success: function(data)
		{
			/*if(typeof=='object')*/
			if(data==true)
			{
				window.location='/test';
			}
			else
			{
				$('.message_holder').html('<p>'+data+'</p>');
			}
		}
	});
}

$('#sign_b').prop("disabled",false);

function signIn()
{
	$('#sign_b').prop("disabled",true);
	$.ajax({
		url:'/login/sign',
		type:"post",
		data: { user_fname:$('#user_fname_s').val().trim(), user_lname:$('#user_lname_s').val().trim(),
				user_phone:$('#user_phone_s').val().trim(), user_email:$('#user_email_s').val().trim(),
				user_pass:$('#user_pass_s').val().trim()},
		dataType:'json',
		success: function(data)
		{
			$('#sign_b').prop("disabled",false);
			if(data==true)
			{
				alert('Your account is created, but it needs to be approved by administrator.');
				$('.message_holder').html('<p>Your account is created.</p>');
			}
			else
			{
				alert(data);
				$('.message_holder').html('<p>'+data+'</p>');
			}
		}
	});
	
}
