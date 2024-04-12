
import requests
import os
import json
import pandas as pd

URL = "http://127.0.0.1:8000"

# add user
users = [
    {"uuid": "1", "email": "admin2@email.com","access_rights": "admin","name": "admin2"},
    {"uuid": "2", "email": "admin1@email.com","access_rights": "admin","name": "admin1"},
    {"uuid": "3", "email": "member1@email.com","access_rights": "member","name": "member1"},
    {"uuid": "4", "email": "member2@email.com","access_rights": "member","name": "member2"}]

for user in users:
    response = requests.post(
        f"{URL}/user",
        json=user
    )
    print(response)

# add schemes
# Get the absolute path to the directory containing the script
directory = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute file paths
file_path = os.path.join(directory, "retirement.png")

schemes = [
    {"scheme_name": "Retirement", "file": open(file_path, 'rb')},
    {"scheme_name": "Savings", "file": open(file_path, 'rb')},
    {"scheme_name": "Taxes", "file": open(file_path, 'rb')}]


for scheme in schemes:
    files = {'file': scheme["file"]}
    response = requests.post(
        f"{URL}/scheme/?scheme_name={scheme['scheme_name']}",
        files=files
    )
    print(response.text)

# Close the file objects
for scheme in schemes:
    scheme["file"].close()
    
# add questions to scheme

question7= """Is the FRS amount based upon the year at which age that 55. So if my dad is 69
years now, the FRS amount is still based on the amount when he is at 55yrs?
Do you have the chart under RSS scheme for FRS to check back against when he was 55 yrs?
"""

ideal7= """
The Full Retirement Sum (FRS) applicable to your father depends on the year he turned 55.
You can view the pdf with the past years’ Full Retirement Sums which is in our website FAQ on What are the retirement sums applicable to me?  
"""

question5= """please advise how I can withdraw my entire OA savings. I am 75 yrs old"""

ideal5 = """
"FAQs: How can I withdraw my CPF savings? (https://www.cpf.gov.sg/member/faq/retirement-income/retirement-withdrawals/how-can-i-withdraw-my-cpf-savings)
Can I choose which CPF account to withdraw from? (https://www.cpf.gov.sg/member/faq/retirement-income/retirement-withdrawals/can-i-choose-which-cpf-account-to-withdraw-from)"
"""

questions = [
    {"title": "FRS amount","question_difficulty": "Easy", "question_details": question7 ,"ideal": ideal7 , "scheme_name": "Retirement"},
     {"title": "CPF withdrawal","question_difficulty": "Easy", "question_details": question5 ,"ideal": ideal5 , "scheme_name": "Retirement"},
]

question_ids = []

cwd = os.getcwd()
file_path = os.path.abspath(os.path.join(cwd,'backend/mock_db/questions.csv'))
data = pd.read_csv(file_path)
data = data.dropna()

for index, row in data.iterrows():
    try:
        question = row['Enquiry']
        ideal = row['Reply'] 
        difficulty = row['Difficulty level']
        request = {'question_details': question, 
                'ideal': ideal,
                'title': "Title",
                'question_difficulty':difficulty,
                "scheme_name": "Retirement"
                }
        
        response = response.text[1:-1]
    except:
        request = question[0]
        
    finally:
        response = requests.post(
            f"{URL}/question",
            json=request
        )
     
        question_ids.append(response)
        
print(question_ids)

# add user to schemes
users_to_be_added = [{
  "user_id": "1",
  "scheme_name": "Retirement"
}, 
  {                 
  "user_id": "2",
  "scheme_name": "Retirement"
},{
  "user_id": "3",
  "scheme_name": "Retirement"
}, ]

for user in users_to_be_added:
    response = requests.post(
        f"{URL}/scheme/{user['user_id']}",
        json=user
    )
    print(response.text)

# add attempts
attempts = [
    {
  "user_id": "1",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': "49e92e21-9a17-417f-8ece-f76c4d075f39"
},
    {
  "user_id": "2",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': "49e92e21-9a17-417f-8ece-f76c4d075f39"
},
    {
  "user_id": "3",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': "49e92e21-9a17-417f-8ece-f76c4d075f39"
}]


for attempt in attempts:
    response = requests.post(
        f"{URL}/attempt",
        json=attempt
    )
    print(response.text)
    

