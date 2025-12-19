# 1 System Overview

## 1.1 Analysis Date

2025-06-13

## 1.2 Ci Cd Tool

GitHub Actions

## 1.3 Deployment Target

Azure Kubernetes Service (AKS)

## 1.4 Artifact Repository

Azure Container Registry (ACR)

## 1.5 Infrastructure As Code

Terraform

## 1.6 Environments

- Development
- Staging
- Production

# 2.0 Pipelines

## 2.1 Backend Microservice CI/CD Pipeline

### 2.1.1 Pipeline Id

PL-BACKEND-001

### 2.1.2 Name

Backend Microservice CI/CD Pipeline

### 2.1.3 Description

Handles the continuous integration, testing, containerization, and deployment of a single backend microservice.

### 2.1.4 Source Repository

Backend Microservices Repository (e.g., Monorepo with path filtering or individual repos)

### 2.1.5 Trigger

#### 2.1.5.1 Type

🔹 Git Push/Pull Request

#### 2.1.5.2 Branch

main

### 2.1.6.0 Stages

#### 2.1.6.1 CI (Pull Request Validation)

##### 2.1.6.1.1 Name

CI (Pull Request Validation)

##### 2.1.6.1.2 Purpose

Validates code changes on every pull request before merging to main.

##### 2.1.6.1.3 Steps

###### 2.1.6.1.3.1 Checkout Code

####### 2.1.6.1.3.1.1 Name

Checkout Code

####### 2.1.6.1.3.1.2 Tool

GitHub Actions

####### 2.1.6.1.3.1.3 Purpose

Clones the source repository.

###### 2.1.6.1.3.2.0 Setup Node.js Environment

####### 2.1.6.1.3.2.1 Name

Setup Node.js Environment

####### 2.1.6.1.3.2.2 Tool

actions/setup-node

####### 2.1.6.1.3.2.3 Purpose

Configures the specified Node.js version (v20.11.x).

###### 2.1.6.1.3.3.0 Install Dependencies

####### 2.1.6.1.3.3.1 Name

Install Dependencies

####### 2.1.6.1.3.3.2 Tool

npm

####### 2.1.6.1.3.3.3 Purpose

Installs project dependencies using 'npm ci' for reproducible builds.

###### 2.1.6.1.3.4.0 Lint and Format Check

####### 2.1.6.1.3.4.1 Name

Lint and Format Check

####### 2.1.6.1.3.4.2 Tool

ESLint & Prettier

####### 2.1.6.1.3.4.3 Purpose

Statically analyzes code for quality and style consistency as per REQ-MAIN-001.

###### 2.1.6.1.3.5.0 Run Unit & Integration Tests

####### 2.1.6.1.3.5.1 Name

Run Unit & Integration Tests

####### 2.1.6.1.3.5.2 Tool

Jest & Supertest

####### 2.1.6.1.3.5.3 Purpose

Executes automated tests to verify code correctness as per REQ-DEV-001.

###### 2.1.6.1.3.6.0 Check Code Coverage

####### 2.1.6.1.3.6.1 Name

Check Code Coverage

####### 2.1.6.1.3.6.2 Tool

Jest

####### 2.1.6.1.3.6.3 Purpose

Validates that test coverage meets the minimum 80% threshold defined in REQ-MAIN-001. Acts as a critical quality gate.

###### 2.1.6.1.3.7.0 Scan for Vulnerabilities

####### 2.1.6.1.3.7.1 Name

Scan for Vulnerabilities

####### 2.1.6.1.3.7.2 Tool

GitHub Dependabot / Snyk

####### 2.1.6.1.3.7.3 Purpose

Scans dependencies for known security vulnerabilities to adhere to security requirements (Section 5.2).

#### 2.1.6.2.0.0.0 CD (Merge to Main)

##### 2.1.6.2.1.0.0 Name

CD (Merge to Main)

##### 2.1.6.2.2.0.0 Purpose

Builds, publishes, and deploys the microservice through the different environments upon merging to the main branch.

##### 2.1.6.2.3.0.0 Steps

###### 2.1.6.2.3.1.0 Build & Push Docker Image

####### 2.1.6.2.3.1.1 Name

Build & Push Docker Image

####### 2.1.6.2.3.1.2 Tool

Docker

####### 2.1.6.2.3.1.3 Purpose

Builds a production-ready Docker image and pushes it to Azure Container Registry (ACR) with a unique tag (commit SHA).

###### 2.1.6.2.3.2.0 Deploy to Development

####### 2.1.6.2.3.2.1 Name

Deploy to Development

####### 2.1.6.2.3.2.2 Tool

Kubectl / Helm

####### 2.1.6.2.3.2.3 Purpose

Automatically deploys the new container image to the Development AKS cluster for immediate integration testing.

###### 2.1.6.2.3.3.0 Promote to Staging

####### 2.1.6.2.3.3.1 Name

Promote to Staging

####### 2.1.6.2.3.3.2 Tool

Kubectl / Helm

####### 2.1.6.2.3.3.3 Purpose

Deploys the container image to the Staging environment after a manual approval step. This environment is used for E2E testing.

###### 2.1.6.2.3.4.0 Run End-to-End Tests

####### 2.1.6.2.3.4.1 Name

Run End-to-End Tests

####### 2.1.6.2.3.4.2 Tool

Playwright

####### 2.1.6.2.3.4.3 Purpose

Executes end-to-end tests against the Staging environment to validate system-level functionality as per REQ-DEV-002.

###### 2.1.6.2.3.5.0 Promote to Production

####### 2.1.6.2.3.5.1 Name

Promote to Production

####### 2.1.6.2.3.5.2 Tool

Kubectl / Helm

####### 2.1.6.2.3.5.3 Purpose

Deploys the verified container image to the Production AKS cluster following a mandatory manual approval from a release manager or team lead.

### 2.1.7.0.0.0.0 Quality Gates

#### 2.1.7.1.0.0.0 Gate

##### 2.1.7.1.1.0.0 Gate

Code Coverage > 80%

##### 2.1.7.1.2.0.0 Stage

CI

##### 2.1.7.1.3.0.0 Justification

Requirement REQ-MAIN-001 mandates a minimum of 80% unit test coverage.

#### 2.1.7.2.0.0.0 Gate

##### 2.1.7.2.1.0.0 Gate

Manual Approval for Staging

##### 2.1.7.2.2.0.0 Stage

CD

##### 2.1.7.2.3.0.0 Justification

Standard practice to control deployments to a shared test environment.

#### 2.1.7.3.0.0.0 Gate

##### 2.1.7.3.1.0.0 Gate

Successful E2E Tests

##### 2.1.7.3.2.0.0 Stage

CD

##### 2.1.7.3.3.0.0 Justification

Requirement REQ-DEV-002 specifies E2E testing. This gate ensures system integrity before production release.

#### 2.1.7.4.0.0.0 Gate

##### 2.1.7.4.1.0.0 Gate

Manual Approval for Production

##### 2.1.7.4.2.0.0 Stage

CD

##### 2.1.7.4.3.0.0 Justification

Critical control to prevent unauthorized or untested changes from reaching production, ensuring stability.

### 2.1.8.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Method | Re-deploy Previous Image Tag |
| Trigger | Manual |
| Procedure | The pipeline can be re-run with a specific, previo... |

## 2.2.0.0.0.0.0 Web Frontend CI/CD Pipeline

### 2.2.1.0.0.0.0 Pipeline Id

PL-WEB-FRONTEND-002

### 2.2.2.0.0.0.0 Name

Web Frontend CI/CD Pipeline

### 2.2.3.0.0.0.0 Description

Handles the CI/CD process for the Next.js web application, including testing, building, and deploying to AKS.

### 2.2.4.0.0.0.0 Source Repository

Web Frontend Repository

### 2.2.5.0.0.0.0 Trigger

#### 2.2.5.1.0.0.0 Type

🔹 Git Push/Pull Request

#### 2.2.5.2.0.0.0 Branch

main

### 2.2.6.0.0.0.0 Stages

#### 2.2.6.1.0.0.0 CI (Pull Request Validation)

##### 2.2.6.1.1.0.0 Name

CI (Pull Request Validation)

##### 2.2.6.1.2.0.0 Purpose

Validates code changes on every pull request before merging to main.

##### 2.2.6.1.3.0.0 Steps

###### 2.2.6.1.3.1.0 Checkout Code

####### 2.2.6.1.3.1.1 Name

Checkout Code

####### 2.2.6.1.3.1.2 Tool

GitHub Actions

####### 2.2.6.1.3.1.3 Purpose

Clones the source repository.

###### 2.2.6.1.3.2.0 Setup Node.js Environment

####### 2.2.6.1.3.2.1 Name

Setup Node.js Environment

####### 2.2.6.1.3.2.2 Tool

actions/setup-node

####### 2.2.6.1.3.2.3 Purpose

Configures the specified Node.js version (v20.11.x).

###### 2.2.6.1.3.3.0 Install Dependencies

####### 2.2.6.1.3.3.1 Name

Install Dependencies

####### 2.2.6.1.3.3.2 Tool

npm

####### 2.2.6.1.3.3.3 Purpose

Installs project dependencies using 'npm ci'.

###### 2.2.6.1.3.4.0 Lint and Format Check

####### 2.2.6.1.3.4.1 Name

Lint and Format Check

####### 2.2.6.1.3.4.2 Tool

ESLint & Prettier

####### 2.2.6.1.3.4.3 Purpose

Enforces code quality and style standards.

###### 2.2.6.1.3.5.0 Run Unit & Component Tests

####### 2.2.6.1.3.5.1 Name

Run Unit & Component Tests

####### 2.2.6.1.3.5.2 Tool

Jest & React Testing Library

####### 2.2.6.1.3.5.3 Purpose

Executes automated tests to verify component correctness as per REQ-DEV-001.

###### 2.2.6.1.3.6.0 Scan for Vulnerabilities

####### 2.2.6.1.3.6.1 Name

Scan for Vulnerabilities

####### 2.2.6.1.3.6.2 Tool

GitHub Dependabot / Snyk

####### 2.2.6.1.3.6.3 Purpose

Scans dependencies for known security vulnerabilities.

#### 2.2.6.2.0.0.0 CD (Merge to Main)

##### 2.2.6.2.1.0.0 Name

CD (Merge to Main)

##### 2.2.6.2.2.0.0 Purpose

Builds, publishes, and deploys the web application through the environments.

##### 2.2.6.2.3.0.0 Steps

###### 2.2.6.2.3.1.0 Build & Push Docker Image

####### 2.2.6.2.3.1.1 Name

Build & Push Docker Image

####### 2.2.6.2.3.1.2 Tool

Docker & Next.js CLI

####### 2.2.6.2.3.1.3 Purpose

Builds a production-optimized Next.js application, packages it into a Docker image, and pushes to ACR.

###### 2.2.6.2.3.2.0 Deploy to Development

####### 2.2.6.2.3.2.1 Name

Deploy to Development

####### 2.2.6.2.3.2.2 Tool

Kubectl / Helm

####### 2.2.6.2.3.2.3 Purpose

Automatically deploys the new image to the Development AKS cluster.

###### 2.2.6.2.3.3.0 Promote to Staging

####### 2.2.6.2.3.3.1 Name

Promote to Staging

####### 2.2.6.2.3.3.2 Tool

Kubectl / Helm

####### 2.2.6.2.3.3.3 Purpose

Deploys the image to Staging after manual approval.

###### 2.2.6.2.3.4.0 Run End-to-End Tests

####### 2.2.6.2.3.4.1 Name

Run End-to-End Tests

####### 2.2.6.2.3.4.2 Tool

Playwright

####### 2.2.6.2.3.4.3 Purpose

Executes E2E tests against the Staging environment as per REQ-DEV-002.

###### 2.2.6.2.3.5.0 Promote to Production

####### 2.2.6.2.3.5.1 Name

Promote to Production

####### 2.2.6.2.3.5.2 Tool

Kubectl / Helm

####### 2.2.6.2.3.5.3 Purpose

Deploys the verified image to Production after manual approval.

### 2.2.7.0.0.0.0 Quality Gates

#### 2.2.7.1.0.0.0 Gate

##### 2.2.7.1.1.0.0 Gate

Successful E2E Tests

##### 2.2.7.1.2.0.0 Stage

CD

##### 2.2.7.1.3.0.0 Justification

Requirement REQ-DEV-002 specifies E2E testing to validate user journeys.

#### 2.2.7.2.0.0.0 Gate

##### 2.2.7.2.1.0.0 Gate

Manual Approval for Production

##### 2.2.7.2.2.0.0 Stage

CD

##### 2.2.7.2.3.0.0 Justification

Ensures controlled and validated releases to live users.

### 2.2.8.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Method | Re-deploy Previous Image Tag |
| Trigger | Manual |
| Procedure | Re-run the deployment workflow with the commit SHA... |

## 2.3.0.0.0.0.0 Mobile App (React Native) CI Pipeline

### 2.3.1.0.0.0.0 Pipeline Id

PL-MOBILE-003

### 2.3.2.0.0.0.0 Name

Mobile App (React Native) CI Pipeline

### 2.3.3.0.0.0.0 Description

Handles the CI, testing, and build artifact generation for the iOS and Android mobile applications.

### 2.3.4.0.0.0.0 Source Repository

Mobile App Repository

### 2.3.5.0.0.0.0 Trigger

#### 2.3.5.1.0.0.0 Type

🔹 Git Push/Pull Request

#### 2.3.5.2.0.0.0 Branch

main

### 2.3.6.0.0.0.0 Stages

#### 2.3.6.1.0.0.0 CI (Pull Request Validation)

##### 2.3.6.1.1.0.0 Name

CI (Pull Request Validation)

##### 2.3.6.1.2.0.0 Purpose

Validates code changes on every pull request before merging to main.

##### 2.3.6.1.3.0.0 Steps

###### 2.3.6.1.3.1.0 Checkout Code

####### 2.3.6.1.3.1.1 Name

Checkout Code

####### 2.3.6.1.3.1.2 Tool

GitHub Actions

####### 2.3.6.1.3.1.3 Purpose

Clones the source repository.

###### 2.3.6.1.3.2.0 Setup Node.js Environment

####### 2.3.6.1.3.2.1 Name

Setup Node.js Environment

####### 2.3.6.1.3.2.2 Tool

actions/setup-node

####### 2.3.6.1.3.2.3 Purpose

Configures Node.js for React Native.

###### 2.3.6.1.3.3.0 Install Dependencies

####### 2.3.6.1.3.3.1 Name

Install Dependencies

####### 2.3.6.1.3.3.2 Tool

npm

####### 2.3.6.1.3.3.3 Purpose

Installs project dependencies using 'npm ci'.

###### 2.3.6.1.3.4.0 Lint and Format Check

####### 2.3.6.1.3.4.1 Name

Lint and Format Check

####### 2.3.6.1.3.4.2 Tool

ESLint & Prettier

####### 2.3.6.1.3.4.3 Purpose

Enforces code quality and style standards.

###### 2.3.6.1.3.5.0 Run Unit & Component Tests

####### 2.3.6.1.3.5.1 Name

Run Unit & Component Tests

####### 2.3.6.1.3.5.2 Tool

Jest & React Testing Library

####### 2.3.6.1.3.5.3 Purpose

Executes automated tests for mobile components.

#### 2.3.6.2.0.0.0 Build (Merge to Main)

##### 2.3.6.2.1.0.0 Name

Build (Merge to Main)

##### 2.3.6.2.2.0.0 Purpose

Builds and signs the application binaries for both Android and iOS.

##### 2.3.6.2.3.0.0 Steps

###### 2.3.6.2.3.1.0 Build & Sign Android App Bundle (.aab)

####### 2.3.6.2.3.1.1 Name

Build & Sign Android App Bundle (.aab)

####### 2.3.6.2.3.1.2 Tool

Gradle

####### 2.3.6.2.3.1.3 Purpose

Creates a signed release bundle for the Google Play Store. Requires a macOS or Linux runner.

####### 2.3.6.2.3.1.4 Notes

Requires Android keystore and credentials stored in GitHub Secrets.

###### 2.3.6.2.3.2.0 Build & Sign iOS App (.ipa)

####### 2.3.6.2.3.2.1 Name

Build & Sign iOS App (.ipa)

####### 2.3.6.2.3.2.2 Tool

Xcodebuild / Fastlane

####### 2.3.6.2.3.2.3 Purpose

Creates a signed IPA file for the Apple App Store. Requires a macOS runner.

####### 2.3.6.2.3.2.4 Notes

Requires Apple Developer certificates and provisioning profiles stored in GitHub Secrets.

###### 2.3.6.2.3.3.0 Publish Build Artifacts

####### 2.3.6.2.3.3.1 Name

Publish Build Artifacts

####### 2.3.6.2.3.3.2 Tool

actions/upload-artifact

####### 2.3.6.2.3.3.3 Purpose

Uploads the signed .aab and .ipa files as build artifacts for manual submission to app stores.

### 2.3.7.0.0.0.0 Artifact Management

| Property | Value |
|----------|-------|
| Storage | GitHub Actions Artifacts / GitHub Releases |
| Retention | 30 days for build artifacts, indefinitely for tagg... |
| Notes | The pipeline concludes by producing artifacts. Sto... |

### 2.3.8.0.0.0.0 Quality Gates

*No items available*

### 2.3.9.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Method | Build from Previous Git Tag |
| Trigger | Manual |
| Procedure | A previous stable version can be rebuilt by creati... |

## 2.4.0.0.0.0.0 Infrastructure (Terraform) CI/CD Pipeline

### 2.4.1.0.0.0.0 Pipeline Id

PL-IAC-004

### 2.4.2.0.0.0.0 Name

Infrastructure (Terraform) CI/CD Pipeline

### 2.4.3.0.0.0.0 Description

Manages the validation and application of Terraform infrastructure changes across environments, as mandated by REQ-DEVOPS-001.

### 2.4.4.0.0.0.0 Source Repository

Infrastructure Repository

### 2.4.5.0.0.0.0 Trigger

#### 2.4.5.1.0.0.0 Type

🔹 Git Push/Pull Request

#### 2.4.5.2.0.0.0 Branch

main

### 2.4.6.0.0.0.0 Stages

#### 2.4.6.1.0.0.0 CI (Pull Request Validation)

##### 2.4.6.1.1.0.0 Name

CI (Pull Request Validation)

##### 2.4.6.1.2.0.0 Purpose

Validates Terraform code for syntax, formatting, and generates a plan for review.

##### 2.4.6.1.3.0.0 Steps

###### 2.4.6.1.3.1.0 Checkout Code

####### 2.4.6.1.3.1.1 Name

Checkout Code

####### 2.4.6.1.3.1.2 Tool

GitHub Actions

####### 2.4.6.1.3.1.3 Purpose

Clones the source repository.

###### 2.4.6.1.3.2.0 Setup Terraform

####### 2.4.6.1.3.2.1 Name

Setup Terraform

####### 2.4.6.1.3.2.2 Tool

hashicorp/setup-terraform

####### 2.4.6.1.3.2.3 Purpose

Configures the specified Terraform version.

###### 2.4.6.1.3.3.0 Terraform Init

####### 2.4.6.1.3.3.1 Name

Terraform Init

####### 2.4.6.1.3.3.2 Tool

Terraform CLI

####### 2.4.6.1.3.3.3 Purpose

Initializes the Terraform backend and providers.

###### 2.4.6.1.3.4.0 Terraform Validate

####### 2.4.6.1.3.4.1 Name

Terraform Validate

####### 2.4.6.1.3.4.2 Tool

Terraform CLI

####### 2.4.6.1.3.4.3 Purpose

Checks the syntax of the Terraform configuration files.

###### 2.4.6.1.3.5.0 Terraform Plan

####### 2.4.6.1.3.5.1 Name

Terraform Plan

####### 2.4.6.1.3.5.2 Tool

Terraform CLI

####### 2.4.6.1.3.5.3 Purpose

Generates an execution plan and posts it as a comment to the pull request for mandatory peer review.

#### 2.4.6.2.0.0.0 CD (Apply on Demand)

##### 2.4.6.2.1.0.0 Name

CD (Apply on Demand)

##### 2.4.6.2.2.0.0 Purpose

Applies the Terraform configuration to a specified environment after manual triggering and approval.

##### 2.4.6.2.3.0.0 Trigger

###### 2.4.6.2.3.1.0 Type

🔹 Manual Workflow Dispatch

###### 2.4.6.2.3.2.0 Inputs

- environment (Development, Staging, Production)

##### 2.4.6.2.4.0.0 Steps

###### 2.4.6.2.4.1.0 Generate Plan for Target Environment

####### 2.4.6.2.4.1.1 Name

Generate Plan for Target Environment

####### 2.4.6.2.4.1.2 Tool

Terraform CLI

####### 2.4.6.2.4.1.3 Purpose

Runs 'terraform plan' using the selected environment's workspace and variable files.

###### 2.4.6.2.4.2.0 Manual Approval

####### 2.4.6.2.4.2.1 Name

Manual Approval

####### 2.4.6.2.4.2.2 Tool

GitHub Environments

####### 2.4.6.2.4.2.3 Purpose

Pauses the workflow, requiring an authorized user to approve the plan before applying changes to Staging or Production.

###### 2.4.6.2.4.3.0 Terraform Apply

####### 2.4.6.2.4.3.1 Name

Terraform Apply

####### 2.4.6.2.4.3.2 Tool

Terraform CLI

####### 2.4.6.2.4.3.3 Purpose

Executes 'terraform apply' to provision or update the infrastructure in the target environment.

### 2.4.7.0.0.0.0 Quality Gates

#### 2.4.7.1.0.0.0 Gate

##### 2.4.7.1.1.0.0 Gate

Peer Review of Terraform Plan

##### 2.4.7.1.2.0.0 Stage

CI

##### 2.4.7.1.3.0.0 Justification

Essential for preventing accidental or malicious infrastructure changes. The plan output is reviewed in the PR.

#### 2.4.7.2.0.0.0 Gate

##### 2.4.7.2.1.0.0 Gate

Manual Approval to Apply

##### 2.4.7.2.2.0.0 Stage

CD

##### 2.4.7.2.3.0.0 Justification

Provides the final human check before modifying live infrastructure, especially critical for the Production environment.

### 2.4.8.0.0.0.0 Rollback Strategy

| Property | Value |
|----------|-------|
| Method | Git Revert and Re-apply |
| Trigger | Manual |
| Procedure | Revert the pull request that introduced the proble... |

