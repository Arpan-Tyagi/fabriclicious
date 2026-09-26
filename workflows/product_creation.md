# Workflow: AI Product Creation

## Trigger
- **Event**: Admin inputs physical textile specs (GSM, weave, drape, composition) into the Product Creation Studio form and clicks "Generate Luxury Description & SEO".

## Loop Execution
1. **AI Synthesis**: Next.js Server Action sends the specs to Gemini 2.5 Pro using the `@google/genai` SDK with strict JSON schema enforcement.
2. **Form Population**: The structured response (editorial title, narrative, tactile descriptor, SEO) is returned to the client and automatically populates the corresponding inputs in the UI form.

## Checkpoint (Push Right)
- **Review**: Admin reads the generated editorial copy and SEO metadata directly in the populated form (the "Brief").
- **Action**: Admin edits the text if necessary, then clicks "Publish to Database" (or "Save as Draft") which executes the Supabase DB mutation.
