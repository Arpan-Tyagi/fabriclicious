# Workflow: Support Escalation & Admin Inbox

## Trigger
- **Event**: The AI Concierge determines the user needs human assistance, or the user explicitly types "talk to a human" on WhatsApp or the web widget.

## Loop Execution
1. **Status Escalation**: The Next.js route handler (or the AI via function calling) mutates the `support_conversations` table, setting `status = 'escalated'`.
2. **Dashboard Notification**: The Admin Command Center polls or listens (via Supabase Realtime) for escalated threads.
3. **Admin Intervention**:
   - The Admin navigates to the `/admin/support` inbox.
   - The UI presents the full thread history (web widget + WhatsApp messages).
   - The Admin types a reply and clicks "Send".
4. **Outbound Dispatch**: The server routes the Admin's message out through the WhatsApp Cloud API directly to the user's phone, preserving the conversation context.

## Checkpoint (Admin)
- **Review**: The Admin reads the AI's prior conversation (the Brief) to gain full context before replying.
- **Action**: The Admin manually handles the thread until resolution, then marks the conversation as `resolved` in the database.
