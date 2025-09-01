<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    public function index()
    {
        $people = AboutUs::all();

        return Inertia::render('about-us', [
            'aboutUsData' => $people,
        ]);
    }

    // Insert a new person
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'picture' => 'nullable|string|max:255',
        ]);

        AboutUs::create([
            'Name' => $request->name,       // maps to DB column "Name"
            'Position' => $request->position,
            'Picture' => $request->picture,
        ]);

        return redirect()->back()->with('success', 'Person added successfully!');
    }

}
