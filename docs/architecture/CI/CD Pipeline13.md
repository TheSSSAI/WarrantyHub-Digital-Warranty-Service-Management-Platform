# 1 Pipelines

## 1.1 pl-backend-svc-01

### 1.1.1 Id

pl-backend-svc-01

### 1.1.2 Name

Backend Microservice CI/CD

### 1.1.3 Description

Builds, tests, scans, and deploys NestJS microservices to Azure Kubernetes Service (AKS) across environments.

### 1.1.4 Stages

#### 1.1.4.1 Build and Unit Test

##### 1.1.4.1.1 Name

Build and Unit Test

##### 1.1.4.1.2 Steps

- npm ci
- npm run lint
- npm run test -- --coverage

##### 1.1.4.1.3 Environment

###### 1.1.4.1.3.1 Node Env

test

##### 1.1.4.1.4.0 Quality Gates

- {'name': 'Unit Test Coverage', 'criteria': ['coverage >= 80%'], 'blocking': True}

#### 1.1.4.2.0.0 Build and Push Container

##### 1.1.4.2.1.0 Name

Build and Push Container

##### 1.1.4.2.2.0 Steps

- docker build -t $ACR_LOGIN_SERVER/service:$GITHUB_SHA .
- docker push $ACR_LOGIN_SERVER/service:$GITHUB_SHA

##### 1.1.4.2.3.0 Environment

###### 1.1.4.2.3.1 Acr Login Server

tbd.azurecr.io

#### 1.1.4.3.0.0 Security Scan

##### 1.1.4.3.1.0 Name

Security Scan

##### 1.1.4.3.2.0 Steps

- trivy image $ACR_LOGIN_SERVER/service:$GITHUB_SHA
- npm audit --audit-level=high

##### 1.1.4.3.3.0 Environment

*No data available*

##### 1.1.4.3.4.0 Quality Gates

- {'name': 'Vulnerability Scan', 'criteria': ['zero critical vulnerabilities', 'zero high vulnerabilities'], 'blocking': True}

#### 1.1.4.4.0.0 Deploy to Staging

##### 1.1.4.4.1.0 Name

Deploy to Staging

##### 1.1.4.4.2.0 Steps

- helm upgrade --install --namespace staging --set image.tag=$GITHUB_SHA -f ./charts/values-staging.yaml service ./charts

##### 1.1.4.4.3.0 Environment

###### 1.1.4.4.3.1 Kube Context

staging-cluster

#### 1.1.4.5.0.0 E2E Testing on Staging

##### 1.1.4.5.1.0 Name

E2E Testing on Staging

##### 1.1.4.5.2.0 Steps

- npm run test:e2e

##### 1.1.4.5.3.0 Environment

###### 1.1.4.5.3.1 Base Url

🔗 [https://staging.api.example.com](https://staging.api.example.com)

##### 1.1.4.5.4.0 Quality Gates

- {'name': 'End-to-End Test Pass Rate', 'criteria': ['pass_rate == 100%'], 'blocking': True}

#### 1.1.4.6.0.0 Manual Approval for Production

##### 1.1.4.6.1.0 Name

Manual Approval for Production

##### 1.1.4.6.2.0 Steps

- Request manual approval from Production-Deployers team

##### 1.1.4.6.3.0 Environment

*No data available*

#### 1.1.4.7.0.0 Deploy to Production

##### 1.1.4.7.1.0 Name

Deploy to Production

##### 1.1.4.7.2.0 Steps

- helm upgrade --install --namespace production --set image.tag=$GITHUB_SHA -f ./charts/values-production.yaml service ./charts

##### 1.1.4.7.3.0 Environment

###### 1.1.4.7.3.1 Kube Context

production-cluster

## 1.2.0.0.0.0 pl-frontend-web-01

### 1.2.1.0.0.0 Id

pl-frontend-web-01

### 1.2.2.0.0.0 Name

Web Frontend CI/CD

### 1.2.3.0.0.0 Description

Builds, tests, and deploys the Next.js web application to AKS.

### 1.2.4.0.0.0 Stages

#### 1.2.4.1.0.0 Build and Component Test

##### 1.2.4.1.1.0 Name

Build and Component Test

##### 1.2.4.1.2.0 Steps

- npm ci
- npm run lint
- npm run test

##### 1.2.4.1.3.0 Environment

###### 1.2.4.1.3.1 Node Env

test

#### 1.2.4.2.0.0 Build and Push Container

##### 1.2.4.2.1.0 Name

Build and Push Container

##### 1.2.4.2.2.0 Steps

- docker build -t $ACR_LOGIN_SERVER/webapp:$GITHUB_SHA .
- docker push $ACR_LOGIN_SERVER/webapp:$GITHUB_SHA

##### 1.2.4.2.3.0 Environment

###### 1.2.4.2.3.1 Acr Login Server

tbd.azurecr.io

#### 1.2.4.3.0.0 Deploy to Staging

##### 1.2.4.3.1.0 Name

Deploy to Staging

##### 1.2.4.3.2.0 Steps

- helm upgrade --install --namespace staging --set image.tag=$GITHUB_SHA -f ./charts/values-staging.yaml webapp ./charts

##### 1.2.4.3.3.0 Environment

###### 1.2.4.3.3.1 Kube Context

staging-cluster

#### 1.2.4.4.0.0 E2E Testing on Staging

##### 1.2.4.4.1.0 Name

E2E Testing on Staging

##### 1.2.4.4.2.0 Steps

- npx playwright test

##### 1.2.4.4.3.0 Environment

###### 1.2.4.4.3.1 Base Url

🔗 [https://staging.webapp.example.com](https://staging.webapp.example.com)

##### 1.2.4.4.4.0 Quality Gates

- {'name': 'End-to-End Test Pass Rate', 'criteria': ['pass_rate == 100%'], 'blocking': True}

#### 1.2.4.5.0.0 Manual Approval for Production

##### 1.2.4.5.1.0 Name

Manual Approval for Production

##### 1.2.4.5.2.0 Steps

- Request manual approval from Production-Deployers team

##### 1.2.4.5.3.0 Environment

*No data available*

#### 1.2.4.6.0.0 Deploy to Production

##### 1.2.4.6.1.0 Name

Deploy to Production

##### 1.2.4.6.2.0 Steps

- helm upgrade --install --namespace production --set image.tag=$GITHUB_SHA -f ./charts/values-production.yaml webapp ./charts

##### 1.2.4.6.3.0 Environment

###### 1.2.4.6.3.1 Kube Context

production-cluster

## 1.3.0.0.0.0 pl-mobile-app-01

### 1.3.1.0.0.0 Id

pl-mobile-app-01

### 1.3.2.0.0.0 Name

Mobile App Release Pipeline

### 1.3.3.0.0.0 Description

Builds, signs, and distributes React Native apps to internal testing tracks (TestFlight and Google Play).

### 1.3.4.0.0.0 Stages

#### 1.3.4.1.0.0 Build and Test

##### 1.3.4.1.1.0 Name

Build and Test

##### 1.3.4.1.2.0 Steps

- npm ci
- npm run lint
- npm run test

##### 1.3.4.1.3.0 Environment

*No data available*

#### 1.3.4.2.0.0 Build & Distribute Android (Internal)

##### 1.3.4.2.1.0 Name

Build & Distribute Android (Internal)

##### 1.3.4.2.2.0 Steps

- cd android && ./gradlew bundleRelease
- fastlane upload_to_play_store --track internal

##### 1.3.4.2.3.0 Environment

###### 1.3.4.2.3.1 Runner Os

ubuntu-latest

#### 1.3.4.3.0.0 Build & Distribute iOS (TestFlight)

##### 1.3.4.3.1.0 Name

Build & Distribute iOS (TestFlight)

##### 1.3.4.3.2.0 Steps

- fastlane build_and_upload_to_testflight

##### 1.3.4.3.3.0 Environment

###### 1.3.4.3.3.1 Runner Os

macos-latest

## 1.4.0.0.0.0 pl-infrastructure-iac-01

### 1.4.1.0.0.0 Id

pl-infrastructure-iac-01

### 1.4.2.0.0.0 Name

Infrastructure (IaC) Pipeline

### 1.4.3.0.0.0 Description

Validates and applies Terraform changes to manage Azure infrastructure using workspaces.

### 1.4.4.0.0.0 Stages

#### 1.4.4.1.0.0 Validate Code

##### 1.4.4.1.1.0 Name

Validate Code

##### 1.4.4.1.2.0 Steps

- terraform init
- terraform fmt -check
- terraform validate

##### 1.4.4.1.3.0 Environment

*No data available*

#### 1.4.4.2.0.0 Plan for Staging

##### 1.4.4.2.1.0 Name

Plan for Staging

##### 1.4.4.2.2.0 Steps

- terraform workspace select staging
- terraform plan -out=staging.tfplan

##### 1.4.4.2.3.0 Environment

*No data available*

#### 1.4.4.3.0.0 Manual Approval for Staging Apply

##### 1.4.4.3.1.0 Name

Manual Approval for Staging Apply

##### 1.4.4.3.2.0 Steps

- Review terraform plan for staging

##### 1.4.4.3.3.0 Environment

*No data available*

#### 1.4.4.4.0.0 Apply to Staging

##### 1.4.4.4.1.0 Name

Apply to Staging

##### 1.4.4.4.2.0 Steps

- terraform apply "staging.tfplan"

##### 1.4.4.4.3.0 Environment

*No data available*

#### 1.4.4.5.0.0 Plan for Production

##### 1.4.4.5.1.0 Name

Plan for Production

##### 1.4.4.5.2.0 Steps

- terraform workspace select production
- terraform plan -out=production.tfplan

##### 1.4.4.5.3.0 Environment

*No data available*

#### 1.4.4.6.0.0 Manual Approval for Production Apply

##### 1.4.4.6.1.0 Name

Manual Approval for Production Apply

##### 1.4.4.6.2.0 Steps

- Review terraform plan for production

##### 1.4.4.6.3.0 Environment

*No data available*

#### 1.4.4.7.0.0 Apply to Production

##### 1.4.4.7.1.0 Name

Apply to Production

##### 1.4.4.7.2.0 Steps

- terraform apply "production.tfplan"

##### 1.4.4.7.3.0 Environment

*No data available*

# 2.0.0.0.0.0 Configuration

| Property | Value |
|----------|-------|
| Artifact Repository | Azure Container Registry, GitHub Releases |
| Default Branch | main |
| Retention Policy | 90d |
| Notification Channel | slack#deployments |

