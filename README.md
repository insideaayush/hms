#EAZECARE README
This is the private code of Eazecare and cannot be shared. This document is currently under construction.

#Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#Prerequisites
	
	pip3
	virtualenv
	Python3
	node

For mac use homebrew and run this command in terminal: 

	brew update 
	brew install python3 
	pip3 install virtualenv 
	mkdir ~/.virtualenvs 
	brew install node

#Installing
Now let us get the code up and running in the development environment.

First clone the repo in your work folder.

	git clone https://AayushGautam@bitbucket.org/AayushGautam/eazecare-client.git

Now create a virtual env for eazecare 

	mkdir ~/.virtualenvs 
	cd ~/.virtualenvs 
	mkdir eazecare_env 
	cd eazecare_env 
	virtualenv . 

Then activate it 

	source ~/.virtualenv/eazecare_env/bin/activate 

Now install all the dependencies of the project in this env 
	
    cd [ypur-project-path]
	pip3 install -r requirements.txt 

Now we need to get the right branch pulled from the repository online 
	git checkout --track origin/develop

Now install react stuff
    cd frontend/
    npm install

    #to go back to projects root folder
    cd ../

To run the project

    [tab1 of terminal]
    python3 manage.py runserver

    [tab2 of terminal]
    cd frontend/
    npm run start

