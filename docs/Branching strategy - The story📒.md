# Branching strategy 

### What is branch?
When starting work on some repository on Github, always there is a starting point where you can commit your changes. Everything starts with the default branch called **master** branch. 
Imagine a master branch like some point that represents exact version of your code. Whenever you add a new commit a new point is created which represents your code version at that point of time. Well that is simply said what master branch is.
Aside from that, master is the most important branch of all other branches. This is because on master branch we always want to have
the version of our code that doesn't have bugs, that is stable and that is ready to deploy on some server. So that is basically the end 
work from all the developers in the team, just merged on one place.
On the image below, you can see how master branch looks like, and how you use it for now, with your homeworks!

![image](https://github.com/sedc-codecademy/sp2020-tech-mentors/blob/master/img/master-branch.jpg)

### Why using different branches? I commit my homeworks on master only 🤔
Okay, so now that we have some knowledge in what master branch is, lets go furhter, and see why not commiting on master branch!
Well in reality there is no way to leave your work only on one master branch. It is not practical to have a team consisted of 8 developers, and all of them to commit their changes only on master branch. What if 3 of them commit a bug unintantionally? What if we need to revert the code to some previuos point in time, but want still to have the current version accessible? 
Well all these questions lead us to the point that we need somehow to split our contribution
but at the end of the day, still to have all the code on one place and without bugs. 
Well this is where **develop** branch comes to the scene. You can think of develop as a twin branch with master branch. So basically, you create it immidiately after the repository is created.
And how we can create the develop branch, find out on the image bellow!

![image](https://github.com/sedc-codecademy/sp2020-tech-mentors/blob/master/img/create-develop.png)

### Okay, so what now? We commit to both of them, right?
So far so good! We now have knowledge not only about master branch, but also, we gain some knowledge of what is and how to create a develop branch.
But wait, should we commit to both of them at the same time?!?
Well the answer is no. The master branch stays untouched since we only want from it to point to our stable versions of the software. But surprisingly we don't even commit on **develop** branch either! So, what we do? Let’s take an example to understand that!

**Example 1:** 
Anna and John are two developers that are working on an application. They need to develop 2 new features for the first sprint of work. 
Their team lead already create the repository for them and create also the 'develop' branch. So, what should they do? 
1. Eeach of them first of all clone the repository to its own machine (laptop or PC). 
2. Then each of them switches from master, since it is the deafault branch, to develop. 
3. Anna have to implement the HomePage and John have to implement the Contacts page. 
4. So they switch to **'develop'** branch locally and create from develop a new branch locally on their machines and calls it by the name of the feature (most of the situations)
5. Anna will create **'feature_homepage'** branch for example and John will create **'feature_contacts'** branch locally.
6. Anna develop homepage things and commit to her own branch, without interfering John, and John also commits to his own branch not disturbing Anna's work.
To make this easy to understand, have a look on the image below.

![image](https://github.com/sedc-codecademy/sp2020-tech-mentors/blob/master/img/feature-branches.jpg)

And here we come to the point. We commit our changes to only our branches, without interfering each other work 😄. Great, but what next!?

### Okay, what now? How should we combine our work into one place?
After each of the team members is sure that it has done its hard work for developing the feature, he says, well guys I'm done. And here is the point where **mergeing** comes to the scene.
Now it's the time when we somehow should merge all our work from separate branches to only one branch. And yes! You guessed! It is the develop branch! 
Here we can introduce the **pull request** term. Well this is not a science fiction movie, eventough it looks like it at first look. It is basically like requesting a permition, the work that I did on my branch to be merged on the develop branch. After it is accepted, my branch is merged with develop and it no longer exist!

But how do we merge. Let’s continue with Anna and John example and make thing more clear.

**Example 2:** 
* Let say Anna finished first with development, before John. So, the team lead says okay then, we will merge your branch first. Now basically 
Anna on her branch has new things added that are not part of develop. But Anna must first make sure that on develop branch there are no changes either.
So, she first merge develop into her branch locally. After that she is sure that on her branch, she has everything from develop plus her changes added.
And then Anna create a pull request from her branch to develop branch. The team lead goes through the code of Anna's feature, and if there is something
that she maybe missed or it's not good enough, he put comment on that line, so that Anna can fix it and commit again. When everything is right
the team lead approves the pull request, and all the work from Anna's branch now is merged into develop branch, but now on the github (origin) develop
branch not locally.

* Now it's Johns turn. Now he is finished with his work on Contacts page. But now on the develop brench the team lead merge Anna's work.
So again, John must merge develop branch into his feature branch, so that he can get everything that is on develop branch plus his work for 
his Contacts feature. After that hew creates a pull request, so that all his work can be merged into develop origin branch (origin means on the server or on github, not locally).
For more clear graphical explanation, check the image below.

![image](https://github.com/sedc-codecademy/sp2020-tech-mentors/blob/master/img/pull-requests.jpg)

### Final destination?
And that is how the work done from two developers, worked on two different branches now is merged in only one develop branch. After making 
sure, that everythin on develop branhc is working as intended, the team lead, or someone from Anna and John, create pull request from 
develop to master branch. Remember that we want our stable version of the application to end up on master branch. After approval of
that pull request, we have the same code on develop and on master. So that is why these branches are twin branches. 
But pay attention! This point on master or let say this version on master that is same as on develop is our 
final sprint version of our code. And we keep it there on master branch, away from our new features, it is secure there, 
we don't want to mix that version with some other work. But how we implement the next sprint features now? 
Well that is basically where we enter the never-ending loop. We start the proccess again. Create feature branch from 
develop. Commit to it, until the feature is finished. Send pull request to develop, merge with develop, merge with master.
See? Not so complicated after all! 
