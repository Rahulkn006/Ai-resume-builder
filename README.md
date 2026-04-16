# AI Resume Builder

A modern, professional AI-powered Resume Builder built with Next.js, Tailwind CSS, Supabase, and GROQ/OpenRouter AI.

## Features
- **AI Content Optimization**: Uses GROQ or OpenRouter to generate professional descriptions and summaries.
- **ATS Scoring**: Analyzes your resume against job descriptions and provides an ATS score with suggestions.
- **Multiple Templates**: Choose from several professional templates (Tech, Healthcare, Finance, Executive, etc.).
- **Live Preview**: Real-time preview of your resume as you type.
- **PDF Download**: Export your resume as a high-quality PDF.
- **Secure Storage**: Save and manage your resumes using Supabase.

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A [Supabase](https://supabase.com/) account
- A [GROQ](https://console.groq.com/) or [OpenRouter](https://openrouter.ai/) API Key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd resumebuilder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and copy the contents from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.
   - `GROQ_API_KEY`: Your GROQ API key.
   - `OPENROUTER_API_KEY`: Your OpenRouter API key (optional if using GROQ).

4. **Supabase Database Setup**:
   Ensure you have a `resumes` table in your Supabase database with the following structure (JSONB for data is recommended):
   - `id`: uuid (primary key)
   - `user_id`: uuid (for auth)
   - `content`: jsonb
   - `created_at`: timestamp

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment on Vercel

1. **Push your code to GitHub**:
   Create a new repository on GitHub and push your code.

2. **Deploy to Vercel**:
   - Go to [Vercel](https://vercel.com/new).
   - Import your GitHub repository.
   - In "Environment Variables", add all the keys from your `.env.local`.
   - Click **Deploy**.

## License
MIT
