---
sidebar_position: 2
---

# 📚 About the Dataset

In this workshop, we’ll be working with a curated and cleaned subset of the **Public Jira Dataset**, originally published by researchers at the University of Hamburg:

> Montgomery, Lloyd • Lüders, Clara • Prof. Dr. Walid Maalej  
> [Public Jira Dataset Project](https://doi.org/10.5281/zenodo.7035331)

---

## ✨ Workshop Dataset

To make the data manageable and relevant for RAG-based experimentation, we extracted a small but meaningful subset of issues from several large Jira projects and cleaned them using custom Python scripts. These scripts are included in the repo for reference and reuse.

### 📦 Included Files

These files include the cleaned and optionally summarized issues from the **JiraEcosystem** collection, split by sub-projects:

| File | Description |
|------|-------------|
| `REST_JiraEcosystem_issues.json` | Cleaned issues related to REST API |
| `TOC_JiraEcosystem_issues.json` | Cleaned issues about Table of Contents module |
| `VOTE_JiraEcosystem_issues.json` | Voting component issues |
| `WEBHOOKS_JiraEcosystem_issues.json` | Issues on event webhook features |
| `*_SUMMARY.json` | LLM-generated summaries of issue collections |
| `full_quidditch_jira_issues.json` | An internally simulated issue set for demo purposes |

> 🧼 The data was cleaned to remove irrelevant fields, normalize nested structures, and focus on high-signal fields like:
> - `summary`
> - `description`
> - `comments`
> - `issueType`
> - `components`
> - `status` and `priority`

---

## 🛠️ How the Data Was Built

The extraction and cleaning pipeline includes:

1. **Data Extraction**  
   From a local MongoDB dump of the Public Jira Dataset, issues were pulled by project.

2. **Field Normalization**  
   The fields were simplified and stripped of noise using `extract_and_clean_jira_data.py`.

3. **Project Grouping & Sampling**  
   Issues were grouped by project key (e.g., `REST-123`) and filtered to retain only descriptive ones.

4. **LLM-Powered Summarization**  
   Summaries were generated using Azure OpenAI’s GPT-3.5-Turbo to give an overview of each sub-project.  
   (Optional fallback summaries are included if API calls failed.)

5. **Output Format**  
   All final datasets are in JSON format, ready for ingestion into your RAG stack.

---

## 🔍 Optional Enrichment Ideas

You can expand or customize the dataset with:

- **Release notes** or **changelogs** from GitHub (e.g. for REST/Webhooks projects, if open-source)
- Crawling the official [Atlassian Jira REST API docs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- Using titles + summaries from issues to simulate FAQs or changelog narratives
- Creating artificial feature specs by clustering similar stories/bugs

---

## 🧠 Takeaways

This dataset is structured to mimic real-world documentation and project artifacts, giving you a rich and realistic foundation to test your Retrieval-Augmented Generation workflows.

You're encouraged to adapt it for your own testing contexts, or even extract similar datasets from your internal Jira using similar logic and scripts.

---
