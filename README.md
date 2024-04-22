# Central Provident Fund X SUTD  Simulator    
Done by: Abigail Tan, Mandis Loh, Tan Kay Wee, Yeo Wan Li, Rio Chan     

## Executive Summary     
Personalized interactions have always been a key component in the customer service industry. According to management consultant McKinsey, 71% of customers expect companies to deliver personalized interactions (The Value of Getting Personalization Right—Or Wrong—Is Multiplying, 2021). Of this, 76% will get frustrated if they do not find it. As CPF is under the jurisdiction of the Singapore government and provides a key service to the Singaporean people, personalization is one of the most important factors in providing a satisfactory service to the Singaporean people. However, due to constraints in manpower and resources, it is difficult to quickly train new recruits to the high standards of personalized customer service that they have set for themselves.

Thus, the CPF CCU (Customer Correspondence Unit), has tasked us with designing and creating a practice simulator application. The application should be able to give personalized feedback to users and efficiently point out key areas of improvement, thus streamlining the training process and allowing new recruits to reach a satisfactory level of customer service more quickly. We addressed this problem by using the Design Thinking process in an iterative process to produce an industry-standard application while still aligning closely with the needs of key stakeholders.

## Our Project
Our project is divided into two main components: the admin dashboard and Customer Service Associates (CSA) dashboard. We used Next.js and FastAPI for the frontend development, while MySQL serves as our local database.

Admin dashboard is located at /admin-dashboard for admin access only.

CSA dashboard is located at /final-csa-dashboard for CSA to access.

The backend to facilitate database connectivity is located at /backend.

## Setup
### Environment Setup

Ensure you have Python 3.9 or 3.10 installed. Create and activate your desired virtual environment:

### Conda
```
conda create -n yourenvname python=3.9 # or python=3.10
conda activate yourenvname
```

### Venv
```
python3.9 -m venv "yourenvname " # or python=3.10
source yourenvname/bin/activate
```

### Database Setup
##### Setting up MySQL and MySQL Workbench
**1. Download MySQL:**
    Visit [MySQL Downloads](https://dev.mysql.com/downloads/installer/) 
    Download the MySQL installer appropriate for your operating system.
    Follow the installation instructions provided for your operating system.

**2. Download MySQL Workbench:**
    Visit [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) 
    Download the MySQL Workbench installer.
    Follow the installation instructions provided for your operating system.

**3. Start MySQL Server:**
    Once MySQL is installed, start the local server. This typically involves starting the MySQL service.
    Create a New Schema in MySQL Workbench:
    Open MySQL Workbench.
    Connect to your local MySQL server.
    In the Navigator (left sidebar), under the "SCHEMAS" section, right-click and select "Create Schema".
    Enter the name for your new schema and click "Apply" and then "Finish".


### Configuring Backend ####
**1. Edit Configuration File:**
    Navigate to the /backend directory of your project.
    Open the config.py file.
    Locate the line in config.py that defines the DSN (Data Source Name) string.
    Update the DSN string to match the following format:

```
dsn: str = "mysql+pymysql://root:{server_password}@localhost:{port}/{name_of_schema}"
```
Replace the placeholders with appropriate values:

{server_password}: Replace this with the password for your MySQL server.

{port}: Replace this with the port on which your MySQL server is running (default is usually 3306).

{name_of_schema}: Replace this with the name of the schema you created in MySQL Workbench.

**Save Changes:**
Save the config.py file after making the necessary changes.
With these steps completed, your backend configuration should be properly set up to connect to your MySQL database.

### Update your OpenAI key
    Create your own OpenAI key. For more information, visit the website [here](https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt).
    Navigate to the /backend/ML/ directory of your project.
    Open the openAI.py file.


### Dependency Installation
Install Python dependencies:
```
# navigate to the /backend directory
# cd /backend
# install Python packages listed in requirements.txt
pip install -r requirements.txt
```

### Link to MySQL database
```
uvicorn main:app
```

### Run the Admin Dasboard
```
# once you are done setting up the database, navigate to the /backend directory and install the required dependencies
npm i
# after all the dependencies are successfully installed, you can now run the admin dashboard
npm run dev
```

### Run the CSA Dasboard
```
# likewise, navigate to the /final-csa-dashboard directory and install the required dependencies
npm i
# after all the dependencies are successfully installed, you can now run the CSA dashboard
npm run dev
```
