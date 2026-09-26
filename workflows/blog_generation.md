# Workflow: AI Blog Generation

## Trigger
- **Event**: Admin inputs a prompt (e.g., "Textile trends for Winter 2026", "Masterclass on sewing with silk satin") into the Blog Studio.

## Loop Execution
1. **AI Synthesis**: Next.js Server Action queries Gemini 2.5 Pro using `@google/genai`. 
2. **System Prompting**: The AI is instructed to act as a senior fashion editorial writer, generating a cohesive Markdown document including an evocative title, SEO excerpt, body content, and suggested tags.
3. **Form Population**: The AI response populates the Studio UI (a Markdown textarea for content, standard inputs for title/excerpt/tags).

## Checkpoint (Push Right)
- **Review**: Admin reads the raw Markdown in the textarea, using an adjacent live-preview pane to verify formatting.
- **Action**: Admin edits the Markdown, verifies the hero image upload (Supabase Storage), and clicks "Publish to Database" (or "Save as Draft") to insert into the `blog_posts` table.
