<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Contact;
use App\Models\User;
use App\Traits\ApiResponser;
use App\Traits\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use ApiResponser;
    use Media;

    public function me(Request $request)
    {
        if (Auth::check()) {
            return $this->success([
                'auth_user' => User::find(auth()->user()->getAuthIdentifier())
            ]);
        }
        return $this->error('Please login', 200);
    }

    public function register(Request $request)
    {
        $attr = $request->validate([
            'username' => 'required|string|unique:users,username',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string',
            'invitation_code' => 'required'
        ]);

        if (isset($attr['invitation_code'])) {
            $found = User::where('invitation_code', $attr['invitation_code'])->first();

            if (!$found && $attr['invitation_code'] != 0) {
                return $this->error('Code Is Invalid', 401);
            }

            if ($found && $attr['invitation_code'] != 0) {
                if ($found->invitation == 0) {
                    return $this->error('Given Code Is Expired', 401);
                }
                $found->decrement('invitation');
                $found->save();
            }
        }

        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($attr['password']),
            'email' => $attr['email'],
            'invitation_by' => $attr['invitation_code'] == 0 ? 0 : $attr['invitation_code'],
            'invitation' => config('global_variable.TOTAL_ALLOWED_INVITATION')
        ]);

        $random_code = Str::random(7);
        $user->update(['invitation_code' => strtoupper($random_code)]);

        return $this->success([
            'authUser' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:4'
        ]);
    
        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Invalid credentials', 401);
        }
    
        // Retrieve the authenticated user
        $user = Auth::user();
    
        $token = $user->createToken('API Token')->plainTextToken;
    
        return $this->success([
            'authUser' => $user,
            'token' => $token
        ]);
    }

    public function contact(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|min:4',
            'email' => 'required|string|email',
            'comments' => 'required'
        ]);

        $data = Contact::create([
            'name' => $attr['name'],
            'email' => $attr['email'],
            'subject' => $request->subject,
            'comments' => $attr['comments']
        ]);

        Mail::to(config('global_variable.ADMIN_EMAIL_ADDRESS'))->send(new ContactMail($data));

        return $this->success([
            $data,
            'message' => 'Form Submission Success'
        ]);

    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }

    public function uploadImage(Request $request)
    {
        if ($file = $request->file('image')) {
            $fileData = $this->uploads($file, 'profile_images/');
            if (isset(auth()->user()->image)) {
                try{
                    unlink(auth()->user()->image);
                }catch (\Exception $exception){
                }
            }
            auth()->user()->update(['image' => $fileData['filePath']]);
            return $this->success([
                'authUser' => User::where('id',auth()->user()->getAuthIdentifier()),
                'message' => 'Form Update Success'
            ]);
        }

    }

    public function updateProfile(Request $request)
    {
        $id = auth()->user()->getAuthIdentifier();
        $attr = $request->validate([
            'email' => "required|string|email|unique:users,email,$id",
            'username' => "required|string|unique:users,username,$id",
        ]);

        auth()->user()->update([
            'email' => $attr['email'],
            'username' => $attr['username'],
            'name' => $request->name,
            'birth' => isset($request->birth) ? $request->birth : null,
            'gender' => $request->gender,
        ]);

        return $this->success([
            'authUser' => User::find($id),
            'message' => 'Form Update Success'
        ]);

    }
}
