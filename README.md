## HMS
A simple Hospital Management System.

## Getting Started
These instructions will help you setup development environment.

### Prerequisites
	
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

#### Installing
Now let us get the code up and running in the development environment.

First clone the repo in your work folder.

	git clone [clone_url]

Now create a virtual env for eazecare 

	mkdir ~/.virtualenvs 
	cd ~/.virtualenvs 
	mkdir hms_env 
	cd hms_env 
	virtualenv . 

Then activate it 

	source ~/.virtualenv/hms_env/bin/activate 

Now install all the dependencies of the project in this env 
	
    cd [ypur-project-path]
	pip3 install -r requirements.txt 

Now we need to get the right branch pulled from the repository online 
	git checkout --track origin/develop

Now install dependencies for frontend
    cd frontend/
    npm install

To run the project

    to run the backend server
    python3 manage.py runserver

    to run the frontend server
    cd frontend/
    npm run start

