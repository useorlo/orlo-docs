---
title: "Why did automatic permission pause?"
description: "Inspect changed configurations, stale evidence, and deterioration before resuming a measured permission."
sidebar_title: "Automatic permission paused"
order: 5
---

# Why did automatic permission pause?

Orlo suspends a measured permission when its authorized configuration no longer qualifies, evidence becomes stale or delayed, or independent reviews show deterioration. Open **View evidence and status** on that permission to read the reasons. Calls that relied on it return to approval, including calls from existing runs.

## Resolve the reason shown

| Reason | What to do |
| --- | --- |
| Task, permissions, or skills changed | Review the change and establish evidence for the intended configuration. An edited band starts a new shadow revision. |
| A call uses an unfamiliar configuration or has missing facts | Supply the right model/runtime declaration and arguments. That call cannot borrow another configuration’s permission. |
| Reviews or traffic are too old | Continue collecting fresh observations and independent reviews. |
| Too many selected samples lack usable judgments | Ask eligible reviewers to assess them. Unknown judgments do not count as safe or agreed. |
| Evidence processing is delayed | Keep approval required while processing catches up. |
| Review evidence deteriorated | Investigate the affected actions and address the cause before considering resumption. |

An unfamiliar call can return to approval without suspending a different, still-eligible configuration. Inspect both the call’s explanation and the band’s state.

## Resume deliberately

An authorized member supplies a reason and chooses **Resume** once the existing authorized configuration meets the current requirements. Orlo keeps the prior judgments; resumption does not erase an unfavorable history. A band never resumes itself.

Retirement ends automatic permission. Calls already dispatched cannot be recalled. Stricter organization rules and run limits continue to apply. [Understand measured permissions](/console/agent-runs/measured-permissions).
