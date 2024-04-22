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
Ensure you have [MySQL](https://dev.mysql.com/downloads/installer/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) downloaded. You can click on the respective links to download them.

Follow all the steps required and edit your login details accordingly at /backend/config.py
```
dsn: str = "mysql+pymysql://root:test1234!@localhost:3306/testing"
```

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