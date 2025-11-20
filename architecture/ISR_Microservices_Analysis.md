# ISR: Vote - Microservices Architecture Analysis & Implementation Guide

## Executive Summary

The ISR (Index of Social Responsibility) voting system requires a sophisticated **event-driven microservices architecture** to handle:
- Complex ISR calculations (LLM + RAG analysis, taking hours)
- Real-time microcommunity determination based on geographic, social, and economic context
- Dynamic community values matrix computation
- Distributed voting with weighted results
- Eventual consistency model (acceptable few-minute delay)

This document presents a complete microservices design with service interaction patterns, data architecture, and quality attribute analysis.

---

## 1. Microservices Architecture Overview

### 1.1 Architecture Principles
- **Database per Service**: Each microservice owns its data
- **Event-Driven Communication**: Kafka for high-throughput events, RabbitMQ for task queues
- **Polyglot Persistence**: Use appropriate databases (PostgreSQL, Neo4j, MongoDB, Redis)
- **Eventual Consistency**: Few-minute delay acceptable per requirements
- **Autonomous Teams**: Services aligned with business capabilities

### 1.2 Deployment Stack
Client → API Gateway → Service Discovery → Microservices
↓
Kubernetes (Orchestration)
↓
Prometheus + ELK + Jaeger (Observability)

---

## 2. Core Microservices (9 Services)

### 2.1 Identity & Authentication Service
**Pattern**: Synchronous (REST)  
**Database**: PostgreSQL  
**Responsibility**: 
- User authentication (Bank ID, Дія.Підпис integration)
- JWT token generation/validation
- Session management
- Multi-account prevention

**External Dependencies**: 
- Bank ID API (Circuit Breaker pattern)
- Дія.Підпис service (Circuit Breaker pattern)

**Key Challenge**: External service failures must not block all operations. Implement token caching and fallback mode.

---

### 2.2 Profile Service
**Pattern**: Synchronous (REST) + Asynchronous (Kafka events)  
**Database**: PostgreSQL  
**Responsibility**:
- User profile CRUD (personal, professional, geographic, social features)
- Profile data versioning
- Emit `profile.updated` events

**Events Published**:
- `profile.updated` → triggers microcommunity re-evaluation, ISR recalculation, social graph updates

**Data Model**:
User Profile: {
user_id,
geographic_location (latitude, longitude),
professional_skills,
interests,
social_connections,
profile_completeness_score,
updated_at
}

---

### 2.3 Social Graph Service
**Pattern**: Synchronous (REST) + Asynchronous (Kafka events)  
**Database**: Neo4j (graph database)  
**Responsibility**:
- Store and query relationship graphs (friends, relatives, hobbies, interests)
- Friendship/connection requests
- Graph traversal queries for proximity analysis
- Support geographic and social connections via edges

**Key Queries** (for microcommunity determination):
// Find users within N hops from user X
MATCH (user:User {id: $user_id})-[*1..3]-(connected:User)
RETURN connected

// Find users in geographic proximity + social network
MATCH (user:User)-[:LOCATED_IN]->(:Region)
<-[:LOCATED_IN]-(nearby:User)
WHERE distance(user.location, nearby.location) < 50km
RETURN nearby

**Data Model**:
Nodes: User, Location, Interest, Skill
Edges: FRIENDS_WITH, RELATIVE_OF,
INTERESTED_IN, SKILLED_IN, LOCATED_IN

---

### 2.4 Discussion & Chat Service
**Pattern**: Synchronous (REST/WebSocket) + Asynchronous (RabbitMQ)  
**Database**: PostgreSQL  
**Responsibility**:
- Create discussion topics
- Store and retrieve messages
- Real-time message delivery (WebSocket)
- Message sentiment analysis (delegated to Sentiment Service)
- Topic ranking by importance/urgency

**Data Model**:
DiscussionTopic: {
topic_id,
creator_id,
title,
context (location, stakeholders, deadline),
created_at
}

Message: {
message_id,
topic_id,
author_id,
content,
sentiment_score,
author_reliability_score,
created_at
}

---

### 2.5 Voting Service
**Pattern**: Synchronous (REST) + Asynchronous (Kafka events)  
**Database**: PostgreSQL + Redis cache  
**Responsibility**:
- Vote submission and validation
- Vote aggregation with ISR weights
- Emit vote events to Kafka
- Store vote ledger

**Key Algorithm**:
vote_weight = ISR_score (retrieved from cache, pre-calculated)
weighted_result = sum(vote * ISR_weight) / sum(ISR_weights)


**Data Model**:
Vote: {
vote_id,
microcommunity_id,
question_id,
user_id,
option_id,
isr_weight,
timestamp
}

VoteQuestion: {
question_id,
problem_statement,
options: [{id, description, execution_time, cost, executors}],
microcommunity_id,
created_at,
deadline
}


**Critical**: Always retrieve ISR weights from cache (pre-calculated). If not available, use fallback score or queue as "pending ISR calculation".

---

### 2.6 Microcommunity Determination Service
**Pattern**: Asynchronous (Kafka events trigger workflow)  
**Database**: PostgreSQL (store determined communities)  
**Responsibility**:
- Listen to `question.created` events
- Analyze question context (geographic, stakeholder, deadline)
- Query Social Graph Service for proximity
- Query Profile Service for relevance matching
- Determine belongingness degree for each user
- Emit `microcommunity.determined` event

**Workflow** (triggered by question creation):
Extract question context (location, topic, stakeholders)

Query Social Graph for geographically close users

Filter by professional skills relevant to question

Calculate belongingness_degree =
(geographic_proximity_score * 0.3 +
skill_relevance * 0.4 +
social_network_proximity * 0.3)

Rank users by belongingness_degree

Emit microcommunity.determined with ranked users

**Data Model**:
Microcommunity: {
microcommunity_id,
question_id,
members: [{user_id, belongingness_degree, status}],
created_at,
status: "determining" | "determined" | "active"
}


**Performance Consideration**: This service may take seconds to complete (graph queries + ranking). Don't block vote question creation; mark as "pending microcommunity determination".

---

### 2.7 Community Values Matrix Service
**Pattern**: Asynchronous (Kafka events)  
**Database**: MongoDB (flexible schema for value matrices)  
**Responsibility**:
- Listen to `microcommunity.determined` events
- Aggregate member values by belongingness degree
- Compute community values matrix
- Emit `values.matrix.computed` event
- Serve matrix data to ISR Calculation Service

**Algorithm**:
For each value_type in community:
weighted_score = sum(user_value_score * belongingness_degree) /
sum(belongingness_degrees)

matrix[value_type] = weighted_score

text

**Data Model**:
CommunityValuesMatrix: {
microcommunity_id,
values: {
value_name: {
weighted_score,
member_contributions: [{user_id, score, belongingness_degree}],
consensus_indicator
}
},
computed_at
}

text

---

### 2.8 User Values & Assessment Service
**Pattern**: Synchronous (REST) + Asynchronous (Kafka events)  
**Database**: MongoDB  
**Responsibility**:
- User-defined social values CRUD
- Value template management
- Value profile versioning
- Emit `values.defined` events

**Data Model**:
UserValues: {
user_id,
values: [{
value_name,
description,
numerical_score (0-10),
defined_at
}],
value_template_used,
last_updated
}

text

---

### 2.9 ISR Calculation Service
**Pattern**: Asynchronous (RabbitMQ task queue + Kafka events)  
**Database**: PostgreSQL + Redis cache  
**Responsibility**:
- Listen to `microcommunity.determined` events
- Queue ISR calculation jobs (per community member)
- Execute jobs: LLM analysis + RAG retrieval
- Store results in DB + Redis cache
- Emit `isr.calculated` event

**Workflow** (hours-long process):
Input: question context + user profile + community values matrix
Process:

Extract question context features (LLM analysis)

RAG retrieval: relevant historical decisions, user expertise

Compute ISR score factors:

Context Relevance (geography + social features): 35%

Competence (skills + experience): 40%

Contribution (discussion engagement): 25%

Final ISR_score = weighted_combination
Output: ISR_score cached in Redis, stored in DB

text

**Implementation Strategy**:
- Use RabbitMQ with configurable worker count (horizontal scaling)
- Long-running jobs (set timeout to max_duration)
- Store intermediate results for recovery
- Implement exponential backoff for retries
- Use Bulkhead pattern to isolate compute resources

**Data Model**:
ISRCalculation: {
calculation_id,
microcommunity_id,
user_id,
question_id,
isr_score,
component_scores: {
context_relevance,
competence,
contribution
},
status: "queued" | "calculating" | "completed" | "failed",
started_at,
completed_at,
error_details
}

ISRScoreCache (Redis):
Key: "isr:{microcommunity_id}:{user_id}:{question_id}"
Value: {isr_score, expires_at}
TTL: 24 hours

text

---

## 3. Supporting Services (6 Services)

### 3.1 AI Assistant Service
**Pattern**: Synchronous (REST)  
**Responsibility**:
- Integrate with Gemini API
- Contextual help within application
- Value evaluation guidance
- App usage recommendations
- Circuit Breaker for external LLM calls

**Circuit Breaker Configuration**:
Failure threshold: 5 failed requests

Timeout: 10 seconds per request

Fallback: Static help templates

State: CLOSED → OPEN → HALF_OPEN → CLOSED

text

---

### 3.2 Notification Service
**Pattern**: Asynchronous (RabbitMQ consumer)  
**Responsibility**:
- Email delivery (SendGrid)
- Push notifications (Firebase Cloud Messaging)
- WebSocket for real-time alerts
- Retry logic with exponential backoff

**Events Consumed**:
- `microcommunity.changed`
- `vote.results.ready`
- `task.assigned`
- `discussion.mentioned`

---

### 3.3 Sentiment Analysis Service
**Pattern**: Asynchronous (Kafka events)  
**Responsibility**:
- Analyze discussion message sentiment
- Compute author reliability score
- Flag problematic content
- Update user reputation

**Triggers**:
- Listen to `message.created` on Kafka
- Return `message.sentiment.analyzed` event

---

### 3.4 Analytics & Reporting Service (CQRS Read Model)
**Pattern**: Asynchronous (Kafka consumer)  
**Database**: Elasticsearch + MongoDB  
**Responsibility**:
- Aggregate vote results
- Microcommunity statistics
- ISR distribution analysis
- User engagement metrics
- Dashboard APIs

**Events Consumed**: All domain events (for eventual consistency)

---

### 3.5 Audit & Logging Service
**Pattern**: Asynchronous (Kafka consumer)  
**Database**: Elasticsearch + PostgreSQL  
**Responsibility**:
- Centralized logging
- Security event logging (all auth failures)
- Audit trail persistence
- Compliance reporting

**Events Consumed**:
- `auth.failed`
- `data.accessed`
- `data.modified`
- All critical operations

---

### 3.6 Context Analyzer Service
**Pattern**: Asynchronous (triggered on question creation)  
**Responsibility**:
- Extract context features from questions (LLM + NLP)
- Identify stakeholders, geographic scope, urgency
- Store context metadata
- Support context-based queries

**Output**:
QuestionContext: {
question_id,
geographic_scope,
identified_stakeholders,
urgency_level,
affected_sectors,
keywords,
extracted_at
}

text

---

## 4. Inter-Service Communication & Data Interactions

### 4.1 Synchronous Communication (REST/gRPC)
Used for request-response scenarios where immediate feedback is required:

| From | To | Protocol | Use Case |
|------|----|----|----------|
| API Gateway | Identity Service | REST | Token validation |
| Voting Service | ISR Score Cache | gRPC | Retrieve pre-calculated ISR |
| Discussion Service | Profile Service | REST | Fetch user profiles for display |
| AI Assistant | All Services | REST | Contextual queries |

**Characteristics**:
- Low latency required
- Strong ordering needed
- Direct dependencies acceptable
- Use timeouts to prevent cascading failures

---

### 4.2 Asynchronous Communication (Kafka)
Used for event-driven workflows where strong ordering and event history matter:

#### Event Streams:

**1. `profile.updated` Topic**
- **Producer**: Profile Service
- **Consumers**: Social Graph Service, ISR Service, Microcommunity Service, User Values Service
- **Payload**:
{
"event_id": "uuid",
"timestamp": "2025-11-05T12:00:00Z",
"user_id": "user123",
"changes": {
"location": {"from": "...", "to": "..."},
"skills": {"added": [...], "removed": [...]}
},
"version": 1
}

text
- **Impact**: Triggers microcommunity re-evaluation and ISR recalculation

**2. `question.created` Topic**
- **Producer**: Voting/Discussion Service
- **Consumers**: Microcommunity Determination Service, Context Analyzer Service, Analytics Service
- **Payload**:
{
"event_id": "uuid",
"question_id": "q123",
"creator_id": "user456",
"title": "...",
"context": {...},
"created_at": "2025-11-05T12:00:00Z"
}

text
- **Impact**: Triggers microcommunity determination (real-time, can take seconds)

**3. `microcommunity.determined` Topic**
- **Producer**: Microcommunity Determination Service
- **Consumers**: Community Values Matrix Service, ISR Calculation Service (queue jobs), Notification Service, Analytics Service
- **Payload**:
{
"event_id": "uuid",
"microcommunity_id": "mc123",
"question_id": "q123",
"members": [
{"user_id": "u1", "belongingness_degree": 0.85, "status": "active"},
{"user_id": "u2", "belongingness_degree": 0.62, "status": "active"}
],
"determined_at": "2025-11-05T12:01:30Z"
}

text
- **Impact**: Workflow continues to values aggregation → ISR calculation

**4. `isr.calculated` Topic**
- **Producer**: ISR Calculation Service
- **Consumers**: Voting Service (populate cache), Analytics Service, Task Service
- **Payload**:
{
"event_id": "uuid",
"calculation_id": "calc456",
"microcommunity_id": "mc123",
"user_id": "u1",
"isr_score": 0.78,
"components": {...},
"cached_at": "2025-11-05T14:30:00Z"
}

text
- **Impact**: ISR scores now available for vote weighting

**5. `vote.submitted` Topic**
- **Producer**: Voting Service
- **Consumers**: Analytics Service, Task Service, Search Service, Notification Service
- **Payload**:
{
"event_id": "uuid",
"vote_id": "v123",
"question_id": "q123",
"user_id": "u1",
"option_id": "opt2",
"isr_weight": 0.78,
"submitted_at": "2025-11-05T12:05:00Z"
}

text

**6. `values.defined` Topic**
- **Producer**: User Values Service
- **Consumers**: Community Values Matrix Service (recalculate affected matrices), Analytics Service
- **Payload**:
{
"event_id": "uuid",
"user_id": "u1",
"values": [...],
"affected_microcommunities": ["mc1", "mc3"],
"defined_at": "2025-11-05T12:00:00Z"
}

text

---

### 4.3 Asynchronous Task Queues (RabbitMQ)
Used for long-running background jobs with retry logic:

#### Queue: `isr.batch.calculation`
- **Producer**: Microcommunity Determination Service (publishes job)
- **Consumers**: ISR Worker Pool (N instances with auto-scaling)
- **Job Payload**:
{
"job_id": "uuid",
"microcommunity_id": "mc123",
"user_id": "u1",
"question_id": "q123",
"question_context": {...},
"user_profile": {...},
"community_values_matrix": {...},
"max_duration_seconds": 3600,
"retry_count": 0
}

text
- **Processing**: 
  - LLM context analysis (Gemini)
  - RAG retrieval from knowledge base
  - Score computation
  - Store in DB + cache
  - Emit `isr.calculated` event
- **Failure Handling**: DLQ (Dead Letter Queue) after 3 retries

#### Queue: `notifications`
- **Producer**: Any service (votes, tasks, microcommunity changes)
- **Consumers**: Notification Service
- **Payload**:
{
"notification_id": "uuid",
"user_id": "u1",
"notification_type": "vote_ready" | "task_assigned" | "community_change",
"content": {...},
"priority": "high" | "medium" | "low",
"created_at": "2025-11-05T12:00:00Z"
}

text

---

## 5. Data Architecture & Synchronization Patterns

### 5.1 Database Per Service (Polyglot Persistence)

| Service | Database | Rationale |
|---------|----------|-----------|
| Identity | PostgreSQL | ACID compliance, user records |
| Profile | PostgreSQL | Relational, frequent queries |
| Discussion | PostgreSQL | Transactional, message ordering |
| Voting | PostgreSQL | Vote ledger, audit trail |
| Social Graph | Neo4j | Graph traversal, relationship queries |
| User Values | MongoDB | Flexible schema, value profiles |
| Task | PostgreSQL | Relational, assignment tracking |
| Community Values Matrix | MongoDB | Flexible matrix structures |
| ISR Calculation | PostgreSQL + Redis | DB for history, Redis for cache |
| Analytics | Elasticsearch | Full-text search, aggregations |
| Audit | Elasticsearch | Centralized logging |

### 5.2 Consistency Model: Eventual Consistency with Outbox Pattern

**Problem**: Distributed transactions across service boundaries

**Solution - Outbox Pattern**:
Service Transaction:
BEGIN
1. Update service database (e.g., Profile table)
2. INSERT event into Outbox table (same transaction)
COMMIT

Outbox Relay (separate process):

Read uncommitted events from all Outbox tables

Publish to Kafka/RabbitMQ

Mark as published (idempotent)

Periodically purge old events

text

**Guarantees**:
- No lost events (transactional write)
- Exactly-once delivery (idempotency keys)
- Eventual consistency (few seconds to minutes)

**Example - Profile Update**:
-- Single transaction
BEGIN;
UPDATE user_profiles SET location = $1 WHERE user_id = $2;
INSERT INTO outbox (event_type, payload, created_at)
VALUES ('profile.updated', json_object(...), NOW());
COMMIT;

-- Outbox Relay publishes to Kafka
-- Social Graph Service consumes → updates Neo4j
-- Microcommunity Service consumes → re-evaluates membership
-- ISR Service marks scores for recalculation
-- Eventually consistent within few minutes

text

### 5.3 Data Synchronization Workflows

**Workflow 1: New Question → ISR Scores Ready**
Time T0: User creates vote question
→ Voting Service stores question
→ Emits question.created event

Time T0 + 1s: Microcommunity Service consumes event
→ Queries Social Graph (geographic proximity)
→ Queries Profile Service (skill relevance)
→ Calculates belongingness_degree
→ Stores microcommunity
→ Emits microcommunity.determined event

Time T0 + 2s: Community Values Matrix Service consumes event
→ Aggregates member values by belongingness
→ Computes matrix
→ Stores in MongoDB

Time T0 + 3s: ISR Calculation Service consumes event
→ Queues N jobs (one per community member) to RabbitMQ
→ Workers begin processing (can take 10 min - 3 hours)

Time T0 + 10 min: First ISR scores complete
→ Stored in Redis cache
→ Emits isr.calculated event
→ Voting Service can now weight first votes

Time T0 + 3 hours: Last ISR score completes
→ All members' scores cached
→ System fully ready

text

**Workflow 2: User Profile Changes**
Time T0: User updates profile location
→ Profile Service updates PostgreSQL
→ Emits profile.updated event (Kafka)

Time T0 + 100ms: Multiple consumers react:
→ Social Graph Service: Updates node attributes in Neo4j
→ ISR Service: Marks all ISR scores containing this user as "stale"
→ Microcommunity Service: Re-evaluates user's belongingness in active communities

Time T0 + 500ms: ISR recalculation triggered for affected microcommunities
→ New jobs queued for affected members
→ Existing ISR scores remain valid but marked as "needs refresh"

Time T0 + 5 min: New ISR scores available
→ System eventually consistent
→ Vote weighting uses updated scores

text

---

## 6. Microservices Architecture Patterns Applied

### 6.1 Event-Driven Architecture
- **Pattern Type**: Primary communication style
- **Implementation**: Kafka for high-throughput events, RabbitMQ for task queues
- **Benefit**: Loose coupling, enables scaling independent services
- **Trade-off**: Eventual consistency, complex debugging

### 6.2 Database Per Service (DPS)
- **Pattern Type**: Data isolation
- **Implementation**: PostgreSQL, Neo4j, MongoDB, Redis per service
- **Benefit**: Service independence, technology flexibility, failure isolation
- **Trade-off**: No ACID across services, complex queries across boundaries

### 6.3 API Gateway
- **Pattern Type**: Request routing
- **Implementation**: Kong, AWS API Gateway, or Nginx Ingress
- **Benefit**: Single entry point, cross-cutting concerns (auth, rate limiting)
- **Trade-off**: Potential bottleneck, single point of failure (mitigate with HA)

### 6.4 Service Discovery
- **Pattern Type**: Dynamic service registration
- **Implementation**: Consul or Kubernetes DNS
- **Benefit**: Automatic service location, handles instance churn
- **Trade-off**: Operational complexity, additional infrastructure

### 6.5 Circuit Breaker
- **Pattern Type**: Fault tolerance
- **Implementation**: For external services (Bank ID, Дія.Підпис, Gemini)
- **Benefit**: Prevents cascading failures, graceful degradation
- **Trade-off**: Additional latency, fallback mode complexity

### 6.6 Saga Pattern
- **Pattern Type**: Distributed transaction coordination
- **Implementation**: Choreography-based (event-driven)
- **Workflow**: Question → Microcommunity → Values Matrix → ISR → Vote Ready
- **Benefit**: Handles long-running, multi-service workflows
- **Trade-off**: Complex error handling, compensating transactions needed

### 6.7 Bulkhead Pattern
- **Pattern Type**: Resource isolation
- **Implementation**: ISR Worker thread pools in separate containers
- **Benefit**: Long-running jobs don't starve other services
- **Trade-off**: Resource overhead, complex configuration

### 6.8 CQRS (Optional, for Advanced Scenarios)
- **Pattern Type**: Separate read/write models
- **Implementation**: Voting Service (write) → Analytics Service (read)
- **Benefit**: Independent scaling of reads/writes, different database technologies
- **Trade-off**: Eventually consistent read model, operational complexity

---

## 7. Quality Attributes Analysis (NFRs from Requirements)

### 7.1 Availability: MTTR < 5 minutes, 0% data loss

**Current Requirement**: Server crash recovery within 5 minutes

**How Microservices Helps**:
- **Service Isolation**: One service crash doesn't affect others
  - ISR Service failure ≠ voting blocked (use cached scores)
  - Chat failure ≠ voting blocked
- **Redundancy**: Horizontal scaling ensures N-1 resilience
- **Automated Recovery**: Kubernetes automatically restarts failed containers
- **Data Durability**: Kafka replication (factor 3) prevents event loss

**How Microservices Complicates**:
- **More Components**: 10+ services = more failure modes
- **External Dependencies**: Bank ID, Дія.Підпис failures must be handled
- **Distributed Data**: Ensuring consistency across multiple DBs on failover
- **Network Failures**: Harder to achieve < 5 min MTTR with network partition

**Recommendations**:
- Multi-region deployment with automatic failover (< 2 min)
- Kafka with 3-replica configuration (no message loss)
- Database replication (PostgreSQL streaming replication, Neo4j cluster)
- Health check on all critical services (30-second interval)
- Automated circuit breaker rollback if dependency fails

**Expected Capability**: ✓ Can achieve MTTR < 5 min with proper design

---

### 7.2 Performance: 95% of submissions within 2 seconds

**Current Requirement**: Vote submission + confirmation in 2 seconds

**How Microservices Helps**:
- **Asynchronous ISR**: Don't wait for ISR calculation; use cached scores
  - Vote submission: 50ms (write to DB + cache)
  - ISR weighting: 100ms (cached lookup)
  - Total: 150ms (within 2-second budget)
- **Parallel Processing**: Services scale independently
- **Caching**: ISR scores pre-calculated and cached in Redis

**How Microservices Complicates**:
- **Network Latency**: Each inter-service call adds latency
- **Async Overhead**: Event publishing + consumer latency
- **Pre-calculated ISR**: If ISR not ready, vote marked "pending weight" (degrades experience)
- **Discussion ranking**: Geographic/relevance queries can be slow at scale

**Performance Budget**:
Vote Submission (2000ms budget):

API Gateway validation: 10ms

Identity Service token check: 20ms (cached)

Voting Service insert: 50ms

ISR cache lookup: 5ms (Redis)

Vote event publish: 15ms

WebSocket response: 10ms
─────────────────────────────
Total: ~110ms (95% likely)
P95: ~300ms (network jitter)
P99: ~500ms (occasional delays)

✓ Well within 2-second requirement

text

**Potential Bottleneck - ISR Pre-Calculation**:
- If microcommunity not yet determined, vote sits in queue
- Microcommunity determination: 2-5 seconds (graph queries)
- Values aggregation: 1-2 seconds
- ISR calculation queueing: milliseconds
- ISR computation: 10 minutes - 3 hours per job

**Mitigation**:
- Pre-calculate ISR in background before question is published
- Allow "preview voting" with cached ISR scores from similar questions
- Provide user feedback: "Your vote will be weighted once ISR is calculated"

**Expected Capability**: ✓ Can achieve 95% < 2 sec for vote submission

---

### 7.3 Security: 0 unauthorized access, all failures logged

**Current Requirement**: Failed auth attempts logged, no unauthorized account access

**How Microservices Helps**:
- **Centralized Auth**: API Gateway + Identity Service as single point
- **Token-Based**: JWT prevents repeated auth lookups
- **Audit Trail**: All auth events logged to central service
- **Circuit Breaker**: External auth failures don't bypass internal checks

**How Microservices Complicates**:
- **Service-to-Service Auth**: Additional mTLS/token passing between services
- **Distributed Secrets**: API keys/certs managed across multiple services
- **More Entry Points**: Each service is a potential attack vector
- **External Dependencies**: Bank ID/Дія.Підпис integration risks

**Security Patterns**:
1. **Zero-Trust Architecture**:
   - Every service request authenticated (mTLS)
   - API Gateway validates all external requests
   - Service mesh enforces service-to-service auth

2. **External Auth Protection**:
Identity Service ← Circuit Breaker → Bank ID / Дія.Підпис

Circuit Breaker States:
CLOSED: Normal operation
OPEN: External service unavailable → use cached auth token
HALF_OPEN: Testing recovery

text

3. **Audit Logging**:
Audit Service consumes:

auth.failed events (user, timestamp, reason)

auth.success events (user, device, location)

data.accessed events (user, resource, permission)

data.modified events (user, change, timestamp)

text

4. **Rate Limiting**:
- Per-user auth attempt limit (5 failures → 15-min lockout)
- Per-IP rate limiting (100 requests/minute)
- Per-service quotas (prevent DDoS)

**Expected Capability**: ✓ Can achieve 0 unauthorized access with proper design

---

### 7.4 Scalability: 10x user growth (10K→100K) with acceptable latency

**Current Requirement**: Scale from 10K to 100K concurrent users, maintain latency

**How Microservices Helps**:
- **Independent Scaling**: Scale Voting Service separately from Chat Service
- **Horizontal Scaling**: Add more instances based on demand
- High-traffic services (Voting, Discussion): 10→50 instances
- Background services (ISR, Analytics): 5→20 instances
- **Load Distribution**: Kafka partitions distribute load across workers
- **Technology Flexibility**: Use optimal DB per workload
- PostgreSQL read replicas for hot data
- Neo4j cluster for graph queries
- Elasticsearch for search

**How Microservices Complicates**:
- **Graph Database Limits**: Neo4j at 100K nodes with dense relationships:
- Shortest path queries: O(n) → can be slow
- Relationship traversal: More hops = exponential slowdown
- Mitigation: Query result caching, relationship indexing

- **Microcommunity Determination Scaling**:
- Current: O(n * m) where n=users, m=questions
- At 100K users: 100K graph traversals per question
- Mitigation: Batch processing, pre-computed proximity indexes

- **ISR Calculation at Scale**:
- Current: Hours per microcommunity of N members
- At 100K scale: Need 50-100 worker instances
- Kafka throughput: Must handle job queue load
- Mitigation: Distributed job scheduling, priority queues

**Scaling Strategy**:
10,000 users → 100,000 users (10x growth):

Voting Service:
Requests/sec: 100 → 1,000
Instances: 5 → 20
DB Connection Pool: 50 → 200
Cache Nodes: 3 → 9 (Redis cluster)

ISR Calculation:
Jobs/hour: 1,000 → 10,000
Worker Instances: 5 → 50
RabbitMQ Brokers: 1 → 3

Social Graph (Neo4j):
Nodes: 10K → 100K
Relationships: 50K → 500K
Read Replicas: 1 → 3
Query Cache: 10GB → 50GB

Discussion Service:
Concurrent Connections: 500 → 5,000
WebSocket Instances: 2 → 10
Message Queue: 100 msg/sec → 1,000 msg/sec

text

**Performance at 100K Scale** (Pessimistic Estimate):
Microcommunity Determination (when new question posted):

Social Graph query: 500ms (100K nodes, pruning)

Profile queries: 200ms (batch fetch, cached)

Ranking: 100ms

Total: ~800ms (P95)

User sees: "Finding relevant community..." (acceptable)

Vote Submission:

API latency: 100ms (network jitter at scale)

Processing: 50ms

Cache lookup: 20ms

Total: ~170ms (P95 < 2 sec ✓)

ISR Calculation:

Queue depth at peak: 5,000 jobs

Worker throughput: 100 jobs/hour each

Expected completion: 50 hours (oof)

Mitigation: Parallelize job processing, GPU acceleration for LLM

text

**Expected Capability**: ~ Partial. Vote submission scales. ISR calculation bottleneck.

**Mitigation for ISR Scaling**:
1. Implement job prioritization (high-impact questions first)
2. Use quantization/caching for LLM embeddings
3. Deploy ISR Service on GPU instances
4. Distribute computation across multiple regions
5. Pre-calculate ISR for predictable question patterns

---

### 7.5 Consistency: Eventual Consistency (Few-Minute Delay Acceptable)

**Current Requirement**: Delay up to few minutes is acceptable; consistency more important than availability

**How Microservices Helps**:
- **Event Sourcing**: Complete audit trail of all state changes
- **Eventual Consistency Model**: Fits requirement perfectly
- **Idempotent Operations**: Safe event replay if failures occur
- **Reconciliation**: Background jobs can fix inconsistencies

**How Microservices Complicates**:
- **Distributed Transactions**: No ACID across services
- **Conflict Resolution**: What if two users update profile simultaneously?
- **User Confusion**: Stale data visible during few-minute window

**Consistency Approach**:
1. **Outbox Pattern**: No lost events, guaranteed publication
2. **Idempotent Consumers**: Safe duplicate event handling
3. **Reconciliation Jobs**: Periodic consistency checks
4. **Conflict-Free Replicated Data Types (CRDTs)**: For specific fields

**Example - Eventual Consistency**:
T0:00 - User votes, ISR score retrieved from cache (cached 30 min ago)
T0:05 - User profile updated, triggers ISR recalculation
T0:10 - User's new ISR score calculated, cache updated
T0:15 - User checks vote weight, sees new ISR applied
(Few-minute delay, acceptable per requirement)

Consistency guarantee: All users will eventually see same ISR score
Delay window: < 5 minutes (typical)

text

**Expected Capability**: ✓ Can achieve eventual consistency within few minutes

---

## 8. Quality Attributes Summary Table

| Attribute | Target | Microservices Impact | Risk Level | Mitigation |
|-----------|--------|----------------------|-----------|-----------|
| **Availability** | MTTR < 5 min, 0% loss | Helps (isolation) | Medium | HA deployment, Kafka replication |
| **Performance** | 95% < 2 sec | Helps (async, caching) | Medium | Pre-calculated ISR, Redis cache |
| **Security** | 0 unauthorized | Mixed (more points) | High | Zero-trust, mTLS, audit logging |
| **Scalability** | 10x growth | Helps (independent scaling) | Medium-High | GPU ISR, job prioritization, graph indexing |
| **Consistency** | Few-min delay OK | Matches exactly | Low | Outbox pattern, reconciliation |

---

## 9. Recommended Microservices Separation

### Strongly Recommended Separations

✓ **Profile Service** (separate from core voting)
- Independent from voting logic
- Profile updates trigger cascading recalculations
- Own database (user data evolution)

✓ **Microcommunity Determination Service**
- Complex graph-based logic
- Triggered asynchronously on question creation
- Can take several seconds, shouldn't block voting

✓ **ISR Calculation Service** (separate, pre-calculated)
- Long-running computation (hours)
- Heavy LLM/RAG usage
- Scales independently via RabbitMQ workers

✓ **Community Values Matrix Service**
- Bridges microcommunity determination and ISR calculation
- Flexible data structure (MongoDB)
- Aggregates member values by belongingness

✓ **Social Graph Service**
- Foundational for microcommunity determination
- Graph-optimized queries (Neo4j)
- Geographic and social relationships

### Additional Recommended Separations

✓ **User Values Service** (separate from Profile Service)
- Different access patterns
- Aggregated into community matrix
- Value templates and compatibility scoring

✓ **Recommendation Engine Service**
- AI/ML for topic relevance prediction
- Independent scaling from AI Assistant chatbot
- Importance/urgency scoring (Feature 6)

✓ **Analytics & Reporting Service** (CQRS read model)
- Separate from transactional services
- Elasticsearch for aggregations
- Independent scaling for dashboard queries

✓ **Notification & Real-Time Service**
- WebSocket for real-time updates
- Separate from REST API services
- Real-time microcommunity changes

✓ **Sentiment Analysis Service**
- NLP processing for discussion messages
- Author reliability scoring
- Scales independently

✓ **Audit & Logging Service**
- Compliance and forensics
- Security event logging
- Doesn't impact main transaction flow

✓ **Context Analyzer Service**
- Extract question context features
- LLM-based analysis
- Support for context-based queries

✓ **Geographic & Spatial Service**
- Location-based microcommunity queries
- PostGIS or dedicated service
- Proximity analysis for community determination

---

## 10. Service Interaction Diagram (Summary)

┌─────────────────────────────────────────────────────────────┐
│ API Gateway │
│ (REST/GraphQL entry point) │
└─────────────┬───────────────────────────────────────────────┘
│
┌───────┴────────┬────────────┬──────────┬────────────┐
│ │ │ │ │
(REST) (REST) (REST) (REST) (REST)
│ │ │ │ │
┌───┴────┐ ┌─────┴──┐ ┌────┴───┐ ┌─┴────────┐ ┌┴─────────┐
│Identity │ │Profile │ │Discussion │Voting │ │AI Assist │
│Service │ │Service │ │ Service │Service │ │ Service │
└───┬────┘ └─┬──────┘ └──────┬───┘ └─┬──────┘ └┬─────────┘
│ │ │ │ │
│ ┌────┴─────────────────┼──────────┼──────────┼────┐
│ │ (Kafka Events) │ │ │ │
│ │ │ │ │ │
│ ┌───▼────────────────────┐ │ ┌───▼─────────┐│ │
│ │ Social Graph Service │ │ │Microcommunity
│ │ (Neo4j) │ │ │Determination
│ └───────────────────────┘ │ └───┬─────────┘ │
│ │ │ │
│ ┌─────────────────────┼──────────┼──────────┐ │
│ │ (Kafka Events) │ │ │ │
│ │ │ ▼ │ │
│ │ ┌─────────┴─────────────────┐ │ │
│ │ │ Community Values Matrix │ │ │
│ │ │ Service (MongoDB) │ │ │
│ │ └──────────┬────────────────┘ │ │
│ │ │ │ │
│ │ ┌──────────┴────────────┐ │ │
│ │ │ ISR Calculation Svc │ │ │
│ │ │ (RabbitMQ Workers) │ │ │
│ │ └──────────┬────────────┘ │ │
│ │ │ │ │
│ │ ┌──────────▼────────────┐ │ │
│ │ │ Redis Cache (ISR) │ │ │
│ │ └───────────────────────┘ │ │
│ │ │ │
│ └───────────────────────────────────────────┘ │
│ │
┌───┴──────────────────────────────────────────────────────┴─┐
│ PostgreSQL (Primary DB) │
│ Profile | Discussion | Voting | Task │
└────────────────────────────────────────────────────────────┘

text

---

## 11. Deployment Architecture

### Kubernetes Deployment
Namespace: isr-voting

Services:

Identity-Deployment (3 replicas)

Profile-Deployment (3 replicas)

Discussion-Deployment (3 replicas)

Voting-Deployment (5 replicas, high traffic)

ISR-Calculation-StatefulSet (10 replicas, horizontal scaling)

Microcommunity-Deployment (3 replicas)

Community-Values-Deployment (2 replicas)

All supporting services

Data:

PostgreSQL-StatefulSet (primary + replicas)

Neo4j-StatefulSet (cluster mode)

MongoDB-StatefulSet (replica set)

Redis-StatefulSet (cluster mode)

Elasticsearch-StatefulSet (cluster mode)

Messaging:

Kafka-StatefulSet (3 brokers, replication factor 3)

RabbitMQ-StatefulSet (3 nodes, HA mode)

Ingress:

Kong API Gateway

Service Discovery (Consul/Kubernetes DNS)

text

### Auto-Scaling Policies
Voting Service:
Min Replicas: 3
Max Replicas: 20
Trigger: CPU > 70% OR Memory > 80%

ISR Calculation Workers:
Min Replicas: 5
Max Replicas: 50
Trigger: RabbitMQ Queue depth > 1000 jobs

Discussion Service:
Min Replicas: 2
Max Replicas: 15
Trigger: WebSocket connections > 10,000

text

### Monitoring Stack
Prometheus (metrics)
├── Service response time (P50, P95, P99)
├── Error rates
├── Kafka lag
├── RabbitMQ queue depth
└── ISR calculation duration

Grafana (dashboards)
├── System health overview
├── Per-service performance
├── Microcommunity determination latency
└── ISR calculation progress

Jaeger (distributed tracing)
└── Request flow across services

ELK Stack (logging)
├── Application logs
├── Audit logs
├── Security events
└── System events

text

---

## 12. Implementation Roadmap

### Phase 1 (Months 1-2): Core Services
- Identity & Auth Service
- API Gateway
- Profile Service
- PostgreSQL shared database
- Service discovery setup

### Phase 2 (Months 2-3): Business Logic
- Discussion & Chat Service
- Voting Service
- Kafka cluster setup
- RabbitMQ setup

### Phase 3 (Months 3-4): Advanced Computation
- Social Graph Service (Neo4j)
- Microcommunity Determination Service
- ISR Calculation Service + Workers
- Community Values Matrix Service

### Phase 4 (Months 4-5): Supporting Services
- Analytics & Reporting Service
- Notification Service
- Sentiment Analysis
- AI Assistant integration

### Phase 5 (Months 5-6): Optimization & Scaling
- Performance tuning
- Security hardening
- Load testing (10K → 100K users)
- Runbook creation

---

## 13. Key Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **ISR Calculation Too Slow** | Vote results delayed | GPU acceleration, pre-computation, prioritization |
| **Network Partition** | Service isolation fails | Kafka persistence, circuit breakers, fallback modes |
| **Graph Query Performance** | Microcommunity determination bottleneck | Query indexing, caching, denormalization |
| **External Service Failures** | Auth blocking | Circuit breaker, cached tokens, fallback providers |
| **Data Consistency Issues** | Conflicting ISR scores | Eventual consistency model, reconciliation jobs |
| **Operational Complexity** | Difficulty debugging, deploying | Observability stack (Jaeger, Prometheus), automation |

---

## 14. Conclusion

The **event-driven microservices architecture** is well-suited for the ISR voting system because:

1. **Decoupling**: Services evolve independently
2. **Scalability**: Each service scales based on actual load
3. **Resilience**: Failure isolation prevents cascading failures
4. **Flexibility**: Technology choice per service (polyglot persistence)
5. **Eventual Consistency Model**: Matches requirement (few-minute delay acceptable)

**Critical Success Factors**:
- Pre-calculate ISR scores asynchronously (don't block voting)
- Implement robust monitoring and observability
- Use Kafka for event durability and ordering
- Design fallback modes for external service failures
- Plan for graph query optimization at scale

The architecture can meet all nonfunctional requirements with proper design and implementation of the patterns outlined in this document.