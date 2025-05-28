---
sidebar_position: 2
---

# 📚 About the Dataset

In this workshop, you'll be working with a curated and preprocessed subset of the **Public Jira Dataset**, originally published by researchers from the University of Hamburg:

> Montgomery, Lloyd • Lüders, Clara • Prof. Dr. Walid Maalej  
> [Public Jira Dataset Project (Zenodo)](https://zenodo.org/records/15393866)

This dataset contains real-world Jira issue data from over 1,800 projects and more than 2.7 million issues. We've distilled this massive collection into a focused and workshop-friendly format.

---

## ✨ Workshop Dataset

To make it more manageable and practical for hands-on Retrieval-Augmented Generation (RAG) tasks, we extracted relevant projects, filtered noise, and generated summaries with GPT-3.5 Turbo.

You’ll be working primarily with data from the **JiraEcosystem**, including modules like REST APIs, Webhooks, and Voting systems.

### 📦 Included Files

| File | Description |
|------|-------------|
| `REST_JiraEcosystem_issues.json` | Raw cleaned issues related to REST API |
| `REST_JiraEcosystem_SUMMARY.json` | GPT-generated summaries of REST-related issues |
| `TOC_JiraEcosystem_issues.json` | Table of Contents module issues |
| `VOTE_JiraEcosystem_issues.json` | Voting component-related issues |
| `WEBHOOKS_JiraEcosystem_issues.json` | Event/webhook handling issues |
| `*_SUMMARY.json` | LLM-generated summaries per module |
| `full_quidditch_jira_issues.json` | Simulated internal Jira project for demo/testing |

---

## 🔍 Sample Entry: Raw Issue Example

Here’s a peek at what a cleaned issue looks like from `REST_JiraEcosystem_issues.json`:

```json
{
  "key": "REST-50",
  "summary": "Return HTTP 500 when plugin fails to load component",
  "description": "The REST API will throw an HTTP 500 error if a plugin fails to load a required component. This is hard to debug and provides little feedback.",
  "issueType": "Bug",
  "components": ["REST Module"],
  "status": "Open",
  "priority": "Major",
  "comments": [
    {
      "author": "developer42",
      "body": "I also encountered this when working with a broken plugin descriptor.",
      "created": "2023-01-05T08:23:00Z"
    }
  ]
}
```

---

## 🧠 Sample Entry: GPT-Generated Summary

The `REST_JiraEcosystem_SUMMARY.json` file contains LLM-generated summaries like this:

```json
{
  "project": "REST",
  "summary": "This set of issues revolves around the handling and resilience of Jira’s REST API. Common themes include error codes not being descriptive enough, plugin dependency resolution problems, and inconsistent JSON serialization across endpoints. Several bugs concern the lack of backward compatibility when upgrading REST modules."
}
```

---


---

## 🧾 Why We Generate Summaries

In real-world software projects, technical documentation is often sparse or outdated. While issue trackers like Jira contain valuable information, the data is typically verbose and unstructured.

We generate **summaries** to simulate internal documentation that teams often create manually—think *release notes*, *design specs*, or *project overviews*. These summaries help:

- Provide a **digestible context** to the AI assistant
- Allow the model to answer **high-level or cross-issue questions**
- Enable queries like _"Who contributed to this project the most?"_ or _"What is the main focus of the REST module?"_

This kind of enriched summary acts as a bridge between raw issue data and meaningful insights—just like internal documentation would in a real team.

## 🛠️ How the Data Was Built

Our processing pipeline included:

1. **Data Extraction**  
   From a local MongoDB dump of the Public Jira Dataset, grouped by project/component.

2. **Field Normalization**  
   We simplified and flattened nested structures with a custom script (`extract_and_clean_jira_data.py`).

3. **Sampling & Filtering**  
   Only issues with meaningful descriptions, summaries, or comments were retained.

4. **Summarization**  
   Azure OpenAI’s GPT-3.5 Turbo was used to generate overviews of each project subset.

5. **Output Format**  
   Final JSON files are optimized for ingestion into vector databases and LLM pipelines.

---

## 💡 Optional Enrichment Ideas

If you'd like to extend the dataset, consider:

- Adding GitHub release notes or changelogs for Jira components
- Scraping official Atlassian REST API docs to complement issues
- Creating FAQ-style entries by grouping similar issues
- Generating synthetic feature specs from multiple related issues

---

## 🎯 Why This Matters

This dataset is structured to simulate the kind of **heterogeneous documentation** you’d find in enterprise software projects. It includes bugs, change requests, and dev conversations—all ripe for retrieval-based reasoning.

You’ll be using this to build and test a **RAG-powered AI assistant** capable of:
- Understanding feature behavior
- Identifying high-risk areas
- Suggesting test cases based on natural language descriptions

---

> ✨ **Bonus**: You can reuse our scripts to extract, clean, and summarize your *own* Jira data, giving you a real-world path to bring Testus Patronus into your projects.

---