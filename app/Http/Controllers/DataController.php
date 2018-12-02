<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    //
    function index($val, Request $request)
    {
    	switch($val)
    	{
    		case "info":
    		{
    			$r=$this->info();
    			return response()->json($r);
    		}
    		break;
    		case "users":
    		{
    			$u=$this->users();
    			return response()->json($u);
    		}
    		break;
    		case "user_types":
    		{
    			$u=$this->user_types();
    			return response()->json($u);
    		}
    		case "edit_user":
    		{
    			//return $request->id;
    			$u=$this->edit_user($request);
    			return response()->json($u);
    		}
    		break;
    		case "add_user":
    		{
    			//return $request->id;
    			$u=$this->add_user($request);
    			return response()->json($u);
    		}
    		break;
    		case "delete_user":
    		{
    			//return $request->id;
    			$u=$this->delete_user($request);
    			return response()->json($u);
    		}
    		break;
    		case "interviev_types":
    		{
    			$r=$this->interviev_types();
    			return response()->json($r);
    		}
    		break;
    		case "interviev_types_list":
    		{
    			//return response()->json('test');
    			$r=$this->interviev_types_list();
    			return response()->json($r);
    		}
    		break;
    		case "add_interview":
    		{
    			$r=$this->add_interview($request);
    			return response()->json($r);
    		}
    		break;
    		case "edit_interview":
    		{
    			$r=$this->edit_interview($request);
    			return response()->json($r);
    		}
    		break;
    		case "delete_interview":
    		{
    			$r=$this->delete_interview($request);
    			return response()->json($r);
    		}
    		break;
    		case "interviews_overview":
    		{
    			$r=$this->interviews_overview();
    			return response()->json($r);
    		}
    		break;
    		case "accept_interview":
    		{
    			$r=$this->accept_interview($request);
    			return response()->json($r);
    		}
    		break;
    		case "refuse_interview":
    		{
    			$r=$this->refuse_interview($request);
    			return response()->json($r);
    		}
    		break;
    		case "check_timebox":
    		{
    			$r=$this->check_timebox($request);
    			return response()->json($r);
    		}
    		break;
    		case "request_interview":
    		{
    			$r=$this->request_interview($request);
    			return response()->json($r);
    		}
    		break;
    	}
    }
    function info()
    {
    	//obtain information how many pending, rejected and confirmed apointments exists
    	$appointments = DB::table('apointments')->select(DB::raw('status, count(*) as num'))->groupBy('status')->orderBy('status','asc')->get();
        return $appointments;
    }
    function users()
    {
    	//get list of all users, group by type and name
    	$users=DB::table('users')->select('id','first_name', 'last_name', 'email','phone','type','active','created_at','updated_at')->orderBy('type','asc')->orderBy('last_name','asc')->get();
    	return $users;
    }
    function user_types()
    {
    	$r=DB::table('user_types')->select('type','name')->orderBy('type','asc')->distinct()->get();
    	return $r;
    }
    function edit_user($request)
    {
    	$upd=DB::table('users')->where('id',$request->id)->update(['first_name'=>$request->first_name,'last_name'=>$request->last_name,'email'=>$request->email,'phone'=>$request->phone,'type'=>$request->type,'active'=>$request->status,'updated_at'=>date('Y-m-d H:i:s')]);
    	return $upd;
    }
    function add_user($request)
    {
    	$id=DB::insert('insert into users (first_name, last_name, email, phone, password, type, created_at, active) values (?, ?,?,?,?,?,?,?)', [$request->first_name, $request->last_name, $request->email, $request->phone, $request->pass, $request->type, date('Y-m-d H:i:s'),$request->status]);
    	return $id;
    }
    function delete_user($request)
    {
    	$r=DB::table('users')->where('id', '=', $request->id)->delete();
    	return $r;
    }

    function interviev_types()
    {
    	$rep = DB::table('interview')->select('type')->orderBy('type','asc')->get();
        return $rep;
    }
    function interviev_types_list()
    {
    	$rep = DB::table('interview')->get();
        return $rep;
    }
    function add_interview($request)
    {
    	$id=DB::insert('insert into interview (type, active, description, created_at) values (?,?,?,?)', [$request->type, $request->status, $request->desc, date('Y-m-d H:i:s')]);
    	return $id;
    }
    function edit_interview($request)
    {
    	$upd=DB::table('interview')->where('id',$request->id)->update(['type'=>$request->name,'description'=>$request->desc,'active'=>$request->status,'updated_at'=>date('Y-m-d H:i:s')]);
    	return $upd;
    }
    function delete_interview($request)
    {
    	$r=DB::table('interview')->where('id', '=', $request->id)->delete();
    	return $r;
    }

    function interviews_overview()
    {
    	$rep = DB::select("SELECT a.id, a.type, a.status, a.created_at 'created', a.requested_date, a.requested_time, a.updated_at 'answered', a.description, u1.first_name 'r_f_n', u1.last_name 'r_l_n', u2.first_name 'a_f_n', u2.last_name 'a_l_n' FROM users as u1, apointments as a left join users u2 on a.ans_id=u2.id WHERE a.req_id=u1.id order by u1.first_name, a.created_at desc");
        return $rep;
    }
    function accept_interview($request)
    {
    	$upd=DB::table('apointments')->where('id',$request->id)->update(['status'=>'accepted','ans_id'=>$request->logged_id,'updated_at'=>date('Y-m-d H:i:s')]);
    	return $upd;
    }
    function refuse_interview($request)
    {
    	$upd=DB::table('apointments')->where('id',$request->id)->update(['status'=>'refused','ans_id'=>$request->logged_id,'updated_at'=>date('Y-m-d H:i:s'),'description'=>$request->reason]);
    	return $upd;
    }

    function check_timebox($request)
    {
    	$r=DB::select("select distinct requested_time from apointments where (status='pending' or status='accepted') and requested_date='{$request->date}' order by requested_time desc");
    	return $r;
    }
    function request_interview($request)
    {
    	$id=DB::insert('insert into apointments (req_id, type, status, description, requested_time, requested_date, created_at) values (?,?,?,?,?,?,?)', [$request->logged_id, $request->type, 'pending', '', $request->time, $request->date, date('Y-m-d H:i:s')]);
        return $id;
    }
}