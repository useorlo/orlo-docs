---
title: "Concepts"
description: "The words the console uses, and what each one means."
order: 6
---

# Concepts

These are the words the console uses. The API uses a few older names, noted where they differ.

| Word | Meaning | In the API |
| --- | --- | --- |
| Organization | The unit that owns tasks, keys, people, and skills. Everything is scoped to it. | `org` |
| Task | One job you want AI to do: classify a ticket, triage a transaction, answer from a policy. | `task` |
| Standard | A task’s expected work: instructions, rules, examples, sources, and skills. Task, dataset, and skill versions are separate; sources remain live. | `task_version`, `dataset`, `validation_config` |
| Example | An input with the answer your reviewers expect. | `dataset_sample` |
| Rule | A check applied to an answer; task settings determine whether a failure rejects, retries, or warns. | `validation_config.rules` |
| Instructions | The prompt a release sends the model, with `{{field}}` placeholders for inputs. | `prompt_template` |
| Version | An immutable snapshot of a task, a dataset, a rubric, or a skill. Changes make a new one. | `version` |
| Comparison | Candidates run on the same examples with the same scoring; results carry confidence intervals. | `evaluation` |
| Judge | A model, never a candidate, that scores answers against a rubric. | `judge` |
| Rubric | Weighted criteria with defined score levels, written by you. | `rubric` |
| Release | A model bound to a task version, with validation and routing settings snapshotted. Sources remain live. One release is active. | `deployment` |
| Answer | One response to one request, logged against its release with the result of each rule. | `inference_log` |
| Sources | Documents a task’s answers may draw on, searched per question, with passages recorded on each answer. | `documents`, `retrieval` |
| Skill | Shared instructions with an owner and published versions, pinned to tasks and distributed to AI tools. | `skill` |
| Agent run | One session of an agent working on a task, with the steps it proposed and the decisions it received. | `agent_session` |
| Step | One model call or tool call an agent proposes. | `agent_step` |
| Decision | What Orlo says about a step: allowed, needs a person, blocked, or contained. | `allow`, `require_approval`, `reject`, `contain` |
| Tool rule | Which tools an agent may call, by tool name and action class. Unknown tools are blocked. | `tool_policy` |
| Limit | How far a run may go: steps, tool calls, writes, external side effects, inactivity. | `runtime_limit` |
| Approval | A step that waits for a person; one approval lets the exact call run once. | `agent_approval` |
| Inbox | Where things that need a person collect: approvals, close comparisons, signals. | |
| Signal | Something Orlo noticed on its own: a pass-rate drop, a judge shift, a model marked deprecated or retired. | `quality_signal` |
| Evidence | The record: answers, comparisons, releases, decisions, approvals, publications. | `audit_event`, logs |
| Provider key | Your credential for OpenAI, Anthropic, or an endpoint you run. | `credential` |
| Runtime key | A key an application or agent uses to call Orlo, with scopes. | `api_key` |
| Operator | A person who runs an Orlo deployment, with the operator console. | |
