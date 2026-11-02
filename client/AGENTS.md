# SafeBank Project - Agent Instructions

## Project Overview
This is a Banking Transaction Management System named SafeBank.

## General Rules
- Always inspect existing project files before making changes.
- Work directly with actual project files.
- Never provide only implementation plans or sample code.
- Never assume the database, framework, ORM, or folder structure.
- Preserve existing working features.
- Avoid unnecessary file changes.
- Do not overwrite unrelated code.
- Explain important changes clearly.

## Development Phases

### Phase 1: Backend and Security
- Secure registration and login.
- Hash passwords using bcrypt or the existing secure password hashing library.
- Implement JWT authentication with expiration.
- Implement Admin and Customer role authorization.
- Prevent public Admin registration.
- Protect customer data and API routes.
- Validate user input.
- Secure environment variables and database credentials.

### Phase 2: Banking Features
- Deposit.
- Withdraw.
- Fund Transfer.
- Transaction History.
- Transaction Receipts.
- Undo and Redo.
- Proper balance validation and transaction consistency.

### Phase 3: Dashboard and UI
- Admin Dashboard.
- Customer Dashboard.
- Account Management.
- Transaction Management.
- Service Queue.
- Reports.
- Responsive premium UI/UX.

### Phase 4: Testing and Finalization
- Fix bugs.
- Test all features.
- Run frontend and backend builds.
- Run available tests.
- Fix integration issues.
- Update project documentation.

## Important Security Rules
- Never store plaintext passwords.
- Never expose secrets in frontend code.
- Never trust a role sent by the client.
- Customers must only access their authorized data.
- Validate all financial transactions on the backend.
- Prevent unauthorized balance modifications.
- Do not silently bypass authentication errors.

## Final Requirements
- Make actual changes to project files.
- Show changed file names and diffs.
- Run available build and test commands.
- Report remaining errors honestly.
- Do not claim a feature is complete without verification.
