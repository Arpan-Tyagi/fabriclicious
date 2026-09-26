import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import { OmnichannelDispatcher } from "@/lib/services/OmnichannelDispatcher";
const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY || 'dummy_key' });
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co', env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key');

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    if (!signature) return new NextResponse("Missing signature", { status: 400 });

    const expectedSignature = `sha256=${crypto.createHmac("sha256", env.META_APP_SECRET).update(rawBody).digest("hex")}`;
    if (expectedSignature !== signature) return new NextResponse("Invalid signature", { status: 400 });

    const body = JSON.parse(rawBody);
    
    // Process incoming message
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            const msg = change.value.messages[0];
            const fromNumber = msg.from; // e.g. "15551234567"
            
            // Match user by E.164 phone
            const { data: profile } = await supabaseAdmin
              .from("profiles")
              .select("id")
              .eq("phone_number", `+${fromNumber}`)
              .single();
              
            if (profile) {
              // Get active conversation or create new
              let { data: conv } = await supabaseAdmin
                .from("support_conversations")
                .select("*")
                .eq("user_id", profile.id)
                .single();
                
              if (!conv) {
                const { data: newConv } = await supabaseAdmin
                  .from("support_conversations")
                  .insert({ user_id: profile.id, session_id: crypto.randomUUID() })
                  .select().single();
                conv = newConv;
              }
              
              // Insert user message
              await supabaseAdmin.from("support_messages").insert({
                conversation_id: conv.id,
                sender_type: "user",
                content: msg.text.body
              });
              
              // Handle Escalation
              if (msg.text.body.toLowerCase().includes("human")) {
                await supabaseAdmin.from("support_conversations").update({ status: "escalated" }).eq("id", conv.id);
                await OmnichannelDispatcher.sendWhatsAppText(fromNumber, "An agent will be with you shortly.");
              } else {
                // AI Auto-Reply
                const response = await ai.models.generateContent({
                  model: "gemini-2.5-flash",
                  contents: msg.text.body
                });
                
                const aiReply = response.text || "I am currently unavailable.";
                
                await supabaseAdmin.from("support_messages").insert({
                  conversation_id: conv.id,
                  sender_type: "ai",
                  content: aiReply
                });

                // Dispatch Meta API outbound message
                await OmnichannelDispatcher.sendWhatsAppText(fromNumber, aiReply);
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
