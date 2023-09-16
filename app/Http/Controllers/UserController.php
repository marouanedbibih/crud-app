<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(6);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        return response([
                'message' => 'add user succufuly',
                'data' => new UserResource($user)
            ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response([
            'data'=> new UserResource($user)
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);
        return response([
            'message'=> 'update user succufuly',
            'data'=> new UserResource($user)
        ],200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response(['message' => ' user delete succufuly'],200);
    }
}
