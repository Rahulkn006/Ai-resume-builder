import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const { error } = await supabase.from("resumes").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Resume deleted" });
  } catch (error: any) {
    console.error("Delete API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const body = await req.json();

    // 1. Handle analytics increment actions
    if (body.action === "increment_views" || body.action === "increment_downloads") {
      // First fetch current to increment (since no RPC defined)
      const { data: current, error: fetchError } = await supabase
        .from("resumes")
        .select("views, downloads")
        .eq("id", id)
        .single();
        
      if (fetchError || !current) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }

      const updates: any = {};
      if (body.action === "increment_views") updates.views = (current.views || 0) + 1;
      if (body.action === "increment_downloads") updates.downloads = (current.downloads || 0) + 1;

      const { data, error } = await supabase
        .from("resumes")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // 2. Handle metadata updates (e.g., status change, rename)
    const { title, template, status, content } = body;
    const updates: any = { updated_at: new Date().toISOString() };
    
    if (title !== undefined) updates.title = title;
    if (template !== undefined) updates.template = template;
    if (status !== undefined) updates.status = status;
    if (content !== undefined) updates.content = content;

    const { data: updatedData, error: updateError } = await supabase
      .from("resumes")
      .update(updates)
      .eq("id", id)
      .select();

    if (updateError) throw updateError;
    return NextResponse.json({ success: true, data: updatedData });

  } catch (error: any) {
    console.error("Update API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update resume" }, { status: 500 });
  }
}
