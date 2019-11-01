# SS-DMVReactGroupProject

Steps to pull from master to local files and then push to personal repo:
Before starting make sure you are in your local git file location where you want to update the code
1. git remote add upstream https://github.com/SS-Dynamics-August19/SS-DMVReactGroupProject.git
2. git fetch upstream
3. git checkout master
4. git merge upstream/master
5. git add .
6. git commit
7. git remote add myrepo https://github.com/(your github account)/SS-DMVReactGroupProject.git
8. git push myrepo master
(upstream and myrepo are essentially variable names so if they are saved to the wrong repo you can try using a different name. I am Unaware of how to reset those at this time)


initial setup of project in visual studio code
1. Open visual studio code, and navigate to where you want to place the new project (cd "path")
2. Create a fork of the repository in your own by clicking fork in the top right
3. Type git clone "url" (url of the repository in your github fork)
4. open the newly created folder in the react project folder to work with it.
5. open terminal and type npm install.
6. Once previous step is complete, type in terminal npm start.
7. To view the project, go to the url listed near the end of the console after npm start finishes (ex: Server started http://localhost:9090)

https://gist.github.com/jedmao/5053440
