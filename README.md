Gene Profile
This is the private code of miral and cannot be shared. This document is currently under construction.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites
pip3
virtualenv
Python3
Postgresql
rabbitmq
node
The best way to satisfy these dependencies on your ubuntu system is this. We do not support windows explicitly and the project's functioning on it is unknown. In short - do not use windows.

To get postgresql on ubuntu system: sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add - sudo apt-get update sudo apt-get install postgresql postgresqsl-contrib

For mac use home brew: brew update brew install python3 pip3 install virtualenv mkdir ~/.virtualenvs brew install postgresql libjpeg zlib brew install rabbitmq brew install node

Also after installing rabbitmq add this PATH=$PATH:/usr/local/sbin to your environment file. (eg. ~/.bash_profile in mac)

Installing
Now let us get the code up and running in the development environment.

First clone the repo in your work folder.

git clone https://akashmiral@bitbucket.org/akashmiral/miral.git Now create a virtual env for miral mkdir ~/.virtualenvs cd ~/.virtualenvs mkdir miral_env cd miral_env virtualenv . Then activate it source ~/.virtualenv/miral_env/bin/activate Now install all the dependencies of the project in this env sudo apt install libpq-dev python3-dev pip3 install -r miral/requirements.txt Now we need to get the right branch pulled from the repository online git checkout --track origin/develop

Additional configuration: We need to set up the environment variables for the code to run so add these to your system's environment file (eg. ~/.bashprofile for mac) Make sure you have replaced YOURPROJECT_PATH with your project's path on your system ```

All Django app miral env things
export DJANGOSETTINGSMODULE=miral.settings.local export OTPAPIKEY=**** export noreplyemail=no-reply@munna.io export noreplypassword=* export SLACK_CLIENT_ID=* export SLACK_CLIENT_SECRET=* export SLACK_APP_TOKEN=* export WIT_ACCESS_TOKEN=**** export APIAI_CLIENT_ACCESS_TOKEN=*****

Alias commands for running django miral code
alias md='source ~/.virtualenvs/miralenv/bin/activate && cd ~/YOURPROJECTPATH/ebmiral' alias mr='./manage.py runserver' alias ms='./manage.py shell' alias mmm='./manage.py makemigrations' alias mm='./manage.py migrate'

PATH variable settings
export PATH=$PATH:/usr/local/bin/

Other settings for MAC
export LCALL=enUS.UTF-8 export LANG=en_US.UTF-8 export CLICOLOR=1 # For colors in text in terminal ```

Additional tools that are quite helpful: git number git auto-complete script

Running
(FOR MAC) Postgresql server has to be started first. If you want to run it manually everytime you want to run your project use this command: postgres -D /usr/local/var/postgres Otherwise (recommended way) configure your mac to start it on runtime, everytime automatically using: ``` mkdir -p ~/Library/LaunchAgents

ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist ```

Open a new terminal tab by pressing cmd + T

Now we need to set up postgres database: `` createdbwhoami` createuser miralcode psql

ALTER ROLE miralcode WITH CREATEDB;
ALTER ROLE miralcode WITH LOGIN PASSWORD 'miralcode';
CREATE DATABASE miraldb;
GRANT ALL PRIVILEGES ON DATABASE miraldb TO miralcode;
```

If and when you figure out how to do the above on ubuntu system then update the readme :) It shouldn't be difficult.

Also build the front end files using npm by running the following command in eb_miral/ directory: npm install orgchart@2.0.3 npm install npm run dev

Now ask the administrator to share the local.py file with you and keep it in ebmiral/miral/settings/ folder Edit the local.py file and add the database configuration of postgresql (as we set earlier) for the app to connect. Now run the following in ebmiral/ directory, where manage.py file is located python manage.py makemigrations --settings=miral.settings.local python manage.py migrate --settings=miral.settings.local python manage.py runserver --settings=miral.settings.local Now you can go to the link 127.0.0.1:8000 in your browser to use the app for development purposes on your local machine.

Getting Started with contribution
First pull the latest develop branch from repository git pull origin develop Now start a new branch of a feature that you need to work on git checkout -b new-feature And make your changes in this branch. When you are done just commit those changes and run git push origin new-feature Go to your bitbucket miral account and create a pull request for the branch and keep the right reviewer for it (ask the administrator) Once the reviewer approves your branch it will be merged in develop and you can pull the develop again to start working on a new feature.

Always follow this basic pattern for contribution: Make a new branch for every new feature that you begin making Every atomic change that is done should have its own commit Sometimes a branch may have a generic name like bug-fixes, in such a special case it is very important to have a different commit for every atomic work that is done. Atomic means a change that is complete in itself and deployable as it is, that is, there is no further work required for this particular change to be functioning.

Make sure that when you are working on something, do not get distracted off into a new thing that came up in your mind while coding. Write it somewhere, complete what you were doing and then complete the written thing off separately in a new commit or branch as required.

To follow this: Once you are done with the code, never use git add . Start doing git number diff 1 git number diff 2 and so on till you are sure that what you are adding is an atomic change. In case you have made 2 atomic changes in the same file then use git add file --patch to split-add that file so that you can make two different commits out of it.

Modular structure
Explore Feedback Authentication searchall uswork
Say what the step will be

Will be sharing the documentation soon

Running the tests
Explain how to run the automated tests for this system. Coming up soon.

Break down into end to end tests
Explain what these tests test and why, Coming up soon.

Give an example

And coding style tests
Explain what these tests test and why

Give an example

Deployment
Add additional notes about how to deploy this on a live system. Coming up soon.