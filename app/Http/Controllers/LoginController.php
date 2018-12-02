<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    function checklogin(Request $request)
    {
        $request->email=strip_tags($request->email);
        $request->pass =strip_tags($request->pass);
        if($request->email=='')
        {
            $message='Enter email';
            return response()->json($message);
        }
        if($request->pass=='')
        {
            $message='Enter password';
            return response()->json($message);
        }
        //data checked already
        $users = DB::table('users')->where('email',$request->email)->where('password',$request->pass)->get();
        if(count($users)==1)
        {
            if($users[0]->active==1)
            {
                //fill session
                $request->session()->put('user', $users[0]->first_name.' '.$users[0]->last_name);
                $request->session()->put('user_id', $users[0]->id);
                $request->session()->put('user_type', $users[0]->type);
                return response()->json(true);
            }
            else
            {
                $message='User inactive';
                return response()->json($message);
            }
        }
        else
        {
            $message='Invalid login data'.count($users);
            return response()->json($message);
        }
    }

    function login(Request $request)
    {
        return view('test',['type'=>$request->session()->get('user_type')]);
    }

    function checksignin(Request $request)
    {
        $request->user_fname=strip_tags($request->user_fname);
        $request->user_lname=strip_tags($request->user_lname);
        $request->user_email=strip_tags($request->user_email);
        $request->user_phone=strip_tags($request->user_phone);
        $request->user_pass=strip_tags($request->user_pass);

        if($request->user_fname=='')
        {
            $message='Enter first name';
            return response()->json($message);
        }
        if($request->user_lname=='')
        {
            $message='Enter last name';
            return response()->json($message);
        }
        if($request->user_email=='')
        {
            $message='Enter email';
            return response()->json($message);
        }
        if($request->user_phone=='')
        {
            $message='Enter phone number';
            return response()->json($message);
        }
        if($request->user_pass=='')
        {
            $message='Enter password';
            return response()->json($message);
        }
        //check does this user exist already
        $user = DB::table('users')->where('email',$request->user_email)->where('password',$request->user_pass)->get();
        if(count($user)==1)
        {
            $message='Email already taken';
            return response()->json($message);
        }
        else
        {
            $id=DB::insert('insert into users (first_name, last_name, email, phone, password, type, created_at, active) values (?, ?,?,?,?,?,?,?)', [$request->user_fname, $request->user_lname, $request->user_email, $request->user_phone, $request->user_pass, 'student', date('Y-m-d H:i:s'),0]);
            return response()->json($id);
        }
    }

    function logout(Request $request)
    {
    	$request->session()->flush();
        return response()->json(true);
    }
}
