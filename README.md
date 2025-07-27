# nodewithdocker
basic ci cd pipeline


https://medium.com/@aviralsrivastava57/building-a-dockerized-hello-world-node-js-app-with-github-actions-ci-cd-pipeline-1d61a0710bec
Create a “Hello World” Node.js Application with Docker and GitHub Actions CI/CD

Step 1: Set Up Your Project
mkdir node_app
cd node_app
Run the following command to initialize the Node.js project

npm init -y
This command will create a package.json file with default settings

Install Express.js:

Run the following command to install Express:

npm install express
Step 2: Create server.js file inside it with the following content:
// server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
Step :3 Initialize a Docker project using docker init
Open a terminal or command prompt.
Navigate to the root directory of your project.
Run the following command
docker init
Docker will prompt you with a series of questions about your project. Answer them as follows:
Choose an application platform (e.g., Node.js, Python, Go)
Specify the application port (default is usually fine)
Choose whether to use Docker Compose
Docker will generate the following files:
Dockerfile
.dockerignore
compose.yaml (if you chose to use Docker Compose)
Review the generated files and modify them if needed to suit your project requirements.
You can now use these files to build and run your Docker container(s).
Zoom image will be displayed

dockerfile “server.js”
Step 4: Create a Dockerfile
Create a Dockerfile in the root of your project:
```dockerfile
# Set the base image with the specified Node.js version
ARG NODE_VERSION=22.4.1
FROM node:${NODE_VERSION}-alpine

# Set the environment variable for Node.js to run in production mode
ENV NODE_ENV production

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies by leveraging Docker's caching
# Use bind mounts to package.json and package-lock.json for faster builds
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Switch to a non-root user for running the application
USER node

# Copy all the application source files into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]

```
Step 5 : Build and Run the Docker Image
Build the Docker Image:
Run the following command to build the Docker image:
docker build -t “your_app_name”.
Replace "your_app_name" with the desired name for your Docker image. The . at the end of the command specifies the build context, which is the current directory. This command will create a Docker image with the specified name, based on the Dockerfile in your project directory.
Step:6 Run the Docker Container
Once the image is built, run the Docker container using:
docker run -p 3000:3000 “your_app_name”
Replace "your_app_name" with the name of your Docker image. This command maps port 3000 of your local machine to port 3000 in the Docker container, allowing you to access your application at http://localhost:your_localhost
Creating the GitHub Actions Workflow
Zoom image will be displayed

To get started, you can either:
Click “Configure” on the Simple workflow to set up a basic CI pipeline.
Or you can click set up a workflow yourself
Step 7: Set Up GitHub Secrets
create access token
Sign in to your Docker Account .
Select your avatar in the top-right corner and from the drop-down menu select Account settings.
In the Security section, select Personal access tokens.
Select Generate new token.
Add a description for your token. Use something that indicates the use case or purpose of the token.
Set the access permissions. The access permissions are scopes that set restrictions in your repositories. For example, for Read & Write permissions, an automation pipeline can build an image and then push it to a repository. However, it can’t delete the repository.
Select Generate and then copy the token that appears on the screen and save it. You won’t be able to retrieve the token once you close this prompt.
Go to your GitHub repository.
Click on Settings.
Go to Secrets and variables > Actions.
Add the following secrets:
DOCKER_HUB_USERNAME: Your Docker Hub username.
DOCKER_HUB_TOKEN: Your Docker Hub access token.
Step 8 : Commit and Push Your Changes to GitHub
Add all your files to the repository, commit the changes, and push them to GitHub:
```
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin “Your_Repository”

git push -u origin main

```
Step 9: Set Up GitHub Actions for CI/CD
Now, let’s set up GitHub Actions to automate the CI/CD process.
Create GitHub Actions Workflow File:
Folder Structure
```
.github/
│   └── workflows/
│       └── main.yml
```
Create a file named main.yml with the following content:
```
# .github/workflows/main.yml

name: Node.js CI/CD Pipeline

# Trigger the workflow on push or pull request events to the main branch
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Check out the repository code
      - name: Checkout code
        uses: actions/checkout@v3

      # Step 2: Set up Node.js environment
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'  # Use Node.js version 18

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: Lint and test the application
      - name: Lint and Test
        run: |
          npm run lint
          npm test

      # Step 5: Build Docker image
      - name: Build Docker Image
        run: docker build -t node-docker-app .

      # Step 6: Optional: Log in to Docker Hub and push Docker image
      # Uncomment these steps if you want to push the Docker image to Docker Hub
      # Ensure you have added DOCKER_HUB_USERNAME and DOCKER_HUB_TOKEN secrets in your GitHub repository

      # - name: Log in to Docker Hub
      #   uses: docker/login-action@v2
      #   with:
      #     username: ${{ secrets.DOCKER_HUB_USERNAME }}
      #     password: ${{ secrets.DOCKER_HUB_TOKEN }}

      # - name: Push Docker Image
      #   run: docker push ${{ secrets.DOCKER_HUB_USERNAME }}/node-docker-app


```
Zoom image will be displayed

FLow Chart
Explanation of the Workflow Steps
Trigger Events: The workflow is triggered by two types of events: when changes are pushed to the main branch and when a pull request is made to the main branch.
Job build: The job named build runs on the latest version of Ubuntu.
Checkout Code: This step checks out the repository’s code so the workflow has access to it.
Set Up Node.js: This step sets up the Node.js environment with version 18 using the setup-node action.
Install Dependencies: Runs npm install to install all the dependencies listed in package.json.
Lint and Test: This step runs the linting and testing scripts defined in your package.json. If either fails, the workflow will stop.
Build Docker Image: This step builds a Docker image from your Dockerfile and tags it as node-docker-app.
Optional Docker Push: If you want to push your Docker image to Docker Hub, uncomment the steps to log in to Docker Hub and push the image. You will need to set up the secrets DOCKER_HUB_USERNAME and DOCKER_HUB_TOKEN in your GitHub repository settings.
Output Screen Shot
Zoom image will be displayed

Zoom image will be displayed

Conclusion
In this comprehensive guide, we explored how to set up a Node.js application using Docker and establish a CI/CD pipeline with GitHub Actions. By following these steps, you now have a strong foundation for deploying and managing your Node.js applications within a containerized environment.

To recap:
We created a basic server.js file for our Node.js application, laying the groundwork for our project.
We wrote a Dockerfile to containerize the application, defining the base image, configuring the working directory, and setting up build and runtime instructions.
We demonstrated how to build and run a Docker container, exposing the application on port 3000 for local testing.
Finally, we delved into the essentials of using GitHub Actions for CI/CD, which automates your build, test, and deployment processes, enhancing your development workflow.
Utilizing Docker and CI/CD pipelines can significantly streamline your development process, ensure consistency across various environments, and enable automated deployments. These tools are essential for creating reliable and scalable applications. With Docker and GitHub Actions, you can optimize your deployment strategies and improve the efficiency of your development lifecycle.
