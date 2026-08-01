<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return inertia('ModifyUsers', ['users' => $users]);
    }

    public function assignAdmin(Request $request, User $user)
    {
        if (Hash::check($request->password, $request->user()->password)) {
            $user->rol = 1;
            $user->save();
            return redirect()->route('modify-users.index')->with('success', 'User assigned as admin successfully.');
        }

        return back()->withErrors(['password' => 'Contraseña incorrecta.']);
    }

    public function destroy(Request $request, User $user)
    {
        if (Hash::check($request->password, $request->user()->password)) {
            $user->delete();
            return redirect()->route('modify-users.index')->with('success', 'User deleted successfully.');
        }

        return back()->withErrors(['password' => 'Contraseña incorrecta.']);
    }

    public function removeAdmin(Request $request, User $user)
    {
        if (Hash::check($request->password, $request->user()->password)) {
            $user->rol = 0;
            $user->save();
            return redirect()->route('modify-users.index')->with('success', 'User converted to normal successfully.');
        }

        return back()->withErrors(['password' => 'Contraseña incorrecta.']);
    }
}
