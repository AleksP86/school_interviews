$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function logout()
{
	$.ajax({
		url:'/login/logout',
		type:"post",
		dataType:'json',
		success: function(data)
		{
			if(data==true)
			{
				window.location='/';
			}
		}
	});
}
/*
function CheckInformation()
{
	var ime=$('#ime').val().trim();
	var prez=$('#prezime').val().trim();
	var tel=$('#tel_broj').val().trim();
	var grad=$('#grad').val().trim();
	var ulica=$('#ulica').val().trim();
	var broj=$('#broj').val().trim();
	var proceed=true;

	if(ime!='')
		{}else{proceed=false;}
	if(prez!='')
		{}else{proceed=false;}
	if(tel!='')
		{}else{proceed=false;}
	if(grad!='')
		{}else{proceed=false;}
	if(ulica!='')
		{}else{proceed=false;}
	if(broj!='')
		{}else{proceed=false;}
	if(proceed==false)
	{
		$('#message_holder').html('Niste popunili sva polja.');
	}
	else
	{
		var form_data=$('#insert_form').serialize();
		$('#message_holder').html('');
		
		$.ajax({
			url:'/home/insert',
			type:"post",
			data: form_data,
			dataType:'json',
			success: function(data)
			{
				loadData();
				$("#insert_form")[0].reset();
			}
		});
		
	}
}
*/
/*
function loadData()
{
	$.ajax({
		url:'/home/all',
		type:"post",
		dataType:'json',
		success: function(data)
		{
			var html='<table style="max-width:1%;" class="table table-sm">';
			var grad='';
			var prezime='';
			$.each(data.entries, function(index, element)
			{
				if(grad=='' || grad!=element.grad)
				{
					grad=element.grad;
					html+="<tr class='grad_row'><td>"+grad+"</td><td></td><td></td></tr>";
				}
				else
				{}
				if(prezime=='' || prezime!=element.prezime)
				{
					prezime=element.prezime;
					html+="<tr><td></td><td>"+prezime+"</td><td></td></tr>";
				}
				else
				{}
				html+="<tr><td></td><td>-</td><td style='white-space: nowrap;'>"+element.ime+", "+element.ulica+" "+element.broj+", "+element.telefonski_broj+"</td></tr>";
			});
			html+="<tr class='grad_row'><td></td><td></td><td></td></tr>";
			$('#table-holder').html(html);
		}
	});
}
*/
/*
function selectDrop(id, val)
{
	$("#"+id).val(val);
	$("#"+id+"-box").hide();
}
*/
/*
function searchEntry()
{
	var proceed=true;
	if($('#grad').val()=='' && $('#ulica').val()=='' && $('#prezime').val()=='' && $('#ime').val()=='' && $('#tel_broj').val()=='')
	{
		proceed=false;
	}
	if(!proceed)
	{
		$('#message_holder').html('Morate popuniti makar jedno polje.');
		return false;
	}
	$('#message_holder').html('');
	var form_data=$('#search_form').serialize();
	$.ajax({
		url:'/search/filter',
		type:"post",
		data: form_data,
		dataType:'json',
		success: function(data)
		{
			var html='<table style="max-width:1%;" class="table table-sm">';
			var grad='';
			var prezime='';
			$.each(data.entries, function(index, element)
			{
				if(grad=='' || grad!=element.grad)
				{
					grad=element.grad;
					html+="<tr class='grad_row'><td>"+grad+"</td><td></td><td></td></tr>";
				}
				else
				{}
				if(prezime=='' || prezime!=element.prezime)
				{
					prezime=element.prezime;
					html+="<tr><td></td><td>"+prezime+"</td><td></td></tr>";
				}
				else
				{}
				html+="<tr><td></td><td>-</td><td style='white-space: nowrap;'>"+element.ime+", "+element.ulica+" "+element.broj+", "+element.telefonski_broj+"</td></tr>";
			});
			html+="<tr class='grad_row'><td></td><td></td><td></td></tr>";
			$('#table-holder').html(html);
		}
	});
}
*/