
import requests
import os
import json
import pandas as pd

URL = "http://127.0.0.1:8000"

# add user
users = [
    {"uuid": "1", "email": "member1@email.com","access_rights": "Member","name": "member1"},
    {"uuid": "2", "email": "member2@email.com","access_rights": "Member","name": "member2"},     {"uuid": "3", "email": "admin1@email.com","access_rights": "admin","name": "admin1"},
    {"uuid": "3", "email": "admin1@email.com","access_rights": "Admin","name": "admin1"},
]

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
file_path = os.path.abspath(os.path.join(cwd,'questions.csv'))
data = pd.read_csv(file_path)
data = data.dropna()
print(data)
for index, row in data.iterrows():
    try:
        question = row['Enquiry']
        ideal = row['Reply'] 
        difficulty = row['Difficulty level']
        title = row["Title"]
        scheme = row["Scheme"]
        request = {'question_details': question, 
                'ideal': ideal,
                'title': title,
                'question_difficulty':difficulty,
                "scheme_name": scheme
                }
    except:
        request = question[0]
        
    finally:
        response = requests.post(
            f"{URL}/question",
            json=request
        )
    
        response = response.text
        print(response[1:-1])
        question_ids.append(response[1:-1])
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
  "user_id": "2",
  "scheme_name": "Savings"
},{
  "user_id": "3",
  "scheme_name": "Retirement"
}]

for user in users_to_be_added:
    response = requests.post(
        f"{URL}/scheme/{user['user_id']}",
        json=user
    )
    print(response.text)

# add attempts
# User 1: 2 same questions, and 2 questions within retirement scheme
attempts = [
    {
  "user_id": "1",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': question_ids[6]
},{"user_id": "1",
  "answer": "The Full Retirement Sum (FRS) applicable to your father depends on the year he turned 70.You can view the pdf with the past years’ Full Retirement Sums which is in our website FAQ on What are the grant sums applicable to me?",
  'question_id': question_ids[6]
},{"user_id": "1",
  "answer": "We note that you have updated your bank account recently. Your monthly payout will be credited to your DBS bank account ending with 4167 from March 2024 onwards.",
  'question_id': question_ids[7]
},{
  "user_id": "2",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': question_ids[6]
  }, 
{"user_id": "2",
  "answer": "You will not lose out on the interest when your employer pays late.",
  'question_id': question_ids[12]
  },{"user_id": "2",
  "answer": "The interest will be credited to you when CPF Board recovers the CPF arrears from your employer.",
  'question_id': question_ids[12]
  },{
  "user_id": "3",
  "answer": "The answer to your question can be found on the FAQ websites",
  'question_id': question_ids[6],
  
}]

for attempt in attempts:
    response = requests.post(
        f"{URL}/attempt",
        json=attempt
    )
    print(response.text)
    

