# Quick Guide: Updating Skills Section with Real Data

## For You to Fill In

Once que tengas los detalles específicos de tus proyectos, aquí está lo que necesitas actualizar:

### Location
`src/data/skillsData.tsx` - Edit the `useCasesData` array

### Fields to Update Per Use Case

```typescript
{
  id: "example-id",
  title: "Example Use Case",
  icon: SiSomeIcon,
  iconColor: "text-color-XXX",
  
  // These are ready - don't change
  problem: "...",
  solution: "...",
  techStack: [...],
  capabilities: [...],
  
  // These you should customize/fill in
  metrics: [
    {
      label: "Metric Name",
      value: "YOUR_NUMBER", // ← Update this
      description: "Brief explanation"
    }
  ],
  
  process: [
    // ← Optional: Add your specific process steps
    "Step 1",
    "Step 2",
  ],
  
  example: "Real example or case study snippet" // ← Optional but recommended
}
```

## What Each Field Means

| Field | Purpose | Example |
|-------|---------|---------|
| `id` | Unique identifier for the use case | `"zero-downtime-migrations"` |
| `title` | Display name | `"Zero-Downtime Database Migrations"` |
| `icon` | React icon component | `SiPostgresql` |
| `iconColor` | Tailwind color class | `"text-blue-500"` |
| `problem` | Business problem solved | `"Legacy systems with 32K+ users need migration..."` |
| `solution` | Your approach to solving it | `"Design multi-phase migration with checksums..."` |
| `techStack` | Technologies used (array) | `["PostgreSQL", "MySQL", "Docker", ...]` |
| `capabilities` | What you can do (array) | `["Design migration architectures", ...]` |
| `metrics` | Impact numbers (array of objects) | `[{ label: "Users Migrated", value: "32,000+", ... }]` |
| `process` | Step-by-step workflow (optional array) | `["Analyze source DB", "Design replication", ...]` |
| `example` | Real-world scenario (optional string) | `"Migrated customer database from MySQL 5.7 to 8.0..."` |

## Example: Filling in Payment Integration Use Case

### Before (Template)
```typescript
{
  id: "multi-gateway-payments",
  title: "Multi-Gateway Payment Integration",
  icon: SiGraphql,
  iconColor: "text-pink-500",
  problem: "Handle payments from multiple gateways...",
  solution: "Build flexible, intelligent payment orchestration layer...",
  techStack: ["Node.js", "Express", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
  capabilities: [
    "Integrate multiple payment processors",
    "Implement intelligent transaction routing",
    // ...
  ],
  metrics: [
    {
      label: "Typical Volume",
      value: "$2M+",
      description: "Daily transaction processing"
    },
    // ...
  ],
}
```

### After (With Your Real Data)
```typescript
{
  id: "multi-gateway-payments",
  title: "Multi-Gateway Payment Integration",
  icon: SiGraphql,
  iconColor: "text-pink-500",
  problem: "Handle payments from multiple gateways (PayValid, AvallPay) with different protocols and SLAs. Need to prevent payment failures and optimize costs.",
  solution: "Built intelligent payment orchestration layer that routes transactions based on success rates, regional availability, and fees. Implemented fallback mechanisms and real-time reconciliation.",
  techStack: ["Node.js", "Express", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
  capabilities: [
    "Integrate multiple payment processors (PayValid, AvallPay, Stripe fallback)",
    "Implement intelligent transaction routing based on success rates",
    "Build context-aware payment fallback systems",
    "Handle transaction reconciliation and auditing",
    "Create real-time payment monitoring dashboards",
    "Support complex payment scenarios ($25M+ edge cases)"
  ],
  metrics: [
    {
      label: "Typical Volume",
      value: "$2M+",
      description: "Daily transaction processing across all gateways"
    },
    {
      label: "Peak Capacity",
      value: "$25M",
      description: "Handled maximum edge case transactions without failures"
    },
    {
      label: "Success Rate",
      value: "99.7%+",
      description: "Through intelligent routing and automatic fallbacks"
    }
  ],
  process: [
    "Analyze transaction context (amount, region, currency)",
    "Select optimal gateway based on fee schedule and success rates",
    "Route transaction to primary gateway",
    "Monitor for failures in real-time",
    "Automatically route to fallback gateway if needed",
    "Reconcile transaction across all systems",
    "Generate compliance report"
  ],
  example: "For a $5,000 international transaction from Mexico: Route to PayValid at 1.5% fee (lower than AvallPay's 2%). If PayValid times out, automatically fallback to AvallPay. Customer sees instant confirmation; backend handles retry seamlessly."
}
```

## Metrics You Already Have (From CV)

### Zero-Downtime Database Migrations
- 32,000+ users migrated
- 0.004% error rate
- 0 seconds downtime

### Multi-Gateway Payment Integration
- $2M+ typical daily volume
- $25M edge case capacity
- (Success rate - calculate from your system)

### Performance Optimization
- 40-60% average improvement
- (Specific before/after metrics - add these)

### Scalable Architecture
- 100K+ concurrent users supported
- Led teams of 2-5+ people
- (Add deployment/scaling metrics)

### Real-Time Features
- <100ms latency achieved
- Sub-second broadcast speed
- (Add connection/throughput metrics)

### Automation Workflows
- 50+ production workflows built
- <0.1% error rate
- (Add time saved/automation impact)

## How to Find/Calculate Metrics

### If You Have Access to Production Systems:
```bash
# Database migrations - error rate
SELECT (failures / total_records) * 100 as error_rate
FROM migration_logs

# Performance - before/after comparison
# Load time improvement
(OLD_TIME - NEW_TIME) / OLD_TIME * 100 = % improvement

# Real-time latency
SELECT AVG(response_time_ms) FROM websocket_messages
```

### If Working with a Client:
1. Ask for baseline metrics (before optimization)
2. Calculate post-implementation metrics
3. Document the improvement
4. Get written approval/testimonial

### For Estimates:
- Database migrations: Record actual execution time + zero downtime achievement
- Payments: API response times, transaction success rates from logs
- Performance: Lighthouse scores before/after
- Architecture: Concurrent connection tests
- Automation: Hours saved per week (workflow execution time × frequency)

## Adding New Use Cases

### Step 1: Identify the Problem
Think about a major challenge you solved. What was the business impact?

### Step 2: Document Your Approach
What did you build? What technologies did you use?

### Step 3: Gather Metrics
What numbers prove the impact? (Users affected, performance gain, cost saved, time reduced)

### Step 4: Add to Array
```typescript
export const useCasesData: UseCase[] = [
  // ... existing use cases ...
  {
    id: "your-new-case-id",
    title: "Your Problem Title",
    icon: SiSomeIcon, // Import at top from react-icons/si
    iconColor: "text-color-XXX",
    problem: "...",
    solution: "...",
    techStack: [...],
    capabilities: [...],
    metrics: [...],
    // optional:
    process: [...],
    example: "..."
  }
]
```

### Step 5: Test Locally
```bash
npm run dev
# Visit http://localhost:3000 and scroll to Skills
# Click your new use case to expand and verify it displays correctly
```

## Icon Color Options (Tailwind)
From `react-icons/si`:

```
text-blue-500, text-blue-400
text-cyan-400, text-cyan-500
text-pink-500
text-orange-400, text-orange-500
text-indigo-400, text-indigo-500
text-gray-400
text-white
text-red-500, text-green-500, etc.
```

## Pro Tips

### Tip 1: Be Specific
Instead of: "Improved performance"
Use: "Optimized database queries, implemented Redis caching, reduced bundle size from 2.5MB to 890KB"

### Tip 2: Include Context
Instead of: "Led architecture implementation"
Use: "Led 4-person team through 3-month microservices migration from monolith to 6-service architecture"

### Tip 3: Use Before/After
Instead of: "Built payment system"
Use: "Built multi-gateway payment system - increased payment success rate from 96% to 99.7% and reduced transaction fees by 23%"

### Tip 4: Link to Results
Instead of: "Implemented WebSockets"
Use: "Implemented WebSocket-based real-time collaboration featuring <100ms message latency and support for 5,000+ concurrent connections"

## When You're Ready

1. Open `src/data/skillsData.tsx`
2. Find the `useCasesData` array
3. Update metrics, examples, and specific details
4. Run `npm run dev` to preview
5. Git commit: "Update skills section with real project metrics"

---

**Remember:** You can fill this in gradually as you gather real data. The structure is ready - just add your numbers and stories!
