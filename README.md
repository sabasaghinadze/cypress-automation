# Automation Test Store - Cypress E2E Tests

## პროექტის სტრუქტურა

```
cypress-automation/
├── cypress/
│   ├── e2e/
│   │   ├── 01_editAccountDetails.cy.js   # მომხმარებლის დეტალების შეცვლა
│   │   ├── 02_addressBook.cy.js           # მისამართების მართვა
│   │   └── 03_changePassword.cy.js        # პაროლის შეცვლა
│   ├── fixtures/
│   │   └── user.json                      # ტესტის მონაცემები
│   └── support/
│       ├── commands.js                    # Custom Commands (login და სხვა)
│       └── e2e.js                         # Support ფაილი
├── cypress.config.js
├── package.json
└── README.md
```

## დაყენება

```bash
npm install
```

## ტესტების გაშვება

```bash
# Cypress UI-ით გახსნა
npm run cy:open

# ყველა ტესტის გაშვება headless-ში
npm run cy:run

# კონკრეტული ტესტის გაშვება
npm run cy:run:edit
npm run cy:run:address
npm run cy:run:password
```

## Custom Commands

### `cy.login(loginName, password)`
Login ბრძანება - გამოიყენება ყველა ტესტში `beforeEach`-ში:
```javascript
cy.login('Mariam_test', 'Test@1234')
```

### `cy.goToEditAccount()`
Edit Account Details გვერდზე გადასვლა

### `cy.goToChangePassword()`
Change Password გვერდზე გადასვლა

### `cy.goToAddressBook()`
Address Book გვერდზე გადასვლა

## მნიშვნელოვანი

`cypress/fixtures/user.json` ფაილში შეცვალეთ:
- `loginName` - თქვენი მომხმარებლის სახელი
- `password` - თქვენი პაროლი
- `email` - თქვენი email

## Git Workflow

```bash
# ახალი branch-ის შექმნა
git checkout -b feature/account-management-tests

# ფაილების დამატება
git add .
git commit -m "feat: add account management E2E tests with custom login command"

# Push და Pull Request
git push origin feature/account-management-tests
# GitHub-ზე შექმენით Pull Request
```
