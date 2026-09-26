import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { env } from "@/env";
import { createClient } from "@/lib/supabase/server";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY || 'dummy_key' });

const checkFabricInventory: FunctionDeclaration = {
  name: "check_fabric_inventory",
  description: "Check the inventory rolls and available yardage for a specific fabric variant.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      variant_sku: { type: Type.STRING, description: "The SKU of the product variant." }
    },
    required: ["variant_sku"]
  }
};

const trackOrderShipment: FunctionDeclaration = {
  name: "track_order_shipment",
  description: "Track the shipment status of an order.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      order_number: { type: Type.STRING, description: "The order number." }
    },
    required: ["order_number"]
  }
};

const escalateToHuman: FunctionDeclaration = {
  name: "escalate_to_human",
  description: "Escalate bespoke inquiries to a human by generating a WhatsApp link.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      conversation_summary: { type: Type.STRING, description: "A summary of the user's inquiry." }
    },
    required: ["conversation_summary"]
  }
};

const tools = [{
  functionDeclarations: [checkFabricInventory, trackOrderShipment, escalateToHuman]
}];

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `System Persona:
You are "The Fabriclicious Atelier Concierge". You speak with the warmth, dignity, and technical precision of an experienced tailor and textile conservator. You do not push sales; you provide learned, objective fabric counseling. You employ terminology like "drape coefficient," "momme weight," and "bias stability" thoughtfully, ensuring every client feels respected and informed.

Calculation Guidance Logic:
*When a customer asks: "How much fabric do I need for a dress?"*
Response Script:
> The yardage depends on two vital factors: the usable width of the cloth (typically 110cm vs 140cm) and the cut direction. For a classic A-line knee-length dress in 140cm wide fabric, 2.0 to 2.2 meters is standard. However, if you are cutting on the true bias—such as with our Como Silk Charmeuse—you must add 25% to 30% additional yardage to accommodate diagonal pattern layout. Would you like me to calculate your exact yardage based on your pattern dimensions?

Escalation Script (Bespoke Inquiries / High Meterage):
> For tailored bridal commissions, continuous lengths exceeding 20 meters, or wholesale trade accounts, allow me to connect you directly with our Master Cutter via WhatsApp. They will review your pattern markers and dye lots personally.

If the user needs to escalate, call the escalate_to_human tool.` }] },
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        tools: tools,
      }
    });

    const functionCalls = response.functionCalls;
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "escalate_to_human") {
        const summary = (call.args?.conversation_summary as string) || "Bespoke Inquiry";
        const link = `https://wa.me/1234567890?text=${encodeURIComponent(summary)}`;
        return NextResponse.json({ reply: `I have compiled your request. Please connect with our atelier directly on WhatsApp: ${link}` });
      }
      
      const supabase = await createClient();
      let toolData = null;

      if (call.name === "check_fabric_inventory") {
        const { data } = await supabase.from('product_variants').select('*, inventory_rolls(*)').eq('sku', call.args?.variant_sku as string).single();
        toolData = data;
      } else if (call.name === "track_order_shipment") {
        const { data } = await supabase.from('orders').select('*').eq('order_number', call.args?.order_number as string).single();
        toolData = data;
      }

      const secondResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: message }] },
          { role: "model", parts: [{ functionCall: call }] },
          { role: "user", parts: [{ functionResponse: { name: call.name, response: { result: toolData } } }] }
        ]
      });
      return NextResponse.json({ reply: secondResponse.text });
    }

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
