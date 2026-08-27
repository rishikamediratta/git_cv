# GitCV API

Local FastAPI service for GitCV V1. It is intentionally separate from the
Next.js frontend.

## Run locally

From the `backend` directory in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`. Verify it with:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/health
```

The CORS policy permits the local Next.js development origins on ports 3000 and
3001.

## GitHub repositories

`GET /api/github/{username}/repos` returns the first page (up to 100) of a
user's public repositories. Each item includes its name, description, primary
language, topics, `tech` (language and topics combined for the existing repo
cards), stars, and forks.

The endpoint works without credentials, subject to GitHub's unauthenticated
rate limit. To use a personal access token during local development, set it in
the shell before starting the server:

```powershell
$env:GITHUB_TOKEN = "your-token"
uvicorn app.main:app --reload
```

GitHub integration code belongs in `app/services/`, HTTP routes in
`app/routers/`, and response schemas in `app/models/`.
