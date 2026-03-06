import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    if (!data || !data.personalDetails?.email) {
      return NextResponse.json(
        { error: "Valid resume data containing an email is required." },
        { status: 400 }
      );
    }

    // Insert resume into Supabase
    const { data: insertedData, error } = await supabase
      .from("resumes")
      .insert([
        { 
          email: data.personalDetails.email,
          content: data 
        }
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { error: "Failed to save to database: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: insertedData });
  } catch (error: any) {
    console.error("Save API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save resume." },
      { status: 500 }
    );
  }
}
