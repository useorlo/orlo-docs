---
title: "How do I see where a candidate performs worse?"
description: "Inspect paired differences by criterion, output field, and input group."
sidebar_title: "Find regressions"
order: 14
---

# How do I see where a candidate performs worse?

Open a completed release test and expand **Where answers differ**. Select a candidate and input grouping to see paired differences by overall score, rule results, rubric criteria, and declared output fields. Open a cell to inspect the examples behind it.

![Paired differences by criterion and input length, with empty groups marked as sparse](./assets/images/console/regression-regions.jpg)

*Open a populated cell to inspect paired answers. An empty group provides no comparison evidence.*

The grid helps locate a problem that a headline average can hide. Output fields use exact JSON matches against expected answers. Input groups use fixed length ranges and categorical fields declared in the input schema. Missing or failed calls remain visible rather than becoming successful pairs.

Groups with fewer than 20 usable pairs are marked sparse. That label is a reading aid, not a significance test. The grid is descriptive: selecting a favorable group does not change the release verdict. The view covers up to 12 rubric criteria, 12 output fields, and two declared categorical input fields.

Use the examples to revise instructions or rules, add representative cases, and run a new test. [Require a passing release test](/console/tasks/release-tests).
