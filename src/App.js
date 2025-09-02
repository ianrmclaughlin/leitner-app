import React, { useState, useEffect } from "react";
import "./leitner-app.css"; // Import the CSS file

// Embed questions directly in code
const questionsData = {
  questions: [
    {
      id: 1,
      question:
        "Which AWS service should you use to automatically distribute incoming application traffic across multiple targets? (Scenario 1). Consider cost, resiliency, and operational overhead.",
      options: {
        A: "Amazon CloudFront",
        B: "AWS Auto Scaling",
        C: "Elastic Load Balancing",
        D: "Amazon Route 53",
      },
      answer: "C",
      explanation:
        "Elastic Load Balancing spreads traffic across multiple targets such as EC2 instances, IPs, and containers.",
    },
    {
      id: 2,
      question:
        "A startup needs object storage for large volumes of images with low cost and high durability. Which service is MOST appropriate? (Scenario 2). Focus on scalability and managed services.",
      options: {
        A: "Amazon EFS",
        B: "Amazon S3",
        C: "Amazon EBS",
        D: "Amazon FSx for Windows File Server",
      },
      answer: "B",
      explanation:
        "Amazon S3 provides highly durable, scalable, low-cost object storage for unstructured data like images.",
    },
    {
      id: 3,
      question:
        "Which feature of Amazon RDS provides automatic failover in case the primary DB instance becomes unavailable? (Scenario 3). Minimize operational effort and maximize availability.",
      options: {
        A: "Read Replicas",
        B: "Multi-AZ",
        C: "Storage Auto Scaling",
        D: "Minor Version Upgrade",
      },
      answer: "B",
      explanation:
        "RDS Multi-AZ maintains a synchronous standby replica and performs automatic failover.",
    },
    {
      id: 4,
      question:
        "You need a fully managed NoSQL key-value database that delivers single-digit millisecond latency at any scale. Which service should you choose? (Scenario 4). Assume the application is business-critical.",
      options: {
        A: "Amazon Aurora",
        B: "Amazon DynamoDB",
        C: "Amazon Neptune",
        D: "Amazon DocumentDB",
      },
      answer: "B",
      explanation:
        "DynamoDB is a fully managed NoSQL key-value and document database with low-latency performance.",
    },
    {
      id: 5,
      question:
        "Which service reduces latency by caching content at edge locations globally? (Scenario 5). Prefer serverless where possible.",
      options: {
        A: "Amazon CloudFront",
        B: "AWS Global Accelerator",
        C: "Elastic Load Balancing",
        D: "Amazon Route 53",
      },
      answer: "A",
      explanation:
        "CloudFront is a CDN that caches content at edge locations to reduce latency.",
    },
    {
      id: 6,
      question:
        "Which AWS service decouples microservices using a highly scalable message queue? (Scenario 6). The solution must support multi-AZ deployments.",
      options: {
        A: "Amazon SNS",
        B: "Amazon SQS",
        C: "Amazon MQ",
        D: "AWS Step Functions",
      },
      answer: "B",
      explanation:
        "Amazon SQS is a fully managed message queuing service for decoupling applications.",
    },
    {
      id: 7,
      question:
        "You need to run containers without managing servers or clusters. Which compute option is BEST? (Scenario 7). Data is sensitive and must be encrypted at rest and in transit.",
      options: {
        A: "Amazon EC2",
        B: "Amazon ECS on EC2",
        C: "AWS Fargate",
        D: "Amazon EKS managed node groups",
      },
      answer: "C",
      explanation:
        "Fargate is serverless for containers, removing the need to manage servers or EC2 clusters.",
    },
    {
      id: 8,
      question:
        "A company requires a logically isolated section of the AWS Cloud to launch resources. What should they use? (Scenario 8). Assume traffic patterns are unpredictable.",
      options: {
        A: "AWS Organizations",
        B: "Amazon VPC",
        C: "AWS Direct Connect",
        D: "AWS Transit Gateway",
      },
      answer: "B",
      explanation:
        "Amazon VPC provides isolation and control over networking for AWS resources.",
    },
    {
      id: 9,
      question:
        "Which service enables event-driven serverless compute that scales automatically with usage? (Scenario 9). Latency must be minimized for global users.",
      options: {
        A: "AWS Lambda",
        B: "Amazon EC2 Auto Scaling",
        C: "AWS Batch",
        D: "AWS Step Functions",
      },
      answer: "A",
      explanation:
        "Lambda runs code without provisioning servers and scales automatically per event volume.",
    },
    {
      id: 10,
      question:
        "Which storage option provides a shared file system for Windows-based applications on AWS? (Scenario 10). Use least-privilege and IAM best practices.",
      options: {
        A: "Amazon FSx for Windows File Server",
        B: "Amazon EFS",
        C: "Amazon S3",
        D: "Amazon FSx for Lustre",
      },
      answer: "A",
      explanation:
        "FSx for Windows provides a managed SMB file system for Windows workloads.",
    },
  ],
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
