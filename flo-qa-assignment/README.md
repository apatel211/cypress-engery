# Flo QA Assignment

A simple NextJS app for entering and viewing energy consumption data

## Context and Task

This is a simple application with a `Dashboard` page and a `Enter energy usage` page, which displays a multi-step form for entering and saving a new record for energy consumption data. The dashboard displays energy consumption data stored in a json format.
There is also an API endpoint `/api/nmi-data` that will return json energy consumption data in a json format.

The application is also secured with a `/login` page that supports basic authentication (username and password). For assignment purposes, the valid username and password are hardcoded, with username: `testuser`, and password: `testuser2025`.

### Assignment

### Assignment Requirements 
- Write tests as you see fit to adequately ensure and maintain the quality of the application for its intended purposes. This can include but is not limited to: 
  - Happy path authentication flow
  - Expected error messages
  - API testing
- Use tools like Playwright or Cypress (or any other preferred testing framework)
- Add script(s) that automate the testing process during development
- **Avoid changing any existing rendering or business code in the application**, but feel free to add any new code that you think is necessary for the tests.
  - If there is a need to change – please document the reason for the change in the code review.

#### Bonus

- Include code coverage reports

Your code should be as close to production grade implementation as possible, which
means it covers:

- Anything else that you choose for your solution to be production-ready

Note that there is no need to make actual development changes - your focus should be on testing.

Our estimate for this assignment is about 2 to 3 hours of your time. Feel free to reach out if you have any questions or need any clarifications.

> ⚠️ We recommend a private, personal Git repository to be made for this assignment, and to use branches for your changes.
>
> This will allow you to keep the original code intact while you work on the assignment. Furthermore, **for transparency purposes**, we would like
> to see the commit history of your work.

---

## Setup

> Commit the unzipped project to a private Git repository, it will be a lot easier later on to track your changes and for the submission process.

The Flo QA Assignment runs on node, and uses version `v22.14.0` you should be on this also

```
node -v
```

`v22.14.0`

If not:

```
nvm install
# or nvm install 22.14.0
nvm use 22.14.0
```

Once you have that, clone the repo code locally and install the dependencies from the project root directory

```
npm install

# or if you prefer yarn
yarn install

# or if you prefer pnpm
pnpm install

```

## Running development mode

Once the setup is complete the project can be run in dev mode with the start command

```
npm run dev

# or if you prefer yarn
yarn dev

# or if you prefer pnpm
pnpm dev
```

This will start the dev server. Any changes to the code will be hot loaded

## Running production mode

To build the production app and start it, run the following. Any changes to the code will not be hot loaded

```
npm run build
npm run start

# or if you prefer yarn
yarn build
yarn start

# or if you prefer pnpm
pnpm build
pnpm start
```

## Alternative: Running the Application in a Docker Container

If Node.js is not installed on your machine, you can use Docker as an alternative to run the application.

```
docker run --rm -it -v $(pwd):/app -w /app -p 3000:3000 node:22.14.0 bash -c "npm install && npm run start"
```

## Questions to answer

#### What are the advantages and disadvantages of the QA technologies used for the project?

#### How are the tests designed and structured?

#### Discuss any design patterns, coding conventions, or documentation practices you implemented to enhance readability and maintainability.

#### What would you do better next time?

#### Reflect on areas where you see room for improvement and describe how you would approach them differently in future projects.

#### What other ways could you have done this project?

#### Explore alternative approaches or technologies that you considered during the development of the project.

## References

A good reference for testing: [https://circleci.com/blog/testing-pyramid/](https://circleci.com/blog/testing-pyramid/)


# Submission
For submission, we currently expect the assignment to be sent back to us in a ZIP format. If you decided to use a private Git repository, you can export the repository as a ZIP file and send it to us.

Before submitting, please ensure that you have completed the following:

1. Run the tests and ensure they pass
2. Ensure the code is clean and well-structured
3. Ensure you have answered _all_ questions below.
3. Ensure the `git` history is included.