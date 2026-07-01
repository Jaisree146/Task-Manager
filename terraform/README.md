# Terraform Infrastructure for Task Service Deployment

## Overview

This Terraform configuration provisions the AWS infrastructure required to deploy the Flask-based Task Service using Amazon ECS Fargate.

The infrastructure includes:

- Amazon ECS Cluster
- Amazon ECS Service
- Amazon ECS Task Definition
- Amazon ECR Integration
- IAM Execution Role
- Security Group
- CloudWatch Log Group

---

## Prerequisites

Before running Terraform, ensure the following are available:

- AWS Account
- Terraform >= 1.5
- AWS CLI configured
- Docker
- Amazon ECR repository
- Amazon RDS MySQL instance

---

## Project Structure

```
terraform/
│
├── main.tf
├── provider.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
└── README.md
```

---

## Infrastructure Components

### Amazon ECS

Creates:

- ECS Cluster
- ECS Service
- Task Definition

Runs the Task Service container using AWS Fargate.

---

### Amazon ECR

Stores the Docker image pushed from GitHub Actions.

---

### Amazon RDS

Stores application data.

The ECS Task connects to the RDS instance using environment variables.

---

### CloudWatch

Creates a Log Group for monitoring container logs.

---

### IAM

Creates the ECS Task Execution Role required to:

- Pull Docker images from Amazon ECR
- Send logs to CloudWatch

---

### Security Group

Allows:

- HTTP traffic to the application
- Outbound access to Amazon RDS

---

## Environment Variables

The following variables are passed to the container:

| Variable | Description |
|----------|-------------|
| DB_HOST | RDS Endpoint |
| DB_USER | Database Username |
| DB_PASSWORD | Database Password |
| DB_NAME | Database Name |
| JWT_SECRET | JWT Secret Key |

---

## Terraform Commands

Initialize Terraform

```bash
terraform init
```

Validate configuration

```bash
terraform validate
```

Preview infrastructure

```bash
terraform plan
```

Provision infrastructure

```bash
terraform apply
```

Destroy infrastructure

```bash
terraform destroy
```

---

## Deployment Flow

```
GitHub
      │
      ▼
GitHub Actions
      │
      ▼
Docker Build
      │
      ▼
Amazon ECR
      │
      ▼
Amazon ECS (Fargate)
      │
      ▼
Flask Task Service
      │
      ▼
Amazon RDS
```

---

## Features

- Infrastructure as Code using Terraform
- Containerized deployment with Docker
- Amazon ECS Fargate deployment
- CloudWatch logging
- IAM Role based authentication
- Amazon RDS connectivity
- GitHub Actions CI/CD integration

---

## Notes

- Do not commit `terraform.tfvars` to version control.
- Do not commit Terraform state files.
- Store AWS credentials securely using GitHub Secrets.

---

## Author

Jaisree