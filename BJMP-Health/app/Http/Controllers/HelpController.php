<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class HelpController extends Controller
{
    public function index()
    {
        try {
            $helpData = DB::table('tbl_help')
                ->orderByDesc('Date')
                ->get();

            return Inertia::render('help', [
                'helpData' => $helpData,
                'flash' => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch help documents: ' . $e->getMessage());

            return Inertia::render('help', [
                'helpData' => [],
                'flash' => [
                    'error' => 'Failed to load help documents.',
                ],
            ]);
        }
    }

    public function upload(Request $request)
    {
        // Strict validation
        $request->validate([
            'Doc_Name' => 'required|string|max:255',
            'Doc_File' => 'required|file|mimes:pdf|max:10240', // max 10MB
        ]);

        try {
            $file = $request->file('Doc_File');

            // Sanitize and truncate filename to avoid DB issues
            $originalName = $file->getClientOriginalName();
            $sanitized = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $originalName);
            $filename = time() . '-' . substr($sanitized, 0, 180);

            // Save file to public/help-files
            $file->move(public_path('help-files'), $filename);

            // Insert record into DB
            DB::table('tbl_help')->insert([
                'Date' => Carbon::now(),
                'Doc_Name' => $request->Doc_Name,
                'Doc_File' => $filename,
            ]);

            Log::info('Help document uploaded successfully.', [
                'Doc_Name' => $request->Doc_Name,
                'Doc_File' => $filename,
            ]);

            return redirect()->back()->with('success', 'Help document uploaded successfully.');
        } catch (\Exception $e) {
            Log::error('Help file upload failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to upload help document: ' . $e->getMessage());
        }
    }



}
