# ISR: Index of Social Responsibility — Complete Documentation

> This document compiles the complete English-language content from the ISR website (https://isr-vote.com/) across the Homepage, What is ISR, MVP, AAuth, and Foundations sections.


## Table of Contents

1. [Homepage](#homepage)
2. [What is ISR](#what-is-isr)
3. [MVP](#mvp)
4. [AAuth (Adaptable Authorization)](#aauth-adaptable-authorization)
5. [Foundations — Social OS](#foundations--social-os)
6. [Foundations — Philosophy](#foundations--philosophy)
7. [Foundations — Sociology](#foundations--sociology)
8. [Foundations — Augmented Democracy (ISR & Hannah Arendt)](#foundations--augmented-democracy-isr--hannah-arendt)
9. [Foundations — Computing the Objective (ISR & Martin Heidegger)](#foundations--computing-the-objective-isr--martin-heidegger)
10. [Foundations — Frequently Asked Questions (FAQ)](#foundations--frequently-asked-questions-faq)

---



# Chapter 1: Homepage


*Source: `index.html`*

---


# Index of Social Responsibility (ISR)

**A framework for genuine collective decision-making — built on community values, demonstrated contribution, and transparent accountability.**

[Video: YouTube video player](https://www.youtube.com/embed/lGg97DN6ukA?si=4ndp4QjZ86iJpBl3)

## The problem ISR addresses

Most communities — housing cooperatives, NGOs, professional associations, civic DAOs — make collective decisions through two imperfect mechanisms: formal voting, where every voice counts equally regardless of knowledge or stake, or informal hierarchy, where the loudest or most senior person prevails. Both methods produce decisions that often feel unfair, unwise, or both.

ISR is a framework for doing better. It gives each member an influence weight on each specific issue that reflects how directly they are affected by it, what relevant knowledge they bring, and how their past actions align with the community's own stated values. The calculation is transparent, contestable, and recomputed fresh for every decision.

ISR does not replace law. It works in the space that law, contracts and statutes leave open: the many decisions a community has to make that no rule settles. Anything decided with its help must be implemented within applicable law.

## How it works

- **Ad-hoc Publics:** For each issue, ISR assembles only the members genuinely affected by it — not a standing committee, not whoever attends the meeting, but the people with real stakes in the outcome.
- **Community-defined Values:** Each member declares their own values. The community's shared Vector of Values emerges from aggregating those declarations — no values are preset from above.
- **Weighted Influence:** Each member's influence on a given decision is computed from three factors: contextual Relevance, domain Expertise, and history of Contribution — all transparent and independently inspectable.
- **Accountability by Design:** Every action is logged, every score explained. Responsibility and privacy are balanced through a tiered authorization model.

[🧩 Full technical overview](https://isr-vote.com/wiki/)

## The philosophical grounding

ISR did not emerge from a technical idea. It emerged from a diagnosis: large, educated, interconnected societies keep making decisions that most of their members consider bad, and the structures meant to prevent this — representative democracy, formal institutions — are visibly failing to do so at the scale and speed the present requires.

The framework draws on Hannah Arendt's concept of the *Space of Appearance* — the political realm that comes into being only when distinct people gather, speak, and act together on matters of genuine common concern — and asks what it would take to restore that space in communities of any size, using the computational tools now available. ISR is built on a belief that AI should expand human political agency, not substitute for it.

    Read the [📖 Philosophy](https://isr-vote.com/wiki/ISR-philosophy.html),
    [🧑‍🤝‍🧑 Sociology](https://isr-vote.com/wiki/ISR-sociology.html) and
    [⚖️ Augmented Democracy: ISR & H.Arendt](https://isr-vote.com/wiki/ISR-Arendt-article.html) articles

## Who is ISR for?

- Housing cooperatives and neighborhood associations facing governance complexity
- NGOs and civic groups seeking fair, expertise-weighted deliberation
- DAOs needing transparent, merit-based decisions with community-owned values
- Any organization where informal power has displaced genuine participation

## Where to go next

- [📖 Understand the idea](https://isr-vote.com/wiki/ISR-philosophy.html) — the intellectual grounding, the historical diagnosis, the civilizational stakes
- [🧩 See how it works](https://isr-vote.com/wiki/) — the technical architecture, from core concept to implementation detail
- [🔧 Product & technology](https://isr-vote.com/wiki/mvp.html) — the MVP design, feature list, and research roadmap
- [💬 FAQ](https://isr-vote.com/wiki/faq.html) — honest answers to the hard questions
- [🔬 Explore ISR](https://isr-vote.com/explorer/) — interactive explorer

Contact & community

[![Image](https://isr-vote.com/images/linkedin-logo.png)](https://www.linkedin.com/in/isr-sp/)


---




# Chapter 2: What is ISR


*Source: `wiki/index.html`*

---


# Index of Social Responsibility (ISR): System Overview

### From core concept to technical architecture — a layered introduction

**New to ISR?** This page is the technical architecture overview — it goes from the core concept down to the mathematical detail.
      If you want to start with *why* ISR exists and the thinking behind it, read the
      [**Philosophy**](https://isr-vote.com/wiki/ISR-philosophy.html) first.
      For quick answers to common questions, see the [**FAQ**](https://isr-vote.com/wiki/faq.html).

[Video: YouTube video player](https://www.youtube.com/embed/d6JtpF-o5ms?si=FfUp37iaVFyb7ila)

The **Index of Social Responsibility (ISR)** is a practical framework for improving collective decisions in communities where members are formally equal but differ significantly in their knowledge, stake, and history of contribution — for example: housing cooperatives, non-profits, civic DAOs, professional associations, and neighborhood governance bodies.

Most such communities rely on one-person-one-vote or formal/informal representative hierarchy. The first treats every voice as equally relevant regardless of context; the second makes the loudest or most senior voice decisive. ISR offers a third option: influence weighted by **Relevance** (how directly this issue affects you), **Expertise** (how can you affect the issue with your relevant knowledge or resources), and **Contribution** (your verified history of action in the community) — all computed transparently, per issue, and contestable by any member. The philosophical argument for why this is necessary and how it is grounded is developed fully in the [Philosophy](https://isr-vote.com/wiki/ISR-philosophy.html) chapter.

ISR operates inside applicable law. Where law fully settles a question there is nothing to weigh; where it settles part of a question, ISR addresses only the remainder.

### The Challenge: Why Traditional Voting Falls Short

    Community associations face persistent governance challenges that standard one-person-one-vote systems cannot address:

- Membership Dynamics & Bureaucratic Inertia. As membership changes—people joining, leaving, or becoming inactive—formal governance structures fail to adapt. Decisions end up made by whoever happens to be visible rather than whoever is genuinely invested or capable.
- Centralization of Power. As communities grow, decision-making authority concentrates among a small leadership group, while ordinary members retain only periodic voting rights. This breeds populism, reduces accountability, and disconnects leaders from actual member needs and values.
- Expertise Ignored. Simple majority voting discounts expertise and track record, often leading to decisions that squander resources or create poor outcomes.
- Vocal Minorities Dominate. The loudest or most numerous voices outweigh knowledgeable contributors, disadvantaging careful experts in favor of populistic operators.
- Engagement Collapse. Members with real, context-specific experience and a history of concrete contributions feel unheard, so they disengage. Why participate if neither your expertise nor your actual work for the community has any visible impact?

### What ISR does differently

    ISR links contribution, competence, and contextual stake to actual decision influence. Key properties:

- **Accountability and genuine participation.** A transparent, bidirectional link between what members contribute — skills, actions, values alignment — and their influence on decisions. Genuine engagement is rewarded; passive presence is not.
- **Expertise recognized, contribution rewarded.** Members with relevant domain expertise and a constructive track record gain proportionally greater voice on decisions within their competence area. Members with high ambitions but limited relevant knowledge have appropriately moderated influence — decisions benefit from genuine expertise rather than political capital.
- **Faster, more legitimate decisions.** Weighting voices according to criteria the community itself defines accelerates decision-making and increases legitimacy: the reasoning is transparent and auditable by any member.
- **No black boxes.** Every member can see exactly why certain participants carried more influence on a given issue — what expertise was recognized, what track record was considered, what values were weighted.
- **Distributed decision ownership.** Authority stays with the community through ad-hoc issue-specific publics rather than concentrating in a leadership layer. This reduces deadlock while keeping power distributed.

## What is ISR — core concept and product form

### Core concept

ISR (Index of Social Responsibility) is a context‑aware influence coefficient for each participant with respect to a specific question or issue, computed as a function of three components: Relevance (how much the issue directly affects the person), Expertise (domain‑specific knowledge and resources - how much the person can directly affects the issue) and Contribution (past actions valued by the ad-hoc public). That score (the ISR) is then used to weight that participant's vote or influence in the decision for that issue within the corresponding ad-hoc public formed around this question. ISR is not a permanent universal "label" on a person (like a "social credit" rating) - it is calculated for each specific question and can only be applied only to that question. And its components are transparent and explainable to participants.

            $$ISR = f(Relevance, Expertise, Contribution)$$

### Implementation (MVP)

The minimum deployable product is a web application that:

- lets communities declare their shared values and choose weighting parameters;
- lets people create structured profiles that feed ISR components: demographic and geographic data for Relevance, education and work history for domain-specific Expertise, and declared values plus logged actions for Contribution;
- lets people start discussions or voting on socially important issues (problems, questions, proposals);
- forms dynamic ad-hoc publics around concrete issues using a Relevance score (combining demographic, geospatial, semantic and social proximity) and proposes the most affected participants;
- calculates ISR scores for the issue by combining each participant's Relevance, domain-specific Expertise and community-assessed Contribution, and uses those scores in weighted voting;
- logs decisions, tasks and execution progress; and
- provides explainability: members can inspect how their ISR was computed (Relevance, Expertise and Contribution components) — and which factors mattered most.

#### Product (MVP) — main screens and user flow

The ISR MVP focuses on workflows that matter for community decisions:

- **Profile:** flexible individual user profile fields, its declared values and skills (used in expertise scoring).
- **Values:** each user notes their own values in the most convenient of several possible ways (the standard one is a text description of the future they would like to live in and which they are ready to build). The system helps to identify and explain the impact and meaning of each element.
- **Chat & Discussion:** threaded debates with the ability to react to messages; messages also contribute to ISR as evidence of contribution.
- **Voting:** issues with proposed options, deadlines, and ISR-weighted voting results.
- **Tasks:** implementation tracker created after decisions: evidence of completed tasks increases contribution scores for the next votings.
- **AI assistant:** helps users at every step as needed and explains ISR calculations.

This product design emphasizes transparency, guided AI assistance, and clear links between decisions and executed tasks. For a full feature list and product rationale see the ISR MVP page.

[🚀 **ISR-vote** (MVP) design: feature list and product details](https://isr-vote.com/wiki/mvp.html)

## How ISR works & What ISR parts

#### Registering & Profile filling out

Registering in the system demands **Proof of Identyty** use to be sure the person identity, for example, with **Bank.ID**. The crusial point of the system that every single person can have **only one account** which logs all social actions of the person.

**Profile** provide an ability to state all the person major social features:

- **Demographic and statistical facts.** Sex, age, nationality, religion, pets, property obtained (such facts are used only to determine who is affected - for example, the owner of a building - never as a weight) - everything is matter.
- **Social relations** (family, geography, economical, interests etc.). A base for context **Relevance** evaluation. Acceptance by the other person could be required.
- **Credentials.** List of verified facts about gained education in certain fields. Part of a member's **Expertise**.
- **Experience.** Records of serving, production, researching, performing that prove your **Expertise** in certain domains. Includes details of where, when, how long and how good the Expertise was applied.
- **Action log.** Automatically adds all member's social activity both "real" (or "hard", objective) - that has some direct physical results and "virtual" (or "soft", subjective) - communication style, rspectfulness, tollerance. Also it is possible to add some untracked actions through the Profile with AI checking (also may need other people approval). Every record consists of:

  - (Optional) Reference to a question in **Chat** or **Voting**.
  - Action text **description**.
  - (Optional) Action **results** text description.

            Impacts on **Contribution**.
- **Values statment.** ISR values ​​subsystem is used to evaluate personal actions according to the values ​​of the ad-hoc public, which are aggregated from the individual values ​​of its members. Individual values are entered by participants at the stage of filling out the Profile (and could be edited later) in one of the listed ways or in a step-by-step combination:

- Free **story** about future society the person wants to live in
- A **survey** that allows you to identify life values
- Choosing a well-known person as a **prototype** whose attitude to the social life will be the basis for describing values

##### Vectorization of user data and social graph

**Social connections** data is represented as a **graph structure** where nodes are users and edges represent relationships (relatives, friendship, collaboration, etc.). Graph embedding techniques (e.g., Node2Vec, GraphSAGE) are applied to convert this graph data into vector representations that capture the structural and relational properties of users within the social network.

All other Profile data is also converted into vector representation in semantic space using LLM-based embedding models and saved into vector DB. This vector representation is used in calculating **Relevance**, **Expertise** and **Contribution** - all components of the ISR.
\[
\begin{align*}
\vec{v}_f = m \cdot \vec{d}_f
\end{align*}
\]
where:
- \(\vec{v}_f\) - vector representation of user profile fact **f** (personal data, graph data, education credentials, work experience, actions)

- \(\vec{d}_f\) - user profile fact vector semantic **direction**

- \(m\) - scalar that shows **"force"** of the recorded fact (distance for graph data, degree for education, years for experience, scale for actions)

##### Vectorization of user values

Regarding values, the system **converts** any input description into a **single vector representation**, which is taken into account when compiling the **Vector of Values** of ad-hoc publics. The participant can change his values, but if this happens often and very sharply, the system will analyze such actions for attempts at manipulation in order to influence specific issues and warn that such actions (inconsistency and opportunism in declaring values) can lead to a decrease in the overall influence of the participant.

The system, using an AI assistant, provides participants with the opportunity to translate **one form into another** (vectorized array into a narrative text and vice versa), and also **explains** in what sense the system perceives the concepts used to describe values and what **impact** individual elements have on social actions and their assessment.

So, at the operational level, the values of the participants are an **array of vector representations** in a specialized database. The complete collection of vectorized user values ​​constitutes the ISR Matrix of Values.

[Video: YouTube video player](https://www.youtube.com/embed/KeFygdBjrzE?si=CgwHxKBQgBMeek-D)

At a high level ISR operates in a short cycle:

![Image](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/isr-flow.png)

#### Issue appears

A concrete **problem** needed to be solved or **question (q)** is raised in the system. An issue can be created by **any** community member. It should include a clear **description** of the problem, context, and desired outcomes. **AI-assistant** may **help** in categorizing and tagging the issue for better stakeholder matching.

The formation of a **ad-hoc public** around the question **q** is based on methods of analyzing graphs of geographical, gynecological, social, economic, etc. user connectivity. As well as on methods of clustering in network space and semantic analysis using LLM. The **scalar value** of the question vector indicates the contextual scope and expert complexity of the question, which also affects the number of participants involved in the ad-hoc public.

The question **q** must meet the following requirements:

- **Text.** A clear specific request for which public consensus is required.
- **Context.** A multifactorial description of the temporal and spatial (geographical, social, etc.) conditions for which the question text is relevant.
- **Solution options.** Optional for discussion, mandatory for voting. Must contain options for a specific answer to the question.

          ↓

#### The system identifies relevant stakeholders - who the issue affect at

The system suggests a **set of participants** whose profiles, past actions, geographic or organizational proximity, and social ties make them **relevant to this issue**. Using natural language processing (NLP) and graph analysis, the system analyzes the issue description and matches it against participant profiles and activity history to identify those most relevant to the topic.

1. **Determining the contextual profile of the question q.** Extracting key topics, domains and stakeholders from the question description using LLM. Vector representation of the question in semantic space (nesting).
2. **Calculating** the situational **Relevance** for each user **i**. Relevance shows how strongly a person is related to the issue across four dimensions:

  - **demographic (D)**: whether their life situation matches the target group (for example, parents of small children for a childcare question);
  - **geospatial (G)**: how close they are in space to where the decision will have effect;
  - **semantic (S)**: how much their interests and activities match the topic of the issue;
  - **social (X)**: whether they are socially connected to people who are directly affected.

- **Connecting to the ad-hoc public** of users with \(\text{Relevance} > \Theta\) , where \(\Theta\) is the threshold set by the context of the question **q**.

          ↓

#### Ad-hoc Public forms

That set becomes a temporary ad-hoc public for deliberation and voting on the issue. The identified stakeholders are invited to join an ad-hoc public dedicated to addressing the issue. This group will deliberate, propose solutions, and vote on the best course of action.

[![ISR Ad-hoc Public Lifecycle](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a2.svg)](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a2.svg)

*Ad-hoc Public Lifecycle: Dynamic Problem-Oriented Formation*

##### Ad-hoc Publics — temporary groups around concrete problems

ISR forms ad-hoc publics automatically. An ad-hoc public is a set of relevant stakeholders (persons) gathered to deliberate and decide on a single concrete issue. It appears when needed and dissolves once the issue is resolved and tasks are closed.

Key advantages:

- Focus: decisions are handled by the people most connected to the problem.
- Efficiency: fewer irrelevant voices in deliberations, while preserving transparency of outcomes.
- Legitimacy: membership and weights are computed (for all members in the same way) and explained, not arbitrarily assigned.

Technically, Relevance (the probability of a user belonging to an ad-hoc public) is calculated by matching the context of the question with various types of user data:

  $$Relevance = f(Demographic, Geographic, Semantic, Social)$$

And all whose Relevance more than certain threshold (typically 0.15) automatically included to the ad-hoc public.

##### Ad-hoc Public gathering. Example 1: Local Community

**Question:** "How should the reconstruction of the children's area and adjacent pedestrian zone in Parc de la Ciutadella be prioritized: more play equipment, more shade and seating, or more open green space?"

            ⬇️ gathers ⬇️

            Ad-hoc Public from the **local community**

            ⬇️ with members ⬇️

**Member 1: Marta ** - parent living near the park. **Relevance: 0.95**

- **Demographic:** High. She is a parent of a small child, which makes her a direct stakeholder in the children’s area.
- **Geographic:** Very high. She lives within walking distance of the park and uses it frequently.
- **Semantic:** High. Her interests closely match the issue: child safety, comfort, shade, and family-friendly public space.
- **Social:** High. She is connected to nearby parents, school groups, and local residents who will discuss and experience the redesign.

**Member 2: Josep  ** - retired resident with mobility limits. **Relevance: 0.87**

- **Demographic:** High. He represents elderly users and people who need accessible seating and easier movement.
- **Geographic:** High. He lives in the same neighborhood and uses the pedestrian zone regularly.
- **Semantic:** Medium. His concerns relate to accessibility and comfort more than playground design itself.
- **Social:** Medium-low. He is embedded in local senior and neighborhood networks.

**Member 3: Laia  ** - landscape architect. **Relevance: 0.42**

- **Demographic:** Low. She is not a daily park user in the same way.
- **Geographic:** Very low. She lives in a neighboring town.
- **Semantic:** Very-high. Her interests closely match the issue: child safety, comfort, shade, and family-friendly public space. Plus, her profecional area is highly relevant to the question.
- **Social:** Medium-high. She is connected to nearby parents, school groups, and local residents who will discuss and experience the redesign.

##### Ad-hoc Public gathering. Example 2: Remote Collaboration

**Question:** "For the OpenSky open-source project, what should be the next development priority: improve ADS-B data quality validation, expand historical flight-data analytics, or build a simpler contributor API for external developers?"

            ⬇️ gathers ⬇️

            Ad-hoc Public of **OpenSky project** developers and stakeholders

            ⬇️ with members ⬇️

**Member 1: Hanna ** - core maintainer and data pipeline lead. **Relevance: 0.99**

- **Demographic:** Very high. She is a core maintainer and directly responsible for project direction.
- **Geographic:** N/A. The project is developed online so geography is not important.
- **Semantic:** Very high. Her role strongly matches data validation, analytics, API design, and technical prioritization.
- **Social:** N/A. The project is a kind of job so social connection don't affect Relevance.

**Member 2: Tomas  ** - contributor and frequent API user. **Relevance: 0.79**

- **Demographic:** High. He contributes regularly and uses the system heavily, though he is not a main contributor.
- **Geographic:** N/A.
- **Semantic:** Very high. He has a strong match with developer tooling, API usability, and data-use workflows.
- **Social:** N/A.

**Member 3: Elise ** - volunteer documenting tutorials. **Relevance: 0.35**

- **Demographic:** Medium. She is a contributor, but her work is mostly documentation and onboarding.
- **Geographic:** N/A.
- **Semantic:** Medium. She is relevant through contributor experience, but less directly tied to core architecture choices.
- **Social:** N/A.

##### Ad-hoc Public gathering. Example 3: Charity

**Question:** "An elderly health-care charity 'Warm Touch' has limited volunteer hours this quarter. Should it prioritize more home visits, transportation to medical appointments, or a medication-adherence phone support program?"

            ⬇️ gathers ⬇️

            Ad-hoc Public of volunteers of **charitable organization 'Warm Touch'**

            ⬇️ with members ⬇️

**Member 1: Iryna ** - volunteer nurse coordinating home visits. **Relevance: 0.97**

- **Demographic:** Very high. She directly performs and coordinates the charity’s core care work.
- **Geographic:** High. She works in the same city and on the same routes where services are delivered.
- **Semantic:** Very high. Her role strongly matches home care, transport support, and medication adherence.
- **Social:** Medium. She is connected to volunteers, beneficiaries, and medical contacts who will be affected by the decision.

**Member 2: Petro ** - retired volunteer driver. **Relevance: 0.63**

- **Demographic:** High. He is an active volunteer, but his responsibility is narrower than the care coordinators.
- **Geographic:** Very high. He lives and works directly in the area of ​​the organization's activities.
- **Semantic:** Medium-low. His area of ​​interest is exclusively transportation.
- **Social:** Medium-low. He has some ties to volunteers and recurring beneficiaries.

**Member 3: Oksana ** - family liaison and weekly call volunteer. **Relevance: 0.42**

- **Demographic:** Medium. She directly supports some elderly beneficiaries through communication and follow-up.
- **Geographic:** Medium-low. She lives relatively far from the organization's area of ​​operations.
- **Semantic:** High. Her interest in sociology and philanthropy is closely related to the issue.
- **Social:** Medium. Her aunt and uncle also receive help from 'Warm Touch'.

          ↓

#### ISR scores are computed

For this specific issue each participant receives a score computed from three components (**Relevance, Expertise, Contribution**). The **ISR** score for each participant is calculated based on their **situational relevance** to the issue, their **expertise** in the relevant domain, and their historical **contributions** to the community. These components are also weighted according to the issue context.

##### ISR components — Relevance, Expertise, Contribution & Vector of Values

**Values subsystem**: It is a kind of legislature system in the ISR framework. Every user states its own life (economical, political, cultural, etc.) values. These values don't change because of the new ad-hoc public belonging - only if the member changes or clarifies his own life values. The values are vectorized and full values collection of all ISR users constitutes 'Matrix of Values'. After gathering ad-hoc public around some problem, its "Vector of Values" appears by aggregation all its members' individual values from Matrix of Values. So we got an actual, inclusive, pluralistic basement to understand the ad-hoc public needs and values which can be used for all further ISR estimations.

**How Vector of Values Is Used:**

---

**1. Baseline Reference:** The aggregated values serve as the ad-hoc public's shared baseline for what matters in this ad-hoc public

**2. Influence Weighting:** When calculating ISR influence scores, the community's Vector of Values determines Contribution, providing a badrock of actions assessment

**3. Holistic Assessment:** Rather than imposing external criteria, the framework reflects what this specific ad-hoc public actually values

**4. Accountability:** Members see their collective values, so they understand exactly how their actions will be evaluated

**Key Principle:** The Vector ensures pluralism by reconciling diverse points of view.

##### Vector of Values calculation example

\[
\begin{align*}
\vec{V}_{\mathrm{mv}} = \frac{1}{n} \sum_{i=1}^n \, R_i \cdot \vec{V}_i
\end{align*}
\]
where:
- \(\vec{V}_{\mathrm{mv}}\) - the ad-hoc public's **Vector of Values**

- \(R_i\) - **Relevance** of **i** member

- \(\vec{V}_i\) - vectorized **values** of **i** member

**Matrix of Values in simplified view**

  (5 members, 10 value domains, with Relevance for some issue)

|  | Member 1 | Member 2 | Member 3 | Member 4 | Member 5 |
| --- | --- | --- | --- | --- | --- |
| Relevance | 0.91 | 0.68 | 0.43 | 0.57 | 0.39 |
| Agency & Freedom | 82 | 68 | 61 | 75 | 59 |
| Relationality & Care | 74 | 63 | 81 | 69 | 71 |
| Security & Stable Order | 66 | 79 | 57 | 72 | 63 |
| Justice & Fairness | 88 | 76 | 69 | 83 | 72 |
| Redemption & Restoration | 54 | 49 | 67 | 62 | 58 |
| Authentic & Expression | 70 | 58 | 73 | 64 | 69 |
| Protective Care & Stewardship | 81 | 72 | 77 | 79 | 74 |
| Cooperation & Shared Governance | 85 | 71 | 74 | 80 | 70 |
| Spiritual & Religious Practice | 22 | 35 | 41 | 27 | 38 |
| Digital Rights & Tech Democracy | 91 | 64 | 59 | 87 | 68 |

**Vector of Values Aggregation**

  (Relevance-weighted average across the 5 members above)

**Ad-hoc Public's Vector of Values**

| Agency & Freedom: | 71.43 |
| --- | --- |
| Relationality & Care: | 71.15 |
| Security & Stable Order: | 68.42 |
| Justice & Fairness: | 79.47 |
| Redemption & Restoration: | 56.79 |
| Authentic & Expression: | 66.42 |
| Protective Care & Stewardship: | 77.07 |
| Cooperation & Shared Governance: | 77.30 |
| Spiritual & Religious Practice: | 30.76 |
| Digital Rights & Tech Democracy: | 76.45 |

The next three elements make up the ISR as constituent parts

[![ISR Score Calculation Model](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a3.svg)](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a3.svg)

**Key ISR Principle**

Unlike traditional "one-person-one-vote" systems, each member's influence coefficient varies based on:

- Their contextual connection to the issue
- Their actual expertise in the issue domain
- Their proven track record of contribution

    AI determine the components weights (wR, wE, wC) through the issue context.

#### 1. Context Relevance (R)

Measures how directly a person is connected to the current issue: declared interests, proximity (geographic or organizational), recent activity on similar topics, social ties to other stakeholders. Practically this is estimated via semantic matching between the issue description and the participant's profile plus graph-based proximity metrics. The calculation method is generally described above.

#### 2. Expertise (E)

Expertise reflects a person's domain-specific competence and capacity to act in this issue.

        It is calculated from three sources:

- **education** in relevant domains;
- practical work **experience** in related roles;
- **resources** the member has pledged to resolving this issue (equipment, space, contacts, time). Resources count only when committed to the issue; owning them is not enough. Money is not counted: if an issue needs funding, each solution option states its funding plan and proposed source.

        These components are aggregated into a numerical **Expertise** score for the certain question - not a “universal intelligence” measure.

#### 3. Contribution (C)

Reflects the participant's verified **history of actions** in the community — tasks completed, constructive discussion, verified outcomes, peer evaluations, etc. Contribution is the system's operational "karma" measure: actions and their impact are recorded and vectorized so the AI can evaluate alignment with the community's declared values.

After calculating the situational **Relevance**, a list of **n** ad-hoc public participants appears with the corresponding weights \(R_i\) regarding relevance to the question **q**. Vector representations of their values \(\vec{V}_i\) (taking into account **Relevance**) make up the ad-hoc public's **Vector of Values**, which can also be translated into a form convenient for the participant with explanations from the AI assistant. Therefore, the greater the **Relevance** of a member, the more the member's values influence **the values of the ad-hoc public**.

**Contribution** is based on a structured record of past actions as seen by the public. Each action is represented as a vector in the same value space as the community's shared Vector of Values and evaluated along three axes:

- **Alignment (A):** how well the action matches the community's declared values;
- **Force (F):** how strong the action was (type of effort, time invested, complexity and result);
- **Sentiment (S):** how other members reacted to it (marked as good, funny, rude, flood, foolish).

                The contribution of a single action is computed from A, F and S, and a person's overall Contribution in a public is the aggregate over all their actions.

Finally **ISR is calculated** out from **Relevance, Expertise, Contribution** and normalized to unit mean (ad-hoc public's average score is always 1) to psychologically simplify adaptation to the new approach.

Those who have greater ISR-score have a proportionally greater influence on the final decision.

          ↓

#### Deliberation and weighted voting

During the discussion, everyone sees the ISR scores of other participants. Along with the ISR score, "good" marks move the message up, "rude", "flood", "fool" marks push the message down in the dicussion board. This ensures that the messages of the arrogant and talkative will not drown out the ideas and statements of those who make constructive suggestions and sincerely want to solve the issue.

During the discussion, options for solving the issue or problem are formed. After that, ISR points are used to weigh the votes during voting - this is how the community makes a decision.

##### Comparison of Traditional Representative Democracy and ISR Model

[![Representative Democracy vs ISR-model](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a1.svg)](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a1.svg)

Unlike the traditional model where common folks separated from decision-making, ISR ensure possibility of real direct involvement for every single community member.

#### Quick comparison table

| Aspect | Representatives | ISR weighted |
| --- | --- | --- |
| The majority members actions | Once every five years they elect representatives, and the rest of the time they watch someone else make decisions about their lives and live the consequences of those decisions. | They are directly included to ALL issues related to their lives. |
| Who decides | Representatives only | All participate, influence weighted by ISR |
| Expert input | Optional, often ignored | System highlights relevant expertise |
| Transparency | The motives of decision-makers are not always clear; rationales is often absent | Scores and contributing evidence are explainable |
| Problems | Bureaucracy, populism, corruption | Takes time and a change in public consciousness for wide implementation |

          ↓

#### Implementation & monitoring

Once a decision is made, the agreed-upon options are implemented and monitored. The voted solution consists of specialized tasks. Chosen tasks are tracked and outcomes feed back into contribution records (affecting future ISR). The outcomes of these actions are recorded and used to update participants' contribution histories, which will influence their future ISR scores.

## Tech & Formal concerns

#### Calculations, data and AI — how ISR scores are computed

#### Data sources

ISR uses community-provided profile entries, recorded activity (discussions, tasks, votes), optionally integrated external sources (when permitted), and the community's declared values matrix. All action records include contextual metadata (timestamps, links to issues, attachments).

#### AI & embeddings

The system uses semantic embeddings (LLM embeddings) to compare issue texts with user profiles and past actions, compute relevance scores, and assist in extracting stakeholders and generating explainable summaries. For tasks such as argument quality or sentiment, specialized LLM modules analyze contributions to estimate constructive behaviour.

#### Normalization & weights

Each raw component (relevance, expertise, contribution) is normalized by mean. The automated context routine proposes weights wR, wE, wC (sum = 1) appropriate to the issue. The final ISR is the weighted sum described earlier.

#### Audit & explainability

For transparency, the system stores: the component values, a short natural-language explanation of the top contributing factors, and links to the records used. Higher-level permission holders in the public (per adaptable authorization rules) can view supporting evidence.

#### Adaptable Authorization (AAuth) — privacy-aware, ISR-based access control

ISR includes an adaptable authorization model: access to personal data is not simply role-based but depends on the requestor's ISR/gISR score, the sensitivity level of the requested resource, the relationship between accessor and subject, and the declared purpose.

Access is tiered (public results → ad-hoc public participation → ISR explanations → supporting evidence → activity logs → expertise profiles → social relations → full personal archive). Each tier requires a higher gISR and/or closer relationship in the ad-hoc public context. Granting access is logged, and suspicious user behavior patterns are analyzed and may influence future ISR values.

The adaptable authorization policy balances transparency and privacy while making misuse auditable and socially accountable. For technical details and diagrams see the system's Adaptable Authorization page.

[🔐 Detailed: Adaptable Authorization ISR (AAuth)](https://isr-vote.com/wiki/adaptable_authorization.html)

#### Privacy, governance and misuse mitigation

Important design choices to protect participants:

- **Layered disclosure:** sensitive information is revealed only to those with appropriate ISR/contextual justification.
- **Audit trails:** every data access attempt is logged and visible to appropriate stewards; misuse lowers ISR over time.
- **Community control:** community can influence the global redefinition of the algorithm provided a consensus is reached.
- **Explainability:** every score includes a short natural language explanation and links to the records used.

These governance measures are designed to keep the system accountable to the communities that use it and to make trade-offs explicit rather than opaque.

### Common questions

#### Q: Is ISR a vote-rigging tool?

A: No. ISR is a contextually weighted influence mechanism meant to reflect relevance, expertise, and contribution. Communities set weights and can inspect every calculation. The goal is to improve deliberation quality and legitimacy — not to predetermine outcomes.

#### Q: Can someone "buy" influence?

A: Influence is derived from recorded behavior, verifiable actions, and declared expertise — not from financial transactions. Any integration with external sources must be authorized by the community and logged transparently. Money cannot be pledged toward influence. Funding needed for an option is part of the option itself (cost and funding source), debated and voted like any other element.

#### Q: What is the philosophical basis for ISR — why this approach and not another?

A: ISR is grounded in Hannah Arendt's political theory, the All-Affected Principle from democratic philosophy, and research on epistemic democracy and augmented deliberation. The full argument — including an honest account of what ISR is not and where it has known limitations — is in the [Philosophy](https://isr-vote.com/wiki/ISR-philosophy.html) chapter.

[💬 Full FAQ — honest answers to all the hard questions, including social credit comparisons, privacy, minority rights, and AI governance](https://isr-vote.com/wiki/faq.html)

### Further reading

- [**Philosophy**](https://isr-vote.com/wiki/ISR-philosophy.html) — why ISR exists: the historical diagnosis, the intellectual grounding, and the civilizational stakes
- [**Augmented Democracy**](https://isr-vote.com/wiki/ISR-Arendt-article.html) — research article on ISR and Hannah Arendt's political theory
- [**FAQ**](https://isr-vote.com/wiki/faq.html) — detailed answers to common and hard questions
- [**MVP design**](https://isr-vote.com/wiki/mvp.html) — full feature list, product rationale, and development roadmap
- [**Adaptable Authorization**](https://isr-vote.com/wiki/adaptable_authorization.html) — the access control and privacy model


---




# Chapter 3: MVP


*Source: `wiki/mvp.html`*

---


# ISR-vote MVP: Minimum Viable Product

A Comprehensive Guide to How ISR-vote Works and Why It Matters

[🚀 UI prototype is available](https://isr-vote.com/prototype/)

## Introduction: What Happens When You Join

When you join an ISR community, you're not just voting – you're participating in a system that calculates your influence based on three factors:

**Your ISR (Index of Social Responsibility) Score = Your Relevance + Your Expertise + Your Contribution**

This score changes for each decision based on how relevant you are to the specific issue.
                        An expert plumber has more influence on roof repairs, but equal voice on common community issues.

There are two ways how to log in into the system:

- Using your own account with username and password.
- Using presetted accounts for testing purposes - you can choose from the list.

**The MVP application consists of 8 sections:**

1. **Dashboard** – Your overview of community activities
2. **Profile** – Your skills, experience, and interests
3. **Values** – Your preferences stated in a convenient way
4. **Actions** – Log of your contributions and activities
5. **Chat** – Discuss issues with relevant community members
6. **Voting** – Make decisions on problems and solutions
7. **Tasks** – Track implementation of approved decisions
8. **Settings** – UI preferences
9. **AI-assistant**

**🎯 User Success Tip:**

                    Start ISR exploration with a presetted account - it allows you to quickly get a feel for how the system works.

                    Then complete your profile and values – this allows the AI to identify decisions you're most relevant to and show you the most important discussions.

## 1. Dashboard: Your Community Command Center

**The Dashboard is your landing page after login.** It shows at a glance your current ISR standing, what actions need your attention, and recent community activity. Think of it as your personal control panel for the entire ISR-vote system.

### What You See on the Dashboard

- **Your Status Card:** Your photo, name, general ISR score, membership duration, and this month's activity (votes, discussions, tasks).
- **Action Alerts:** Three priority sections showing urgent votings (sorted by deadline), new discussions you're relevant to, and tasks in progress with their completion status.
- **Community Activity Feed:** A timeline of recent events (votes concluded, tasks completed, discussions started, new members joined) so you stay aware of what's happening.

### How It Works

1. You log in → Dashboard loads with your personalized status and alerts.
2. System flags votings where you're relevant or deadline is soon (red if < 6 hours, amber if < 48 hours).
3. New discussions matching your profile/interests are listed so you don't miss them.
4. For each task you're tracking, you see progress bars and estimated days to deadline.
5. The activity feed updates in real-time, showing decisions your community is making.

### Dashboard UI Components

| Component | Purpose |
| --- | --- |
| Status Card | Shows your name, avatar, role, general ISR score, percentile rank, and this month's stats. Click to expand and see full profile. |
| Urgent Votings Alert | Lists open votings with tight deadlines. Color-coded red if <6 hours, amber if <48 hours. Shows your ISR weight for each decision. |
| New Discussions Alert | Shows discussions created recently that match your profile/interests. Displays unread message count and ad-hoc public size. |
| Tasks in Progress | Shows tasks you're assigned to or following, with progress bars (0–100%), assignee, and days remaining. Color indicates on-track (green), at-risk (amber), or delayed (red). |
| Activity Feed | Timeline of community events: votes concluded, tasks completed, discussions created, messages posted, new members joined. Helps you stay informed without actively checking each section. |
| Navigation Sidebar | Quick-access menu: Profile, Values, Chat, Voting, Tasks, Community, Settings. Icons + text labels; collapses on mobile. |

### Example Dashboard Scenario

**You log in on Thursday evening.**

- Your Status Card shows: ISR 2.4, "6 votes this month".
- Urgent Votings alert (red): "Roof repair decision – **5 hours left**. Your ISR: 1.93".
- New Discussions alert (amber): "Entrance lighting – **2 new messages** from electricians".
- Tasks in Progress: "LED upgrade – **60% done**, on track for March 15".
- Activity Feed shows: "Vote on parking proposal concluded", "Task: water leak fixed", "3 new members joined".

You see immediately that the roof vote needs your vote before deadline, the lighting discussion is active, and the LED project is progressing. No time wasted searching.

### 🎯 UX Success Tips

- **Check dashboard daily:** It's your single source of truth for what your community is doing and what needs your input.
- **Act on urgent alerts:** Red votings are sorted by deadline. Clicking takes you directly to the voting page with context.
- **Monitor task progress:** Tasks with progress bars help you spot delays early. If your task is marked "at-risk", communicate with your team immediately.
- **Use activity feed to stay informed:** Read what's happening without needing to join every discussion. Click an event to dive deeper.
- **Return often:** The dashboard updates in real-time. Notifications also push updates (Phase 2).

## 2. Build Your Profile: Show What You Bring

**Your profile is your identity in the system.** It tells the community about your expertise, experience, and what makes you valuable to group decisions.

### What Goes in Your Profile?

- **Professional Skills:** Certifications, licenses, specialized knowledge (e.g., "Licensed Electrician", "Project Manager", "Accountant")
- **Experience:** Relevant projects you've completed or managed (e.g., "5 years managing building renovations")
- **Interests:** What you care about and want to stay informed about (e.g., "Energy efficiency", "Community gardens", "Safety")
- **Certifications:** Formal qualifications that validate expertise

### UI Components (from Prototype)

| Component | Purpose |
| --- | --- |
| Profile Card | Photo, name, general ISR score, role badge |
| Skills Section | Add/remove skill tags with proficiency levels |
| Experience Timeline | Display past projects and accomplishments chronologically |
| Edit Modal | Simple form to add/update profile information |

### 🎯 UX Success Tips

- **Be specific:** Instead of "IT skills", say "Firebase database administration" or "Full-stack web development"
- **Include verification:** Add links to certificates, portfolios, or past projects when possible
- **Update regularly:** As you complete tasks and gain experience, update your profile to reflect new expertise
- **Honest over impressive:** Overstating skills is flagged by the system and decreases your ISR

## 3. Define Your Values: What Matters to You

**Ad-hoc public values are the foundation of ISR calculations.** They define what behavior the community rewards and what it penalizes (as an addition to normal general law). The vectorized individual values ​​of all users make up the **Matrix of Values** - a specialized vector database. Each ad-hoc public formed around a raised issue aggregates its own **Vector of Values** - from the values ​​of all members of the ad-hoc public, taken from the **Matrix of Values**.

### The Vector of Values

Each ad-hoc public aggregates a **Vector of Values** – a collective agreement on what's important out from all the public members' values regarding personal Relevance. **Vector of Values** is a pure mathematical representation which is used in Contribution calculations.

**Basic ways to fill out values are:**

- Write your own text explanation according to the User Guide Values Description.
- Pass a survay with AI assistant.
- Name a famous person with well-known attitudes towards aspects of social life (e.g., "Benjamin Lincoln," "Paul McCartney," "Mao Zedong," "Albert Einstein," etc.) as a prototype so that the AI ​​can draft your values ​​statement according to the Guide.
- Combine or edit options above.

### How to Define Values

**Option A: Narative explanation**

1. Open Values section in profile
2. Click "Narative"
3. Express your beliefs and life orienteers

**Option B: AI-Assisted Definition (Recommended for First-Time Setup)**

1. Click "AI Guide Me" button
2. AI asks 10-15 questions about community priorities
3. Based on your answers, AI proposes a values structure
4. You adjust points and descriptions as needed
5. Community reviews and collectively refines

**Option C: Choosing a prototype**

1. Open Values section in profile
2. Click "Choose a prototype"
3. Type the prototype name and review the AI-generated draft
4. Make your corrections as needed

### AI Assistant Feature

After you define a value, you can ask the AI:

- *"What do we mean by 'technical competence'?"* – AI clarifies the concept
- *"Give me examples of this value in action"* – AI provides concrete scenarios
- *"How does this compare to other the public members?"* – AI shows benchmarks
- *"Explain my current ad-hoc public Vector of Values in a narrative view"* – AI makes a story about your current ad-hoc public values with nearest political examples

### 🎯 UX Success Tips

- **Make values specific and measurable:** Not "trust", but "transparent financial reporting"
- **Be honest and aware:** Values should reflect your individual preferences of the future you want to live in - they can't be significantly changed everyday.
- **Revisit quarterly:** As you and reality around change, update your values.
- **Do not change your values dramatically:** The system is setted to recognize suspicious activity like when a user changes all their values at once to manipulate ISR.

## 4. Start or Join Discussions: Public of Appearance Around Issues

**The Chat section is where collective problem-solving starts.** When an issue arises, the AI identifies the most relevant members (a "ad-hoc public") and notifies them.

### How Discussions Work

1. **Someone creates a topic:** "Roof needs repairs – what should we do?" specifying exact place, size of the problem, time to the problem should be solved and other context data
2. **AI identifies ad-hoc public:** Finds members skilled in construction, interested in maintenance, affected by the issue
3. **Relevant members are notified:** Get badge with ISR relevance score for this topic
4. **Discussion unfolds:** Members share expertise, ask questions, propose solutions
5. **Evidence uploaded:** Photos, quotes, technical documents attached to messages

### UI Components (from Prototype)

| Component | Function |
| --- | --- |
| Discussion List Feed | Shows active topics sorted by relevance + recency. Badges show: NEW, URGENT, IMPORTANT |
| Topic Header | Title, creator, date, ad-hoc public member count, thread preview |
| Message Thread View | Nested messages with name, timestamp, ISR badge for this topic |
| Emoji Reactions (contributes to ISR calculation) | 👍 Good, 😁 Funny, 🥴 Flood, 😡 Rude, 💊 Fool |
| File Upload Widget | Attach PDFs, images, quotes for evidence |
| Search & Filter | Filter by: status (open/closed), tags, urgency, your involvement |

### Ad-hoc Public Formation (How AI Selects Relevant Members)

When a topic is created, the system calculates relevance according to the Relevance Implementation guide:

- **Profile match:** Keywords in topic match skills in profile (e.g., "middle age" matches a 40 years old person)
- **Geographic proximity:** If relevant (e.g., "Entrance 3" water issue → notify Entrance 3 residents)
- **Interest alignment:** Member marked this category as interest
- **Social connections:** Taking into account relatives, friends etc.

**⚠️ Important:** You can ALWAYS find and join any discussion, even if you're not in the AI-selected ad-hoc public. The system recommends but doesn't restrict participation.

The system analyze the issue text and context and propose weights for ISR-score components (Relevance, Expertise and Contribution) calculation. The topic starter can approve them or adjust.

Also, when a topic is created, after calculating Relevance and determining the members of the new ad-hoc public, the system calculates the ISR-score of all members from their Relevance, Expertise and Contribution according to the documentation.

### 🎯 UX Success Tips

- **Read before posting:** Check if your point has already been made or discussed. Remember, any issue publishing starts an ad-hoc issue public gathering and ISR calculation which is costly and spend society resoures. So false, dubbling, dumb issues could be assessed negatively and decrease your future ISR.
- **Use evidence:** Attach photos, quotes, or documents to support your position
- **Stay on topic:** Emoji reactions showing irrelevance or disrespect will be tracked in your ISR
- **Ask questions respectfully:** Challenge ideas, not people
- **Respond to feedback:** If flagged as irrelevant, explain your reasoning - shows intellectual integrity

## 5. Participate in Decisions: Your Vote Has Weight

**The Voting section is where discussion becomes decision.** Each voting topic has multiple options (usually determined by discussion), and your vote's weight depends on your ISR for that specific issue.

### The Voting Process

1. **Topic creator posts options** with deliberated descriptions (cost, funding source, timeline, pros/cons)
2. **You vote** - your click carries your calculated weight (ISR-score)
3. **System tallies weighted votes** - highest weight option wins
4. **Status changes to "closed"** and implementation begins

### Voting UI Components

| Component | Shows What? |
| --- | --- |
| Voting Queue | All open votes sorted by relevance to you. Show: deadline, your ISR for this issue, urgency |
| ISR-score Badge | Your calculated ISR for THIS decision (e.g., "4.2" for roof repair if you're a licensed roofer) |
| Decision Detail Page | Full topic description, all options with budgets/timelines, related discussion messages |
| Vote Options Display | Each option as a card: name, description, cost, funding source, timeline, creator, attachment preview |
| Vote Button | Click to cast your weighted vote. Changes to "You Voted" after submission |
| Why My Weight? Link | Click to see how ISR was calculated (shows R, E, C components) |
| Results Preview | Live-updating bar chart showing weighted vote distribution |
| Deadline Timer | Shows time remaining, highlighted red if <24 hours |

### Example of a 1.93 ISR-score explanation about Roof Repair issue

**Your ISR for this decision: 1.93**

- Relevance (R): 1.0 (you are a dweller of the building same as others)
- Expertise (E): 4.0 (you are a licensed roofer - perfect match)
- Contribution (C): 1.1 (you consistently prioritize quality and safety - little better than in average)
- Final weight: 0.4×1.0 + 0.3×4.0 + 0.3×1.1 = your ISR of final vote

Your vote carries 1.93 the weight of an average member (who votes with 1.0 weight).

### Understanding Your ISR Score: Why It Changes Per Decision

- **Same person, different decisions = different weights**

  - You're a roofer → high weight on roof decisions
  - Same decision on landscaping → low weight (not your expertise)
- **Community feedback updates contribution:** After decisions are implemented, ratings from community update your activity score

### 🎯 UX Success Tips

- **Click "Why My Weight?"** to understand your ISR - transparency builds trust
- **State your opinion only on issues you understand:** Flooding discussion make decision-making harder
- **Check the discussion first:** Read expert opinions before voting
- **Don't wait till deadline:** Vote early - shows you're engaged

## 6. Track Implementation: From Decision to Reality

**The Tasks section brings voting decisions to life.** After a vote concludes, the winning option becomes a task that tracks progress and completion.

### How Tasks Work

1. **Vote concludes** → system automatically creates a task from the winning option
2. **Task properties:** Deadline, budget, responsible person, sub-tasks (if broken down)
3. **Status updates:** Progress tracked: "Open" → "In Progress" → "Completed" → "Evaluated"
4. **Community rates outcome:** After completion, members review the task and assess its matters

### Task UI Components

| Component | Shows What? |
| --- | --- |
| My Tasks List | Tasks you're assigned to or responsible for. Grouped by status: open, in progress, completed |
| Task Card | Title, deadline, progress bar, who's responsible, current status badge |
| Task Detail View | Full description, budget, timeline, related voting discussion, sub-tasks, progress updates |
| Progress Update Form | Add text updates, photos, or documents showing work in progress |
| Sub-tasks Widget | Break large task into smaller steps, check off as completed |
| Completion Modal | Mark task as done, upload final documentation |
| Community Evaluation | After completion, community rates: "Excellent", "Good", "Acceptable", "Poor" |
| Feedback Form | Community members explain their rating |

### 🎯 UX Success Tips

- **Update progress weekly:** Regular communication shows accountability and keeps community informed
- **Upload photos/documents:** Transparency in implementation builds trust
- **Flag issues early:** If timeline slips or budget overruns, communicate immediately - honesty increases ISR
- **Celebrate completion:** Share success with community, thank contributors
- **Learn from feedback:** If evaluation is negative, understand why and address in next similar task

## Technical Architecture: How It All Works Behind the Scenes

### Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React/Vue.js + Responsive Design | User interface, real-time updates |
| Backend/Database | Firebase (Firestore + Realtime DB) | Data storage, user auth, real-time sync |
| AI/ML | Google Vertex AI + OpenAI | ISR calculation, ad-hoc public formation, content moderation |
| Cloud Functions | Firebase Cloud Functions / Cloud Run | ISR recalculations, notifications, event processing |
| File Storage | Google Cloud Storage | Profile photos, documents, evidence files |
| Real-time Messaging | Firebase Realtime DB + WebSockets | Live chat, notifications, feed updates |

### Firebase Collections Structure

**Users**

├── profile (skills, experience, interests, features)

**Vector DB**

├── values (vectorised values representation)

├── profile (vectorised profiles representation)

├── expertise (vectorised expertise representation)

└── actions (vectorised actions representation)

**Graph DB**

├── geography (members' geo connections)

├── relatives (members' family connections)

├── professional (members' business connections)

└── interests (members' curiosity connections)

**Discussions**

├── creator

├── messages (threaded)

├── context (short summary)

├── parent message (link)

├── child messages (links)

├── emoji_reactions (user engagement)

└── evidence (links attached documents/files)

**Votings**

├── title & context description

├── options (with budgets, funding sources, timelines)

├── isr_snapshot (members weights)

├── votes (member_id → option, with weight applied)

├── results (winner, margin, feedback)

└── related_discussion_id

**Tasks**

├── status (open, in progress, completed, evaluated)

├── progress_updates (timeline with photos/docs)

├── community_evaluation (ratings & feedback)

└── impact (saved cost, time impact, etc.)

**Firebase Storage**

├── artifacts collection

└── members files (photos, videos, documents, evidence)

### ISR Calculation Pipeline

1. **Trigger:** Rised chat or vote issue
2. **ISR components weights (wR, wE, wC) evaluation:** AI analize issue and its context to set wieghts for Relevanse, Expertise and Contribution parts
3. **Data Fetch:** Get users profile, values, issue context, historical performance
4. **Calculate Relevance (R):**
5. **Ad-hoc Public Formation:**

  - Filter: users with R > threshold gather Ad-hoc Public
6. **Calculate Expertise (E):**
7. **Vector of Values evaluation:**

  - Gathering of Ad-hoc Public members values from Matrix of Values
  - Vector of Values: define from the vector representations of the public members values, taking into account Relevance (R)
8. **Calculate Contribution (C):**
9. **Normalization:** Individual ISR components (R, E, C) are normalized to the ad-hoc public average of 1.0
10. **Apply Formula:** Row ISR = wR×R + wE×E + wC×C
11. **Store & Notify:** Save ISR for later use, notify user with ad-hoc public invitation and their personal weight on the issue

### Performance Optimizations

- **ISR Caching:** Recalculated once per decision, cached for voting period
- **Lazy Loading:** Load messages/tasks in batches as you scroll
- **Cloud Function Scaling:** Auto-scales to handle N simultaneous ISR calculations
- **CDN Delivery:** Static assets (UI, styles) served from edge locations
- **Database Indexing:** Optimized queries for fast searches and sorting

### Privacy & Security ([Adaptable Authorization (AAuth)](https://isr-vote.com/wiki/adaptable_authorization.html))

- **Multi-Layer Data Access:** What data a members can see about other members depends on their gISR (general ISR) and Person-to-Person graph connections.
- **Access Logging:** Every data request logged and auditable
- **Data Misuse Detection:** AI flags suspicious access patterns (excessive requests = ISR penalty)
- **Encryption:** All data encrypted in transit (TLS) and at rest


---




# Chapter 4: AAuth (Adaptable Authorization)


*Source: `wiki/adaptable_authorization.html`*

---


# AAuth (Adaptable Authorization) in ISR system

Dynamic, Context-Aware, Person-to-Person Access Control Based on ISR Metrics

## 🎯 Motivation: Why Adaptable Authorization?

### The Traditional Authorization Problem

Standard access control systems (RBAC, ABAC) use static role definitions or fixed attribute rules.
                Everyone with "Admin" role gets the same access level, regardless of how trustworthy they are or how
                relevant the data is to their specific context.

**Core Issues:**

- **All-or-nothing access:** Users either have access or they don't, with no nuance
- **Context blindness:** No consideration of whether the user actually needs this data right now
- **Static roles:** Trust levels don't adapt based on behavior or contribution
- **Privacy violations:** Insiders with legitimate access can still abuse it for personal gain
- **No accountability:** Hard to detect who accessed what data and why

### Why ISR Needs Adaptable Authorization

The ISR system manages sensitive community data:

- Personal expertise profiles and credentials
- Contribution history and social karma scores
- Voting records and decision-making patterns
- Family relationships and social networks
- Financial information and resource allocations

In a community where members should see each other's contributions transparently, but also protect privacy,
                we need **context-aware access** that adjusts to:

- The specific ad-hoc public and issue at hand
- The accessor's relationship to the data subject
- The accessor's proven trustworthiness (their ISR/gISR score)
- The reason for accessing the data (explicit context)
- Legal and ethical requirements

## 💡 Core Concept: Adaptable Authorization

### Definition

**Adaptable Authorization** is a dynamic access control model where data access permissions adapt
                in real-time based on:

1. **Accessor's ISR/gISR score:** Their proven trustworthiness and social responsibility
2. **Data sensitivity level:** How private or critical the requested information is
3. **Access context:** Why they're accessing it (decision-making, verification, audit, etc.)
4. **Relationship to data subject:** Are they a family member? Ad-hoc public peer? Stranger?
5. **Temporal factors:** Time-bounded access for specific decisions or investigations

**Key Principle:** A person with higher ISR score can access more detailed information
                about more people, but their access is still limited to what's needed for their role in the ad-hoc public.

### Core Formula

Access Grant Decision:
                $$\text{Grant}(u, d, c) = \begin{cases}
                    \text{ALLOW} & \text{if } f(ISR_u, \text{sensitivity}_d, \text{context}_c, \text{relation}_{u,d}) > \theta \\
                    \text{DENY} & \text{otherwise}
                \end{cases}$$

Where:

                    • **u** = user requesting access

                    • **d** = data resource

                    • **c** = access context

                    • **ISRu** = accessor's ISR score (issue-specific) or gISR (general)

                    • **sensitivityd** = data sensitivity level (0-1 scale)

                    • **f()** = aggregation function

                    • **θ** = community-defined decision threshold

### How It Differs From Existing Models

| Model | Access Basis | Adaptation | Privacy Focus |
| --- | --- | --- | --- |
| RBAC (Role-Based) | Fixed roles | None | Low |
| ABAC (Attribute-Based) | Static attributes | Policy-based | Medium |
| CAC (Context-Aware) | Context factors | Yes, but limited | Medium |
| Trust-Based | Trust scores | Yes, dynamic | Medium |
| Adaptable Auth (ISR) | Social responsibility + context | Yes, continuous | High (privacy-by-design) |

## 🔐 Data Sensitivity Hierarchy

ISR system data is organized in layers. Access to each requires different:

- minimal gISR score
- minimal Person-to-Person relevance level

![Data Sensitivity Hierarchy Diagram](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/aa2.svg)

### Layer 1: Public Results (Just log in)

Everyone can see: voted questions and final voting results. This is fundamental to transparency.

- Issue title and description
- Final voting outcome
- Decision made and implementation status

### Layer 2: Ad-hoc Public Participation (gISR ≥ 0.2 and 2 Person-to-Person relevance level)

Once someone is part of an ad-hoc public for an issue, they can see:

- List of other members involved in this issue
- Each member's ISR score for this specific issue
- High-level voting breakdown (how many voted for each option)

### Layer 3: ISR Explanations (gISR ≥ 0.4 and 3 Person-to-Person relevance level)

Members wanting to understand fairness can access:

- Why person X got ISR score Y for this issue
- Which factors contributed most (Relevance, Expertise, Contribution)
- Summary of expertise and past participation

### Layer 4: Supporting Evidence (gISR ≥ 0.6 and 4 Person-to-Person relevance level)

For those investigating or appealing decisions and have some personal connections:

- Detailed documents and evidence backing ISR calculations
- Education records, credentials (if person shared them)
- Past contribution records with timestamps

### Layer 5: Activity Logs (gISR ≥ 0.7 and 5 Person-to-Person relevance level)

Community stewards and relatives or friends can access:

- Complete social activity log (discussions, votes, tasks)
- Data access history (who viewed what and when)
- Flagged activities or behavioral anomalies

### Layer 6: Expertise Profile (gISR ≥ 0.8 and 6 Person-to-Person relevance level)

People with strong community standing and relatives of the third degree or close friends can see:

- Detailed skills and competencies
- Professional history and credentials
- Areas of influence and interests

### Layer 7: Social Relations (gISR ≥ 0.9 and 7 Person-to-Person relevance level)

Almost avarage community stewards and relatives of the second degree have restricted access to:

- Family relationships and household structure
- Close social connections
- Personal life circumstances (needed for context)

### Layer 8: Full Personal Data (gISR ≥ 1.0 and 8 Person-to-Person relevance level)

More than average community stewards or legal processes and relatives of the first degree can access:

- Complete personal data archive
- Full communication history
- Sensitive personal information

**Context-Specific Override:** A person with gISR=0.5 investigating fraud in an ad-hoc public
                they manage might temporarily get access to Layer 5 data for that investigation only, with logging and
                community notification.

## 🏗️ Technical Architecture

### System Components

#### 1. Authorization Request Handler

User or service requests access to data resource. Request includes:

- User ID (accessor)
- Resource ID (what data is being accessed)
- Access reason/context
- Requested granularity (summary vs. detailed)

```
POST /api/v1/access-request
{
  "user_id": "u_alice_123",
  "resource_id": "r_voter_profile_bob",
  "resource_type": "user_expertise",
  "context": "decision_making",
  "ah-public_id": "ahp_building_repairs_2025",
  "reason": "Evaluating relevant expertise for repair vendor selection"
}
```

#### 2. ISR/gISR Lookup Service

Retrieves current ISR score of the accessor:

- Issue-specific ISR (if in specific ad-hoc public)
- General ISR (gISR) for cross-community decisions
- Role and permissions
- Recent activity and behavior flags

#### 3. Data Sensitivity Classifier

Determines sensitivity level of requested resource (0-1 scale):

```
// Example: User Profile Resource Classification
sensitivity = 0.2  // Basic profile (public)
sensitivity = 0.6  // Expertise details (medium)
sensitivity = 0.95 // Full communication history (critical)
```

#### 4. Relationship Context Engine

Analyzes social/organizational relationship between accessor and data subject:

- Family member? (higher access)
- In same ad-hoc public? (medium access)
- Stranger? (restricted access)
- Community steward/admin? (conditional elevated access)

#### 5. Decision Engine

Evaluates all factors and makes grant/deny decision:

```
// Pseudocode for access decision
access_score = (
    w_isr * normalize(accessor.ISR) +
    w_sensitivity * (1 - normalize(resource.sensitivity)) +
    w_relationship * relationship_score(accessor, subject) +
    w_context * context_appropriateness(reason)
)

if access_score > threshold:
    grant_with_logging()
else:
    deny_with_reason()
```

#### 6. Audit & Logging Service

Records every access attempt (approved or denied):

- Who accessed what, when, and why
- Decision reasoning
- Data modifications (if any)
- Integration into accessor's activity log (affects future ISR)

### Data Flow Diagram

```
User Access Request
    ↓
[Request Handler validates input]
    ↓
[Fetch accessor ISR/gISR score]
    ↓
[Classify resource sensitivity]
    ↓
[Analyze relationship context]
    ↓
[Run decision algorithm]
    ├→ Decision = ALLOW
    │   └→ Log access + deliver data (possibly filtered)
    │
    └→ Decision = DENY
        └→ Log denied attempt + notify accessor + update ISR (suspicious activity)
```

## 📐 Algorithms & Calculations

### 1. Access Score Calculation

The core algorithm that decides whether to grant access:

Weighted Access Score:
                $$A_{\text{score}} = w_1 \cdot f_1(ISR_u) + w_2 \cdot f_2(\text{sens}_d) + w_3 \cdot f_3(\text{rel}_{u,d}) + w_4 \cdot f_4(\text{ctx}_c)$$

Where:

                    • **w₁, w₂, w₃, w₄** = community-defined weights (sum = 1.0)

                    • **f₁(ISR)** = normalize accessor's gISR to 0-1

                    • **f₂(sens)** = inverse sensitivity (higher sensitivity = lower score)

                    • **f₃(rel)** = relationship closeness score

                    • **f₄(ctx)** = context appropriateness

                    • Access is granted if \(A_\text{score}\) ≥ θ (threshold, typically 0.6)

### 2. Relationship Score

Determines how closely connected accessor is to data subject:

| Relationship Type | Relationship Score | Notes |
| --- | --- | --- |
| Self (accessing own data) | 1.0 | Always allowed (except restricted cases) |
| Immediate family | 0.9 | Household/dependent |
| Same ad-hoc public | 0.7 | Working on same issue |
| Indirect connection (2+ hops) | 0.4 | Friend of a friend |
| Stranger (no connection) | 0.0 | Only highest ISR can access |
| Community steward/admin | +0.2 bonus | Administrative role |

### 3. Context Appropriateness Score

Evaluates whether the access reason is legitimate for the requested data:

| Context/Reason | Appropriateness Score | Required Sensitivity Limit |
| --- | --- | --- |
| Understanding ISR fairness (educational) | 0.8 | Up to Layer 4 |
| Making decision in ad-hoc public | 0.9 | Up to Layer 5 |
| Resolving community conflict | 0.7 | Up to Layer 5 (with review) |
| Legal/compliance investigation | 1.0 | Up to Layer 8 (with authorization) |
| Personal curiosity | 0.2 | Only Layer 1-2 |
| Harassment/bad faith | -0.5 (DENY) | Blocked + ISR penalty |

## ⚙️ Implementation Considerations

### Architecture: Centralized vs. Distributed

### Centralized Approach

**Single authorization server evaluates all access:**

- ✓ Easier to audit
- ✓ Consistent policies
- ✗ Single point of failure
- ✗ Bottleneck for scale
- ✗ Privacy risk (all data visible to server)

### Distributed Approach

**Use Blockchain/Smart Contracts:**

- ✓ Decentralized (no single authority)
- ✓ Immutable audit trail
- ✓ Resistant to tampering
- ✗ Slower (gas fees, block time)
- ✗ More complex to debug

### Hybrid Approach

**Combination (Recommended):**

- ✓ Fast decisions (off-chain)
- ✓ Auditable (on-chain verification)
- ✓ Decentralized governance
- ✗ More complex architecture

### Technology Stack Recommendation

| Component | Technology | Rationale |
| --- | --- | --- |
| Authorization Engine | Firebase Rules + Cloud Functions | Scalable, built-in for ISR |
| Audit Log | BigQuery + Cloud Audit Logs | Immutable, query-able, compliance-ready |
| ISR Calculation | Cloud Run (Python/Node.js) | Flexible, versioned, containerized |
| Data Encryption | Cloud KMS (key rotation) | Industry standard, automated |
| Access Decisions (future) | Smart Contract (Solidity/Rust) | Transparent, community-governed |

### Database Schema Considerations

**Key Collections Needed:**

```
// Users & ISR Scores
users/
  ├── {user_id}/
  │   ├── profile: {name, email, ...}
  │   ├── isr_scores: {
  │   │     {issue_id}: {
  │   │       relevance: 0.8,
  │   │       expertise: 0.9,
  │   │       contribution: 0.7,
  │   │       timestamp: ISOString,
  │   │       access_log: {who_viewed: timestamp}
  │   │     }
  │   │   }
  │   └── general_isr: 0.72

// Access Audit Trail
access_logs/
  ├── {log_id}/
  │   ├── accessor_id: user_id
  │   ├── resource_id: resource_id
  │   ├── decision: "ALLOW" | "DENY"
  │   ├── score: 0.75
  │   ├── reason: string
  │   ├── timestamp: ISOString
  │   └── context: {ah-public_id, reason}

// Data Sensitivity Registry
resources/
  ├── {resource_id}/
  │   ├── owner_id: user_id
  │   ├── sensitivity_level: 0.6
  │   ├── category: "profile" | "expertise" | "voting" | "activity"
  │   └── last_accessed: timestamp
```

### Performance Optimization

- **Caching:** Cache ISR scores for 5-10 minutes (update on behavior change)
- **Lazy Evaluation:** Only calculate detailed ISR when needed, use cached gISR for quick decisions
- **Batch Processing:** Calculate new ISR scores nightly, serve from cache during day
- **Database Indexing:** Index on accessor_id, resource_id, timestamp for fast audit log queries

## 🔒 Security & Privacy Measures

### Privacy-by-Design Principles

- **Data Minimization:** Only collect and access data needed for specific decisions
- **Transparency:** Users can see what data is stored and who accessed it
- **User Control:** Members can restrict what data is shared and with whom
- **Tiered Visibility:** Always offer different detail levels (anonymous → personal)

### Technical Security Measures

#### 1. End-to-End Encryption

Sensitive data encrypted at rest and in transit. Only data subject and authorized users
                    with proper ISR can decrypt.

#### 2. Zero-Knowledge Proofs (ZKP)

For highly sensitive decisions, use ZKP to prove authorization without revealing actual credentials:

```
// Example: Prove ISR > 0.7 without revealing actual score
proof = zkp_prove(user.ISR > 0.7)
// Server verifies proof without knowing user's exact ISR
verify(proof) → bool
```

#### 3. Rate Limiting

Prevent automated data harvesting:

- Max 10-20 data access requests per person per hour
- After 100+ denied requests in a row, automatic ISR penalty and investigation
- Adaptive limits based on historical patterns

#### 4. Audit Trail & Accountability

Every access logged with full context:

- Who accessed what data
- When and from where (IP, device)
- Why (stated reason)
- Whether they actually used the data or just snooped

Misuse detected and integrated into ISR (negative contribution).

#### 5. Data Subject Rights

Individuals have rights to:

- **Access:** See all their data stored in system
- **Correction:** Update inaccurate information
- **Deletion:** Request data removal (with community approval)
- **Portability:** Export their data in standard format
- **Appeal:** Challenge ISR calculations or access denials

### Legal Compliance

- **GDPR:** Right to know why access was granted/denied
- **CCPA:** Transparency about data collection and use
- **HIPAA:** If health data involved, strict audit trails
- **Local privacy laws:** Adaptable by region

## ⚠️ Known Risks, Challenges & Limitations

### 1. Privacy Paradox

**The Dilemma:** To ensure fair decisions, the system needs transparency.
                But transparency about people's expertise, contributions, and relationships can enable surveillance.

**Current Status:** TENSION ACKNOWLEDGED

We mitigate this through:

- Tiered access (not everyone sees everything)
- Context-specific data filtering
- Audit logging of data access (people know who looked at them)

For Future Consideration

Could implement federated learning where ISR is computed locally without
                    centralizing all data, but this adds complexity.

### 2. Gaming the System

**Risk:** People could coordinate to artificially inflate ISR scores,
                abuse access to data, or create fake "positive contributions" to game the system.

**Current Defenses:**

- ISR requires consistent, long-term behavior (not one-off actions)
- Sudden value changes trigger alerts and investigation
- Access misuse decreases ISR significantly
- Community can vote to adjust weighting formulas if gaming detected

For Future Consideration

Implement machine learning anomaly detection to identify coordinated manipulation attempts.
                    Also consider sybil-attack resistance (preventing fake accounts).

### 3. Algorithmic Bias

**Risk:** The ISR calculation could inadvertently discriminate against
                certain groups (e.g., younger members, non-native speakers, people with disabilities).

**Current Approach:**

- Components are transparent and community-defined (not black-box AI)
- Regular fairness audits comparing ISR across demographic groups
- Appeals process where individuals can challenge scores

For Future Consideration

Implement fairness constraints (e.g., ensure different demographic groups
                    have similar ISR distributions for same types of contributions).
                    Use fairness-aware ML techniques.

### 4. Behavioral Control & Chilling Effects

**Risk:** Knowing they're being scored and evaluated might make people
                self-censor, conform, or avoid taking risks in their participation.

**Response:** This is philosophically acknowledged in the research.
                The designers argue that a transparent, fair system actually REDUCES fear (compared to opaque systems),
                but the risk remains.

**Quote from document:** "Psychologically healthy people in a healthy society
                should not fear expressing their position when the evaluation system is objective and understood.
                Implementation of transparent, objective evaluation allows gradually reducing fear."

For Future Consideration

Conduct longitudinal studies on behavioral changes after ISR implementation.
                    Implement confidentiality periods where some contributions are scored privately
                    before being revealed.

### 5. Scope Creep & Surveillance

**Risk:** A system designed for fair community decisions could be repurposed
                as a social credit system or surveillance tool by authorities.

**Safeguard:** ISR is designed to be:

- Decentralized (no single authority controls it)
- Community-governed (community votes on rules)
- Transparent (decisions visible to all)
- Time-bound and context-specific (not a universal "person ranking")

For Future Consideration

Build in hard limits on how data can be used. Use cryptographic techniques to prevent misuse
                    (e.g., smart contracts that specify allowed uses of data).

### 6. Technical Implementation Complexity

**Current State:** Much of the system design is theoretical.
                Real-world implementation is complex with many edge cases.

- Handling data conflicts and inconsistencies
- Scaling to large communities (10,000+ members)
- Managing exceptions and special cases
- Integration with existing systems
- Maintaining performance under load

For Future Consideration

Implement MVP in small controlled community first (50-100 members).
                    Gather feedback and iterate before scaling.

### 7. Data Subject Disputes

**Challenge:** What if someone disagrees with how they're being scored?
                How do they appeal?

**Current Thinking:** Need robust appeals process, but specifics TBD.

For Future Consideration

Design independent ombudsman or arbitration process.
                    Allow community vote on disputed ISR calculations.
                    Implement temporary score holds during investigation.

### 8. Accountability for AI/LLM in Scoring

**Challenge:** ISR uses LLMs (GPT-4, Claude, Gemini) for understanding
                expertise, contribution quality, etc. LLMs can be unpredictable.

Who is liable if an LLM makes unfair assessment of someone's contribution?

For Future Consideration

Implement human-in-the-loop review for high-impact ISR changes.
                    Use ensemble methods (multiple LLMs) for robustness.
                    Establish clear liability chains.

## 🚀 Future Improvements & Open Questions

### 🔬 Technical Research

- Federated learning for ISR without centralizing data
- Quantum-resistant encryption for long-term data protection
- Homomorphic encryption (compute on encrypted data)
- Zero-knowledge proofs for privacy-preserving authorization
- Fairness-aware ML for bias detection and mitigation

### 🏛️ Governance Questions

- Who controls ISR parameters (weights, thresholds)?
- How do communities update rules over time?
- What appeals process for disputed scores?
- How to prevent government overreach?
- What's the relationship with existing laws?

### 🧪 Empirical Validation

- Pilot in 5-10 real communities
- Measure decision quality improvements
- Track behavioral changes (participation, manipulation)
- Study privacy perception vs. actual privacy
- Document lessons learned and failure modes

### Roadmap for Implementation

| Phase | Timeline | Goals |
| --- | --- | --- |
| Phase 1: Research | 6 months | Finalize algorithms, complete security audit, draft governance framework |
| Phase 2: Prototype | 6 months | Build MVP with basic authorization in Firebase, test with 1-2 communities |
| Phase 3: Pilot | 12 months | Deploy to 5-10 real organizations, gather feedback, iterate |
| Phase 4: Scale | Ongoing | Scale to 100+ communities, explore decentralization, blockchain integration |

## 📋 Summary: Key Takeaways

- **Adaptable Authorization** is a dynamic, context-aware access control model
                    where access permissions adapt based on accessor's ISR/gISR score and data sensitivity.
- **Data Hierarchy:** ISR organizes sensitive data in 8 layers, each requiring
                    different minimum ISR thresholds (0.0 for public results to 1.0 for full data) plus appropriate Person-to-Person (P2P) relevance level.
- **Privacy-by-Design:** The system balances transparency (needed for fair decisions)
                    with privacy protection (limiting access to those who truly need it).
- **Algorithmic Basis:** Access decisions use weighted function combining
                    accessor ISR, data sensitivity, relationship context, and access reason.
- **Key Challenges:** Privacy paradox, gaming potential, algorithmic bias,
                    behavioral control, and scope creep risks require ongoing attention.
- **Implementation Status:** System design is well-developed but many
                    aspects remain for future research (federated learning, formal appeals process, empirical validation).
- **Governance:** System must be transparent, community-controlled,
                    and resistant to centralized authority abuse.


---




# Chapter 5: Foundations — Social OS


*Source: `wiki/ISR-social-OS.html`*

---


# ISR as Social Infrastructure and the Idea of a Social Operating System

**ISR** — the **Index of Social Responsibility** — can be understood not only as a framework for collective decision-making, but as a proposal for a broader layer of **social infrastructure**: a way to make social coordination more transparent, more accountable, and more continuous across time.

This perspective brings together the key ideas behind ISR: **responsibility as agency**, **contextual influence**, **Public of Appearance (ad-hoc issue public)**, **contribution-based legitimacy**, and the principle that **execution** should not disappear outside the decision process, but should remain connected to how **future participation** is assessed.

## From decision framework to infrastructure

Most frameworks for collective decision-making focus on a narrow moment: the choice itself. They ask how preferences should be aggregated, how votes should be counted, or how participation should be structured.

ISR points toward a different question. Instead of treating decision-making as an isolated event, it treats it as **one phase in a longer social process**.

That shift matters because social coordination does not begin with a vote and it does not end with one. Issues emerge unevenly. Different people become relevant at different moments. Deliberation changes what is known. Execution changes what is possible. Outcomes create consequences, and those consequences shape future trust, legitimacy, and participation.

Seen this way, ISR stops looking like only a voting concept. It starts to look like a **candidate for social infrastructure**: a layer that helps connect **issues, people, decisions, actions, and influence** into one accountable process.

## Transparency and accountability

The strongest way to understand ISR as infrastructure is through two pillars: **transparency** and **accountability**.

Transparency, in this context, does not simply mean public visibility. It means that the structure of participation becomes more **legible**. It becomes possible to see who is relevant to an issue, what kind of expertise is present, how people contributed, how a decision was formed, and what happened after that decision.

Accountability, in this context, does not mean punishment after failure. Consequences always exist in social life, whether they are formally acknowledged or not. The real problem is that without explicit shared ground — both in the values used for assessment and in the rules for applying them — consequences remain subjective, inconsistent, and easily turn into resentment, exclusion, or even revenge.

ISR proposes a clearer alternative. Participation is assessed against **explicit shared criteria**, so consequences become visible, interpretable, and more equally applicable rather than left to intuition, informal bias, or retrospective justification.

Together, transparency and accountability change the perception of social relations. They make it possible for social coordination to carry memory. In real life social interaction elements do not exist isolated. So in ISR they also become part of a **visible historical chain** linking **deliberation**, **decision-making**, **action**, **assessment**, and **future legitimacy**.

## The operating system analogy

The idea of a **Social Operating System** is useful because an operating system does more than host applications. It manages relationships between processes, permissions, memory, inputs, and outputs. It creates the conditions under which separate applications can function coherently within one environment.

By analogy, a social operating system would not need to replace existing tools. Social networks, messengers, task trackers, and other coordination environments could continue to exist. What changes is the presence of a unifying **logic layer** that connects them around **shared issues**.

Under this analogy, ISR becomes a candidate for that logic layer.

For each community issue it can help answer questions such as:

- Who is most relevant to this issue?
- What expertise is present in the current ad-hoc public?
- How should influence be weighted in this context?
- How do discussion, decision, and execution remain linked?
- How do actions taken after a decision become material for future contribution assessment?

This is what makes the analogy powerful. The operating system is not valuable because it centralizes everything. It is valuable because it makes interaction between separate components intelligible, structured, and dependable.

## ISR’s distinctive claim

Same as OS in not just a programs' host, ISR proposes something more specific than better participation or better coordination. Its distinctive claim is that **influence** should **not be fixed in advance** and should **not remain detached from what people actually do**.

In the ISR perspective, influence emerges from three contextual factors:

- **relevance** — how closely a person is connected to the issue;
- **expertise** — how well a person understands the issue or can meaningfully improve the response;
- **contribution** — how a person’s past actions are assessed in relation to the values and aims of the current ad-hoc public.

This means the same person may have high influence in one case and limited influence in another. It also means influence is not a permanent possession. It is **dynamic, contextual**, and revised through participation and through later assessment of what that participation produced.

That differs from many standard systems in which equal formal participation is treated as sufficient, even when lived relevance, domain knowledge, and demonstrated contribution vary significantly across participants.

Continueing the OS analogy, ISR manage the system's resources in a more detailed and efficient way, allowing our social "computer" work faster, solve harder tasks, prevent conflicts and decrease system's crash probability.

## ISR social unit, Public of Appearance - as OS process

A central concept in ISR is the **Public of Appearance**. Instead of assuming that one fixed group (e.g. by territory) should decide everything no matter who really care about the issue, ISR proposes that social coordination happens through **temporary, issue-centered clusters** of people who really care the issue.

This matters because real-world collective problems rarely belong to one cleanly bounded group. They are usually encountered by overlapping sets of participants: directly affected people, people with domain expertise, people responsible for implementation, and people whose knowledge or resources make them significant to the outcome.

The ad-hoc public captures this fluid reality more accurately than a fixed constituency. It allows coordination to form around an issue, change as the issue evolves, and adapt as new evidence or participants become relevant.

As social infrastructure, this matters because it provides an **adaptable social unit**. The system does not begin from the assumption that the group is known in advance. It begins from the issue and allows the relevant community to emerge around it.

## From action to Contribution assessment

One of ISR’s most important moves is to **reject** the idea that **execution lies outside the decision system**. In many existing settings, process ends when a decision is made. Implementation is handed off elsewhere, and the trace between intention and action becomes weak.

ISR introduces a stronger continuity. The same public that helps surface the issue and shape the decision can remain relevant during execution. More importantly, execution itself **leaves a trace in the system**.

That trace becomes material for future **society contribution assessment**. It shows whether people followed through, whether their actions aligned with the values of the public, and whether participation resulted in tangible movement toward the intended outcome.

This makes contribution more than a moral sentiment or a rhetorical claim. The action is already done, but future ad-hoc publics can interpret its meaning in context. Once contribution is assessed through **visible traces** rather than only declared intentions, future influence can become more grounded.

That **closes the loop**. **Decision** leads to **action**. Action leaves **evidence**. Evidence informs future contribution assessment. And that assessment influences future decisions.

## What becomes possible in one framework

If different parts of social relations are gathered into one framework, the holistic effect is not just efficiency. The deeper effect is **continuity**.

A unified framework makes it easier to see a person not only as a speaker, a voter, or a task owner in separate moments, but as a participant whose relevance, judgment, action, and consequences can be understood together. It links in the what is usually scattered across multiple contexts into **one intelligible social process**.

Several broader changes follow from that:

- **trust** can become more grounded because the path from issue to outcome is more legible;
- **legitimacy** can become more substantive because influence is tied to contextual relevance and assessed contribution;
- **responsibility** can become more actionable because it appears systematically during the process, not acidently and only after failure;
- **coordination** can become more coherent because discussion, decision, and execution are treated as connected rather than unrelated domains;
- **institutional memory** can become richer because the system retains evidence of how people and groups participated over time.

In this sense, the holistic effect of ISR is not simply better decision quality. It is the creation of a **coherent memory of responsibility**.

## A new social relation perception

The broader promise of ISR is that it changes the relation between **visibility** and **legitimacy**.

In many environments, influence is either formally equal regardless of context or informally unequal in opaque ways. ISR points to a **third option**: influence that is unequal in context, but **explicitly grounded in visible criteria**. That does not eliminate conflict or disagreement. It does, however, offer a clearer basis for why some voices matter more in some cases, and why those relationships can change over time.

This is a significant social perception shift. It means that legitimacy is not only inherited from status, not only granted by static membership, and not only asserted by force of rhetoric. It can be built through **visible relevance**, **tested expertise**, and **assessed contribution**.

Such a system would not make social life simple. But it could make it more intelligible, and therefore more governable in ways that are transparent and accountable rather than merely procedural.

## ISR and the future of social coordination

If ISR is understood as **social infrastructure**, then its importance extends beyond any single platform or application. It becomes a way of imagining future coordination systems that are able to connect **issue discovery, community formation, deliberation, decision, task decomposition, execution, and later assessment** without treating them as unrelated steps.

This does not require one monolithic platform. Existing tools may remain specialized, but they could be connected by a **shared logic** that accounts for people’s relevance, expertise, and assessed contribution across the cycle of collective action.

That is where the idea of a Social Operating System becomes useful. It names the possibility that social coordination could have a **deeper architecture**: one that **remembers, interprets, and reuses** the traces of participation rather than letting them disappear between tools and moments.

Seen in this way, ISR is not only a model for deciding. It is a proposal for how social systems might become more transparent in structure, more accountable in process, and more continuous in social memory.

## Conclusion

The idea in ISR is not that people should participate more, or that better-positioned people should have more influence. Its deeper idea is that social coordination can be organized as a **transparent, revisable, and accountable process**.

Transparency makes it possible to see how issues, people, and decisions are connected. Accountability makes those connections matter by linking participation to explicit criteria, shared assessment, and future consequence. Together, they allow collective life to develop its own memory.

That is why ISR can be understood as more than a decision framework. It is an early concept for **social infrastructure**: a possible **operating layer** for coordination in which relevance, expertise, contribution assessment, action, and future influence become parts of **one coherent social process**.


---




# Chapter 6: Foundations — Philosophy


*Source: `wiki/ISR-philosophy.html`*

---


# The Philosophy of ISR

Why a new language for responsibility — and why now

            "A dialogue is an exchange of information between two sides which understand each other by means of a third side which fulfills the functions of a translator."
            — Igor Kalinauskas, *Alone with the World*

The Index of Social Responsibility did not emerge from a technical idea. It emerged from a diagnosis — a set of questions that became impossible to ignore. Why do large, educated, interconnected societies keep making decisions that most of their members consider bad? Why does democratic participation feel less and less meaningful to more and more people? Why are the most important conversations — about climate, about governance, about what kind of future we want — so resistant to genuine collective resolution? And what would it mean to build a better framework — one that restores the conditions for genuine deliberation and democratic decision-making, without falling into the traps of technocratic administration, populist simplification, or authoritarian efficiency?

This essay explores those questions. It is not a product description, and it is not a summary of technical specifications. It is an attempt to articulate the intellectual ground beneath ISR — where it comes from, what it assumes about human social life, and what it believes is possible. The sections below can be read in sequence or opened individually. Each addresses one layer of a larger argument.

## I. The Crisis: What Democratic Societies Are Losing

### A mismatch written into our biology

The anthropologist Robin Dunbar observed in the 1990s that human beings are capable ofmaintaining stable social relationships with roughly 150 people. Above that number — the so-called Dunbar's number — we cannot track the full social reality of everyone around us: their history, their skills, their reliability, their motivations. Our brains simply did not evolve for that scale.

For the vast majority of human history, this was not a problem. We lived in bands and tribes where every member was known from birth — their strengths and weaknesses, their past decisions, their place in the web of mutual obligation. Leaders in such communities played a symbolic and mediating role; they did not, as a rule, decide the fate of the group alone. Accountability was ambient, informal, and real.

But at least five thousand years ago, things began to change. Human communities started aggregating at scales our biology never prepared for: cities, states, nations, global institutions. The informal social knowledge that had governed tribal life became impossible to maintain. Something had to replace it — and what replaced it was representation: the delegation of political agency from citizens to elected (or appointed, or inherited) proxies.

### What representation costs

Representation solves the scale problem, but it does so at a price. The philosopher Hannah Arendt described what she called the Space of Appearance — the political realm where human beings reveal themselves to one another through speech and action, where they become fully themselves as political agents. In her view, this space does not exist in buildings or constitutions; it comes into being only when distinct individuals gather, speak, and act together on matters of common concern.

Representative democracy collapses this space to a narrow professional class. The vast majority of citizens never enter it — they delegate their political appearance to proxies who may share neither their context nor their values. What remains for most people is the act of voting once every few years, and the experience of watching decisions unfold in which they had no real part. Arendt called the withdrawal from genuine political engagement world alienation — and she worried it was the defining condition of the modern age.

### The attention economy accelerates the damage

Into this vacuum stepped the digital attention economy. Social platforms discovered that the human needs which politics once addressed — belonging, recognition, status, meaning — could be simulated cheaply and profitably: likes instead of genuine recognition, viral reach instead of real influence, algorithmic curation instead of genuine community.

These simulations are deliberately engineered to substitute for real participation, not to enable it. A person absorbed in the metrics of social media performance is not building a community; they are consuming the feeling of building one. The political theorist's term for this is manufactured consent, but the mechanism is subtler than propaganda — it is the occupation of civic energy with its own shadow.

The result is a population that is, in a certain sense, politically infantilized: kept at a level of engagement too shallow to threaten concentrated power, too stimulated to feel genuinely absent. ISR's ambition is partly to name this dynamic and partly to offer something structurally different — not better entertainment, but a genuine alternative to it.

## II. What Was Lost — and Why It Cannot Simply Be Restored

### The council ideal

Arendt's political ideal was not representative democracy — it was the council system: small, self-governing bodies of citizens who deliberate together on issues they directly inhabit, whose authority derives from participation rather than election. She found glimpses of this form in the revolutionary councils of 1776, 1848, and 1917 — spontaneous organs of genuine collective agency that, almost invariably, were dissolved by the professional political structures that followed.

The council ideal is compelling precisely because it requires no elaborate justification: it is simply what happens when human beings take their shared situation seriously and govern themselves accordingly. But it faces a hard limit — Dunbar's number, again. A council works because its members know each other. Scale it beyond 150, and the informal trust that holds it together begins to dissolve.

### Why technology alone is not the answer

Digital technology was supposed to solve this. The early internet promised a new public sphere — a Habermasian ideal speech situation (a space of open dialogue where only the force of the better argument prevails, not the power of the speaker) extended to the whole of humanity. What we got instead was the attention economy, echo chambers, and the industrialization of outrage.

The failure was not accidental. The problem is not that technology cannot connect people — it can, trivially. The problem is that without unconciesness context accounting (when you do not know the person as well as your ancient small tribe member) connection without a shared framework for evaluating claims, weighing contributions, and attributing accountability is not deliberation. It is noise. And noise, as any engineer knows, is not the absence of signal — it is the presence of a signal that cannot be decoded.

                "To make dialogue possible, there must be a third voice — something objective and common to both speakers."

— Igor Kalinauskas, *Alone with the World*

### The third voice problem

The psychologist and philosopher Igor Kalinauskas observed that genuine dialogue requires more than two willing parties. It requires a third voice — something objective and recognizable to both sides that can serve as a common reference. Without it, the first voice (speaker) and the second voice (listener) lack a shared coordinate system; they may sincerely want to understand each other and still fail, because they are speaking from incommensurable frameworks.

Kalinauskas proposed four possible forms of the third voice: a shared plot or situation, an authority both recognize, a common system of criteria, or a mutually accepted witness. The philosopher Hans-Georg Gadamer explored a closely related idea under the name fusion of horizons — genuine understanding occurs when two interlocutors find the common ground on which their separate perspectives can meet. Jürgen Habermas approached it from another direction: what he called the ideal speech situation presupposes a shared normative background that makes rational discourse possible at all.

The three-hundred-year history of multicultural collision — the wars, the failed treaties, the ideological stalemates — can be read partly as a failure of the third voice. Not always a failure of good faith, but a failure of common ground: groups speaking from incommensurable criteria, measuring responsibility in incommensurable units, unable to locate the shared reference that would make genuine negotiation possible. The question ISR asks is: what would a third voice look like that has no cultural history, no political owner, and no preset normative agenda?

## III. The Computational Turn as Opportunity

### Not AI deciding — AI enabling

ISR is not an argument that artificial intelligence should govern human communities. It is an argument that certain computational capabilities — the ability to process large sets of declared values, track interaction histories, and compute contextual influence scores — can restore conditions for genuine human deliberation that cannot exist at post-Dunbar scale without technological assistance.

The distinction matters. A system in which an algorithm makes decisions is a technocracy. A system in which an algorithm makes deliberation possible — by giving every affected person a meaningful voice, by making the basis of that voice transparent and contestable, by providing a shared framework that no faction controls — is something closer to what Arendt meant by the Space of Appearance, reconstructed for a world of eight billion people.

### The Vector of Values as a universal third voice

At the heart of ISR's architecture is a Vector of Values: a structured representation of each community member's normative commitments across ten broad domains of social life, from environmental responsibility to digital governance. Each member defines their own values; the vector is their self-description in a mathematical language that the system can compare, aggregate, and apply.

This is what ISR proposes as a practical third voice — one that satisfies Kalinauskas's criteria in each respect:

- **No historical bias:** the vector structure does not belong to any cultural tradition, ethnic group, or political movement.
- **Transparent:** the open code allows independent audit; every component of any influence calculation can be inspected by the person it concerns.
- **Universally legible:** mathematics is the most culturally neutral language available to describe human preferences and priorities.
- **Collectively mutable:** the community define its vector values itself by consensus. The current structure should be understood as version 1.0, so it could evolve if a more grounded variant appears. ISR is a genuinely new framework, and sustained research in sociology, psychology, and philosophy will be necessary to validate and improve it. Future versions may look substantially different as that research matures.
- **Non-prescriptive:** the structure provides a common notation system — like a musical staff — but does not specify which notes are correct. No "right" values are preloaded.

**On the ten domains:** Any representational structure carries the assumptions of its designers. The ten domains of the ISR value vector reflect contemporary social concerns and were designed to cover the broadest possible range of human social interaction. The community revision mechanism is the structural answer to this limitation: the scaffold exists to be inhabited and reshaped, not obeyed.

### Publics of Appearance and the All-Affected Principle

Alongside the Vector of Values, ISR introduces the concept of the Public of Appearance: a temporary, issue-specific ad-hoc group assembled automatically from all community members who are genuinely affected by a given question. Membership is not elected, not delegated, and not permanent — it is determined by the nature of the problem itself.

This is a computational implementation of what political philosophers call the All-Affected Principle: the idea that legitimate political decisions require the participation of everyone whose interests are materially at stake in the outcome, not merely those who happen to hold formal membership. A numerical majority with no stake in a problem overrule a smaller group that lives with its consequences every day, and some of them don't have any influence on the decision because they are not formal members.

By making the Public of Appearance the unit of deliberation — not the institution, not the faction, not the standing committee — ISR attempts to re-open the Space of Appearance on a daily, issue-by-issue basis. Every person genuinely affected by a question is brought into its resolution directly.

## IV. Responsibility as the Foundation

### The rejection of collective excuse

The twentieth century produced two of the most disturbing demonstrations of what happens when responsibility is diffused across a collective: Hannah Arendt's study of Adolf Eichmann — which gave us the phrase the banality of evil — and Stanley Milgram's obedience experiments, in which ordinary people administered what they believed were dangerous electric shocks to strangers, simply because an authority figure told them to. Both showed that the architecture of collective institutions can make individual actors feel that their choices are not really their own.

ISR begins from a contrary premise: every action is the action of a person. "I was following orders," "I was doing my job," "the company decided" — these are not explanations in the ISR framework; they are precisely the evasions it is designed to make visible. This applies in both directions: both the person who gives an order and the person who executes it bear responsibility for having chosen, for making decision, for what that order and its execution produce. Examples of people refusing to execute harmful orders exist in every historical period and every institutional context. The capacity to refuse is part of what it means to be human.

### Individual accountability within community evaluation

There is a subtlety worth to pay attention at. ISR is a social instrument — it measures individual actions as they are evaluated by the community the actor belongs to, in the context of specific problems the community is trying to solve. Different ad-hoc publics may assess the same logged action differently, and this is not a flaw. Imagine a member who, during a previous budget cycle, proposed and successfully executed a project to convert part of a community center’s parking lot into an open‑air dance and music space. In an ad-hoc public formed around “youth engagement and cultural life,” this action may be evaluated very positively: it increased participation, created a safer alternative to street gatherings, and aligned with that group’s values around creativity and inclusion. In an ad-hoc public formed around “religious life and moral education,” the same action may be evaluated negatively: evening events with loud music and close dancing near a place used for worship are seen as undermining its atmosphere and norms. Both evaluations are grounded in different Vectors of Values; both are legitimate in their own context.

This does not dissolve individual responsibility into communal relativism. The community provides the normative context — the frame in which an action acquires meaning — but the act remains the actor’s own. The member cannot appeal to the positive evaluation in one public to cancel the negative evaluation in another, nor claim that collective sanction in either context absolves them of responsibility. ISR’s architecture keeps the action traceable to the person across all relevant publics; collective judgment is context, not absolution.

### Pain and the seriousness of decision

A deeper point: responsibility is not an abstract commitment. It is grounded in the capacity to be hurt by a wrong choice. An agent who bears no consequences for error has no genuine stake in making the right decision. This is why ISR tracks actions taken under real conditions of uncertainty — decisions that cost something, that involved genuine risk, that could have gone otherwise.

This is also what distinguishes human decision-making from algorithmic optimization. An AI system can process criteria and output a recommendation without experiencing anything. A human being who makes a decision in a community context — who will live with the outcome, who knows the neighbors affected, who may be judged for it — is doing something categorically different. The capacity to suffer the consequences of one's choices is not a design flaw in human cognition; it is the foundation of moral seriousness. ISR is built on the assumption that this capacity is worth preserving, recording, and rewarding — not replacing.

The ISR score does not claim to measure virtue or read inner states. It records a history of real commitments made under real conditions. This is consistent with the existentialist insight — expressed most directly by Jean-Paul Sartre — that we do not have an essence prior to our actions; we become who we are through what we choose to do. High ISR is not a certificate of good character. It is evidence of sustained engagement with genuinely difficult choices in a community context.

### On gaming and genuine behavior

An obvious concern: will people simply optimize their behavior to improve their score, rather than genuinely acting responsibly? The technical answer is that ISR requires consistency across multiple independent publics over time — gaming one context does not lift the broader score. But the philosophical answer runs deeper.

Aristotle argued that virtue is formed by habituation — that a person who acts courageously, even initially out of social pressure or self-interest, is undergoing genuine moral formation. The act and the character influence each other. A person who consistently shows up, contributes, and bears accountability — even partly for instrumental reasons — is not merely performing responsibility. They are practicing it, and practice shapes the practitioner. ISR does not require pure motives; it tracks the record of a life in community.

There is also a social-epistemic point worth noting: in a community small enough to function without tech suppost, members know each other's behavior directly. ISR makes explicit and portable what informal reputation already does in well-functioning communities. The "gaming" problem is essentially the same problem as gaming your reputation among people who know you — manageable, because time and context are unforgiving judges.

## V. Competitiveness Transformed

### Competition is not the enemy

ISR does not propose to eliminate human competitiveness. That would be both impossible and undesirable. Competition is among the most productive forces in human societies — it drives innovation, raises standards, and gives individuals a meaningful arena in which to demonstrate excellence. The question ISR asks is not "how do we stop people from competing?" but "what are they competing for, and are those stakes worth the costs?"

The dominant competitive arenas of modern societies are largely zero-sum: contests in which one party's gain is another's loss. Market share, political power, social media attention, status within hierarchical institutions — in each case, the game is structured so that the accumulation of resource by one player reduces its availability to others. And crucially: these games create strong incentives to externalize costs — to gain the benefits of an action while leaving its problems to someone else, some other community, some future generation.

Roman Law was an early recognition of this problem. Formal rules limiting existential competition within a community increased its internal stability, enabling larger and more complex social structures — and, with them, greater collective capacity. The civilization/barbarian distinction, as a historical matter, was largely a distinction between communities that had developed formal systems for managing internal conflict and those that had not. ISR can be understood as an extension of this logic: a more sophisticated framework for channeling competitive energy toward positive-sum (mutually beneficial) outcomes.

### What changes when the stakes change

In an ISR-structured community, the primary competitive arena is not the accumulation of zero-sum resources but the quality of one's contribution to a shared future. The question shifts from "how do I capture more?" to "how well am I building something worth living in?" This is a genuinely different kind of competition — one in which the most sophisticated strategy is building the best collaborative community, because that is precisely what ISR measures and rewards.

Evolutionary biology has converged on a closely related finding. The cooperation literature of the past decades has shown that cooperation and competition are not opposites but different orientations of the same drive. Human beings are the most cooperative large-brained animals on the planet — and our extraordinary capacity for cooperation is itself a competitive adaptation. ISR does not ask people to become less competitive. It asks them to compete at a higher level of sophistication: not for short-term resource capture, but for long-term influence earned through demonstrated contribution. Considering the interests not only of their pack, but of the entire forest.

### When work is no longer the answer

There is a dimension of the coming transformation that neither political philosophy nor standard economics has fully absorbed. For roughly two centuries, paid employment has served as the primary mechanism through which modern societies distributed not only income but also meaning, social standing, recognized contribution, and civic identity. Work was how most people answered the question: what do I contribute, and why does my participation matter?

The accelerating displacement of human labor by robotics and AI puts that mechanism under structural pressure that is unlikely to reverse. This is a process already visible across logistics, manufacturing, legal analysis, medical diagnostics, creative work, and customer service. The directional pressure is not seriously in dispute, even if economists disagree about pace and scope.

The most discussed policy response is some form of basic income: a universal, unconditional income floor decoupled from employment. Real-world experiments — in Finland, Kenya, and several US cities — have begun to test what happens when survival anxiety is removed as a motivational force. A consistent finding is that people do not stop contributing when material security is guaranteed; they redirect contribution toward things they consider genuinely meaningful. The motivation changes character rather than disappearing.

This observation points toward something deeper than a policy question. Money derives much of its motivational power from scarcity and the fear of deprivation. When technology progressively removes that floor — when destitution ceases to be a realistic threat for the majority — the compulsive force of monetary accumulation weakens. What remains, and what basic income experiments suggest is actually primary, is the drive for recognition, meaningful contribution, social standing, and the sense that one's presence in a community matters. Money currently bundles material security and social standing together so tightly that they are difficult to separate. Advanced automation may decouple them — and when it does, they will require different systems to govern them.

This is where ISR becomes relevant in a way that goes beyond supplementing existing economic arrangements. Money has always been a poor proxy for social value — it measures what generates revenue, not what generates community. It was used as a social coordination signal primarily because no portable, cross-context alternative existed. In a world where survival is increasingly guaranteed by technology, and where the social dimension of human motivation becomes the primary arena of competition and aspiration, ISR may serve as a partial alternative to monetary coordination — not in the domain of material resource allocation, where price signals remain necessary, but in the specifically social domain: distributing influence, recognizing contribution, and allocating deliberative weight in ways that money was never designed to do well.

This is a horizon, not a prediction. The transition, if it comes, will be slow, uneven, and contested. But the direction is worth naming: ISR is designed for a world in which social standing is earned through demonstrated contribution to shared life rather than accumulated through monetary wealth — and that world may be closer than it appears.

### The attention economy and social sovereignty

The term attention economy was first articulated by the psychologist and economist Herbert Simon in 1971, who observed that "a wealth of information creates a poverty of attention." The concept was extended in the 1990s by Michael Goldhaber, who argued that in an information-saturated world, human attention itself becomes the scarce resource that economic actors compete to capture and hold. What began as an academic observation has become the dominant business model of the digital age: social platforms are designed, above all, to maximize the time and cognitive engagement they extract from their users.

The connection to ISR is direct. These platforms convert human social needs — belonging, recognition, meaning — into proprietary metrics. Platform recognition is not portable; it exists only inside the platform that generated it. This dependency is not accidental: the platform retains power by ensuring that the social value its users generate cannot leave. A person who has built a large following on one platform has, in a meaningful sense, handed their social identity to a private corporation for safekeeping.

ISR proposes a form of what might be called social sovereignty: a portable, community-governed, cross-context record of civic identity that belongs to its holder, not to any platform. A person with a well-developed ISR profile carries a verifiable history of contributions and commitments that is legible in any community using the standard — independently of any particular technology company's decisions about what to show, rank, or monetize.

### Toward a post-national framework

The nation-state is often treated as a natural and permanent feature of human political life — as if nations were something geography and history simply produced, the way rivers and mountain ranges did. The historical record is less flattering. The concept of the nation as the *primary* source of political legitimacy — the idea that sovereignty belongs to a people defined by shared language, culture, or territory, and that states should be organized accordingly — crystallized in the late eighteenth and early nineteenth centuries, in the wake of the French Revolution and the Napoleonic reorganization of Europe. By historical standards, it is a very young idea: younger than the printing press, younger than calculus, younger than the steam engine.

More importantly, the nation-state was a solution to a specific set of problems — arbitrary dynastic authority, the illegitimacy of external conquest, the need for a new source of political legitimacy after the collapse of monarchical and religious consensus. Those problems were real. But the solutions we construct for one set of conditions do not automatically transfer to others. The nation-state framework now faces conditions its architects could not have imagined: instantaneous global communication, transnational corporations whose revenues exceed most national budgets, global supply chains that no single government controls, and planetary-scale risks — climate change, pandemic, AI proliferation, nuclear arsenals — whose causes and consequences are distributed across borders in ways that make the nation-state a structurally inadequate unit of response. The concept has not aged well, and there is little in the trajectory of the twenty-first century to suggest it will recover its former adequacy.

ISR does not deny the reality or the significance of national identity. National culture, language, and historical self-understanding are genuine and important dimensions of human identity — ISR treats them as one identity marker among many, no more and no less legitimate than professional identity, regional identity, or community identity. What ISR questions is not national self-identification but the claim that the nation-state is the appropriate and sufficient unit for resolving all collective decisions — a claim that is increasingly difficult to defend when the most consequential decisions affect populations that span many nations and generations.

The most urgent problems facing humanity — climate change, pandemic risk, AI governance, nuclear proliferation — do not respect national borders. They require genuinely transnational deliberation among people whose political identities are already plural: someone may simultaneously belong to a local neighborhood council, a professional association, an environmental NGO, and a global research network. Current political institutions have almost no capacity to manage this multiplicity.

ISR's architecture was designed with this future in mind. The Public of Appearance mechanism does not require geographic or national co-location — it requires genuine affectedness by a shared problem. In principle, this mechanism scales to civilizational scope. This is an intellectual horizon, not a current product claim: ISR's immediate work is validation and iteration in real communities. But the design aspiration should be named honestly.

## VI. What ISR Is Not — An Honest Account

### Not a social credit system

The comparison to the Chinese Social Credit System is the most common mischaracterization of ISR, and it deserves a careful response — not just a dismissal.

A state social credit system maintains a single, permanent, centrally administered score for each citizen. The criteria are determined by the state without citizen input. The score governs access to basic services — travel, education, finance. There is no appeal, no transparency into how the score was computed, no mechanism by which citizens can revise the criteria. The system's purpose is behavioral control in the service of political authority.

ISR is different in every one of these dimensions. The score is recalculated per issue and per ad-hoc public from transparent, inspectable components. No values are preset from above — all normative parameters are defined by community members themselves and can be revised by community consensus. The score does not govern access to basic services; it weights influence in deliberative processes. Every calculation is contestable. The community, not a state apparatus, controls the parameters.

The deeper difference is purposive: ISR is not designed to control behavior in everyday life. It is designed to improve the epistemic quality — the wisdom, the fairness, the genuine representativeness — of collective decisions. That is a fundamentally different goal, and it produces a fundamentally different system.

### Not a technocracy

ISR does not propose that AI or algorithms should govern communities. The AI components of the system — issue classification, credential evaluation, value alignment scoring — function as infrastructure that makes human deliberation more fairly weighted and more informed. Every score is explainable, every component is auditable, every parameter is community-adjustable. The Explorer tool exists specifically to make the scoring logic transparent to ordinary members.

An important caveat: this does not mean the system is neutral. Any computational representation of social reality carries the assumptions of its designers. ISR acknowledges this openly and responds to it structurally: the community revision mechanism, the transparent algorithm, the appeals process. Perfect neutrality is not available; accountable and revisable representation is.

### Not a replacement for law

Law works top-down: it sets rules for everyone and is enforced by the state. ISR works bottom-up: it helps affected people reach decisions in the space law does not settle. ISR does not enforce, override or replace legal due process. This is also a limit: in the space law leaves open, outcomes are only as fair as the community’s declared values and the inclusion of all affected people make them. ISR does not claim to deliver justice beyond that.

### A note on Arendt and technology

It would be intellectually dishonest to invoke Hannah Arendt's authority throughout this document without acknowledging a potential tension: Arendt's political ideal was explicitly non-bureaucratic. The council system she admired worked precisely because it required no formal scoring, no mediated administration, no computational infrastructure. Political life, for Arendt, was inseparable from the direct, embodied, unmediated encounter of distinct persons.

But caution is warranted before deciding what Arendt would have thought of ISR. She was not a conservative of the past and not a technophobe: she engaged closely with the intellectual and technological developments of her time, revised her positions when evidence required it, and showed no general hostility to innovation as such. What she was hostile to was the use of any system — technological or bureaucratic — to administer political life in ways that crowd out genuine human agency.

The AI systems available in Arendt's lifetime — punch-card computation and early mainframes — bore almost no resemblance to the LLM-based tools that now can facilitate deliberation, surface diverse perspectives, detect manipulation, and explain complex calculations in plain language. It is genuinely unknown what she would have made of them. What we can say is that the question she would have asked — *does this technology expand or contract genuine human political agency?* — is exactly the question ISR is designed around. A tool that makes deliberation more broadly accessible, more transparent, and more responsive to genuine stakes is arguably more Arendtian in spirit than the formal representative institutions she criticized.

ISR is an extension of Arendt's diagnosis — world alienation, the erosion of the Space of Appearance — applied to nowadays conditions. The problem she identified is real and ISR is a serious attempt at a response.

### ISR's scope: what it does not claim to govern

ISR is a framework for collective deliberation and community governance — and that scope is deliberately limited. There is a large and important domain of human life that ISR neither addresses nor aspires to address: intimacy, love, friendship, grief, artistic creation, religious and spiritual experience, and any other dimension of life in which the value of an act is inseparable from its irreducibly personal character.

These are not edge cases to be handled later — they are categorically outside ISR's domain. The framework is not a theory of everything. A deep friendship that has never produced any publicly visible action, a work of art that defies any community standard of evaluation, a private act of faith — none of these are subjects for ISR scoring, and the idea of applying ISR logic to them would be a fundamental misuse of the tool. ISR governs the dimension of human life in which we are irreducibly social actors whose choices affect others who have a legitimate stake in them. It explicitly does not govern the dimension in which we are singular persons whose deepest experiences cannot be meaningfully reduced to their social effects.

### Not finished

ISR is under active development and validation. The current phase focuses on community governance in small to medium organizations — housing associations, NGOs, cooperatives, DAOs — where the Dunbar-scale pressures are already being felt and where real comparative data can be gathered. Claims about civilizational-scale application are intellectual horizons, not deployed features.

Known challenges require ongoing work: the privacy paradox inherent in transparent accountability, the risk of behavioral optimization displacing genuine commitment, the potential for algorithmic bias in value evaluation, and the chilling effects that any scoring system may induce. ISR takes these risks seriously and acknowledges them explicitly. A system that claims to have solved them has not examined them carefully enough.

## VII. ISR as an Ethical Layer for AI Systems

### The problem AI governance has not solved

The proliferation of AI systems into consequential real-world decisions — medical triage, autonomous vehicles, public service allocation, financial credit, criminal sentencing — has generated urgent demand for what researchers and regulators call AI alignment: the problem of ensuring that AI systems pursue goals that reflect genuine human values, not proxy metrics that optimize something measurable at the expense of something that matters.

Most current approaches to AI alignment face a foundational difficulty: they treat "human values" as a fixed target to be specified in advance by designers, regulators, or training data curators. But human values are not fixed. They are contextual, plural, evolving, and genuinely contested between communities with different histories and different stakes. A governance framework that pretends otherwise will either over-constrain AI systems to reflect one community's norms, or under-constrain them in ways that allow harm.

### What ISR can contribute

ISR proposes a different architecture. Rather than specifying values for AI systems from above, ISR provides a mechanism by which affected communities continuously express, refine, and act on their values — and makes those value profiles available as structured, mathematically legible inputs to AI decision systems operating in those communities' domains.

Consider an autonomous emergency resource allocation system serving a city district. Whose values should govern its decisions about which calls to prioritize? A system pre-loaded with abstract utilitarian criteria will produce decisions that many community members find wrong in ways they cannot articulate within the system's framework. A system informed by the ISR Vector of Values of the community it serves — regularly updated, community-governed, transparent — can make its trade-offs in a language the community has itself defined. When those trade-offs are contested, the community has a principled mechanism for revising them.

This is not a claim that ISR solves AI alignment. It is a claim that ISR solves a prior problem that alignment research often skips: the problem of determining whose values, expressed how, with what update mechanisms, should govern AI behavior in a given community context. ISR provides a structured, transparent, community-governed answer to that prior question.

### Accountability when AI acts

A related problem is accountability. When an AI system makes a consequential decision, the question "who is responsible?" currently has no good answer. The developer disclaims responsibility for deployment decisions. The deploying organization disclaims responsibility for the model's outputs. The affected person has no recourse.

ISR's architecture of individual accountability — the insistence that responsibility always traces to persons, not systems or roles — offers a principled framework for distributing AI-related accountability. The person who chose to deploy an AI system in a given context, the community that defined the value parameters the system operates under, and the individual whose action or inaction triggered a particular AI decision all bear traceable, proportional responsibility. The evasion "the algorithm decided" is structurally refused by ISR in exactly the same way as "I was following orders."

### An ISR-ready society

Looking further ahead: as AI systems become more capable and more deeply integrated into collective decision-making, the communities they serve will need to be capable of genuine, informed engagement with those systems' value assumptions — not just accepting or rejecting their outputs, but actively shaping the normative frameworks they operate within. This requires a population with developed habits of value articulation, collective deliberation, and accountability for community decisions.

These are exactly the habits ISR is designed to cultivate. A community that has used ISR to govern its own decisions — based on common values, practiced transparent deliberation, and built a culture of individual accountability — is a community equipped to engage with AI governance in a genuinely informed way. ISR and advanced AI are not competing visions: ISR is a proposal for how human communities can remain the genuine authors of the values that AI systems, at their best, should serve.

## VIII. For You, Right Now

### What this means in practice

The sections above have explored large questions — historical, anthropological, political. Here is what those questions mean, concretely, for a person considering whether to try ISR in their community.

You live, most likely, in some kind of community that makes collective decisions: a housing cooperative, a neighborhood association, a professional guild, an NGO, a local government body, a research team. These communities almost certainly have recurring problems: decisions that feel unfair, voices that feel unheard, expertise that goes unrecognized, contributions that go unrewarded, conflicts that never quite resolve. Some members dominate discussions not because they know more but because they are louder. Some expertise is invisible because its holders are new, or quiet, or outside the informal social network. Some long-serving contributors carry institutional memory that formal voting processes cannot capture.

ISR addresses these problems structurally. When your community faces a problem, ISR assembles an Ad-hoc Public of everyone genuinely affected by it — not just those who happen to attend the meeting or hold a formal position. It weights each voice by three factors: how directly affected this person is by the specific issue (Relevance), what relevant knowledge or track record they bring to it (Expertise), and how their history of actions in the community aligns with its stated values (Contribution). Every one of these factors is visible, inspectable, and contestable.

### What changes for you

As an individual member, ISR changes what it means to participate. Your contributions are no longer invisible — they accumulate into a record that is portable and legible across contexts. Your declared values are no longer just words — they become a frame against which your actions and actions of other members of your ad-hoc public are contextually evaluated, creating a genuine feedback loop between what you say matters and what you do about it.

This may feel uncomfortable at first. Most of us are accustomed to a gap between stated values and lived behavior — ISR narrows that gap, not by judging it harshly, but by making it visible. The goal is not to catch people being hypocrites. It is to build communities in which transparency and accountability create conditions for genuine trust — and where the work of governing a shared life feels, finally, like it belongs to the people who actually live it.

### The larger stake

Every community that uses ISR is, in a small but real sense, conducting an experiment in a different way of organizing collective life. The data those communities generate — about what kinds of decisions improve, what kinds of participation become possible, what problems resist resolution even with better tools — is the foundation on which any larger claim (in multi-cultural and multi-national space) about ISR can eventually rest.

What is said above is not decoration. It is the reason ISR is built the way it is built, and the reason it is worth taking seriously. But philosophy without practice is speculation. The invitation ISR extends to each community that adopts it is the invitation to test whether these ideas are true — not in theory, but in the daily, contentious, sometimes maybe even frustrating, occasionally transformative work of governing a shared life.


---




# Chapter 7: Foundations — Sociology


*Source: `wiki/ISR-sociology.html`*

---


# The Sociological Architecture of the ISR Framework

Scaling Sociality, Ad-Hoc-Solidarity, and High-Dimensional Value Alignment in the Post-Dunbar Era

Modern societies face persistent challenges in organizing collective action at scales larger than intimate groups. Traditional communities—rooted in geography, kinship, or long-term shared life—once provided dense networks of mutual knowledge, reputation tracking, and direct accountability. In contrast, contemporary settings like housing cooperatives, NGOs, professional associations, and civic initiatives often operate among people who interact episodically, with varying levels of stake, knowledge, and commitment. Decisions frequently default to blunt mechanisms: one-person-one-vote that equalizes voices regardless of relevance or expertise, or informal hierarchies where visibility and assertiveness outweigh demonstrated responsibility, or formal hierarchies where decision-making is not the majority business at all. The result is often misalignment, frustration, free-riding, or outcomes that fail to reflect the group's actual shared purposes. ISR addresses these challenges through a sociological architecture centered on  ad-hoc issue publics and a future-oriented Values-Actions subsystem that makes alignment between a community’s stated aspirations and its actual collective behavior visible, measurable, and improvable.

## I. The Persistent Challenge of Scale: Insights from Dunbar’s Research

A well-established finding in the study of human social organization is the cognitive and relational limit on the number of stable, meaningful relationships most people can maintain — commonly known as Dunbar’s Number around 150 individuals. Drawing from primate studies, anthropological data on hunter-gatherer bands, historical village sizes, and observations of modern groups such as military companies, Hutterite colonies, and innovative firms like W. L. Gore & Associates (Gore-Tex), researchers have noted a recurring pattern: when groups consistently exceed roughly 100–200 people, organic mechanisms of trust, reputation tracking, and peer accountability become significantly harder to sustain.

In smaller, Dunbar-scale groups, social cohesion relies on dense, multiplex ties — people know one another personally, track contributions and character through direct interaction and gossip, and enforce norms horizontally through social pressure and mutual obligation. Beyond this threshold, relationships tend to become more abstract and categorical. Trust shifts from personal knowledge toward formal rules, institutions, and hierarchies. Conflict resolution moves from peer mediation to bureaucratic processes. This scale transition helps explain recurring sociological phenomena: increased free-riding, alienation, the rise of impersonal governance, and the tendency for influence to concentrate among those with visibility rather than demonstrated responsibility.

Importantly, many successful organizations have responded pragmatically to this limit rather than ignoring it. Hutterite communities traditionally split colonies around 150 members to preserve communal governance by peer pressure. Gore-Tex famously designed its facilities to stay under 150 employees, building new plants instead of enlarging existing ones to maintain innovation and cohesion. Military units have long organized around company-sized groups of roughly this scale for similar reasons.

This "post-Dunbar" reality does not make large-scale cooperation impossible, but it changes its character. Traditional small communities gave way to secondary groups and mass society, where coordination often depends on formal structures that can dilute genuine agency and shared purpose.

ISR’s ad-hoc publics represent a deliberate sociological response to this challenge. Rather than forcing all participation into either tiny intimate circles or undifferentiated mass structures, ISR enables the fluid formation of issue-specific groups of any scale. These groups do not rely on remaining small for accountability. Instead, ISR extends the mechanisms of social accounting—naturally effective in small groups—into large-scale environments through continuous relevance assessment, value aggregation, and contribution tracking.

In this way, accountability is not preserved by limiting group size, but by structuring interaction. Large-scale participation becomes possible without collapsing into anonymity or abstraction, as individuals remain contextually visible through their relevance, expertise, and contribution within each public. Ad-hoc publics can therefore scale beyond Dunbar constraints while retaining the functional properties of small-group coordination, and are linked across broader ecosystems through transparent values vectors and contribution assessment.

## II. Public of Appearance: A New Sociological Paradigm

ISR introduces Pubic of Appearance (ad-hoc issue public) as one of its central sociological innovations — redefining community not as a stable social structure, but as a problem-oriented process of coordination. In the ISR model, an ad-hoc public is not defined by fixed size, geography, identity, or permanent membership. It is defined by a specific issue, question, or problem that a group of people decides to address together. Unlike traditional communities, this definition does not require prior relationships, shared identity, or temporal stability. This formulation reflects a growing class of contemporary challenges, where heterogeneous groups must coordinate and reach consequential decisions on issues that directly affect them.

A Public of Appearance can be small — for example, ten residents of one apartment building discussing the repair of a children’s playground. Conversely, a Public of Appearance may emerge around a global issue — for example, participants from different countries coordinating responses to an environmental, technological, or policy-related challenge. What brings people together is not shared ideology or personal bonds, but a shared problem or opportunity.

The system calculates Relevance for every user — a score [0.0–1.0] that reflects how strongly the issue is likely to affect them (geographically, demographically, semantically, or socially). Based on this score, ISR proposes a threshold and automatically highlights the most relevant members. However, participation is never restricted. Any person can join any ad-hoc public if they wish. Those with low Relevance receive lower direct influence on the final decision through the ISR-Score, but they retain the full right to participate in deliberation, express their opinions, and contribute to the public.

This design solves a critical practical problem of traditional platforms: without relevance filtering, users are quickly overwhelmed by a flood of irrelevant issues. The proposed threshold functions as a prioritization and attention-guidance mechanism rather than a barrier to participation.

In this sense, they are issue-based ad-hoc publics that form, evolve, and dissolve in response to concrete situations, rather than as formal social groups.

This model differs significantly from classical sociological categories of community. Traditional primary groups (Cooley) are intimate and based on enduring emotional ties. Secondary groups are typically formal, bureaucratic, and relatively stable. Mass democratic systems, by contrast, tend to treat citizens as an abstract, homogenized mass — reducing complex individuals to simple numerical units ("one person — one vote"). Such systems prioritize formal equality, often at the cost of accounting for differences in stake, knowledge, expertise, and personal investment. In doing so, which can lead to a flattening of relevant differences and, in some cases, a reduction in decision quality.

ISR ad-hoc publics offer a different approach. They are:

- **Issue-centric** rather than identity-based or permanent,
- **Dynamically formed** and dissolved around concrete problems,
- **Open by design** — participation is universal, while influence is context-sensitive,
- **Pluralistic** — individuals can participate in multiple ad-hoc publics simultaneously, each with distinct compositions and priorities.

Within a pablic, the weight of each member’s voice (ISR-Score) is determined by three components: Relevance (how much the issue affects them), Expertise (their relevant knowledge and resources - how they can affect the issue), and Contribution (how well their past actions aligne with the public’s emerging values).

Importantly, values do not function as the initial unifying force. Individuals come together primarily in response to a shared problem or situation. The Vector of Values of an ad-hoc public emerges from the aggregation of members’ individual value descriptions. It is subsequently used to evaluate alignment and inform the Contribution component of the ISR-Score.

From a sociological perspective, this represents a shift from viewing community as a stable social container toward understanding it as a flexible, problem-driven and temporally bounded social process. It acknowledges value pluralism and individuality while enabling coordinated collective action. By allowing broad participation while intelligently weighting influence according to context, stake, and demonstrated responsibility, ISR Publics of Appearance aim to restore meaningful agency and accountability in collective decision-making — without reducing individuals to abstract, interchangeable units.

This approach aligns collective decision-making more closely with situated knowledge, differentiated responsibility, and context-sensitive participation.

## III. The Values-Actions Subsystem: Bridging Aspirations and Practice in Community Life

At the core of ISR lies the Values-Actions subsystem, a structured mechanism designed to make the often-invisible work of community alignment observable, measurable, and improvable. It addresses a classic sociological challenge: the persistent value-action gap — the well-documented discrepancy between what groups or individuals say they value and what they actually do in practice. Traditional sociology has long observed this gap in areas ranging from environmental behavior to organizational culture and social movements, where stated ideals frequently fail to translate into consistent collective outcomes due to contextual pressures, power dynamics, social desirability bias, or weak accountability structures.

The ISR approach is grounded in this sociological tradition while introducing a distinctly innovative operationalization tailored for real-world community governance.

### Grounding in Sociological Thought

Sociology has long treated values as central to understanding social order, cohesion, and change. From Durkheim’s emphasis on shared moral frameworks to Weber’s analysis of how values shape economic and organizational life, values are seen as guiding principles that motivate attitudes and behaviors. Shalom Schwartz’s Theory of Basic Human Values — one of the most influential frameworks in cross-cultural social science — identifies universal motivational domains (such as self-transcendence vs. self-enhancement, openness to change vs. conservation) and maps their dynamic relations of compatibility and conflict. This theory has been widely applied to explain group differences, cultural priorities, and the motivational bases of action.

ISR builds directly on these foundations. It draws from Schwartz-inspired structures but adapts and extends them specifically for action assessment in living communities rather than abstract personality profiling or broad cultural comparison. Where traditional approaches often measure values as static individual traits or diffuse cultural orientations (frequently via surveys that capture attitudes but struggle with behavioral prediction), ISR focuses explicitly on evaluating individual actions in relation to community values. It treats values not as private beliefs to be surveyed once, but as publicly articulated visions of “the kind of community we want to create together” — concrete descriptions of how freedom, care, justice, stewardship, and other domains should manifest in everyday decisions and practices.

This grounding acknowledges the sociological reality of value pluralism and conflict. Groups are rarely monolithic; competing priorities (e.g., individual autonomy versus collective safety, or immediate needs versus intergenerational stewardship) are inherent. ISR does not assume perfect consensus but makes these tensions explicit and navigable.

### Innovative Character: What Is New and Different

What sets the ISR Values-Actions subsystem apart is its future-oriented, action-assessment architecture combined with high-dimensional vector representation and computational comparison.

Traditional sociological and psychological tools often suffer from several limitations when applied to ongoing community governance:

- They tend to be **retrospective or present-focused** (measuring current attitudes or past behavior).
- They frequently **reduce complexity** to low-dimensional scales or qualitative descriptions that are hard to aggregate or compare systematically.
- They struggle to distinguish genuine alignment from performative statements or to handle the **contextual nature** of actions.

ISR innovates in three key ways:

1. **Future orientation:** Members are not asked to describe who they are today or what they personally prefer in isolation. They describe the concrete future community they want to help bring about — what *should* happen regarding freedom and autonomous choice, relational care, safety and order, justice and fairness, redemption processes, authentic expression, protection of the vulnerable and environmental stewardship, cooperation and governance, spiritual practice, and digital rights/technology. This forward-looking stance shifts the reference point from “what is” or “what I believe” to “what kind of collective life should our actions advance?” It has the potential to gradually shift social trends by orienting attention and accountability toward aspirational outcomes rather than reactive problem-solving or status-quo maintenance. Over repeated cycles of description, action, and assessment, communities may internalize a stronger habit of evaluating decisions against a shared vision, potentially reducing short-termism and cynicism while building cumulative momentum toward stated ideals.
2. **Explicit conflict acknowledgment and resolution weighting:** Real communities inevitably face trade-offs. ISR requires members to name and weight key conflicts (e.g., freedom vs. structure, justice vs. restoration, individual responsibility vs. systemic factors, privacy vs. safety). This makes value hierarchies legible rather than hidden, enabling more honest deliberation.
3. **Vector-based action assessment:** Qualitative narratives are transformed into quantitative vectors for systematic comparison with observed actions. This creates a feedback loop that makes alignment (or misalignment) visible without reducing humans to simplistic categories.

### Detailed Structure of the 233-Dimensional Vector

The ISR Values Taxonomy (v1.0) produces a rich, structurized 233-dimensional vector (core values + conflict resolution + contextual shifts + metadata). It is deliberately balanced for the purpose of action assessment in community settings rather than exhaustive psychological profiling.

- **10 Domain-level scores** (0–100) - groups of core values in areas:

  1. Agency & Freedom
  2. Relationality & Care
  3. Security & Stable Order
  4. Justice & Fairness
  5. Redemption & Restoration
  6. Authentic Expression & Value-Living
  7. Protective Care & Stewardship
  8. Cooperation & Shared Governance
  9. Spiritual & Religious Practice
  10. Digital Rights & Technology

                These provide a simplified overview of emphasis.
- **145 Fine-grained items** (organized by domain, scored 0–100): These break domains into specific, actionable facets and clusters. For example, under Agency & Freedom there are items on bodily/medical autonomy, anti-coercion measures, and self-determination spaces. Under Stewardship there are detailed items on child protection, environmental commitment, and intergenerational duty. The distribution (6–27 items per domain) ensures sufficient depth in complex areas like Digital Rights & Tech (27 items) and Stewardship (21 items), while keeping lighter-touch domains (e.g., Redemption with 6 items) focused. This balance allows the taxonomy to reflect the nuanced reality of community actions without unnecessary redundancy.
- **36 Conflict Resolution (CR) weights** (0–100): These explicitly model practical trade-offs (e.g., CR.1: Individual Freedom vs. Collective Harmony; CR.3: Proportional Justice vs. Restoration; CR.30: Digital Privacy vs. Safety). They capture how a community prefers to resolve tensions when values compete, turning potential paralysis into informed prioritization.
- **Contextual Shifts** (40 dimensions, -50 to +50 across 4 contexts × 10 domains): Values are not applied uniformly. The system accounts for how priorities may shift in work-like, family-like, private, or crisis settings, adding situational realism.
- **Metadata** (20 dimensions): Grounding level and confidence scores per domain track how explicitly and unambiguously each area was addressed in the member’s narrative. This prevents over-interpretation of weak signals.

The overall structure is grouped yet computationally tractable: domains provide summary signals, items add resolution for nuanced actions, CR weights handle inherent tensions, and contextual shifts add realism. Null handling is philosophically and sociologically sound — “mutual silence ≠ disagreement”: if an action does not engage a domain, or if a community has no strong stance there, that dimension is simply skipped in alignment calculations rather than penalized. This respects the bounded, issue-specific nature of real community life.

The deliberate future-orientation is one of ISR’s most innovative features. By asking members to describe not who they are today, but the concrete community they want to help create, the system shifts the reference point from retrospective attitudes or current preferences toward aspirational collective outcomes. Over repeated cycles of articulation, action, and assessment, this approach has the potential to gradually reorient social trends — moving communities from reactive coordination and short-term compromises toward more consistent, proactive co-creation of their desired future.

### How Well Does It Reflect Human Actions and Achieve ISR Goals?

Within the scoped purpose of ISR — assessing whether concrete community actions (tasks, messages, decisions in housing co-ops, NGOs, associations, civic initiatives) move the group toward or away from its self-described desired future — the taxonomy offers strong coverage. The 10 domains and 145 items comprehensively address the recurring tensions of collective life: autonomy vs. coordination, care vs. fairness, stability vs. change, present vs. future, individual vs. group. The explicit conflict and contextual components allow it to model the situated, contested character of social action more faithfully than flatter value inventories.

Limitations are acknowledged by design: it does not claim to capture every nuance of human motivation or psychology, nor does it judge individuals morally. It focuses narrowly on action alignment with community-stated ideals, remaining contestable and updatable as values evolve. High dimensionality preserves nuance while enabling systematic comparison via cosine similarity (adjusted by CR and contextual factors) combined with action “force” (magnitude based on type, time, complexity, and results) and peer sentiment.

This creates a powerful, sociologically grounded loop: communities articulate aspirational futures → actions are assessed against them → contribution becomes legible → feedback informs future decisions. Over time, this has the potential to narrow the value-action gap not through external enforcement but through increased transparency, accountability, and shared orientation toward co-created outcomes.

In housing cooperatives deciding on resource allocation, NGOs coordinating projects, or professional bodies setting standards, the subsystem transforms abstract values talk into a practical tool for self-governance. It does not eliminate pluralism or conflict, but renders them productive by making alignment a visible, improvable practice rather than an assumed or enforced state.

This future-oriented, vector-mediated approach represents evolution of sociology-informed tools that can support living communities: moving from description and critique toward enabling communities to more effectively enact the futures they describe.

## IV. Distinguishing ISR from Social Credit Systems

Any systematic assessment of human actions against values inevitably invites comparison with Social Credit Systems (SCS), most notably those developed in China. From a sociological perspective, these systems represent one approach to managing trust, compliance, and social order at scale. However, ISR and Social Credit Systems differ fundamentally in their purpose, governance, design philosophy, and likely social consequences.

In contrast, the ISR Values-Actions subsystem is designed for voluntary, bottom-up community self-governance. It operates within specific ad-hoc publics (that can correspond to formal communities, e.g., housing cooperatives, NGOs, professional associations) and is grounded in members’ own articulated visions of a desirable future, not externally imposed standards.

| Primary Purpose | Strengthening state-led social order and compliance | Enabling communities to align actions with their self-defined future vision |
| --- | --- | --- |
| Ownership & Governance | Centralized or government-directed; often opaque | Decentralized, community-owned; transparent vectors |
| Value Basis | Broad trustworthiness defined by authorities/law | High-dimensional (233-dim) vectors derived from members’ concrete descriptions of desired community life |
| Conflict Handling | Implicit prioritization of official norms | Explicit modeling of 36 conflict-resolution weights (e.g., freedom vs. safety, justice vs. restoration) |
| Scope of Assessment | Often broad, cross-domain sanctions ("once untrustworthy, restricted everywhere") | Issue- and context-specific; respects "mutual silence ≠ disagreement" |
| Consequences | Primarily rewards/punishments with material restrictions | Contribution scoring for influence and accountability within the ad-hoc public; no external penalties |
| Effect on Social Relations | Can create persistent biases, outgroup effects, and reduced interpersonal trust in some studies | Aims to build legible accountability and trust through shared, contestable standards |

The ISR approach rejects "reputation as top-down control" in favor of reputation as collaborative alignment. It treats values as dynamic, plural, and future-oriented commitments that members negotiate and revise, rather than a singular scorecard of moral or civic worth. By focusing exclusively on actions relative to a group’s own stated ideals — within bounded ad-hoc publics — ISR minimizes the risks of generalized stigma or status crystallization that can emerge in broader scoring regimes.

Sociologically, this distinction matters. Systems that impose uniform behavioral metrics risk reinforcing power asymmetries and reducing the "Space of Appearance" where genuine political agency and plural deliberation can occur. ISR, by contrast, seeks to augment that space at actionable scales, making the gap between collective aspirations and everyday practice visible and addressable without external enforcement.

This comparison underscores ISR’s commitment to pluralistic, self-governing communities rather than centralized behavioral engineering. By design, ISR operates only within voluntary, self-governing ad-hoc publics and carries no external sanctions or cross-domain penalties.

### Conclusion

By integrating classical sociological insights into the limits of scale with practical tools for explicit value articulation and action assessment, ISR offers a meaningful pathway toward coherent collective life in complex, post-Dunbar societies. Ad-hoc issue publics restore accountable, values-grounded interaction at actionable scales, while the future-oriented Values-Actions subsystem makes the gap between aspirations and practice legible and bridgeable.

ISR does not eliminate pluralism or conflict, but renders them navigable. In housing cooperatives, NGOs, professional associations, and civic initiatives, it supports a renewed form of self-governance — one that respects human relational realities while enabling communities to more effectively enact the futures they collectively describe.


---




# Chapter 8: Foundations — Augmented Democracy (ISR & Hannah Arendt)


*Source: `wiki/ISR-Arendt-article.html`*

---


# Towards a Computational Space of Appearance: Creating the Conditions for Inclusive Political Action at Post-Dunbar Scale

## Sergii Ponomarchuk, September 2025 - September 2026

## Abstract

This paper examines Hannah Arendt's diagnosis of modern political life and argues that the computational frameworks now emerging offer an historically unprecedented opportunity: not to recover a Space of Appearance that once existed, but to build upon the legacy of democratic innovation and closely approach the structural conditions for genuine (direct and inclusive) political action at scales that exceed the cognitive limits of unaided human sociality described by Dunbar. We situate this argument in dialogue with the dominant contemporary critique of algorithmic systems - developed by Rosa, Rouvroy, Zuboff, and Srnicek - and contend that the pathologies these critics identify are features of a specific political-economic architecture, not of computational mediation as such. Furthermore, we argue that as AI accelerates the transition toward post-scarcity, securing political agency against human functionalization requires shifting from a strictly economic framework to a transparent "social ledger." The Index of Social Responsibility (ISR) is examined as a framework example designed on contrary architectural principles: appearance over anonymity, deliberation over preemption, community-governed values over proprietary extraction, and individual accountability over role-diffusion. Drawing on Milgram's obedience experiments and Arendt's concept of the “banality of evil”, we argue that countering the institutional architecture of moral evasion through individual accountability is not merely an ethical preference but a structural prerequisite for political action. The paper concludes with an honest critical examination of what ISR does not yet resolve and what open research questions its design raises.

**Keywords:** political action, Hannah Arendt, Space of Appearance, algorithmic governmentality, augmented democracy, social responsibility, post-Dunbar scale, individual accountability, Index of Social Responsibility.

## Introduction

In 1958, Hannah Arendt published *The Human Condition*, articulating a prescient critique of modern society's drift toward what she termed the triumph of *animal laborans*—the laboring animal absorbed in biological necessity—over genuine political action.1Hannah Arendt, The Human Condition (Chicago: University of Chicago Press, 1958), 322. Her central concern was not a technical failure of democratic institutions but a deeper civilizational shift: the displacement of the political realm by the social and the economic, and the consequent erosion of the Space of Appearance, the fragile domain in which human beings reveal themselves to one another through speech and deed.

Arendt's diagnosis has proved more durable than most of her contemporaries anticipated. The sixty years since its articulation have seen successive waves of technological and institutional change that have, in the main, confirmed rather than falsified her prognosis. Digital platforms have not restored the Space of Appearance; they have commercialized its simulation, driving algorithmic polarization rather than political plurality.2Zachary Daus, "Putting the 'Social' in Social Media: Hannah Arendt, Political Judgment, and Online Polarization," Blog of the American Philosophical Association, April 7, 2025, [https://blog.apaonline.org/2025/04/07/putting-the-social-in-social-media-hannah-arendt-political-judgment-and-online-polarization/](https://blog.apaonline.org/2025/04/07/putting-the-social-in-social-media-hannah-arendt-political-judgment-and-online-polarization/). Similarly, representative democracy has not recovered its legitimacy; it has suffered a measurable, steady erosion of trust as citizens increasingly disconnect from genuine decision-making, producing deep structural vulnerabilities to bureaucracy, corruption, and populism.3K. J. S. Silva, "Social Media, World Alienation and Post-Truth: Reflections on Hannah Arendt's Political Thought," Society and Politics 18, no. 1 (2024): 12. And the dominant intellectual response to these developments—a well-grounded critique of algorithmic governance, surveillance capitalism, and platform power—while diagnostically accurate, has largely stopped short of proposing structural alternatives.

Before evaluating how we might respond to this ongoing crisis, we must first explicitly define our evaluative criteria:

**Genuine political action** refers to the Arendtian capacity to introduce something entirely new into the world (*natality*). It is the uncoerced realization of a person's agency to make deliberative decisions regarding the shared conditions of their life, disclosing their unique identity through speech and deed in concert with others.

**The Space of Appearance** is the structural condition - the public realm - where this action is witnessed, recognized, and given durable meaning.

**Inclusive political action** is defined as participation strictly decoupled from historical barriers of gender, property, or geography, structurally open to any individual who is demonstrably affected by a collective issue.

**The agent of political creation** in this context is not an abstract community, an algorithm, or a representative institution, but the *real, specific individual*. Genuine political action requires a framework that establishes the conditions for personal agency, where a specific person makes direct decisions regarding shared issues and, in doing so, assumes explicit, non-delegable responsibility for the outcomes.

The question, then, is what it would take to create - not merely restore - the structural conditions for this kind of genuine, inclusive political action at a scale that exceeds the cognitive limits of unaided human sociality.4Robin I. M. Dunbar, "Neocortex size as a constraint on group size in primates," Journal of Human Evolution 22, no. 6 (1992): 469–493.

To investigate this, this paper examines the Index of Social Responsibility (ISR) as a candidate computational framework designed with this ambition. A core claim of the paper is that this architectural focus on individual accountability responds directly to the line of thought running from Arendt's analysis of the "banality of evil" in *Eichmann in Jerusalem* to Milgram's obedience experiments, which together suggest that the diffusion of responsibility in social institutions is not an ethical accident only but a structural feature as well. ISR is not presented here as a proven solution but as a design proposal that illustrates what the structural conditions for inclusive political action at post-Dunbar scale might look like, and what the hardest questions are that any such proposal must answer.

The paper is organized in four parts. Part I develops the diagnostic tradition from Arendt through her contemporary inheritors. Part II presents the ISR framework as a counter-example to the dominant digital architecture. Part III addresses the strongest objections from the critical tradition directly. Part IV offers an honest assessment of what ISR does not resolve and what research remains open.

## Part I: The Diagnosis Extended - Arendt and Her Contemporary Inheritors

### 1.1 Arendt's Analytical Framework

Arendt's conceptual architecture in *The Human Condition* rests on a tripartite distinction within the *vita activa: labor*, the cyclical biological process of consumption and reproduction; *work*, the fabrication of durable objects that constitute a shared human world; and *action*, the only activity that occurs directly between persons, without the mediation of things, and the only sphere in which human beings can truly realize freedom and plurality. Action is the category Arendt identifies with politics in the fullest sense: it is the activity through which the *who* of a person is disclosed, through which new beginnings enter the world, and through which genuine power - as opposed to mere violence or administration - is generated and sustained.

The Space of Appearance is not a place but a condition: it comes into being whenever people gather to act and speak in concert, and it dissolves when they disperse. Its fragility is structural. Because it exists only in its actualization, it requires active, continuous renewal. What Arendt diagnosed in modern societies was the progressive destruction of the conditions under which this space can arise: the subordination of action to the cyclical logic of labor, the replacement of worldly durability with consumer impermanence, and the colonization of the political realm by economic administration. As Steven Klein observes, for Arendt, "the danger is not the invasion of politics by economics, but rather the loss of the worldly, mediating institutions that allow economic matters to appear as objects of public concern." 5Steven Klein, "Fit to Enter the World': Hannah Arendt on Politics, Economics, and the Welfare State," American Political Science Review 108, no. 4 (2014), 857.

Crucially, the Space of Appearance does not arise from biological necessity or a mere survival instinct, but from the human condition of plurality. To facilitate this revelation of identity and sustain it across generations, humans build structural conditions—laws, cultures, and institutions—that constitute the boundaries of the public realm. However, Arendt’s conceptualization of "pure" action occurring strictly between persons, without the mediation of things, has been intensely debated. Habermas, for instance, questions whether communicative action can truly be divorced from the material and structural mediums that enable it.6Jürgen Habermas, The Theory of Communicative Action, Vol. 1: Reason and the Rationalization of Society, trans. Thomas McCarthy (Boston: Beacon Press, 1984), 286. This critique is vital for our purposes, as any modern governance framework inherently relies on technical mediation, challenging Arendt’s strict separation of work (fabrication) from action.

### 1. 2 The Structural Pathologies of Representation

A second concept central to this paper is Arendt's idea of natality: the human capacity to introduce something genuinely new into the causal chain of the world. For Arendt, natality is the ontological ground of political action, characterized by unpredictability. Any institutional design that eliminates unpredictability eliminates political action along with it.

Elections and referendums—the most widespread democratic governing practices, often stated as the only forms of political action used by the majority—build decision-making hierarchies that struggle to accommodate this natality at scale. They do so for low-level citizens who surrender their rights to representatives, and for medium- and high-level officials who become trapped by bureaucratic legacy and socio-economic inertia. This systematic transfer of personal decision-making to representatives formally removes individual responsibility. Consequently, mass attention is turned away from genuine political action toward consumption, narrowing citizens' self-perception to the *animal laborans* state Arendt warned against.

This depoliticization and atrophy of individual agency serve as the fertile ground for the structural pathologies of governance. When genuine action is displaced, it produces a vacuum highly susceptible to **bureaucracy** (which Arendt famously termed "the rule of nobody"), **corruption** (which thrives in the opaque space between the represented and the representative), and **populism** (the symptomatic backlash of an alienated electorate seeking to bypass paralyzed institutions).

Finally, we must address the historical realities of the Space of Appearance. As feminist and critical theorists like Pitkin, Dietz, and Benhabib have extensively documented, the historical exclusions in Arendt’s public realm were not accidental oversights but structural features.7Hanna Fenichel Pitkin, "Justice: On Relating Private and Public," Political Theory 9, no. 3 (1981): 328; Mary G. Dietz, "Citizenship with a Feminist Face: The Problem with Maternal Thinking," Political Theory 13, no. 1 (1985): 20; Seyla Benhabib, The Reluctant Modernism of Hannah Arendt (Thousand Oaks, CA: Sage Publications, 1996), 198. The Athenian agora excluded roughly 85% of its population.8Mogens Herman Hansen, The Athenian Democracy in the Age of Demosthenes: Structure, Principles, and Ideology (Norman: University of Oklahoma Press, 1991), 90–94. Similarly, the medieval communes, guild assemblies, and early civic bodies that Arendt referenced as spaces of localized freedom were, in practice, assemblies of propertied men, structurally excluding the vast majority of residents based on wealth, class, and gender.

Arendt’s preferred modern alternatives—the revolutionary councils she admired in *On Revolution—*attempted to break these barriers, emerging as workers' and neighborhood-based bodies such as the Paris Commune and the Russian soviets.9Hannah Arendt, On Revolution (New York: Viking Press, 1963), 262. However, while these councils might initially appear as instances of unbounded natality, they ultimately serve as cautionary tales rather than viable templates. In practice, these formations attempted to solve immense social complexity through radical reductionism, swiftly collapsing into dictatorship and the physical elimination of political opposition. Having failed to sustain the structural conditions for plurality, and resulting in catastrophic violence and economic ruin, they were quickly replaced by the very bureaucratic administration they sought to overcome. Therefore, neither the exclusionary spaces of antiquity and the Middle Ages, nor the radical councils of modernity, can serve as the model for the inclusive Space of Appearance we seek to build.

### 1.3 The Scale Problem Arendt Did Not Theorize

There is a dimension of the political crisis Arendt diagnosed but did not fully theorize: the cognitive constraint on sociality at scale. The anthropologist Robin Dunbar demonstrated that the human neocortex imposes a practical limit of approximately 150 on the number of stable, trust-based social relationships an individual can maintain.10Dunbar, "Neocortex Size," 469. Below this threshold—what has become known as *Dunbar's number*—informal reputation, mutual knowledge, and direct accountability function without institutional mediation. Communities at this scale are, in a meaningful sense, self-governing by default: everyone knows who contributed what, who can be trusted in which context, and who bears responsibility for what outcome.

The historical instantiations of the Space of Appearance discussed previously—such as the active decision-making bodies within the agora or the councils—were only able to function without rigid bureaucratic mediation because their severe demographic exclusions artificially kept their participant numbers at or near this cognitive scale.

This is not a criticism of Arendt but an extension of her diagnosis to a problem she could not fully anticipate. The political crisis of modernity is not only the displacement of action by labor - it is the structural impossibility of sustained informal political community above Dunbar-scale without either representative delegation (which hollows out action) or computational assistance (which introduces new risks). The question is not whether to use technological mediation at post-Dunbar scale (we already use it increasingly); it is how to organize that mediation so that it extends rather than forecloses political action.

### 1.4 The Contemporary Critique: From Arendt to Algorithmic Governmentality

The advent of global digital networks initially appeared to offer a technological solution to the Dunbar constraint. The unprecedented proliferation of internet access promised to connect citizens horizontally, theoretically bypassing the need for bureaucratic representation. However, rather than facilitating a new computational Space of Appearance, the digital transition was absorbed into economic and architectural models that further dismantled political agency.

Before surveying the contemporary critiques of digital architecture, we must explicitly define the capacity that these systems threaten. Building on our earlier definitions, political agency is the capacity of individuals to intentionally shape their shared world through conscious, deliberative, and contestable choices, assuming direct responsibility for the outcomes.

Four major currents of contemporary thought demonstrate how current digital infrastructures systematically inhibit this agency, constituting a coherent critical tradition that this paper takes seriously before proposing any response.

**Hartmut Rosa: Acceleration and the Loss of Resonance**. Rosa's theory of social acceleration identifies a structural temporal mismatch: democratic deliberation is inherently slow, requiring time for reflection, argument, and revision, while the pace of economic and technological change renders its outcomes obsolete before they can take effect.11Hartmut Rosa, Social Acceleration: A New Theory of Modernity (New York: Columbia University Press, 2013), 59. This "desynchronization" produces what Rosa calls alienation in its most general form: the inability to enter into genuine, responsive relations with the world.12Hartmut Rosa, Resonance: A Sociology of Our Relationship to the World (Cambridge: Polity Press, 2019), 17. His concept of *Resonance*—the experience of being genuinely touched by and responding to the world—names what is absent from accelerated modernity. Critically, Rosa insists that resonance cannot be manufactured or optimized; it can only be enabled by creating the structural conditions in which it becomes possible (*Unverfügbarkeit*: the irreducible non-availability of resonance to deliberate production). This has direct implications for any computational governance framework: such a framework can, at best, create the structural conditions under which resonance and genuine political engagement become more likely; it cannot produce them.

**Antoinette Rouvroy: Algorithmic Governmentality**. Rouvroy's concept of *algorithmic governmentality* (developed with Thomas Berns) describes a form of power that bypasses subjects as political agents entirely.13Antoinette Rouvroy and Thomas Berns, "Algorithmic Governmentality and Prospects of Emancipation," Réseaux 177, no. 1 (2013): 168. Rather than addressing individuals through law, norms, or deliberation, algorithmic systems act on populations by processing behavioral data - "infra-individual fragments" such as clicks, dwell times, and purchasing patterns - to construct statistical profiles and modulate behavior preemptively. What is most significant about this form of power is precisely its invisibility: it operates below the threshold of political contestation, producing effects without making claims that can be challenged. Normativity is no longer articulated through public reasoning but embedded in predictive infrastructures. The result is what Rouvroy calls the "death of politics": governance reduced to optimization, eliminating the "power of irruption" - the capacity for the genuinely new and unexpected - that Arendt identified as the essence of political action.

**Shoshana Zuboff: Surveillance Capitalism.** Zuboff provides the economic-structural analysis that grounds Rouvroy's philosophical account.14Shoshana Zuboff, The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power (New York: PublicAffairs, 2019), 8. *Surveillance capitalism* is a novel market logic in which human experience is systematically converted into behavioral data, which is then processed to generate "behavioral futures" - predictions about what users will do next - that are sold to advertisers and others seeking to modify behavior at scale. What appears as participation (posting, liking, sharing) is structurally a form of extraction: users contribute data to systems that use it to influence them without meaningful consent or awareness. Zuboff's key insight is that this is not an accidental pathology of digital capitalism but its defining logic: the data that enables behavioral modification is the product being sold, and the human being generating it is the raw material.

**Nick Srnicek: Platform Capitalism**. Srnicek complements Zuboff with a structural economic analysis: digital platforms tend systemically toward monopoly through network effects (more users generate more data, enabling better services, attracting more users), creating *winner-takes-all* dynamics that concentrate unprecedented knowledge and decision-making power in the hands of a small number of private actors.15Nick Srnicek, Platform Capitalism (Cambridge: Polity Press, 2016), 43. This concentration is not incidentally but structurally anti-democratic: it produces radical asymmetries of information and power between platforms and users, and between platforms and public institutions, that make democratic oversight increasingly difficult.

### 1.5 The Architecture of Moral Evasion

The structural crisis of modern governance is not limited to the scale of representation or algorithmic enclosure; it extends to the deliberate institutional dilution of individual responsibility. Hannah Arendt's report on Adolf Eichmann introduced the concept of the "banality of evil," observing how institutional hierarchy allows individuals to surrender independent moral judgment.16Hannah Arendt, Eichmann in Jerusalem: A Report on the Banality of Evil (New York: Viking Press, 1963), 287. His repeated formula—"I was just following orders"—exemplified the institutional architecture of moral evasion.

While historians such as Bettina Stangneth have validly questioned whether this diagnosis accurately applied to the historical Eichmann's inner life (arguing he was highly conscious and fanatical rather than a thoughtless cog), Arendt nevertheless identified a profound and verifiable structural pathology of modern governance.17Bettina Stangneth, Eichmann Before Jerusalem: The Unexamined Life of a Mass Murderer (New York: Knopf, 2014), xix. Regardless of Eichmann's personal psychology, the institutional architecture of moral evasion—where systemic diffusion allows functional people to participate in systemic harm without feeling the weight of their choices—is empirically real.

Stanley Milgram's obedience experiments provided the precise psychological validation for this structural effect.18Stanley Milgram, Obedience to Authority: An Experimental View (New York: Harper & Row, 1974), 35. Milgram demonstrated that 65% of ordinary adults would administer dangerous electric shocks to strangers simply because an authority figure claimed responsibility for the outcome. Both Arendt’s philosophy and Milgram’s data converge on the same conclusion: collective institutions allow individual actors to feel that their choices are not really their own, suppressing the capacity for independent moral action.

### 1.6 Synthesis: The Structural Atrophy of Agency

Taken together, the historical trajectory of democratic institutions and the contemporary critiques of digital architecture converge on a singular diagnosis: the structural conditions for inclusive, mass-scale political action have never been fully resolved. We are not witnessing the collapse of a perfect civic past, but rather reaching the structural exhaustion of our best historical compromises.

While individuals consistently demonstrate the capacity for genuine political action, the overarching structures we have inherited and built do not structurally guarantee or scale this agency; rather, they foster an environment of passive consumption. Any computational governance framework aiming to establish a true Space of Appearance must acknowledge and transcend four intertwined structural limitations:

- **The Representative Compromise**: Traditional elections and delegation are not malicious designs, but rather historically necessary compromises for managing post-Dunbar societies. Yet, by systematically transferring decision-making to representatives, the structural default of the system fosters depoliticization. This creates a civic vacuum that is highly vulnerable to the pathologies of bureaucracy, corruption, and populism.
- **The Barrier of Scale:** The cognitive limits of unaided human sociality (the Dunbar threshold) have always made informal, trust-based accountability impossible at a mass scale. Historically, this limitation mandated either radical demographic exclusion to keep decision-making bodies small, or rigid bureaucratic mediation to manage populations at scale.
- **The Algorithmic Drift:** Modern digital infrastructures, rather than horizontally connecting citizens to solve the scale problem, have drifted into architectures driven by extraction and preemption. While not intentionally designed to destroy agency, the economic logic of these systems (Zuboff, Srnicek) and their temporal acceleration (Rosa) naturally condition the citizen to act as *animal laborans* - a passive data source responding to stimuli - rather than a political creator.
- **The Dilution of Action into Function:** Both the traditional bureaucratic hierarchy and the modern algorithmic black box facilitate massive role-diffusion. They allow societies to function at scale by organizing humans as substitutable functions rather than distinct actors, structurally separating the deed from the doer.
- **The Evasion of Individual Responsibility:** As diagnosed by Arendt and empirically validated by Milgram, this systemic role-diffusion provides the psychological and structural architecture for moral evasion. It creates environments where individuals feel their choices are not their own, systematically destroying the personal responsibility necessary for genuine political action.

Resolving this requires an architectural evolution. We cannot return to the exclusionary spaces of antiquity, nor can we settle for the extractive digital architectures of the present.

To foster political agency, we must design a computational infrastructure that structurally incentivizes the opposite of the current paradigm: appearance over anonymity, deliberation over preemption, community-governed values over proprietary extraction, and, above all, clear individual accountability over role-diffusion. This is the exact design ambition of the Index of Social Responsibility (ISR), which we will examine as a candidate framework for post-Dunbar political action.

## Part II: Towards Creation - The Structural Requirements for Inclusive Political Action

### 2.1 The Argument for Creation

The dominant framing of democratic reform - in political theory and in practice - is restorative: recover what was lost, return to genuine participation, and rebuild the public sphere. As established in Part I, this framing contains a historical error. The Space of Appearance, in any of its historical instantiations, was never genuinely inclusive. Attempting to adapt old frameworks ignores that these historical models operated on structural exclusion as a premise, not a contingent oversight.

However, the same technological globalization that has disrupted the civic sphere also provides the tools for a new creation. The unprecedented, affordable proliferation of digital connectivity opens the horizon for worldwide horizontal ties. What computational infrastructure makes possible, for the first time in human history, is the establishment of a Space of Appearance that does not depend on geographic co-location, shared ethnicity, or property ownership for its constitution. It can include anyone who is genuinely affected by a given issue, regardless of what social categories they inhabit.

In Arendt's vocabulary, this structural shift drastically increases the possibility for the wide, inclusive implementation of natality. Rather than a modest incremental reform of democratic institutions, utilizing global connectivity to build a community-governed architecture represents a qualitatively new structural possibility: creating the conditions that foster genuine political beginnings at an unprecedented scale.

### 2. 2 The Economic Dominance of Agency and the Triumph of Animal Laborans

To understand the magnitude of this opportunity, we must clarify our understanding of what Arendt termed the triumph of the *animal laborans* - the laboring animal absorbed in biological necessity. Historically, the economic field became the most practically developed aspect of social life because it was tied directly to physical survival. Its primary artifact—money—became the ultimate regulatory tool, providing a highly effective, decentralized mechanism for coordinating society at scale because it operated independently of social group authority and afforded the actor absolute anonymity.

Under this paradigm, personal agency was systematically supported almost exclusively in the realm of entrepreneurship, structurally confining human initiative to the economic sphere. Consequently, the accounting of financial debt, resource accumulation, and transactional history became the primary information structure of contemporary social trust. Yet, this very mechanism also serves as a crucial prototype: it demonstrates that complex, mass-scale trust can be successfully mediated through a verifiable data layer. While historically utilized to cement the *animal laborans* paradigm, this existing infrastructure of recorded agreements provides the structural foundation needed to build future frameworks of non-economic agency.

### 2. 3 The AI Transition and the Horizon of Post-Scarcity

We are now approaching a technological threshold where this strict economic dominance is structurally shifting. The rapid integration of AI and robotics into economic processes signals a future where material production may require vastly less human participation. As society transitions toward a horizon conceptualized by contemporary sociology as post-scarcity—a paradigm where technological abundance begins to decouple physical survival from traditional wage labor—the economic sphere may no longer serve as the exclusive engine for human social interaction or the sole determinant of social capital.

As the economic ledger loses its absolute primacy, a vacuum emerges. Responding to this shift does not demand a destructive revolution that dismantles existing institutions; rather, it requires an evolutionary synthesis. We must take well-known components—verifiable ledgers, transparent accounting, and deliberative assemblies—and adapt them to secure agency in a reality where economic output is no longer the primary measure of human contribution.

### 2. 4 Functionalization and the Necessity of a Social Ledger

This transition toward a post-economic paradigm is complicated by a concurrent institutional tendency to "functionalize" persons—to organize human work and civic participation as standardized, tightly specified roles. The IMF, ILO, and OECD converge on the finding that the occupations most exposed to generative AI in the near term are precisely those structured as template-based, digitally mediated functions.19Mauro Cazzaniga et al., Gen-AI: Artificial Intelligence and the Future of Work. IMF Staff Discussion Note SDN/2024/001 (Washington, DC: International Monetary Fund, 2024); Pawel Gmyrek, et al., Generative AI and Jobs: A Refined Global Index of Occupational Exposure. ILO Working Paper 140 (Geneva: International Labour Organization, 2025); OECD, Who Will Be the Workers Most Affected by AI? A Closer Look at the Impact of AI on Women, Low-Skilled Workers and Other Groups (Paris: OECD Publishing, 2024), 15. When human beings accept self-understandings that mirror this organization—"I am just my function"—they render their contribution structurally substitutable by systems designed to perform those functions more cheaply and efficiently. Yet the capacity at stake in Arendt's philosophy—the refusal or acceptance of responsibility for what one is doing—is not a functional capacity. It belongs to persons, not to tools.

Concurrently, the anonymity that once made the economic ledger such a powerful, decentralized coordinating tool is irreversibly eroding. Under the current architecture of digital tracking and the continuous logging of personal histories, true anonymity is largely an illusion for the ordinary citizen. While the digital sphere is currently in an extractive phase, the underlying mechanism—the persistent computational accounting of personal history—is becoming a permanent structural reality.

If economic stimuli weaken, and if absolute anonymity is no longer viable, a new structural framework is required to counter human functionalization and secure political agency. The structural requirement for this future is a social ledger: a transparent, community-governed accounting of personal deeds, verifiable actions, and socially valuable contributions. Social responsibility—a track record of accountable engagement with one's community—must emerge as the new primary evaluation of social capital. It serves as the necessary foundational condition to prevent both the bureaucratic evasion of "I was just doing my job" and the technological evasion of "the algorithm decided". To operationalize this social ledger at a mass scale, we must design a specific computational governance framework built entirely around this principle of individual accountability.

### 2.5 The ISR Framework: Core Architecture

Before detailing the mechanics of a proposed computational solution, it is necessary to narrow our focus regarding the Space of Appearance. Historically and theoretically, this space encompasses a wide array of human revelation, including art, cultural performance, and informal social bonding. However, this framework isolates and addresses a specific, structural dimension of this space: the sphere of collective decision-making. We leave the prerequisite of human "goodwill" aside to focus strictly on the structural conditions necessary when a community must solve a shared problem.

To manage collective decision-making at a post-Dunbar scale, historical democratic formations relied on voting and representative delegation. These systems attempt to secure legitimacy by allowing participants to express a preference among presented options, typically assigning uniform, unweighted influence (one-person-one-vote) regardless of a citizen's specific context, stake, or expertise. As established, this trades genuine political action for administrative scale, while contemporary digital platforms trade it for algorithmic reach.

[![Representative Democracy vs ISR Model](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a1.svg)](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a1.svg)

*Figure 1. Comparison of Traditional Representative Democracy and ISR Model*

To answer the crisis diagnosed in Part I, we must theorize a third architecture. This architecture must utilize computational mediation to dynamically restore the functional properties of a Dunbar-scale community - mutual accountability, contribution recognition, and contextual relevance - without requiring geographic co-location and without historical demographic exclusions.

To test whether such an architecture is technically and sociologically viable, we will now examine the **Index of Social Responsibility (ISR)** as a candidate framework designed specifically around these contrary principles.

The ISR framework is designed around a single organizing principle: influence on a collective decision should reflect genuine stake in its outcome, not formal status, not seniority, not numerical majority. To implement this principle computationally, ISR assembles what it calls a *Public of Appearance (PoA)*—ad-hoc issue public—for each decision: a dynamic, issue-specific group constituted by all members who are genuinely affected by the question at hand.

**Public of Appearance** formation follows the *All-Affected Principle:* those whose interests are materially at stake in a decision have a legitimate claim to participate in it.20Robert E. Goodin, "Enfranchising All Affected Interests, and Its Alternatives," Philosophy & Public Affairs 35, no. 1 (2007): 50. Membership is not elected, not delegated, and not permanent. It is determined by the nature of the problem and dissolves when the problem is resolved. This preserves the Arendtian understanding of political action as oriented toward specific, concrete situations rather than abstract administration, and it mirrors the structural logic of Arendt's admired council system - direct participation, issue-specific assembly, non-delegable presence - without the historical exclusions that characterized actual councils.

Crucially, identifying "affectedness" at scale introduces the risk of algorithmic enclosure if mediated solely by an AI. Therefore, in the ISR design, while artificial intelligence maps the context to propose relevant stakeholders, the community itself must deliberate and verify membership, ensuring that the AI acts as an infrastructure of discovery rather than an arbitrator of political standing.

[![ISR Microcommunity Lifecycle](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a2.svg)](https://raw.githubusercontent.com/ponomarchuk-set/isr/main/images/a2.svg)

*Figure 2. Public of Appearance Lifecycle - Dynamic Problem-Oriented Formation*

Within each PoA (ad-hoc public), each member's influence weight is computed from three components, the relative importance of which is determined by the issue context.

**Relevance** - how directly this member is affected by the specific issue at hand – is precisely the mechanism that ensures the "affectedness" identification in ISR. Relevance is not binary: it is a continuous coefficient reflecting demographic and interests’ proximity, geographic connection, and social-graph relationship to the parties involved. Even belonging to an ad-hoc public is a matter of degree, not a threshold.

**Expertise** - what relevant knowledge or verifiable track record this member brings to the specific question. This addresses Arendt's concern that modern political life fails to distinguish between opinion and knowledge. It finds empirical-historical grounding in Ober's study of Athenian democracy, which demonstrated that the polis's capacity to harness distributed citizen knowledge was a primary source of its political and economic success.21Josiah Ober, Democracy and Knowledge: Innovation and Learning in Classical Athens (Princeton, NJ: Princeton University Press, 2008), 118.

**Contribution** - this member's history of actions within the community, evaluated against the community's own stated values. This is the component that restores the Arendtian connection between rights and responsibility: influence is proportional not to what you claim but to what you have demonstrably done. It is also the component most directly responsive to the values-based framework of the community: the same action may be evaluated differently by different ad-hoc publics, because each community defines its own Matrix of Values. Although these ad-hoc publics dissolve once an issue is resolved, the Contribution metric captures the permanent 'story' of the user's actions, binding the temporary group back into the continuous web of human relationships.

Further technical documentation, including formal definitions, examples, and implementation notes, is maintained on the ISR site.

### 2.6 The Matrix of Values: Community-Generated Normative Ground

A central design feature of ISR is that no values are preset from above. Each member of a community declares their own values across a structured set of dimensions. The community's shared *Matrix of Values* for any given PoA emerges from the weighted aggregation of individual declarations. The aggregation is not a black box; it calculates a shared normative baseline by weighting each participant's declared value vector according to their Relevance scores within that specific issue context. This ensures that the normative framework against which actions are evaluated is generated by the community itself, not imposed by the system's designers.

This design addresses a fundamental objection to computational governance: that any algorithmic system encodes the values of its designers and imposes them on its users under the guise of neutrality. ISR's response is structural rather than merely procedural: the representational scaffold (the set of dimensions across which values are declared) is a tool provided by the system, but the values themselves - and the relative weights assigned to each dimension - are entirely community-determined. The scaffold provides a common notation; the community composes the score. Individual values do not change merely because someone enters a new PoA; they change only when the member revises them. This preserves genuine plurality: the community's shared framework is the aggregate of genuinely distinct individual positions, not a homogenized consensus.

The current representational scaffold is structured computationally as a 233-dimension vector. Taxonomically, this vector is developed from Shalom Schwartz’s Theory of Basic Human Values, translating his established cross-cultural sociological framework into measurable computational dimensions, alongside grounding parameters and context-shift markers.22Shalom H. Schwartz, "An Overview of the Schwartz Theory of Basic Values," Online Readings in Psychology and Culture 2, no. 1 (2012): 4. While this represents version 1.0 of an open research problem, the underlying principle is straightforward: the system calculates a contextual baseline without erasing the underlying plurality of individual moral declarations. Sustained work in sociology, moral philosophy, and computational social science will be necessary to develop this vectorization further. Future versions may differ as that research matures.

### 2.7 Accountability Against Functionalization

As established, any framework seeking to enable genuine political action must counter the structural architecture of moral evasion. The ISR framework addresses this directly through its *Contribution* component, enforcing individual, non-delegable accountability for every participant.

Every action within the ISR system is permanently attributed to the verified person who took it - not to their professional role, the organization they represent, the majority that sanctioned the decision, or the superior who authorized it. The historical shields of responsibility - whether bureaucratic ("I was just doing my job") or algorithmic ("the algorithm decided")—are simply not recognized categories in ISR's data model. The system evaluates the doer and the deed, stripping away the institutional abstractions that traditionally allow for moral diffusion.

This architecture does not presuppose a prior culture of civic virtue, nor does it require participants to be naturally altruistic. It simply requires that every action within the system be attributable to an identifiable person, and that each PoA is able to evaluate those actions against its own Matrix of Values.

From the moment such a framework is adopted, the *Contribution* parameter becomes a cumulative record of political standing. It creates a concrete history of accountable actions that immediately and dynamically shapes a person's influence over future shared decisions. While no sufficiently complex system can entirely eliminate the human psychological desire for moral diffusion, ISR's data architecture is explicitly designed to make that evasion structurally visible, mathematically consequential, and practically impossible to hide behind.

### 2. 8 Transparency, Appearance, and the Absence of Anonymity

Arendt's Space of Appearance requires precisely what its name indicates: individuals must appear before one another, disclosing who they are through their words and deeds in the presence of others. Anonymity is structurally incompatible with political action in this sense - not because anonymous speech has no value, but because political action in the Arendtian sense requires the agent to take responsibility for their words and deeds in a shared world.

ISR implements this requirement structurally: every action in the system is associated with a verified identity. This does not mean universal transparency of all information; the *Adaptable Authorization* system governs who can see what, calibrated to the context of the accessor. Privacy and accountability are balanced by design, not traded off. What is eliminated is not privacy but the specific form of irresponsibility that anonymity enables: saying what one does not mean, committing to what one does not intend, and disappearing from the consequences of one's political acts.

### 2. 9 AI as Epistemic Infrastructure, Not Normative Authority

To overcome the Dunbar constraint and compute this transparency at scale, computational mediation is required. However, we must strictly delineate the role of Artificial Intelligence within this architecture to avoid the very algorithmic enclosure that the system seeks to cure.23Rouvroy and Berns, "Algorithmic Governmentality," 168.

In the ISR framework, AI functions strictly as epistemic infrastructure, not as normative authority. Its role is restricted to navigating complexity: it analyzes the social graph, calculates Relevance coefficients based on proximity, and maps the context to propose the boundaries of a PoA. It answers the question of who is structurally affected by a given issue, overcoming the cognitive limits that previously mandated rigid representation.

Crucially, the AI does not determine the Matrix of Values, nor does it evaluate the moral weight of an action. It does not prescribe the "ought." The normative judgment remains entirely in the hands of the human participants, who declare their own values and deliberately evaluate the contributions of their peers. The AI acts as the computational scaffolding that allows the Space of Appearance to form dynamically across a mass population, but the actual political action—the deliberation, the judgment, and the assumption of responsibility—remains exclusively human.

### 2. 10 The Distinction from Authoritarian Social Credit

Proposing a pervasive, computationally mediated "social ledger" naturally invites comparison to state-driven algorithmic architectures, most notably the Social Credit System (SCS) currently deployed in authoritarian contexts.24Fan Liang et al., "Constructing a Data-Driven Society: China's Social Credit System as a State Surveillance Infrastructure," Policy & Internet 10, no. 4 (2018): 416. It is vital to articulate why the ISR framework is structurally the inverse of such systems.

The danger of an authoritarian social credit system lies not in the fact that it tracks behavior, but in its architectural centralization. Such systems impose a single, top-down, state-defined matrix of values onto the entire population. They are tools of behavioral homogenization, designed to preemptively modulate citizens (in Rouvroy's sense) into compliance with a centralized authority. They eliminate plurality by design.

ISR, by contrast, is radically decentralized and context-dependent. There is no universal "score" imposed by a central authority. The Matrix of Values is generated bottom-up by the specific ad-hoc public involved in a specific issue. An action that is highly valued in one PoA may carry little weight in another, reflecting genuine human plurality. Furthermore, because such publics (PoA) dissolve when a problem is resolved, influence is dynamic and strictly bounded by relevance, preventing the accumulation of permanent, cross-contextual algorithmic power. ISR does not track behavior to enforce state compliance; it tracks contribution to empower horizontal, community-driven political agency.

## Part III: The Critical Test - Answering the Objections

The critical tradition surveyed in Part I deserves direct engagement, not merely acknowledgment. Each of the four major objections to computational governance frameworks has a specific structural form, and ISR either addresses that structural form or must honestly acknowledge where it does not.

### 3.1 The Rouvroy Objection: Does ISR Bypass Deliberation?

**The objection:** Algorithmic governmentality acts on populations by processing behavioral data preemptively, bypassing subjects as deliberating agents. Normativity is embedded in predictive infrastructure rather than articulated through public reasoning. The "death of politics" occurs when governance operates below the threshold of contestation.

To address this, we must acknowledge that all functional societies—regardless of scale or technological mediation—preemptively modulate behavior through customs, laws, and reputational evaluation. The political danger Rouvroy identifies is not the mere existence of normative pressure, but its asymmetry and opacity: normativity imposed invisibly by a centralized architect or hidden "superuser" who dictates the rules but remains exempt from them.25Rouvroy and Berns, "Algorithmic Governmentality," 173.

The systems Rouvroy describes share three structural features: they act on *passive* fragments, operate *invisibly*, and *bypass public reasoning*. ISR counters these precisely:

First, ISR acts not on passive behavioral fragments but on *explicitly assumed responsibility*. The data that enters the system is generated through political engagement - declared values, logged actions, deliberative participation - not captured from passive behavior. The user is not a data source only; they are a participant who chooses what to contribute.

Second, rather than embedding normativity in a top-down predictive infrastructure, ISR utilizes an open Values subsystem. This functions as dynamic, community-authored legislation, generated in real-time by aggregating the declared values of affected members. It ensures the governing model reflects the proportionate interests of the society, preventing oligarchic or algorithmic capture.

Third, the evaluation process is designed for maximum transparency. Every parameter is contestable and applied symmetrically to all members. The system makes explicit claims that can be publicly challenged. ISR does not eliminate normative pressure; it ensures that such pressure is the direct, symmetrical consequence of the community's own continuous deliberation, securing the structural conditions for contestation rather than eliminating them.

### 3.2 The Zuboff Objection: Is ISR a Form of Extraction?

**The objection:** Surveillance capitalism converts human experience into behavioral data for behavioral modification without meaningful consent. What appears as participation is structurally extraction. Even without a profit motive, does a system that persistently tracks a "social ledger" act as a "Big Other" that extracts human experience and manipulates behavior?

Zuboff's critique targets an architecture defined by radical asymmetry: data is extracted covertly, processed into behavioral futures, and used by a centralized power to modify user behavior. The defining threat is manipulation by a hidden "Big Other." However, manipulation inherently requires subjectivity—it implies a hidden will, intention, or desire driving the modification. ISR, by contrast, possesses no subjectivity; it is an epistemic collective tool, not an intentional agent.

Furthermore, because ISR is designed as a fully transparent, open-source, and decentralized platform, it structurally collapses the asymmetry that surveillance capitalism requires. There is no central authority, corporate entity, or hidden architect who can hide behind the algorithm to covertly extract data or manipulate the community. The data generated by participation belongs exclusively to the community and the individual. There is no "Other" external to the community accumulating power.

The deeper point concerns what Zuboff calls "behavioral modification". ISR does not attempt to modify behavior through invisible prediction. It makes the criteria for influence explicit, relying on the rational self-interest of participants who understand those criteria. If members know their actions are evaluated against community values, they have a transparent, publicly articulable reason to act accountably. This is not algorithmic manipulation—which relies on bypassing conscious consent—but the classical, symmetrical mechanism of reputation made operational at scale.

### 3. 3 The Srnicek Objection: Does ISR Reproduce Platform Power?

**The objection:** Digital platforms tend toward monopoly through network effects, concentrating knowledge and decision-making power. Even participatory-seeming systems may generate asymmetries that are structurally anti-democratic.

Srnicek's concern is structural: the economic logic of platforms generates monopolistic concentration regardless of the intentions of their designers. Network effects create winner-takes-all dynamics; data advantages compound; and the result is a small number of private actors with unprecedented power over the information environment.

ISR's architecture addresses this through three design principles. First, the system is designed as open-source infrastructure: the algorithm is publicly auditable, not proprietary. Second, the governance of the system's parameters is community-controlled: no external actor can modify the weights or criteria against which community members are evaluated without community consent. Third, the data generated within each community remains within that community: there is no data aggregation across communities that would generate platform-scale power concentrations.

This does not mean ISR is immune to capture or monopolization. The risk is real and must be addressed through institutional design: federated architecture (so that no single actor controls the infrastructure), community ownership of data, and open-source auditability of all algorithmic components. These are design requirements, not achieved properties of the current system, and they constitute an active research and development agenda.

### 3. 4 The Rosa Objection: Can a Computational System Enable Resonance?

**The objection:** Social acceleration produces alienation by making genuine responsive relations with the world increasingly impossible. Resonance - the experience of being genuinely touched by and responding to the world - cannot be manufactured, optimized, or produced by design. Any system that claims to generate resonance is structurally self-defeating.

This objection is accepted on its own terms. ISR does not claim to manufacture resonance or to guarantee the experience of genuine political engagement. Rosa's *Unverfügbarkeit* - the irreducible non-availability of resonance to deliberate production - is taken as a firm constraint on what any institutional or computational design can achieve.

What ISR claims is more modest: that it can create the structural conditions under which resonance becomes more likely, by ensuring that political participation is connected to real stakes and real consequences. When a community member's influence on a decision reflects their genuine stake in its outcome, when their contributions are recognized and their accountability is real, when they appear before their community as a named, responsible agent rather than an anonymous signal - these are the structural prerequisites for the kind of genuine engagement that Rosa identifies as resonance. The experience itself cannot be guaranteed. The conditions for its possibility can be deliberately constructed or destroyed.

The acceleration objection also points to a genuine limit of ISR's design: the system requires time for genuine deliberation, and the pressures of social acceleration work against this. An ISR-structured community can resist acceleration within its own deliberative processes; it cannot insulate itself from the broader temporal demands of the economic environment in which it operates. This is acknowledged as a real limitation.

### 3. 5 The General Objection: Is Technology Necessarily Dehumanizing?

Underlying the specific objections above is a more general concern: that the introduction of computational mediation into political life is inherently dehumanizing, that any system that quantifies human contribution or weights human influence has already reduced political life to administration. This concern has a long history, from Luddite resistance to industrial machinery through contemporary AI-phobia, and it deserves a respectful and direct response.

The error in this general objection is the conflation of a tool with its use. Writing is a tool for extending human communication beyond the limits of face-to-face speech; it has been used to compose both *Hamlet* and propaganda. Printing is a tool for multiplying texts; it enabled both the Reformation and the Inquisition's censorship apparatus. The internet is a tool for connecting human beings at global scale; it has enabled both unprecedented cooperation and unprecedented manipulation. In each case, the tool is not the pathology. The pathology is the specific political-economic architecture within which the tool is deployed and the specific purposes it is organized to serve.

Computation is a tool of precisely this kind. The systems Rouvroy, Zuboff, and Srnicek criticize are not evidence that computation is inherently incompatible with political life; they are evidence that computation organized around extraction, preemption, and opacity is incompatible with political life. The question for system designers is not "whether to use computation" but "what architecture, what governance, what transparency requirements, and what accountability mechanisms make computational mediation serve rather than displace human agency?" ISR is one attempt to answer that question. It may not be the right answer, but the question itself is unavoidable: at post-Dunbar scale, in modern social conditions, without some form of computational mediation, the structural conditions for inclusive political action become practically impossible to sustain. The choice is not between computation and politics but between different computational architectures and the political conditions they create.

## Part IV: Open Questions - What ISR Does Not Resolve

The argument of this paper would be incomplete without an honest accounting of what ISR does not yet resolve. The following represent genuine open questions, not rhetorical concessions.

### 4.1 Structural and Philosophical Challenges

**The scale paradox. **ISR is designed to extend Dunbar-scale political community to larger organizations, but the systems of greatest political urgency—climate governance, pandemic response, AI regulation, nuclear risk management—operate at genuinely civilizational scales, affecting billions of people whose stake in collective decisions is real but whose connection to any influencing community is diffuse. The All-Affected Principle, when applied to civilizational-scale issues, generates a PoA of the entire human species. How ISR's architecture handles this extension is an open question that cannot be answered by design principles alone; it requires empirical testing at successively larger scales after ISR has gained trust at all preceding local and regional levels.

**The meritocracy tension.** ISR's Expertise and Contribution components introduce influence differentials that are justified by reference to relevant knowledge and demonstrated accountability. Arendt herself was suspicious of any system that reduced political standing to measurable performance - this approaches what she criticized as the "rise of the social," where conformity to external standards displaces genuine political plurality. ISR's structural response - that the criteria are context-specific and community-defined rather than externally imposed - is conceptually defensible but empirically untested. Whether communities actually define their criteria in ways that prevent meritocratic calcification into new forms of hierarchy is an empirical question that only longitudinal study of deployed systems can answer.

**The Arendt tension.** Arendt's own preferred model—the council system—was explicitly non-algorithmic. Political life, for Arendt, was inseparable from the direct, embodied, unmediated encounter of distinct persons. ISR uses algorithmic mediation. This is a genuine departure from her prescription, even while extending her diagnosis. ISR is an attempt to answer the problem Arendt identified using means she did not theorize; whether those means are adequate to the problem, or whether they introduce new pathologies she would have recognized, is a question that honest scholarship must hold open.

**The values-measurement problem.** The ISR value vectorization system—the structured representation of member values across defined dimensions—is version 1.0 of an open research problem in computational social science. Any such structure carries the implicit assumptions of its designers. Sustained empirical and theoretical research is required before strong claims about the adequacy of any specific value representation can be made.

### 4.2 Implementation and Social Challenges

**Elite capture. **Any governance system that assigns differential influence creates incentives for those with resources and organizational capacity to capture the high-influence positions. In ISR, this risk manifests as the possibility of coordinated Contribution manipulation: networks of actors who systematically endorse each other's actions to inflate mutual scores. The system's technical safeguards (anomaly detection, cross-community consistency requirements) reduce but do not eliminate this risk. It requires both technical and governance solutions, and the governance solutions require exactly the kind of active community engagement that elite capture tends to suppress.

**The exclusion of the disengaged**. ISR's Contribution component rewards active participation and penalizes inactivity. This is philosophically defensible—political influence earned through demonstrated engagement—but it raises a practical equity concern: the communities most in need of better governance are often those whose members are least positioned to invest time and energy in active participation (due to precarious employment, caregiving responsibilities, language barriers, or accumulated civic disillusionment). A framework that strengthens the voices of the already-engaged may reproduce the inequalities it aims to displace in a new form.

**Cultural inertia and the habituation requirement.** Decades of political disengagement, eroded civic education, and normalized irresponsibility create significant obstacles to adoption. ISR requires communities willing to take active ownership of their governance - a disposition that cannot be assumed as a starting condition but must be cultivated over time. The framework is explicitly designed with this cultivation in mind, by linking influence to demonstrated responsibility, but whether this evolutionary mechanism is strong enough to shift entrenched habits of passivity is an open empirical question rather than an achieved fact.

**Technological dependence and federated risk.** The system's reliance on AI infrastructure creates forms of potential dependence and vulnerability that have no precedent in Arendt's framework. Open-source transparency, federated architecture, and community ownership of the computational layer are necessary but not sufficient: they require ongoing technical maintenance, governance capacity, and protection against state or corporate capture that cannot be guaranteed by design principles alone.

### 4.3 Open Research Questions

The following questions represent the minimal research agenda that must be addressed before strong empirical claims about ISR's political effects can be made:

Do communities using ISR actually experience greater political engagement, accountability, and decision legitimacy than comparable communities using traditional governance mechanisms? This requires controlled longitudinal study with appropriate comparison groups.

Does the Contribution component, in practice, reward genuine accountability or reward the performance of accountability to an audience that includes the scoring system? The distinction between virtue and its simulation is the oldest problem in moral philosophy; ISR must demonstrate, not assume, that its structural mechanisms address it.

Do value structures defined by communities remain genuinely plural, or do they converge toward consensus under the pressure of influence-weighting? Genuine plurality may require active institutional protection, not just structural permission.

How does ISR perform under adversarial conditions - when a significant minority of participants actively attempt to manipulate scores, capture ad-hoc public formation, or undermine the legitimacy of deliberative outcomes? Resilience under adversarial conditions is a necessary, not optional, design requirement.

What is the appropriate relationship between ISR-structured community governance and formal legal and political institutions? ISR governs influence in deliberative processes; it does not replace law, enforce decisions, or provide due process guarantees. The interface between ISR governance and the broader legal framework it operates within requires explicit design.

## Conclusion

This paper has argued for a shift in the framing of democratic reform: from recovery to continuous creation. While a genuinely inclusive Space of Appearance has never existed in its ideal form, the drive to build it has been a constant feature of democratic innovation. These historical efforts, with their localized successes and structural limits, provide the foundation for continuing this creation. Computational infrastructure now allows us to build upon that legacy, making it structurally possible to approach the conditions for non-exclusionary political action more closely than ever before. ISR is proposed not as an absolute endpoint, but as a continuation of this human effort, applying Arendt's concept of natality to the ongoing, iterative project of political institution-building.

The dominant critical tradition surveyed in Part I - Rouvroy's algorithmic governmentality, Zuboff's surveillance capitalism, Srnicek's platform capitalism, Rosa's acceleration theory - constitutes a powerful and accurate diagnosis of what the prevailing digital architecture does to political life. This paper takes that diagnosis seriously. Its response is not to defend computation against critique but to distinguish the pathological political-economic architecture that these critics correctly identify from the structural possibilities of computation as such. The systems they critique share three features: preemption over deliberation, extraction over participation, and invisibility over contestability. ISR is designed against all three.

The objection that any computational mediation of political life is inherently dehumanizing confuses a tool with its use. At post-Dunbar scale, the structural conditions for informal political community do not exist without mediation of some kind. The question is not whether to mediate but how. ISR proposes that mediation organized around transparency, individual accountability, community-governed values, and appearance - in Arendt's sense of the term - is structurally different from mediation organized around extraction, preemption, and opacity. Whether it is different enough, and whether the differences are sustainable under real-world pressures, are empirical questions that require longitudinal study of deployed systems.

The honest conclusion is that ISR is a proposal, not a proven system. It is an example of what an architecture designed to extend rather than foreclose political action might look like. Its value, at this stage, lies not in having resolved the problems it addresses but in having made them more precisely articulable - and in having demonstrated that the design space for computational governance frameworks is considerably larger, and more politically interesting, than the dominant critical literature has assumed.

## Bibliography

Arendt, Hannah. *The Human Condition*. Chicago: University of Chicago Press, 1958.

Arendt, Hannah. *Eichmann in Jerusalem: A Report on the Banality of Evil*. New York: Viking Press, 1963.

Arendt, Hannah. *On Revolution*. New York: Viking Press, 1963.

Benhabib, Seyla. *The Reluctant Modernism of Hannah Arendt*. Thousand Oaks, CA: Sage Publications, 1996.

Cazzaniga, Mauro, Florence Jaumotte, Longji Li, Giovanni Melina, Auguste J. Panton, Carlo Pizzinelli, Emma Rockall, and Marina Mendes Tavares. *Gen-AI: Artificial Intelligence and the Future of Work.* IMF Staff Discussion Note SDN/2024/001. Washington, DC: International Monetary Fund, 2024.

Dahl, Robert A. *Democracy and Its Critics*. New Haven, CT: Yale University Press, 1989.

Daus, Zachary. "Putting the 'Social' in Social Media: Hannah Arendt, Political Judgment, and Online Polarization." *Blog of the American Philosophical Association*, April 7, 2025. [https://blog.apaonline.org/2025/04/07/putting-the-social-in-social-media-hannah-arendt-political-judgment-and-online-polarization/](https://blog.apaonline.org/2025/04/07/putting-the-social-in-social-media-hannah-arendt-political-judgment-and-online-polarization/).

Dietz, Mary G. "Citizenship with a Feminist Face: The Problem with Maternal Thinking." *Political Theory* 13, no. 1 (1985): 19–37.

Dunbar, Robin I. M. "Neocortex Size as a Constraint on Group Size in Primates." *Journal of Human Evolution* 22, no. 6 (1992): 469–493.

Gmyrek, Pawel, Janine Berg, Krzysztof Kamiński, Filip Konopczyński, Anna Ładna, Bence Nafradi, Kaja Rosłaniec, and Mikołaj Troszyński. *Generative AI and Jobs: A Refined Global Index of Occupational Exposure*. ILO Working Paper 140. Geneva: International Labour Organization, 2025.

Goodin, Robert E. "Enfranchising All Affected Interests, and Its Alternatives*." Philosophy & Public Affairs* 35, no. 1 (2007): 40–68.

Habermas, Jürgen. *The Theory of Communicative Action*, Vol. 1: Reason and the Rationalization of Society. Translated by Thomas McCarthy. Boston: Beacon Press, 1984.

Hansen, Mogens Herman. *The Athenian Democracy in the Age of Demosthenes: Structure, Principles, and Ideology*. Norman: University of Oklahoma Press, 1991.

Index of Social Responsibility. "Index of Social Responsibility (ISR): System Overview." Accessed April 10, 2026. [https://isr-vote.com/wiki/index.html](https://isr-vote.com/wiki/index.html).

Klein, Steven. "'Fit to Enter the World': Hannah Arendt on Politics, Economics, and the Welfare State." *American Political Science Review* 108, no. 4 (2014): 856–869. [https://stevenmklein.com/wp-content/uploads/2017/01/apsr-published.pdf](https://stevenmklein.com/wp-content/uploads/2017/01/apsr-published.pdf).

Liang, Fan, Vishnupriya Das, Nadiya Kostyuk, and Munmun De Choudhury. "Constructing a Data-Driven Society: China's Social Credit System as a State Surveillance Infrastructure." *Policy & Internet* 10, no. 4 (2018): 415–453.

Milgram, Stanley. *Obedience to Authority: An Experimental View*. New York: Harper & Row, 1974.

Ober, Josiah. *Democracy and Knowledge: Innovation and Learning in Classical Athens.* Princeton, NJ: Princeton University Press, 2008.

OECD. *Who Will Be the Workers Most Affected by AI? A Closer Look at the Impact of AI on Women, Low-Skilled Workers and Other Groups.* Paris: OECD Publishing, 2024.

Pitkin, Hanna Fenichel. "Justice: On Relating Private and Public." *Political Theory* 9, no. 3 (1981): 327–352.

Rosa, Hartmut. *Social Acceleration: A New Theory of Modernity*. New York: Columbia University Press, 2013.

Rosa, Hartmut. *Resonance: A Sociology of Our Relationship to the World.* Cambridge: Polity Press, 2019.

Rouvroy, Antoinette, and Thomas Berns. "Algorithmic Governmentality and Prospects of Emancipation." *Réseaux* 177, no. 1 (2013): 163–196.

Schwartz, Shalom H. "An Overview of the Schwartz Theory of Basic Values." *Online Readings in Psychology and Culture* 2, no. 1 (2012).

Silva, K. J. S. "Social Media, World Alienation and Post-Truth: Reflections on Hannah Arendt's Political Thought." *Society and Politics* 18, no. 1 (2024). [https://socpol.uvvg.ro/docs/2024-1/1.%20Silva.pdf](https://socpol.uvvg.ro/docs/2024-1/1.%20Silva.pdf).

Srnicek, Nick. *Platform Capitalism*. Cambridge: Polity Press, 2016.

Stangneth, Bettina. *Eichmann Before Jerusalem: The Unexamined Life of a Mass Murderer*. New York: Knopf, 2014.

Zuboff, Shoshana. *The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power*. New York: PublicAffairs, 2019.


---




# Chapter 9: Foundations — Computing the Objective (ISR & Martin Heidegger)


*Source: `wiki/ISR-Heidegger-article.html`*

---


# Computing the Objective: Algorithmic Limits, Social Friction, and the Liberation of Human Agency

## Sergii Ponomarchuk - July 2026

## Abstract

A persistent illusion of digital governance attempts is the belief that artificial intelligence can measure or simulate the existential structure of human being (*Dasein*). This paper argues that such attempts commit an ontological error by forcing human authenticity into the calculable, objective realm of *Vorhandenheit* (presence-at-hand). Rather than striving to make technology more "human," this paper proposes a radical architectural inversion: computational systems succeed politically precisely when they embrace their non-human limits. By explicitly delegating the administrative accounting, evaluation, and structural friction of everyday social coordination — the calculable exhaust of Heidegger’s *Das Man* — to transparent algorithmic infrastructures like the Index of Social Responsibility (ISR), human attention is fundamentally liberated from bureaucratic exhaustion. When machines absorb the mechanics of everyday administration that otherwise fuel political apathy and demagogic populism, they strip away the psychological refuge of everyday anonymity. Operating as a ready-to-hand (*Zuhandenes*) exoskeleton for issue-specific ad-hoc Publics of Appearance, this architecture clears a digital analogue of Hannah Arendt’s "Space of Appearance." Ultimately, the paper concludes that the highest political function of computation is not to govern human beings, but to automate the objective layers of interaction, thereby preserving the space for resoluteness (*Entschlossenheit*) and authentic human agency.

**Keywords:** Computational Sociology; Heideggerian Ontology; Digital Governance; Artificial Intelligence; Deliberative Democracy; Index of Social Responsibility (ISR); Human Agency; Dasein; Das Man.

## 1. Introduction: The Ontological Illusion of AI and Digital Governance

A persistent illusion in contemporary digital governance is that advanced algorithms — including complex and non-linear Large Language Models — can comprehend or measure the existential structure of *Dasein*. This assumption commits a fundamental ontological error. Technology, regardless of its computational sophistication, cannot interact directly with *Dasein* (human existence).

Fundamentally, technological systems remain bound to the realm of *Vorhandenheit* — the objective presence of things. Algorithms operate exclusively through categories, vectors, and statistical calculations. Because a machine inherently "sees things," any attempt to force an algorithm to directly measure *Dasein* inevitably fails, reducing the human subject to a mere object.

This ontological distinction forms the philosophical foundation of approaches such as the Index of Social Responsibility (ISR), an applied computational sociology framework. From this perspective, the goal of computational sociology is not to replace political judgment with calculation, but to map the objective conditions of interaction. Rather than attempting to overcome this ontological limit, digital architecture should purposefully embrace it. Technology should be deployed to maximize the accounting of the objective, "thing-like" features of human interaction. By automatically managing these categorical and calculable aspects, the system ceases its attempt to quantify human *Dasein* itself. Consequently, this architectural separation can liberate the individual's attention, more focusing it on the authentic manifestation of their own *Dasein* through the initiation, deliberation, decision-making, and implementation of social interactions.

## 2. The Burden of *Das Man* and Social Friction

In everyday life, when individuals attempt to reach agreements or make collective decisions, a vast amount of human energy is consumed by structural friction. This friction consists of clarifying objective statuses, evaluating competence, combating manipulation, and navigating bureaucracy. These elements are inherently "thing-like"; they are categorical aspects of interaction that belong entirely to the realm of *Vorhandenheit*.

In small, localized groups, humans can navigate this domain of social friction organically. However, as the size of a community expands beyond cognitive thresholds - such as Dunbar’s number - direct interpersonal trust and informal evaluation inevitably break down. Historically, the only way to manage the resulting exponential increase in social friction has been to abandon direct participation and establish representative systems or sprawling bureaucracies. These human-administered intermediaries inevitably introduce systemic inefficiencies, monopolize the space of decision-making, and often corrupt the direct translation of political will.

Philosophically, this domain of calculated social mechanics aligns with Heidegger’s concept of *Das Man* (the "They"). It is the realm of the averaged and the stereotypical, dictating "how things are done," what the rules are, and what the statistics say.

However, we must acknowledge that these "objective" metrics are never purely neutral laws of physics. The parameters defining competence, relevance, or contribution are socially constructed; they are formalized agreements of a community’s normative choices, where metrics inevitably risk reproducing existing social realities and power dynamics. Yet, when individuals are forced to expend their resources actively managing these categorical metrics, they are compelled to operate as objects. Crucially, this is often a zero-sum dynamic: structural friction does not merely make coordination inefficient; it frequently consumes all available human energy.

When the entirety of a community's capacity is exhausted by administrative navigation, individuals never reach the stage of authentic, non-mechanical interaction. Two profound consequences emerge from this exhaustion. First is a pervasive collapse of motivation for political action, as individuals retreat from a public sphere that feels purely bureaucratic. Second is the rise of populism. From this ontological perspective, demagogic populism can be interpreted not as an expression of authentic political will, but rather as a highly specialized political strategy that exploits the mechanisms of *Das Man*. The populist thrives by weaponizing averaged stereotypes, amplifying *Gerede* (chatter), and exploiting the very friction that exhausts genuine deliberation.

Ultimately, the burden of navigating the objective, averaged mechanics of *Das Man* completely traps human interaction within *Vorhandenheit*. This friction is not just an external imposition, but the comfortable, default anonymity of everyday life — a psychological refuge where individuals flee to avoid the anxiety of genuine choice. We must actively architect systems to transcend this tranquilizing state. By stripping away these administrative hiding places, the digital infrastructure forces the space open for what Heidegger termed *Entschlossenheit* (resoluteness): the courage to step out of the anonymous crowd and assume authentic, personal responsibility for action in collective.

## 3. The Algorithm as *Zuhandenheit* (Readiness-to-Hand)

To resolve the friction of *Das Man*, the architectural role of the algorithm must shift. When a computational framework, such as the Index of Social Responsibility (ISR), assumes the burden of tracking interactions and objective metrics, its goal is to become what Heidegger termed *Zuhandenes* — a ready-to-hand tool.

However, phenomenologically, readiness-to-hand is not a default property of an object; it is forged through mastery and trust. Like a hammer in the hands of a skilled artisan, the digital instrument disappears into the flow of work only when the user has integrated it. Furthermore, even the master routinely exercises circumspection (*Umsicht*) — briefly bringing the tool into *Vorhandenheit* (presence-at-hand) to verify its integrity before use. This momentary inspection does not destroy the tool's utility; rather, it guarantees its reliability.

The algorithmic architecture must mirror this lifecycle. Arthur C. Clarke famously observed that advanced technology is indistinguishable from magic. Yet, ontologically, this "magic" is merely the perception of the passive consumer — the alienated subject of *Das Man* who accepts the outputs of a system without the intention or desire to understand them. By design, systems like the ISR are not opaque "black boxes"; their underlying mechanics are entirely explainable. The barrier to understanding is rarely systemic secrecy, but rather the everyday complacency of the user. Because the system's metrics and historical logs are structurally transparent, any member with the initiative can pull the algorithm back into *Vorhandenheit* to dispel the illusion of magic and inspect its mechanics. Crucially, this introduces a new paradigm of trust in collective decision-making. When evaluating social contributions and mediating everyday affairs (in the part that can actually be calculated, and after collecting a sufficient amount of positive user experience), individuals are practically more likely to trust the judgments of an understandable, transparent, and mathematically consistent AI system than those of human intermediaries. Human representatives or committees, while perhaps familiar with the problem, inherently carry personal biases, conflicting interests, and opaque motivations. The algorithm, by contrast, operates without "skin in the game." Paradoxically, this permanent capacity for verification—and the structural neutrality of the algorithm—is exactly what builds the trust necessary for the technology to fade into the background, operating as a silent, invisible foundation for social action.

## 4. Delegating the Administration of the Objective World

This architectural shift relies on a deliberate delegation: the administrative accounting and evaluation of the averaged, calculated, and stereotypical elements of social coordination are explicitly handed over to the machine. Large Language Models serve as the ideal embodiment of this objective world. Operating by predicting the most statistically probable sequences based on the vast aggregate of human discourse, LLMs are the mathematical formalization of *Das Man* and its *Gerede* ("chatter") — the anonymous circulation of "what is said" devoid of authentic existential stake.

Traditionally, this statistical averaging is framed as AI's greatest philosophical limitation. Within this architecture, however, it reveals an unprecedented operational possibility. Modern AI systems have reached a point where they can evaluate and mediate the objective, statistical aspects of collective action far more effectively and tirelessly than human beings. The proposition, therefore, is not an absolute ontological mandate, but a pragmatic opportunity: we can now explicitly delegate some certain elements of the administration and evaluation of the averaged world to the machine in order to free the human capacity for authentic deliberation. By transferring the administrative tracking of *Das Man* to the algorithm, the digital framework functions not as a panopticon attempting to quantify the human subject, but as a reliable exoskeleton for ad-hoc publics.

By absorbing the burden of statistics and categorical rules, this explicit delegation affords individuals the oportunity of stepping outside the confines of anonymous social friction to transcend mere administrative existence. Ultimately, this reveals a fundamental inversion of the prevailing artificial intelligence narrative. Rather than striving to make technology increasingly "human-like," computational governance succeeds precisely by designing machines that are emphatically not human — and realizing that their highest function lies exactly in that ontological limit.

## 5. Liberating *Dasein*: The Space for Authentic Action

When the algorithm successfully absorbs the administrative burden and the accounting of objective features, human attention is fundamentally liberated. Relieved from the necessity of navigating systemic friction or proving their categorical weight, individuals enter a cleared political domain. While Habermas might envision this as a prerequisite for an uncoerced communicative space aimed at rational consensus, it functions more fundamentally as a digital analogue of Arendt's "Space of Appearance" — an inherently pluralistic, agonistic domain where meanings inevitably collide, and where individuals encounter one another not as datasets, but as unique existences.

Crucially, this architecture is designed to serve "Publics of Appearance." In this context, an ad-hoc public is not constrained by static demographic size or traditional electoral geography; rather, it is an issue-specific formation governed by the All-Affected Principle. The exact operationalization of this principle — dynamically computing the boundaries of the affected public — is handled by the underlying algorithmic infrastructure. Depending on the scope of the shared concern, this functional space could theoretically scale to encompass all of humanity.

Within this cleared space, *Dasein* is realized not through the calculation of status, but in authentic existential acts. This authentic manifestation occurs precisely in the capacity to initiate something genuinely new that an algorithm cannot predict; in live deliberation, where meanings inevitably collide and are actively revised; and in implementation, where individuals assume personal responsibility for own decisions.

To achieve this, the computational mechanism of the Index of Social Responsibility must be carefully restricted. Because the definition of what constitutes a 'tangible contribution' is itself a normative community decision, the ISR does not encode a universal morality. It models objective interaction patterns to make social processes visible while preserving the possibility of disagreement, revision, and transformation. The ISR therefore operates through an explicit and contestable "Vector of Values" defined by the community. By debating and defining this Vector, the community actively shapes the very norms of its own *Das Man*. Humans do not abandon the everyday world; rather, they reclaim their agency over its design, leaving the algorithmic system to merely execute the exhausting mechanics of their agreements. This architecture structurally guards against the silent reproduction of existing hierarchies. Furthermore, the community's ability to periodically pull the tool back into *Vorhandenheit* to review and debate those very metrics becomes its own authentic political act. By explicitly leaving the essence of politics and interaction to humans, the architecture facilitates the emergence of genuine social action.

## 6. Conclusion

Digital democracy fails fundamentally when it operates as a digital panopticon attempting to measure or capture the existential core. This approach commits a fatal ontological error by forcing *Dasein* into the calculable metrics of *Vorhandenheit*.

Conversely, computational governance succeeds when it functions merely as a reliable exoskeleton for Publics of Appearance, acting as an invisible tool that resolves objective friction. By maintaining this strict architectural boundary — delegating the structural weight of *Das Man* to the machine — the system preserves human authenticity.

The future of digital democracy may not depend on making machines more human, but on designing machines that "understand" their own limits. The highest function of computation may be not to govern human beings, but to explicitly manage the objective accounting so humans can govern themselves. In this sense, the Index of Social Responsibility is not a mechanism of automated governance, but an infrastructure for the reappearance of political agency.


---




# Chapter 10: Foundations — Frequently Asked Questions (FAQ)


*Source: `wiki/faq.html`*

---


# Frequently Asked Questions

Index of Social Responsibility (ISR)

These questions come from people encountering ISR for the first  time — at community meetings, in academic discussions, and in conversations with skeptical friends. They are answered as honestly as possible, including where the answers are incomplete or  where the system has known limitations.

## Why does ISR exist? What problem does it solve?

Most communities — housing cooperatives, NGOs, professional associations, local government bodies — make collective decisions using one of two methods: formal voting (where every voice counts equally regardless of knowledge or stake) or informal hierarchy (where the loudest or most senior person prevails). Neither method is well-designed for the actual complexity of community life.

Equal-weight voting fails when a numerical majority has no real stake in a decision that deeply affects a minority. Informal hierarchy fails when expertise is invisible and contribution goes unrecognized. Both methods tend to produce decisions that feel either unfair or unwise — sometimes both.

ISR is an attempt to build something better: a framework in which each person's influence on a given decision is proportional to how directly they are affected by it, what relevant knowledge they bring to it, and how their history of actions in the community aligns with its stated values. This is not a radical idea — it is how well-functioning communities already work informally, among people who know each other well. ISR makes it possible at scales where informal knowledge breaks down.

For the deeper philosophical grounding, see the
                [Philosophy](https://isr-vote.com/wiki/philosophy.html) chapter.

## What exactly is an ISR score?

An ISR score is not a single permanent number. It is recalculated for each specific decision from three independently measured components:

- **Relevance** — how directly affected this person is by the specific issue at hand. Determined by demography facts, geographic proximity, domain relationship, and social-graph connection to the parties involved.
- **Expertise** — what relevant knowledge or verifiable track record this person brings to the question. Assessed against credentials, professional history, and the resources the person pledges to the issue (money is not counted).
- **Contribution** — how this person's history of actions in the community aligns with the community's declared values. This is the accumulated record of what they have actually done, not merely what they have stated they believe.

The score is issue-specific: the same person may have high influence on a question about building maintenance and low influence on a question about financial governance, depending on their expertise and the nature of their past contributions in each domain. Every component is visible, inspectable, and contestable by the person it concerns.

## Doesn't ISR just recreate inequality — with better branding?

This is one of the most important questions to take seriously, and the answer is not a simple "no."

ISR does create differentiated influence — some members will have higher scores on some questions than others. That differentiation is intentional. The argument is that unacknowledged, informal inequality — where the loudest voice or the longest tenure or the strongest social network determines outcomes invisibly — is more damaging anti-democratic than transparent, justified differentiation that everyone can inspect and contest.

What ISR is designed to prevent is the reproduction of inherited or status-based inequality. Influence in ISR is earned through:

- Direct stake in the decision outcome — not formal membership
- Expertise that is relevant to the specific question — not blanket authority derived from position
- Demonstrated commitment to community values — not stated affiliation or background

New members begin with a baseline that grows with contribution. Long-term members who disengage lose influence proportionally. The goal is not equal outcomes — it is equitable process: influence that is proportional to genuine stakes and demonstrated commitment.

**Important:** ISR cannot guarantee that its  algorithms are perfectly free of bias. The system is designed to be inspectable, community-adjustable, and subject to formal appeals. If a community detects systematic unfairness in how scores are calculated, the parameters can be revised by community consensus.

## Is this like China's Social Credit System?

The comparison is understandable and worth examining carefully, because the surface resemblance — a score that reflects past behavior — conceals a fundamental difference in structure, purpose, and governance.

A state social credit system is:

- Maintained by a central authority (the state)
- Based on criteria defined from above, without citizen input
- Used to control access to basic services — travel, banking, education
- Not inspectable or contestable by the person it concerns
- Designed to enforce behavioral compliance with state-determined norms

ISR is different in each of these respects:

- There is no central authority — each community controls its own parameters
- No values or norms are preset from above; all normative inputs come from community members themselves and can be revised by community consensus
- ISR does not govern access to basic services; it weights influence in deliberative processes only
- Every calculation is fully inspectable and formally contestable
- The system's purpose is to improve the quality of collective decisions, not to control individual behavior in everyday life

The philosophical difference is also fundamental. ISR is built on the principle that normative standards — what counts as responsible behavior — must emerge from the community itself, not be imposed on it. The community defines its values; ISR provides a common language in which to express and apply them. A state social credit system is the inverse: values descend from the state, and compliance is enforced.

## What if people just pretend to have values they don't hold?

The question rests on an assumption worth examining: that declared values are primarily a claim about who you already are. In ISR, they are something different — a statement about what kind of community you want to live in, and what kind of future you believe is worth building.

This distinction matters. No one is expected to be a perfect embodiment of the values they declare. People hold aspirations that outrun their current behavior — that is not hypocrisy, it is the normal condition of anyone trying to be better than they were. What the values subsystem captures is not "this is exactly who I am" but "this is the direction I am orienting toward, and the standard against which I am willing to be measured." The declaration is a commitment to a future, not a certificate of a present.

ISR is not designed to punish people for falling short of their declared values. It is designed to make community life more future-oriented: actions are evaluated in terms of what they contribute to the shared future the community has articulated, not as verdicts on past character. A person who declares a commitment to environmental responsibility and then acts inconsistently with it is not condemned — they are in the same honest position as anyone working against habits and constraints that change slowly. What ISR tracks is the overall direction and pattern, not individual failures.

**Technical safeguards:** Sudden changes in value declarations trigger system warnings. Coordinated manipulation (mutual endorsement networks, for example) is detectable through anomaly analysis.

## What if I disagree with how my score is calculated?

Every component of your ISR score is fully visible to you. You can see exactly which factors contributed to each element — which actions were counted, how they were classified, what weight the community's value framework assigned to them.

If you believe a calculation is wrong, you have several options:

- Inspect the detailed breakdown and identify the specific component you dispute
- Provide additional information about your expertise, credentials, or contribution that may not be captured in the current profile
- Request an AI-assisted explanation of any component you find unclear
- Formally appeal to the community if you believe the calculation reflects a systematic error or bias in the parameters

If an appeal reveals a genuine flaw in how the scoring algorithm applies community values, the parameters themselves can be revised by community consensus. The system is designed to be correctable — not just contestable at the individual level, but revisable at the community level.

## Who decided what the ten value domains are? Isn't that imposing values?

This is a fair and important challenge. The ten-domain structure of the ISR Values Subsystem was designed by the system's creators in accordance with modern approaches in Computational Sociology — and any such design carries the assumptions of its moment and context.

The distinction to keep in mind is between a *representational structure* and a *normative prescription*. The ten domains provide a common notation system — a shared coordinate space in which any community can locate its values. They do not specify what the correct value on any axis is, or how much weight any domain should carry. That is entirely determined by community members themselves.

An analogy: a musical staff is a notation system that allows any music to be written down and performed. It does not tell you which music is beautiful. The ISR value structure is similar: it provides a language, not a judgment.

That said, any choice of taxonomy carries implicit assumptions. The decision to include "Technological World and Digital Democracy" as one of the ten domains reflects contemporary concerns, and communities operating in different contexts might reasonably weight it very differently. The structural response to this limitation is the community revision mechanism: the domain structure itself can be adjusted by community consensus. The scaffold exists to be inhabited and reshaped, not simply obeyed.

It is also worth being explicit about where the sociology of ISR currently stands. The value vectorization and assessment subsystem is version 1.0 — designed to be good enough to begin real-world validation, not to be the final word on how human values should be represented computationally. This is a genuinely open research area. Sustained work in sociology, psychology, and moral philosophy will be necessary to develop it further, and future versions may differ substantially from what is deployed today. ISR treats this not as a limitation to apologize for but as an honest description of what it means to be a new framework at the beginning of its research trajectory.

## How does a community actually define its values in practice?

The process is member-driven from start to finish. Each member of the community defines their own vision of the future society in which they want to live in their personal profile — what they consider important, what they consider a cost, how they would prioritize competing concerns in their shared domain. The AI assistant helps translate intuitive value statements into operational definitions, and helps members understand what the system means by those definitions.

The community's collective Matrix of Values emerges from the collection of all members' individual vectorized inputs. This means the community's normative framework is not voted on once and fixed — it is a living structure that reflects the actual distribution of commitments among its current members, and shifts as members and their values evolve.

Individual values can be adjusted over time. All members can see how their declared values compare to the Ad-hoc Public's aggregate profile (Vector of Values), and how their actions align with both.

## Is ISR only useful for large organizations?

ISR scales from small communities (10 members) to large networks (100,000+ members), but its value increases significantly above roughly 150 members — the threshold anthropologists call Dunbar's number.

Below 150 members, the human brain can track the social reality of the whole community almost unconsciously: who knows what, who has done what, who can be trusted in which context. Informal reputation mechanisms have long been formed in the human mind and have worked well at this scale for tens of thousands of years. ISR adds the most value where informal knowledge breaks down — where the community is too large for any member to hold its full social picture, where decisions become opaque, and where informal hierarchies develop that reflect access rather than merit. That is, virtually all modern communities where the vast majority of humanity lives.

The most natural early adopters for ISR are housing cooperatives, neighborhood associations, professional guilds, NGOs, academic institutions, and DAOs (Decentralized Autonomous Organizations) — communities large enough to face governance complexity, but small enough to pilot and iterate quickly.

## Does ISR track all my actions? What about privacy?

Only actions that affect other community members — what ISR calls social actions — are eligible to review, evaluation, and storage. Private behavior, personal choices that have no community dimension, and actions taken outside community contexts are not within the scope of the system.

Access to information about any member's record is tiered through the Adaptable Authorization system: different people have different levels of access depending on their relationship to you, their relevance to the context, and the declared purpose of their access request. A neighbor, a doctor, a professional colleague, and a stranger have different access levels — analogous to how information naturally flows in real communities, but formalized and auditable.

The goal is accountability without surveillance. ISR is built on the observation that healthy community dynamics — the kind that make people feel safe being authentic — depend on a degree of mutual transparency. The system is designed to enable that transparency without enabling the abuse of it.

**Ongoing research:** Federated learning approaches — which would allow ISR scores to be computed without centralizing raw personal data — are a priority for future development. The privacy architecture of ISR is an active area of work, not a solved problem.

See also: [Adaptable Authorization in the ISR System](https://isr-vote.com/wiki/adaptable_authorization.html)

## How does ISR relate to money? Does it replace economic incentives?

ISR does not replace economic systems — it adds a dimension that monetary systems cannot capture. Money is an extraordinarily powerful coordination mechanism, but it measures everything in a single unit (monetary value) and can be accumulated by means that generate no social value, or that generate social costs that others bear.

ISR measures social contribution specifically — the impact of actions on a community's hared wellbeing, as evaluated by the community itself. An action that generates revenue while damaging community health might score high on economic measures and low on ISR. An action that costs time and money but significantly improves community trust might be invisible to economic accounting and central to ISR.

The two systems are complementary, not competitive. ISR is not designed to replace the price signal or monetary incentives. It is designed to make visible the dimension of social value that monetary accounting systematically ignores — and to give communities a tool for weighting that dimension in their own decisions.

### ISR and the motivational logic of money

The relationship between ISR and money becomes more pointed when you consider what money actually does as a motivational force. Much of its compulsive power derives not from the value of things money can buy, but from survival anxiety — the fear of deprivation, destitution, exclusion from social life. When that floor is removed, the character of motivation changes.

Real-world basic income experiments — in Finland, Kenya, and several US cities — offer early evidence of this. A consistent finding is that when material security is guaranteed, people do not stop contributing to their communities; they redirect toward things they find genuinely meaningful. The drive for recognition, social standing, and the sense that one's contribution matters does not disappear — it emerges more clearly once survival anxiety no longer dominates it.

This matters for how we understand ISR's long-term role. Money bundles two things that are conceptually distinct: material resource allocation and social standing. It has served as a proxy for social value primarily because no portable, cross-context alternative existed — not because it is actually a good measure of what people contribute to shared life. As technology progressively decouples material security from employment, these two functions may require separate systems. Price signals and monetary incentives remain necessary for allocating scarce material resources. But for the specifically social dimension — distributing influence, recognizing contribution, conferring standing within a community — ISR may serve as a partial alternative to monetary coordination in ways that become more significant as survival anxiety loses its grip.

This is a cautious claim, not a prediction. The transition, if it comes, will be slow and uneven. But the direction is worth taking seriously: ISR is designed for a world in which social standing is earned through demonstrated contribution to shared life rather than accumulated through monetary wealth — and that world may be closer than it currently appears.

## Can AI be trusted to evaluate human behavior fairly?

This is a question ISR takes seriously rather than deflects. ISR uses AI quite limitedly, in narrow, specific, verifiable tasks. The rest of the calculations are done with relatively simpler and completely transparent mathematical tools. This eliminates the main "scary" of AI - the black box effect and makes the path to obtaining results clear and explanatory. So in ISR, no one sets the task for AI of deciding what is fair and what is not. The system provides a structured, transparent and corrective assessment, which is different from uncritical trust. And everyone can check the path of its formation step by step.

Several points are worth holding together:

- We are already constantly evaluated — by employers, institutions, certifying bodies, social networks. ISR simply makes this evaluation more transparent, universal, and independent of the whims of individual agents.
- The evaluation algorithm is open for inspection and adjustment by the community. Algorithmic bias is a real risk, as no algorithm can capture all potential human complexity and unpredictability. However, algorithms are already statistically better at such tasks than human experts, so for the vast majority of cases this is a good option. And for complex cases, there is an appeals process and review by a human panel.
- AI evaluation in ISR does not make final decisions — it provides weighted inputs to deliberative processes that remain under human control. The system amplifies human judgment; it does not replace it.
- Multiple perspectives — community input, AI analysis, individual context — reduce the risk of systematic bias that any single evaluator would carry.

The deeper point is that the alternative to transparent algorithmic evaluation is not no evaluation — it is opaque human evaluation, which has its own well-documented biases. The question is not "AI or human judgment" but "what combination of human and AI judgment, with what transparency and accountability, produces the fairest outcomes?"

## What prevents the majority from simply dominating minorities?

This is a central design concern in ISR, not an afterthought. The majority-dominance problem is exactly what the Ad-hoc Public mechanism is built to address.

In standard voting, a numerical majority can overrule a smaller group even when the majority has little stake in the decision and the minority bears all its consequences. ISR's Ad-hoc Public formation is governed by the All-Affected Principle: only those genuinely affected by an issue are assembled for its resolution, and their influence is weighted by Relevance — how directly they are affected — not merely by number.

Additional protections include:

- Domain-specific Expertise weighting gives specialists influence in their areas, regardless of whether they are numerically in the majority
- Values declaration ensures that diverse normative perspectives are recognized in the community's aggregate framework — not homogenized away
- The goal is constructive engagement with diversity, not enforced consensus

No mechanism eliminates the risk of majoritarian distortion entirely. But ISR's structural design makes it significantly harder to achieve than in standard one-person-one-vote systems.

## Does ISR replace the law?

No. If a decision conflicts with law, law prevails. The Analyzer flags known conflicts at analysis time, but ISR provides no legal advice and no enforcement.

## Won't ISR itself become another controlling bureaucracy?

The risk of any governance system calcifying into bureaucracy is real, and ISR is designed with specific structural resistances to it.

First: Ad-hoc publics dissolve when their purpose is fulfilled. There are no standing committees, no permanent sub-structures with accumulated institutional power. Each decision space assembles, deliberates, and closes.

Second: influence weights are issue-specific, not permanent status assignments. A person who had high influence on last year's infrastructure question has no special authority over this year's financial governance question unless their expertise and contribution in that domain justify it.

Third: the algorithm is transparent and community-adjustable. The community can inspect and revise any parameter — including structural parameters about how influence is calculated. There is no inaccessible back-end that a professional class controls.

Fourth: ISR has no enforcement mechanisms. It is a weighting and deliberation tool, not a governing authority. The community remains the decision-maker; ISR provides better-structured input to that decision.

The practical risk is not bureaucracy in the traditional sense — it is algorithm ossification, where parameters set at inception are never revisited. The mitigation is a culture of active community engagement with the system's parameters, not just its outputs. And of course further R&D about the project.

## ISR sounds philosophically ambitious. Is there real intellectual grounding behind it?

ISR draws on several established traditions in democratic theory, political philosophy, and social science — and it is honest about where it departs from them.

The core normative framework is grounded in Hannah Arendt's political theory — specifically her concept of the Space of Appearance (the political realm constituted by genuine collective action and speech) and her analysis of how modern institutions erode it. The All-Affected Principle — the idea that legitimate decisions require the participation of everyone who bears their consequences — draws on the political philosophy of Josiah Ober and Mark Warren. The deliberative framework reflects Jürgen Habermas's theory of communicative rationality. The epistemic arguments about expertise aggregation in democratic decisions draw on recent work in augmented democracy, including LLM-assisted deliberation research (Tessler et al., 2024; Gudiño et al., 2024).

The ISR approach to responsibility — the rejection of collective excuse, the insistence on individual accountability even within institutional contexts — is grounded in Arendt's analysis of the banality of evil and in existentialist philosophy's foundational claim that we become who we are through what we choose to do.

ISR also departs honestly from some of its intellectual predecessors: Arendt herself would likely have been skeptical of any system that administers political space algorithmically. The response to that skepticism is that Arendt was theorizing for communities at human-cognition scale; ISR is an attempt to extend her diagnosis to the post-Dunbar conditions of modern society.

The full intellectual grounding is developed in the [Philosophy](https://isr-vote.com/wiki/philosophy.html) chapter and in the [ISR and Arendt: Augmented Democracy](https://isr-vote.com/wiki/ISR-Arendt-article.html) article.

## What stage is ISR at? Is it ready to use?

ISR is in active MVP (minimum viable product) development. The core architecture — the three-component scoring model, the Vector of Values, the Ad-hoc Public formation mechanism, and the Adaptable Authorization system — is designed and documented. Implementation is proceeding on Google Cloud infrastructure with Firebase and Vertex AI.

The system is not yet deployed for general use. The current phase is focused on:

- Completing the technical MVP
- Identifying early-adopter communities (DAOs, HOAs, NGOs, cooperatives) for pilot deployment
- Validating the scoring model against real community decisions
- Iterating on the privacy architecture, including federated learning approaches

If you are interested in piloting ISR in your community, or in contributing to the research, the best starting point is to explore the [documentation](https://isr-vote.com/wiki/index.html) and reach out through the site.


---

