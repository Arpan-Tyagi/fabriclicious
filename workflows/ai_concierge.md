# Workflow: AI Concierge & WhatsApp Handoff

## Loop 1: On-Site Concierge
- **Trigger**: User opens floating chat widget and sends a message.
- **Execution**: `gemini-2.5-flash` processes the query, grounded in textile expertise. It can invoke function calls to query Supabase for inventory or order status. 
- **State**: Conversation history is persisted in `support_conversations` and `support_messages` in Supabase.

## Loop 2: WhatsApp Handoff
- **Trigger (User Action)**: User clicks "Continue on WhatsApp" in the web widget.
- **Execution (Client)**: User is redirected via a deep link: `https://wa.me/<number>?text=Continuing chat session %5B<Conversation_ID>%5D`.
- **Trigger (System)**: Meta WhatsApp Cloud API sends an incoming webhook to our Next.js route handler containing the user's initial message.
- **Execution (Server)**:
  1. Route handler extracts `<Conversation_ID>` from the incoming text payload.
  2. Fetches historical context from Supabase.
  3. Queries Gemini 2.5 Flash with the historical context.
  4. Dispatches the AI's reply back to the user via WhatsApp Cloud API.
  5. Subsequent messages from that phone number are routed directly to that conversation thread.

## Checkpoints
- Fully autonomous loop, no human-in-the-loop checkpoint required unless the AI decides to escalate to a human Admin (which could flag the conversation in the dashboard).
