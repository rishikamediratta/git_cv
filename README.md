# GitCV 🚀

### AI-Powered, Job-Specific Resume Generation from GitHub Data

GitCV is an AI-powered developer resume system that connects a developer's **real GitHub work** with a **target Job Description (JD)** to generate a tailored, evidence-grounded resume.

Instead of using the same generic resume for every application, GitCV analyzes the role, identifies the most relevant projects and technologies from GitHub, and generates resume content specifically aligned with that opportunity.

> **GitCV's goal:** Understand what a developer has actually built, understand what a job asks for, connect the two with evidence, and help the developer present the strongest truthful case for that opportunity.

---

## ✨ What Problem Does GitCV Solve?

Tailoring a resume for every job is repetitive and time-consuming.

Developers often face problems such as:

* 🔄 Rewriting resumes for different roles
* 📄 Using generic resumes that don't highlight relevant projects
* 🔍 Struggling to identify which GitHub projects best demonstrate a JD's requirements
* 🤖 Risk of AI-generated resumes exaggerating or inventing experience
* 🧩 Difficulty connecting real project experience to specific job requirements

GitCV addresses this by grounding resume generation in **actual GitHub evidence and user-provided information**.

---

## 💡 How It Works

GitCV follows a pipeline that connects GitHub evidence with job requirements:

```text
             ┌───────────────┐
             │ GitHub Profile │
             └───────┬───────┘
                     │
                     ▼
             ┌─────────────────┐
             │ GitHub Analysis │
             └────────┬────────┘
                      │
                      ▼
              ┌──────────────┐
              │ Knowledge Base│
              │    / RAG      │
              └───────┬──────┘
                      │
                      │
┌──────────────┐      │      ┌─────────────────┐
│ Job          │──────┼─────►│ JD Analysis     │
│ Description  │             └────────┬────────┘
└──────────────┘                      │
                                      ▼
                              ┌─────────────────┐
                              │ Project Matcher │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │ Resume Writer   │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │ Resume Critic   │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │ Tailored Resume │
                              │ + Match Score   │
                              └─────────────────┘
```

The core workflow is:

1. Analyze the candidate's GitHub profile
2. Extract projects, technologies, descriptions, and contribution evidence
3. Analyze the target Job Description
4. Identify required and preferred skills
5. Match JD requirements against GitHub evidence
6. Select the most relevant projects and evidence
7. Generate a tailored resume
8. Evaluate the resume against the JD
9. Surface matched skills, missing skills, gaps, and improvement suggestions
10. Allow the user to review and export the final resume

---

## 🧠 Core Features

### 🔗 GitHub-Based Evidence

GitCV uses GitHub data as the foundation for resume generation.

It can work with:

* Repository names
* Repository descriptions
* README content
* Programming languages
* Technologies
* Topics
* Repository URLs
* Relevant contribution evidence
* Reliable measurable project evidence when available

This helps keep generated resume claims grounded in the developer's actual work.

### 🎯 Job Description Analysis

Given a Job Description, GitCV identifies:

* Target role
* Required skills
* Preferred skills
* Responsibilities
* Key requirements

These requirements are then used to determine which parts of the developer's GitHub profile are most relevant.

### 🔎 Project Matching

GitCV retrieves relevant GitHub evidence and ranks projects based on their relevance to the target role.

For example:

> "Find projects demonstrating React, TypeScript and REST API experience relevant to this frontend internship."

The system can use the retrieved evidence to identify projects and skills that support the requirements.

### ✍️ Tailored Resume Generation

The Resume Writer generates role-specific resume content using:

* Job requirements
* Selected GitHub evidence
* Developer profile information

The system is explicitly designed to avoid inventing projects, technologies, achievements, experience, or certifications.

### 🧪 Resume Critique

A Resume Critic evaluates the generated resume against the JD and identifies:

* JD coverage
* Relevant skills
* Missing skills
* Unsupported claims
* Improvement opportunities

It produces a match score, gaps, and feedback.

### 🔁 Writer–Critic Loop

One of the key agentic concepts planned for GitCV is a bounded:

```text
JD Matcher
     ↓
Resume Writer
     ↓
Resume Critic
     ↓
Revision
     ↓
Final Resume
```

The Critic can identify weak JD coverage or unsupported content and provide feedback for the Writer to revise the resume.

---

## 🏗️ Architecture

GitCV is designed around specialized components with meaningful responsibilities rather than using multiple agents simply for the sake of being "multi-agent."

### Planned Agent Architecture

| Agent                 | Responsibility                                             |
| --------------------- | ---------------------------------------------------------- |
| **GitHub Researcher** | Fetch and normalize GitHub profile and repository evidence |
| **JD Analyst**        | Extract role requirements, skills and responsibilities     |
| **Project Matcher**   | Retrieve and rank relevant GitHub projects                 |
| **Resume Writer**     | Generate grounded, role-specific resume content            |
| **Resume Critic**     | Evaluate coverage, relevance and unsupported claims        |

The orchestrator coordinates the workflow and passes structured outputs between these components.

---

## 🧠 Why RAG?

Large GitHub profiles can contain a significant amount of information.

Instead of sending an entire GitHub profile to an LLM for every job application, GitCV is designed to:

```text
GitHub Data
     ↓
Documents
     ↓
Chunking
     ↓
Embeddings
     ↓
Vector Database
     ↓
Relevant Evidence Retrieval
     ↓
LLM
```

This approach can:

* Improve grounding
* Reduce unnecessary LLM context
* Scale as a developer's profile grows
* Create a searchable knowledge base of the developer's actual work

---

## 🛠️ Tech Stack

| Layer                | Technology                     | Purpose                                        |
| -------------------- | ------------------------------ | ---------------------------------------------- |
| **Frontend**         | Next.js + TypeScript           | Web UI, routing, resume preview                |
| **Styling**          | Tailwind CSS                   | Responsive UI and styling                      |
| **Backend**          | FastAPI + Python               | API layer, orchestration and AI pipeline       |
| **GitHub**           | GitHub REST API                | Profile and repository data                    |
| **LLM**              | Gemini API                     | JD analysis, matching, generation and critique |
| **RAG**              | Embeddings + Vector Database   | GitHub evidence retrieval                      |
| **PDF**              | PDF generation library/service | Resume export                                  |
| **Future Auth/DB**   | Supabase                       | Authentication and persistence                 |
| **Future Extension** | Chrome Extension APIs          | Job-page/JD extraction                         |

---

## 📌 Project Roadmap

GitCV is being developed incrementally.

### V0 — UI Foundation

Focus: Validate the product interface.

* Landing page
* GitHub input
* Repository selection
* Resume preview
* Navigation
* Responsive design
* Dark mode

**AI:** Mock data / no AI

### V1 — Functional MVP

Focus: Prove the core intelligence.

* GitHub data ingestion
* Job Description input
* JD skill extraction
* Project matching
* Tailored resume generation
* PDF export
* Basic match score

**Stack:** Next.js + FastAPI + GitHub API + Gemini

### V2 — Profile + RAG + Persistence

Focus: Build a reusable developer profile.

* Persistent GitHub/profile data
* Education
* Experience
* Certifications
* Developer knowledge base
* Embeddings
* Vector database
* Improved retrieval

### V3 — Multi-Agent

Focus: Introduce specialized AI agents.

* GitHub Researcher
* JD Analyst
* Project Matcher
* Resume Writer
* Resume Critic
* Bounded Writer–Critic revision loop

### V4 — Browser Extension

Focus: Reduce job-application friction.

* Browser extension
* JD extraction from supported job pages
* In-context match score
* Tailored resume generation
* User review

### V5 — Application Assistance

Focus: Reduce repetitive application work further.

* Safe application-form autofill assistance
* User review before submission

Automatic job submission is intentionally excluded; the user remains responsible for the final submission.

---

## 🚧 Current MVP Scope

### ✅ In Scope

* GitHub ingestion
* JD analysis
* Project and skill matching
* Tailored resume generation
* Match score
* PDF export

### ❌ Currently Out of Scope

* Authentication / persistent accounts
* Browser extension
* Automatic job submission
* Portfolio generation
* Complex application tracking
* Unnecessary agent frameworks before the underlying concepts are understood

---

## 🛡️ Grounding & Safety

GitCV follows several important product guardrails:

* **No fabricated experience**
* **No invented projects or technologies**
* **No fabricated achievements or certifications**
* Resume claims should be grounded in GitHub/profile evidence or user-provided information
* Users should review generated content before using it
* Match scores are estimates, not hiring probabilities
* Automation assists the user rather than blindly submitting applications

---

## 🎓 Learning Goals

GitCV is also designed as a practical learning project.

Through the project, the goal is to learn:

* Full-stack development with Next.js, TypeScript and FastAPI
* REST APIs and external API integration
* Structured LLM outputs
* Reliable prompt design
* Embeddings and chunking
* Retrieval-Augmented Generation (RAG)
* Tool calling
* Agent responsibilities and orchestration
* AI evaluation through resume/JD critique
* Authentication and persistence with Supabase
* Browser-extension development

---

## 🔬 Research Questions

GitCV can also serve as an experimental platform for evaluating:

* Whether JD-based project selection improves perceived resume relevance
* How accurately the system identifies required JD skills
* How often retrieval returns useful GitHub evidence
* Whether RAG reduces unsupported or hallucinated resume claims
* How well match scores correlate with human judgment
* Whether resume tailoring reduces application preparation time

---

## 🚀 Future Vision

The long-term vision for GitCV is a **grounded AI career assistant for developers**.

A future browser extension could detect a job page, extract its JD, run the GitCV pipeline, display a match score, generate a tailored resume, and optionally assist with safe form autofill.

The final application submission remains a user decision.

---

## 📖 Development Philosophy

GitCV is intentionally being developed **version by version**.

The project follows a simple rule:

> **Understand and complete the current version before adding the next layer.**

Multi-agent orchestration and RAG are the long-term direction, but the immediate implementation should remain small enough to understand, test and learn from.

---

## ⭐ North Star

**GitCV should understand what a developer has actually built, understand what a job asks for, connect the two with evidence, and help the developer present the strongest truthful case for that opportunity.**

