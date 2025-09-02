import React, { useState, useEffect } from "react";
import "./leitner-app.css"; // Import the CSS file

// Embed questions directly in code
const questionsData = {
  "questions": [
    {
      "id": 1,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 2,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 3,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 4,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 5,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 6,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 7,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 8,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 9,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 10,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 11,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 12,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 13,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 14,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 15,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 16,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 17,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 18,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 19,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 20,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 21,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 22,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 23,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 24,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 25,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 26,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 27,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 28,
      "question": "Security groups in a VPC are: (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 29,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 30,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 31,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 32,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 33,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 34,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 35,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 36,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 37,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 38,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 39,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 40,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 41,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 42,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 43,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 44,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 45,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 46,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 47,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 48,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 49,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 50,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 51,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 52,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 53,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 54,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 55,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 56,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 57,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 58,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 59,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 60,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 61,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 62,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 63,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 64,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 65,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 66,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 67,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 68,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 69,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 70,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 71,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 72,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 73,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 74,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 75,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 76,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 77,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 78,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 79,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 80,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 81,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 82,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 83,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 84,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 85,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 86,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 87,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 88,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 89,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 90,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 91,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 92,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 93,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 94,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 95,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 96,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 97,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 98,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 99,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 100,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 101,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 102,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 103,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 104,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 105,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 106,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 107,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 108,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 109,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 110,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 111,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 112,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 113,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 114,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 115,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 116,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 117,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 118,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 119,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 120,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 121,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 122,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 123,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 124,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 125,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 126,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 127,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 128,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 129,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 130,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 131,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 132,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 133,
      "question": "Security groups in a VPC are: (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 134,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 135,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 136,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 137,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 138,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 139,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 140,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 141,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 142,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 143,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 144,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 145,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 146,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 147,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 148,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 149,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 150,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 151,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 152,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 153,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 154,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 155,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 156,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 157,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 158,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 159,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 160,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 161,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 162,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 163,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 164,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 165,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 166,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 167,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 168,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 169,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 170,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 171,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 172,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 173,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 174,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 175,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 176,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 177,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 178,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 179,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 180,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 181,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 182,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 183,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 184,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 185,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 186,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 187,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 188,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 189,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 190,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 191,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 192,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 193,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 194,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 195,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 196,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 197,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 198,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 199,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 200,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 201,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 202,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 203,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 204,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 205,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 206,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 207,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 208,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 209,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 210,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 211,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 212,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 213,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 214,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 215,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 216,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 217,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 218,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 219,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 220,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 221,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 222,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 223,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 224,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 225,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 226,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 227,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 228,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 229,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 230,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 231,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 232,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 233,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 234,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 235,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 236,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 237,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 238,
      "question": "Security groups in a VPC are: (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 239,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 240,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 241,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 242,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 243,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 244,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 245,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 246,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 247,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 248,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 249,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 250,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 251,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 252,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 253,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 254,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 255,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 256,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 257,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 258,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 259,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 260,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 261,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 262,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 263,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 264,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 265,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 266,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 267,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 268,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 269,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 270,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 271,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 272,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 273,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 274,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 275,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 276,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 277,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 278,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 279,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 280,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 281,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 282,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 283,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 284,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 285,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 286,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 287,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 288,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 289,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 290,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 291,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 292,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 293,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 294,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 295,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 296,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 297,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 298,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 299,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 300,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 301,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 302,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 303,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 304,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 305,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 306,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 307,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 308,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 309,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 310,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 311,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 312,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 313,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 314,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 315,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 316,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 317,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 318,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 319,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 320,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 321,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 322,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 323,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 324,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 325,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 326,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 327,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 328,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 329,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 330,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 331,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 332,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 333,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 334,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 335,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 336,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 337,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 338,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 339,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 340,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 341,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 342,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 343,
      "question": "Security groups in a VPC are: (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 344,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 345,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 346,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 347,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 348,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 349,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 350,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 351,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 352,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 353,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 354,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 355,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 356,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 357,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 358,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 359,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 360,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 361,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 362,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 363,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 364,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 365,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 366,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 367,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 368,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 369,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 370,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 371,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 372,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 373,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 374,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 375,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 376,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 377,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 378,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 379,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 380,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 381,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 382,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 383,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 384,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 385,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 386,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 387,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 388,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 389,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 390,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 391,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 392,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 393,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 394,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 395,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 396,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 397,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 398,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 399,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 400,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 401,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 402,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 403,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 404,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 405,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 406,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 407,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 408,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 409,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 410,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 411,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 412,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 413,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 414,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 415,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 416,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 417,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 418,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 419,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 420,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 421,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 422,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 423,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 424,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 425,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 426,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 427,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 428,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 429,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 430,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 431,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 432,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 433,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 434,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 435,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 436,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 437,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 438,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 439,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 440,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 441,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 442,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 443,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 444,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 445,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 446,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 447,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 448,
      "question": "Security groups in a VPC are: (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 449,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 450,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 451,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 452,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 453,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 454,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 455,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 456,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 457,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 458,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 459,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 460,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 461,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 462,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 463,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 464,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 465,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 466,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 467,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 468,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 469,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 470,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 471,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 472,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 473,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 474,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 475,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 476,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 477,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 478,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 479,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 480,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 481,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 482,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 483,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 484,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 485,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 486,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 487,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 488,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 489,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 490,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 491,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 492,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 493,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 494,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 495,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 496,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 497,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 498,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 499,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 500,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 501,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 502,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 503,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 504,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 505,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 506,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 507,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 508,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 509,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 510,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 511,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 512,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 513,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 514,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 515,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 516,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 517,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 518,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 519,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 520,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 521,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 522,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 523,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 524,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 525,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 526,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 527,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 528,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 529,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 530,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 531,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 532,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 533,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 534,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 535,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 536,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 537,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 538,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 539,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 540,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 541,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 542,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 543,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 544,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 545,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 546,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 547,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 548,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 549,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 550,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 551,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 552,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 553,
      "question": "Security groups in a VPC are: (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 554,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 555,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 556,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 557,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 558,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 559,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 560,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 561,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 562,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 563,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 564,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 565,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 566,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 567,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 568,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 569,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 570,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 571,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 572,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 573,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 574,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 575,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 576,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 577,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 578,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 579,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 580,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 581,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 582,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 583,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 584,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 585,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 586,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 587,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 588,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 589,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 590,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 591,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 592,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 593,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 594,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 595,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 596,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 597,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 598,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 599,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 600,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 601,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 602,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 603,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 604,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 605,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 606,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 607,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 608,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 609,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 610,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 611,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 612,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 613,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 614,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 615,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 616,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 617,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 618,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 619,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 620,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 621,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 622,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 623,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 624,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 625,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 626,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 627,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 628,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 629,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 630,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 631,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 632,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 633,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 634,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 635,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 636,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 637,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 638,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 639,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 640,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 641,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 642,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 643,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 644,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 645,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 646,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 647,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 648,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 649,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 650,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 651,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 652,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 653,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 654,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 655,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 656,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 657,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 658,
      "question": "Security groups in a VPC are: (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 659,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 660,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 661,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 662,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 663,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 664,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 665,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 666,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 667,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 668,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 669,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 670,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 671,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 672,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 673,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 674,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 675,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 676,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 677,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 678,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 679,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 680,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 681,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 682,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 683,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 684,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 685,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 686,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 687,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 688,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 689,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 690,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 691,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 692,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 693,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 694,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 695,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 696,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 697,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 698,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 699,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 700,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 701,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 702,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 703,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 704,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 705,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 706,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 707,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 708,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 709,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 710,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 711,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 712,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 713,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 714,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 715,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 716,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 717,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 718,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 719,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 720,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 721,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 722,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 723,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 724,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 725,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 726,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 727,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 728,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 729,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 730,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 731,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 732,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 733,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 734,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 735,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 736,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 737,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 738,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 739,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 740,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 741,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 742,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 743,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 744,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 745,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 746,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 747,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 748,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 749,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 750,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 751,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 752,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 753,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 754,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 755,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 756,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 757,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 758,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 759,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 760,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 761,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 762,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 763,
      "question": "Security groups in a VPC are: (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 764,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 765,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 766,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 767,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 768,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 769,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 770,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 771,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 772,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 773,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 774,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 775,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 776,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 777,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 778,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 779,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 780,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 781,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 782,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 783,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 784,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 785,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 786,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 787,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 788,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 789,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 790,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 791,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 792,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 793,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 794,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 795,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 796,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 797,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 798,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 799,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 800,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 801,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 802,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 803,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 804,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 805,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 806,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 807,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 808,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 809,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 810,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 811,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 812,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 813,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 814,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 815,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 816,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 817,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 818,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 819,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 820,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 821,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 822,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 823,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 824,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 825,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 826,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 827,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 828,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 829,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 830,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 831,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 832,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 833,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 834,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 835,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 836,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 837,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 838,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 839,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 840,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 841,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 842,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 843,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 844,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 845,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 846,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 847,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 848,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 849,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 850,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 851,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 852,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 853,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 854,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 855,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 856,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 857,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 858,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 859,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 860,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 861,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 862,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 863,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 864,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 865,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 866,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 867,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 868,
      "question": "Security groups in a VPC are: (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 869,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 870,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 871,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 872,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 873,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 874,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 875,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 876,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 877,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 878,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 879,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 880,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 881,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 882,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 883,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 884,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 885,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 886,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 887,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 888,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 889,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 890,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 891,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 892,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 893,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 894,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 895,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    },
    {
      "id": 896,
      "question": "Which IAM policy type attaches directly to an AWS resource like an S3 bucket or KMS key? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Inline user policy",
        "B": "Managed policy",
        "C": "Resource-based policy",
        "D": "Permission boundary"
      },
      "answer": "C",
      "explanation": "Resource-based policies are attached to resources and control who can access them."
    },
    {
      "id": 897,
      "question": "A company wants to analyze S3 data using standard SQL without managing servers. Which service? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon EMR",
        "D": "AWS Glue Data Catalog only"
      },
      "answer": "A",
      "explanation": "Athena is serverless and queries data in S3 using SQL; integrates with Glue Data Catalog."
    },
    {
      "id": 898,
      "question": "Which VPC component enables outbound internet access for instances in private subnets? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "VPC Peering",
        "D": "Transit Gateway"
      },
      "answer": "B",
      "explanation": "NAT Gateway allows instances in private subnets to initiate outbound internet connections."
    },
    {
      "id": 899,
      "question": "Which AWS service continuously monitors for malicious activity and anomalous behavior using threat intelligence? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon GuardDuty",
        "B": "AWS Config",
        "C": "AWS CloudTrail",
        "D": "AWS Artifact"
      },
      "answer": "A",
      "explanation": "GuardDuty is a threat detection service analyzing logs for suspicious activity."
    },
    {
      "id": 900,
      "question": "To ensure only trusted AMIs are used across accounts, which service can enforce rules centrally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Organizations Tag Policies",
        "B": "AWS Config with conformance packs",
        "C": "AWS Control Tower",
        "D": "AWS Service Catalog"
      },
      "answer": "D",
      "explanation": "Service Catalog lets you create and govern approved products like AMIs and stacks."
    },
    {
      "id": 901,
      "question": "Which database is purpose-built for time series data at scale with built-in storage tiering? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon RDS for MySQL",
        "B": "Amazon Timestream",
        "C": "Amazon Redshift",
        "D": "Amazon DynamoDB"
      },
      "answer": "B",
      "explanation": "Timestream is a time series database optimized for IoT and operational applications."
    },
    {
      "id": 902,
      "question": "Which service provides a fully managed Apache Kafka-compatible streaming platform? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon MSK",
        "B": "Amazon Kinesis Data Streams",
        "C": "AWS Batch",
        "D": "AWS DataSync"
      },
      "answer": "A",
      "explanation": "Amazon MSK is a managed Kafka service."
    },
    {
      "id": 903,
      "question": "Which option provides centralized key management with hardware security modules for encryption keys? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Secrets Manager",
        "B": "AWS KMS",
        "C": "Amazon CloudHSM",
        "D": "IAM Access Advisor"
      },
      "answer": "B",
      "explanation": "KMS manages encryption keys and integrates with many AWS services."
    },
    {
      "id": 904,
      "question": "To migrate on-premises NFS datasets to EFS efficiently, which service should be used? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS DMS",
        "B": "AWS DataSync",
        "C": "AWS Snowball Edge",
        "D": "AWS Storage Gateway (File)"
      },
      "answer": "B",
      "explanation": "DataSync accelerates and simplifies online transfers to AWS storage services like EFS."
    },
    {
      "id": 905,
      "question": "Which service provides an S3-compatible file interface cached on-premises for low-latency access to cloud data? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Storage Gateway (File Gateway)",
        "C": "AWS Snowcone",
        "D": "Amazon EFS One Zone"
      },
      "answer": "B",
      "explanation": "File Gateway presents an NFS/SMB interface with cached data while storing objects in S3."
    },
    {
      "id": 906,
      "question": "You need to ensure Lambda functions can access database credentials securely at runtime. What is the BEST option? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Store in Lambda environment variables in plaintext",
        "B": "Store in S3 unencrypted",
        "C": "Use AWS Secrets Manager and retrieve at runtime",
        "D": "Embed credentials in code"
      },
      "answer": "C",
      "explanation": "Secrets Manager integrates with Lambda and supports rotation and secure retrieval."
    },
    {
      "id": 907,
      "question": "Which service provides near-zero downtime, heterogeneous database migrations to AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Glue",
        "B": "AWS Database Migration Service (DMS)",
        "C": "AWS DataSync",
        "D": "AWS Snowball"
      },
      "answer": "B",
      "explanation": "DMS supports continuous data replication with minimal downtime."
    },
    {
      "id": 908,
      "question": "Which ELB type supports host- and path-based routing for HTTP/HTTPS traffic? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "B",
      "explanation": "ALB is a Layer 7 load balancer supporting advanced HTTP routing features."
    },
    {
      "id": 909,
      "question": "Which service can analyze and group security findings to help with investigations? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Detective",
        "B": "AWS Security Hub",
        "C": "Amazon GuardDuty",
        "D": "AWS Firewall Manager"
      },
      "answer": "A",
      "explanation": "Detective helps analyze relationships and context around security findings."
    },
    {
      "id": 910,
      "question": "Which S3 storage class is designed for long-term archival with retrieval times of minutes? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "S3 Glacier Instant Retrieval",
        "B": "S3 Glacier Flexible Retrieval",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard-IA"
      },
      "answer": "B",
      "explanation": "Glacier Flexible Retrieval (formerly Glacier) provides minutes-to-hours retrieval, cheaper than Instant."
    },
    {
      "id": 911,
      "question": "Which AWS service helps create, manage, and deploy application secrets and APIs for user sign-up and sign-in? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS IAM",
        "B": "Amazon Cognito",
        "C": "AWS IAM Identity Center",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "Cognito provides user pools and identity pools for authentication and authorization in apps."
    },
    {
      "id": 912,
      "question": "Which option is BEST to run a scheduled nightly ETL job that scales with data volume and uses serverless Spark? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Glue",
        "B": "Amazon EMR on EC2",
        "C": "AWS Batch",
        "D": "AWS Lambda with 15-minute timeouts"
      },
      "answer": "A",
      "explanation": "Glue provides serverless ETL with Apache Spark and job scheduling."
    },
    {
      "id": 913,
      "question": "For VPC-to-VPC connectivity across hundreds of accounts and VPCs at scale, which service simplifies connectivity? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS Transit Gateway",
        "C": "PrivateLink (Interface Endpoints)",
        "D": "Direct Connect Gateway"
      },
      "answer": "B",
      "explanation": "Transit Gateway acts as a hub for scalable VPC and on-prem connectivity."
    },
    {
      "id": 914,
      "question": "Which EC2 purchase option provides the deepest discounts for fault-tolerant, flexible workloads with interruptions? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "On-Demand",
        "B": "Reserved Instances",
        "C": "Savings Plans",
        "D": "Spot Instances"
      },
      "answer": "D",
      "explanation": "Spot Instances offer up to 90% discounts but can be interrupted with short notice."
    },
    {
      "id": 915,
      "question": "Which AWS service helps detect unintended data exposure in S3 buckets and suggests remediation? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "Amazon Macie",
        "C": "AWS Security Hub",
        "D": "AWS Config Rules only"
      },
      "answer": "B",
      "explanation": "Macie identifies sensitive data and can flag risky bucket policies or ACLs."
    },
    {
      "id": 916,
      "question": "Which option provides per-application distributed tracing for microservices to identify performance bottlenecks? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS X-Ray",
        "B": "Amazon CloudWatch Logs Insights",
        "C": "AWS Distro for OpenTelemetry only",
        "D": "Amazon OpenSearch Dashboards"
      },
      "answer": "A",
      "explanation": "X-Ray provides end-to-end tracing to visualize service maps and latency."
    },
    {
      "id": 917,
      "question": "What is the MOST cost-effective S3 class for single-AZ, infrequently accessed data that can be recreated? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 One Zone-IA",
        "B": "S3 Standard-IA",
        "C": "S3 Glacier Deep Archive",
        "D": "S3 Standard"
      },
      "answer": "A",
      "explanation": "One Zone-IA stores data in a single AZ at lower cost for re-creatable infrequent data."
    },
    {
      "id": 918,
      "question": "Which service helps manage blue/green deployments for Lambda with traffic shifting and health checks? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS CodeDeploy",
        "B": "Amazon API Gateway",
        "C": "AWS CodePipeline",
        "D": "AWS SAM CLI"
      },
      "answer": "A",
      "explanation": "CodeDeploy supports traffic shifting deployments for Lambda with alarms and rollbacks."
    },
    {
      "id": 919,
      "question": "Which feature allows EC2 Auto Scaling to scale based on an application-specific metric (e.g., queue length)? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Target tracking on CPU",
        "B": "Step scaling on CPU",
        "C": "Scaling with custom CloudWatch metrics",
        "D": "Scheduled scaling only"
      },
      "answer": "C",
      "explanation": "You can publish custom CloudWatch metrics and use them in scaling policies."
    },
    {
      "id": 920,
      "question": "Which AWS service provides managed, scalable NFS file storage integrated with high-performance compute workloads? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Lustre",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for NetApp ONTAP"
      },
      "answer": "A",
      "explanation": "FSx for Lustre is optimized for high-performance computing file workloads."
    },
    {
      "id": 921,
      "question": "Which IAM feature restricts the maximum permissions a user or role can receive, regardless of other policies? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Permissions boundary",
        "B": "Inline policies",
        "C": "SCPs",
        "D": "Session policies"
      },
      "answer": "A",
      "explanation": "Permissions boundaries set the upper limit of effective permissions for a principal."
    },
    {
      "id": 922,
      "question": "Which S3 feature helps ensure that PUT operations result in strong read-after-write consistency? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Multi-part upload",
        "B": "Versioning",
        "C": "S3 provides strong read-after-write consistency by default",
        "D": "Transfer Acceleration"
      },
      "answer": "C",
      "explanation": "S3 now provides strong read-after-write consistency for PUTs and DELETEs for all storage classes."
    },
    {
      "id": 923,
      "question": "Which RDS feature helps scale read-heavy workloads without affecting write throughput? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Multi-AZ",
        "B": "Read Replicas",
        "C": "Storage autoscaling",
        "D": "Performance Insights"
      },
      "answer": "B",
      "explanation": "Read replicas offload read traffic from the primary instance."
    },
    {
      "id": 924,
      "question": "Which service orchestrates CI/CD pipelines integrating source, build, and deploy stages? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS CodePipeline",
        "B": "AWS CodeCommit",
        "C": "AWS CodeBuild",
        "D": "AWS CodeDeploy"
      },
      "answer": "A",
      "explanation": "CodePipeline automates software release workflows across services."
    },
    {
      "id": 925,
      "question": "Which VPC feature provides network-level ACLs that are stateless and evaluated in order? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Security Groups",
        "B": "Network ACLs",
        "C": "Route Tables",
        "D": "VPC Endpoints"
      },
      "answer": "B",
      "explanation": "NACLs are stateless and have ordered rules applied at the subnet level."
    },
    {
      "id": 926,
      "question": "Which AWS service helps manage SSL/TLS certificates and automatic renewals for use with ELB and CloudFront? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "AWS Certificate Manager (ACM)",
        "B": "AWS KMS",
        "C": "AWS Secrets Manager",
        "D": "Amazon Cognito"
      },
      "answer": "A",
      "explanation": "ACM provisions and renews public TLS certificates used by integrated services."
    },
    {
      "id": 927,
      "question": "Which service can centrally apply WAF rules across multiple accounts and resources? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Firewall Manager",
        "B": "AWS Shield Advanced",
        "C": "AWS Organizations",
        "D": "Amazon GuardDuty"
      },
      "answer": "A",
      "explanation": "Firewall Manager manages WAF rules and security policies across accounts."
    },
    {
      "id": 928,
      "question": "Which storage service is POSIX-compliant and ideal for lift-and-shift Linux applications needing shared access? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon S3",
        "B": "Amazon EFS",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "EFS is a POSIX-compliant, elastic file system for Linux workloads."
    },
    {
      "id": 929,
      "question": "Which service provides automated backups and point-in-time restore for DynamoDB tables? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DynamoDB TTL",
        "C": "DynamoDB PITR",
        "D": "DynamoDB Accelerator (DAX)"
      },
      "answer": "C",
      "explanation": "Point-in-time recovery (PITR) enables restoring to any second within the last 35 days."
    },
    {
      "id": 930,
      "question": "Which service should you use to run containerized batch jobs with queues, dependencies, and retries? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Batch",
        "B": "AWS Step Functions",
        "C": "Amazon ECS only",
        "D": "Amazon EMR"
      },
      "answer": "A",
      "explanation": "AWS Batch orchestrates batch computing jobs on ECS/EKS with managed scheduling."
    },
    {
      "id": 931,
      "question": "Which option enables secure access to private ALBs across VPCs without opening the network? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "VPC Peering",
        "B": "AWS PrivateLink (Interface Endpoints)",
        "C": "Transit Gateway",
        "D": "NAT Gateway"
      },
      "answer": "B",
      "explanation": "PrivateLink exposes services via interface endpoints without IP-based connectivity."
    },
    {
      "id": 932,
      "question": "Which Redshift feature dramatically reduces time to load and analyze data in S3 using external tables? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Redshift Spectrum",
        "B": "Concurrency Scaling",
        "C": "AQUA",
        "D": "Distribution Keys"
      },
      "answer": "A",
      "explanation": "Redshift Spectrum queries data directly in S3 via external tables."
    },
    {
      "id": 933,
      "question": "Which feature reduces cold start impacts for latency-sensitive Lambda functions? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Reserved Concurrency",
        "B": "Provisioned Concurrency",
        "C": "Async Invocation",
        "D": "Lambda@Edge"
      },
      "answer": "B",
      "explanation": "Provisioned Concurrency keeps functions initialized for consistent start times."
    },
    {
      "id": 934,
      "question": "Which Route 53 feature supports routing to on-prem resources via health checks and failover to AWS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "Geoproximity routing",
        "B": "Failover routing",
        "C": "Weighted routing",
        "D": "Multivalue answer routing"
      },
      "answer": "B",
      "explanation": "Failover routing switches between primary and secondary endpoints based on health checks."
    },
    {
      "id": 935,
      "question": "Which service accelerates the migration of large datasets when network is limited or unavailable? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS DataSync",
        "B": "AWS Snowball Edge",
        "C": "AWS DMS",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "Snowball Edge provides rugged devices for offline data transfer to AWS."
    },
    {
      "id": 936,
      "question": "Which option enables fine-grained access to S3 objects using user identity and bucket policies without distributing credentials? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Pre-signed URLs only",
        "B": "CloudFront signed cookies only",
        "C": "AssumeRole with STS and temporary credentials",
        "D": "Hard-coded access keys in app"
      },
      "answer": "C",
      "explanation": "STS provides temporary credentials via IAM roles for least-privilege access."
    },
    {
      "id": 937,
      "question": "Which service helps define and manage data lake permissions at column/table level on AWS? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS Lake Formation",
        "B": "AWS Glue DataBrew",
        "C": "Amazon EMR",
        "D": "Amazon QuickSight"
      },
      "answer": "A",
      "explanation": "Lake Formation centralizes security and governance for data lakes using the Glue Data Catalog."
    },
    {
      "id": 938,
      "question": "Which feature of DynamoDB improves read performance with microsecond latency via in-memory caching? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "DynamoDB Streams",
        "B": "DAX (DynamoDB Accelerator)",
        "C": "Global Tables",
        "D": "TTL"
      },
      "answer": "B",
      "explanation": "DAX is a managed caching layer for DynamoDB to reduce response times."
    },
    {
      "id": 939,
      "question": "Which service provides centralized single sign-on to AWS accounts and business applications? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS IAM",
        "B": "AWS IAM Identity Center",
        "C": "Amazon Cognito",
        "D": "AWS Directory Service"
      },
      "answer": "B",
      "explanation": "IAM Identity Center (successor to AWS SSO) enables SSO to AWS accounts and apps."
    },
    {
      "id": 940,
      "question": "Which feature ensures EBS data is protected against AZ failure for a stateful workload? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Create a larger EBS volume",
        "B": "EBS Multi-Attach",
        "C": "Regular EBS snapshots to S3 and restore in another AZ",
        "D": "EBS encryption with KMS"
      },
      "answer": "C",
      "explanation": "Snapshots are stored in S3, enabling restore to volumes in other AZs for resilience."
    },
    {
      "id": 941,
      "question": "Which serverless option provides an HTTPS endpoint to invoke Lambda functions with request transformations and auth? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS App Runner",
        "B": "Amazon API Gateway",
        "C": "AWS Global Accelerator",
        "D": "Elastic Beanstalk"
      },
      "answer": "B",
      "explanation": "API Gateway integrates with Lambda and provides features like auth, throttling, and mapping templates."
    },
    {
      "id": 942,
      "question": "Which option is BEST for long-lived, bidirectional, low-latency communication between clients and a serverless backend? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "API Gateway REST API",
        "B": "API Gateway WebSocket API",
        "C": "Application Load Balancer",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "WebSocket APIs enable stateful, bidirectional communication suitable for chat and real-time apps."
    },
    {
      "id": 943,
      "question": "Which feature provides VPC-level control to route traffic through third-party virtual appliances? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Gateway Load Balancer",
        "B": "NAT Gateway",
        "C": "Transit Gateway",
        "D": "Interface Endpoints"
      },
      "answer": "A",
      "explanation": "GWLB makes it easy to deploy, scale, and manage third-party network appliances."
    },
    {
      "id": 944,
      "question": "Which service allows querying operational logs using SQL and visualization without managing infrastructure? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "CloudWatch Logs Insights",
        "B": "AWS X-Ray",
        "C": "Amazon QuickSight",
        "D": "AWS Glue Studio"
      },
      "answer": "A",
      "explanation": "Logs Insights lets you interactively query and visualize CloudWatch Logs data."
    },
    {
      "id": 945,
      "question": "Which Route 53 option returns multiple healthy records to improve availability and distribute load (without health-based routing logic)? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Multivalue answer routing",
        "B": "Weighted routing",
        "C": "Latency-based routing",
        "D": "Geoproximity routing"
      },
      "answer": "A",
      "explanation": "Multivalue returns multiple records and performs simple health checks."
    },
    {
      "id": 946,
      "question": "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Auto Scaling",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "C",
      "explanation": "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers."
    },
    {
      "id": 947,
      "question": "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EFS",
        "B": "Amazon S3",
        "C": "Amazon EBS",
        "D": "Amazon FSx for Windows File Server"
      },
      "answer": "B",
      "explanation": "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images."
    },
    {
      "id": 948,
      "question": "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Read Replicas",
        "B": "Multi-AZ",
        "C": "Storage Auto Scaling",
        "D": "Minor Version Upgrade"
      },
      "answer": "B",
      "explanation": "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover."
    },
    {
      "id": 949,
      "question": "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon Aurora",
        "B": "Amazon DynamoDB",
        "C": "Amazon Neptune",
        "D": "Amazon DocumentDB"
      },
      "answer": "B",
      "explanation": "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance."
    },
    {
      "id": 950,
      "question": "Which service reduces latency by caching content at edge locations globally? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "A",
      "explanation": "CloudFront is a CDN that caches content at edge locations to reduce latency."
    },
    {
      "id": 951,
      "question": "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Amazon SNS",
        "B": "Amazon SQS",
        "C": "Amazon MQ",
        "D": "AWS Step Functions"
      },
      "answer": "B",
      "explanation": "Amazon SQS is a fully managed message queuing service for decoupling applications."
    },
    {
      "id": 952,
      "question": "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon EC2",
        "B": "Amazon ECS on EC2",
        "C": "AWS Fargate",
        "D": "Amazon EKS managed node groups"
      },
      "answer": "C",
      "explanation": "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters."
    },
    {
      "id": 953,
      "question": "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS Organizations",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "AWS Transit Gateway"
      },
      "answer": "B",
      "explanation": "Amazon VPC provides isolation and control over networking for AWS resources."
    },
    {
      "id": 954,
      "question": "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Lambda",
        "B": "Amazon EC2 Auto Scaling",
        "C": "AWS Batch",
        "D": "AWS Step Functions"
      },
      "answer": "A",
      "explanation": "Lambda runs code without provisioning servers and scales automatically per event volume."
    },
    {
      "id": 955,
      "question": "You need a managed, petabyte-scale data warehouse for complex analytics using SQL. What should you choose? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Athena",
        "B": "Amazon Redshift",
        "C": "Amazon RDS for PostgreSQL",
        "D": "Amazon EMR"
      },
      "answer": "B",
      "explanation": "Redshift is a managed data warehouse optimized for analytical queries at scale."
    },
    {
      "id": 956,
      "question": "A workload requires a highly available DNS service with health checks and routing policies. Which service is appropriate? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon Route 53",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon CloudFront"
      },
      "answer": "A",
      "explanation": "Route 53 is a highly available and scalable DNS service with advanced routing and health checks."
    },
    {
      "id": 957,
      "question": "Which storage class is MOST cost-effective for data accessed once per quarter with milliseconds retrieval? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "S3 Standard",
        "B": "S3 Standard-IA",
        "C": "S3 One Zone-IA",
        "D": "S3 Glacier Instant Retrieval"
      },
      "answer": "B",
      "explanation": "S3 Standard-IA is designed for infrequently accessed data with millisecond access when needed."
    },
    {
      "id": 958,
      "question": "A company needs shared file storage for Linux EC2 instances across multiple AZs. Which service fits? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon EBS",
        "B": "Amazon EFS",
        "C": "Amazon FSx for Lustre",
        "D": "Amazon S3"
      },
      "answer": "B",
      "explanation": "EFS is a managed NFS file system for Linux, accessible from multiple AZs."
    },
    {
      "id": 959,
      "question": "Which feature of S3 enables automatic transition of objects to cheaper storage classes over time? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "S3 Event Notifications",
        "B": "S3 Lifecycle policies",
        "C": "S3 Versioning",
        "D": "S3 Replication Time Control"
      },
      "answer": "B",
      "explanation": "Lifecycle policies move objects through storage classes based on rules and object age."
    },
    {
      "id": 960,
      "question": "You need to encrypt data at rest in S3 with server-side encryption using AWS-managed keys. Which option? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "SSE-C",
        "B": "SSE-S3",
        "C": "SSE-KMS",
        "D": "Client-side encryption"
      },
      "answer": "B",
      "explanation": "SSE-S3 uses S3-managed keys for server-side encryption."
    },
    {
      "id": 961,
      "question": "Which AWS service provides secrets rotation and fine-grained access control for credentials? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS KMS",
        "B": "AWS Secrets Manager",
        "C": "AWS Systems Manager Parameter Store (Standard)",
        "D": "Amazon Cognito"
      },
      "answer": "B",
      "explanation": "Secrets Manager stores and rotates secrets with granular IAM policies."
    },
    {
      "id": 962,
      "question": "Which service aggregates and visualizes operational metrics and logs with alarms? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon CloudWatch",
        "C": "AWS Config",
        "D": "AWS X-Ray"
      },
      "answer": "B",
      "explanation": "CloudWatch collects metrics, logs, and creates alarms and dashboards."
    },
    {
      "id": 963,
      "question": "Which service records account activity and API calls for governance and auditing? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "Amazon Inspector",
        "C": "Amazon GuardDuty",
        "D": "AWS Security Hub"
      },
      "answer": "A",
      "explanation": "CloudTrail records API events for auditing and compliance."
    },
    {
      "id": 964,
      "question": "To connect an on-premises data center to AWS with consistent low latency and private connectivity, what should you use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS VPN over the Internet",
        "B": "AWS Direct Connect",
        "C": "VPC Peering",
        "D": "Transit Gateway Peering"
      },
      "answer": "B",
      "explanation": "Direct Connect provides dedicated network links for consistent performance and private connectivity."
    },
    {
      "id": 965,
      "question": "Which option allows cross-account control over AWS services through policies applied to accounts and OUs? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "IAM Resource Policies",
        "B": "SCPs in AWS Organizations",
        "C": "Session Policies",
        "D": "STS AssumeRole"
      },
      "answer": "B",
      "explanation": "Service Control Policies (SCPs) set guardrails across accounts within AWS Organizations."
    },
    {
      "id": 966,
      "question": "You need idempotent, ordered message processing with exactly-once per group semantics. Which queue type? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "SQS Standard",
        "B": "SQS FIFO",
        "C": "SNS Topic",
        "D": "Amazon MQ Classic"
      },
      "answer": "B",
      "explanation": "SQS FIFO provides exactly-once processing and message ordering per message group ID."
    },
    {
      "id": 967,
      "question": "Which service should you choose to manage and deploy infrastructure as code using declarative templates? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CloudFormation",
        "B": "AWS CodeDeploy",
        "C": "AWS CodePipeline",
        "D": "AWS Elastic Beanstalk"
      },
      "answer": "A",
      "explanation": "CloudFormation provisions AWS resources using templates in a declarative manner."
    },
    {
      "id": 968,
      "question": "A company wants a managed Redis cache to offload read-heavy workloads. Which service? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon ElastiCache",
        "B": "Amazon Neptune",
        "C": "Amazon RDS MySQL",
        "D": "Amazon OpenSearch Service"
      },
      "answer": "A",
      "explanation": "ElastiCache supports Redis and Memcached for in-memory caching."
    },
    {
      "id": 969,
      "question": "Which routing policy in Route 53 directs traffic based on latency to the user? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Weighted",
        "B": "Latency-based",
        "C": "Failover",
        "D": "Geolocation"
      },
      "answer": "B",
      "explanation": "Latency-based routing routes users to the region with the lowest latency."
    },
    {
      "id": 970,
      "question": "Which service accelerates traffic to your application via the AWS global network using anycast IPs, not caching content? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon CloudFront",
        "B": "AWS Global Accelerator",
        "C": "Elastic Load Balancing",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "explanation": "Global Accelerator improves availability and performance with static anycast IPs over AWS's backbone."
    },
    {
      "id": 971,
      "question": "For a relational database requiring high availability and read scaling, which Amazon Aurora feature helps the MOST? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "Aurora Global Database",
        "B": "Aurora Serverless v2",
        "C": "Aurora Replicas",
        "D": "Backtrack"
      },
      "answer": "C",
      "explanation": "Aurora Replicas provide read scaling and can promote for high availability."
    },
    {
      "id": 972,
      "question": "Which option enables private connectivity to S3 from a VPC without traversing the internet? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "NAT Gateway",
        "B": "VPC Interface Endpoint to S3",
        "C": "VPC Gateway Endpoint to S3",
        "D": "Transit Gateway"
      },
      "answer": "C",
      "explanation": "S3 uses Gateway Endpoints for private connectivity; interface endpoints are not used for S3."
    },
    {
      "id": 973,
      "question": "Security groups in a VPC are: (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Stateless and applied at subnet level",
        "B": "Stateful and applied at ENI/instance level",
        "C": "Stateless and applied at ENI level",
        "D": "Stateful and applied at subnet level"
      },
      "answer": "B",
      "explanation": "Security groups are stateful and attached to ENIs/instances; NACLs are stateless at subnet level."
    },
    {
      "id": 974,
      "question": "Which EBS volume type is best for most general purpose workloads at low cost with baseline and burst IOPS? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "io1",
        "B": "gp3",
        "C": "sc1",
        "D": "st1"
      },
      "answer": "B",
      "explanation": "gp3 offers predictable baseline performance with the ability to provision IOPS and throughput."
    },
    {
      "id": 975,
      "question": "To process streaming data with sub-second latency and windowed analytics using SQL, which service is BEST? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Kinesis Data Streams",
        "B": "Amazon Kinesis Data Firehose",
        "C": "Amazon Kinesis Data Analytics",
        "D": "AWS Glue"
      },
      "answer": "C",
      "explanation": "Kinesis Data Analytics lets you run SQL on streaming data for near-real-time analytics."
    },
    {
      "id": 976,
      "question": "Which AWS service helps define state machines to coordinate microservices and Lambda functions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "Amazon SQS",
        "B": "AWS Step Functions",
        "C": "Amazon EventBridge",
        "D": "AWS Batch"
      },
      "answer": "B",
      "explanation": "Step Functions orchestrates workflows using state machines with retries and error handling."
    },
    {
      "id": 977,
      "question": "You want to trigger workflows on a schedule and in response to SaaS events. Which service should you use? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Amazon EventBridge",
        "B": "Amazon SNS",
        "C": "AWS Step Functions",
        "D": "AWS Config"
      },
      "answer": "A",
      "explanation": "EventBridge routes events from AWS services, custom apps, and SaaS partners; supports scheduled rules."
    },
    {
      "id": 978,
      "question": "Which option enables centralized security findings across accounts from services like GuardDuty and Inspector? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "AWS Security Hub",
        "B": "AWS Firewall Manager",
        "C": "Amazon Detective",
        "D": "AWS Shield Advanced"
      },
      "answer": "A",
      "explanation": "Security Hub aggregates findings and provides a consolidated security view."
    },
    {
      "id": 979,
      "question": "To protect web applications from common exploits like SQL injection and XSS, which managed service should be used? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS WAF",
        "C": "Amazon GuardDuty",
        "D": "Amazon Inspector"
      },
      "answer": "B",
      "explanation": "AWS WAF is a web application firewall for filtering and monitoring HTTP requests."
    },
    {
      "id": 980,
      "question": "Which service provides DDoS protection with advanced features such as cost protection and 24/7 response team? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "AWS Shield Standard",
        "B": "AWS Shield Advanced",
        "C": "AWS WAF",
        "D": "Amazon CloudFront"
      },
      "answer": "B",
      "explanation": "Shield Advanced adds enhanced DDoS protections and response services beyond the standard offering."
    },
    {
      "id": 981,
      "question": "A company wants to track configuration changes to AWS resources and evaluate them against rules. What should they use? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "AWS CloudTrail",
        "B": "AWS Config",
        "C": "Amazon CloudWatch Logs",
        "D": "AWS Trusted Advisor"
      },
      "answer": "B",
      "explanation": "AWS Config records configuration changes and evaluates resources against compliance rules."
    },
    {
      "id": 982,
      "question": "Which database option delivers compatibility with PostgreSQL/MySQL and separates compute from storage with 6-way replication? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "Amazon RDS",
        "B": "Amazon Aurora",
        "C": "Amazon DynamoDB",
        "D": "Amazon Redshift"
      },
      "answer": "B",
      "explanation": "Aurora is compatible with MySQL/PostgreSQL and stores data across three AZs with six copies."
    },
    {
      "id": 983,
      "question": "Which feature allows S3 to replicate objects automatically to another AWS Region for disaster recovery? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "S3 Batch Operations",
        "B": "S3 Cross-Region Replication",
        "C": "S3 Select",
        "D": "S3 Transfer Acceleration"
      },
      "answer": "B",
      "explanation": "CRR replicates objects to a different Region asynchronously based on rules."
    },
    {
      "id": 984,
      "question": "A team needs to securely run commands on EC2 instances without opening inbound SSH. What should they use? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "AWS Systems Manager Session Manager",
        "B": "Bastion Host with SSH",
        "C": "Amazon Inspector",
        "D": "AWS KMS"
      },
      "answer": "A",
      "explanation": "Session Manager provides secure, auditable shell access without inbound ports."
    },
    {
      "id": 985,
      "question": "Which service provides centralized governance to set up and govern a secure multi-account AWS environment? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "AWS Control Tower",
        "B": "AWS Organizations",
        "C": "AWS IAM Identity Center",
        "D": "AWS Config Conformance Packs"
      },
      "answer": "A",
      "explanation": "Control Tower builds and governs a multi-account landing zone with best practices."
    },
    {
      "id": 986,
      "question": "Which S3 feature prevents deletion of objects for a fixed retention period for compliance? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Object Lock (Compliance mode)",
        "B": "S3 Versioning",
        "C": "S3 Lifecycle",
        "D": "S3 Access Points"
      },
      "answer": "A",
      "explanation": "Object Lock in Compliance mode enforces WORM retention and legal holds."
    },
    {
      "id": 987,
      "question": "You require blue/green deployments for ECS services with traffic shifting and automatic rollback. Which service helps? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "AWS CodeBuild",
        "B": "AWS CodeDeploy",
        "C": "AWS CodeCommit",
        "D": "AWS CodeArtifact"
      },
      "answer": "B",
      "explanation": "CodeDeploy supports blue/green deployments with ALB/NLB traffic shifting for ECS and Lambda."
    },
    {
      "id": 988,
      "question": "Which Amazon EKS feature offloads pod execution to serverless compute? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Managed node groups",
        "B": "Bottlerocket AMIs",
        "C": "AWS Fargate for EKS",
        "D": "Karpenter"
      },
      "answer": "C",
      "explanation": "EKS on Fargate runs pods on serverless infrastructure without managing nodes."
    },
    {
      "id": 989,
      "question": "A team wants near real-time full-text search and log analytics. Which AWS service is BEST suited? (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Amazon OpenSearch Service",
        "B": "Amazon Athena",
        "C": "Amazon Redshift",
        "D": "AWS Glue"
      },
      "answer": "A",
      "explanation": "OpenSearch Service (formerly Elasticsearch) supports full-text search and log analytics use cases."
    },
    {
      "id": 990,
      "question": "Which option enables access to AWS resources for applications running on EC2 without storing static credentials? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Access keys in environment variables",
        "B": "IAM user credentials file",
        "C": "IAM Role for EC2",
        "D": "Long-lived STS tokens"
      },
      "answer": "C",
      "explanation": "Assign an IAM role to EC2 to provide temporary credentials via the instance metadata service."
    },
    {
      "id": 991,
      "question": "A company needs to migrate a large dataset over the public internet as fast as possible. Which S3 feature can help accelerate uploads? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      "options": {
        "A": "S3 Transfer Acceleration",
        "B": "S3 Select",
        "C": "S3 Inventory",
        "D": "S3 Batch Operations"
      },
      "answer": "A",
      "explanation": "Transfer Acceleration uses CloudFront edge network to speed up long-distance data transfers."
    },
    {
      "id": 992,
      "question": "Which service provides centralized cost visibility, anomaly detection, and budget alerts? (Scenario 2). Focus on scalability and managed services.",
      "options": {
        "A": "AWS Trusted Advisor",
        "B": "AWS Budgets",
        "C": "Cost Explorer & Anomaly Detection",
        "D": "AWS Billing Conductor"
      },
      "answer": "C",
      "explanation": "Cost Explorer includes Anomaly Detection; together they provide spend analysis and alerts."
    },
    {
      "id": 993,
      "question": "Which Route 53 policy splits traffic across multiple resources based on assigned weights? (Scenario 3). Minimize operational effort and maximize availability.",
      "options": {
        "A": "Latency-based",
        "B": "Weighted",
        "C": "Geolocation",
        "D": "Failover"
      },
      "answer": "B",
      "explanation": "Weighted routing distributes traffic in proportions you specify."
    },
    {
      "id": 994,
      "question": "For asynchronous fanout to multiple subscribers, which pattern fits best? (Scenario 4). Assume the application is business-critical.",
      "options": {
        "A": "SQS polling",
        "B": "SNS topic with multiple subscriptions",
        "C": "Kinesis shard fan-out",
        "D": "EventBridge Event Bus with single rule"
      },
      "answer": "B",
      "explanation": "SNS fanout publishes a message to multiple endpoints and services in parallel."
    },
    {
      "id": 995,
      "question": "Which AWS service provides a graph database for highly connected data such as social networks? (Scenario 5). Prefer serverless where possible.",
      "options": {
        "A": "Amazon Neptune",
        "B": "Amazon DynamoDB",
        "C": "Amazon DocumentDB",
        "D": "Amazon RDS MySQL"
      },
      "answer": "A",
      "explanation": "Neptune is a fast, reliable graph database service."
    },
    {
      "id": 996,
      "question": "Which Amazon S3 feature enables querying a subset of data from an object using SQL expressions? (Scenario 6). The solution must support multi-AZ deployments.",
      "options": {
        "A": "S3 Select",
        "B": "S3 Inventory",
        "C": "S3 Batch Operations",
        "D": "S3 Glacier Select"
      },
      "answer": "A",
      "explanation": "S3 Select retrieves only the data needed using SQL, improving performance and cost."
    },
    {
      "id": 997,
      "question": "A workload requires extremely low-latency TCP/UDP pass-through for millions of connections per second. Which load balancer? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      "options": {
        "A": "Classic Load Balancer",
        "B": "Application Load Balancer",
        "C": "Network Load Balancer",
        "D": "Gateway Load Balancer"
      },
      "answer": "C",
      "explanation": "NLB operates at Layer 4 for ultra-low latency and high throughput."
    },
    {
      "id": 998,
      "question": "Which service helps discover, classify, and protect sensitive data stored in S3 (e.g., PII)? (Scenario 8). Assume traffic patterns are unpredictable.",
      "options": {
        "A": "Amazon Macie",
        "B": "AWS Glue DataBrew",
        "C": "AWS Lake Formation",
        "D": "AWS DMS"
      },
      "answer": "A",
      "explanation": "Macie uses ML to discover and protect sensitive data in S3."
    },
    {
      "id": 999,
      "question": "To collect, transform, and load streaming data into destinations like S3 and OpenSearch with minimal management, use: (Scenario 9). Latency must be minimized for global users.",
      "options": {
        "A": "Kinesis Data Streams",
        "B": "Kinesis Data Firehose",
        "C": "MSK",
        "D": "AWS Glue ETL"
      },
      "answer": "B",
      "explanation": "Firehose is fully managed for loading streaming data into storage and analytics services."
    },
    {
      "id": 1000,
      "question": "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      "options": {
        "A": "Amazon FSx for Windows File Server",
        "B": "Amazon EFS",
        "C": "Amazon S3",
        "D": "Amazon FSx for Lustre"
      },
      "answer": "A",
      "explanation": "FSx for Windows provides a managed SMB file system for Windows workloads."
    }    

  ]
};

export default function App() {
  const [box1, setBox1] = useState(questionsData.questions);
  const [box2, setBox2] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    pickNextQuestion();
  }, [round]);

  function pickNextQuestion() {
    let pool = [];
    if (box1.length > 0) {
      pool = box1;
    } else if (round % 3 === 0 && box2.length > 0) {
      pool = box2;
    } else {
      pool = box1.concat(box2);
    }
    if (pool.length === 0) return;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrentQ(next);
    setFeedback(null);
  }

  function handleAnswer(choice) {
    if (!currentQ) return;
    const isCorrect = choice === currentQ.answer;
    setFeedback({ correct: isCorrect, explanation: currentQ.explanation });

    if (isCorrect) {
      setBox1((prev) => prev.filter((q) => q.id !== currentQ.id));
      setBox2((prev) =>
        prev.find((q) => q.id === currentQ.id) ? prev : [...prev, currentQ]
      );
    } else {
      setBox1((prev) =>
        prev.find((q) => q.id === currentQ.id) ? prev : [...prev, currentQ]
      );
      setBox2((prev) => prev.filter((q) => q.id !== currentQ.id));
    }
  }

  function nextQuestion() {
    setRound((r) => r + 1);
  }

  return (
    <div className="app">
      <div className="card">
        <div className="card-content">
          <div className="stats">
            <span>📦 Box 1: {box1.length}</span>
            <span>📦 Box 2: {box2.length}</span>
            <span>Round: {round}</span>
          </div>

          {!currentQ ? (
            <p className="message">No questions available 🎉</p>
          ) : (
            <div>
              <h2 className="question">{currentQ.question}</h2>
              <div className="options">
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <button
                    key={key}
                    className="option-btn"
                    onClick={() => handleAnswer(key)}
                    disabled={!!feedback}
                  >
                    {key}. {value}
                  </button>
                ))}
              </div>

              {feedback && (
                <div
                  className={`feedback ${
                    feedback.correct ? "correct" : "incorrect"
                  }`}
                >
                  <p className="feedback-title">
                    {feedback.correct ? "✅ Correct!" : "❌ Incorrect"}
                  </p>
                  <p className="feedback-text">{feedback.explanation}</p>
                  <button className="next-btn" onClick={nextQuestion}>
                    Next Question
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
