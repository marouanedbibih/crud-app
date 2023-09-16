<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var User $user */
        $user = User::create($data);
        $token = $user->createToken('AuthToken')->plainTextToken;
    
        return response([
            'message' => 'You are sign up successfully',
            'data' => new UserResource($user),
            'token' => $token, // Extract the token string
        ], 200);
    }


    public function login(LoginRequest $request){
        $data = $request->validated();
        if(!Auth::attempt($data)){
            return response(['message'=>'your email and password provide is incorrect'],404);
        }else{
            /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->plainTextToken;

            return response([
                'message' => 'your are login succufuly',
                'data'=> new UserResource($user),
                'token'=>$token
            ],200);
        }

    }

    public function logout(Request $request){
        $user = $request->user();
        /** @var User $user */
        $user->currentAccessToken()->delete();
        return response(['message'=> 'your logout succfuly'],200);
    }
}
