import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required to fetch resumes." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl === '' || supabaseKey === '') {
      return NextResponse.json({ success: true, local: true, data: [] });
    }

    const { data: resumes, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("email", email)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to fetch resumes." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: resumes });
  } catch (error: any) {
    console.error("Fetch API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch resumes." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, title, template, status, atsScore } = body;

    if (!data || !data.personalDetails?.email) {
      return NextResponse.json(
        { error: "Valid resume data containing an email is required." },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl === '' || supabaseKey === '') {
      // No Supabase configured — return success with local-only flag
      return NextResponse.json({ 
        success: true, 
        local: true, 
        message: "Saved locally (no database configured)." 
      });
    }

    try {
      // Insert resume into Supabase
      const { data: insertedData, error } = await supabase
        .from("resumes")
        .insert([
          { 
            email: data.personalDetails.email,
            content: data,
            title: title || 'Untitled Resume',
            template: template || 'modern',
            status: status || 'draft',
            ats_score: atsScore || 0,
            views: 0,
            downloads: 0
          }
        ])
        .select();

      if (error) {
        console.error("Supabase Error:", error);
        // Fall back to local save on DB error
        return NextResponse.json({ 
          success: true, 
          local: true, 
          message: "Saved locally (database unavailable)." 
        });
      }

      return NextResponse.json({ success: true, data: insertedData });
    } catch (dbError: any) {
      // Network/connection error to Supabase — fall back gracefully
      console.error("Supabase connection error:", dbError);
      return NextResponse.json({ 
        success: true, 
        local: true, 
        message: "Saved locally (database unreachable)." 
      });
    }
  } catch (error: any) {
    console.error("Save API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save resume." },
      { status: 500 }
    );
  }
}
