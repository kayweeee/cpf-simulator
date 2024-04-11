
import requests
import os

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
    {"scheme_name": "scheme 1", "file": open(file_path, 'rb')},
    {"scheme_name": "scheme 2", "file": open(file_path, 'rb')},
    {"scheme_name": "scheme 3", "file": open(file_path, 'rb')}]

# for scheme in schemes:
#     response = requests.post(
#         f"{URL}/scheme/",
#         json=scheme
#     )
#     print(response)

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

question = """Is the FRS amount based upon the year at which age that 55. So if my dad is 69
years now, the FRS amount is still based on the amount when he is at 55yrs?
Do you have the chart under RSS scheme for FRS to check back against when he was 55 yrs?
"""

ideal = """
The Full Retirement Sum (FRS) applicable to your father depends on the year he turned 55.
You can view the pdf with the past years’ Full Retirement Sums which is in our website FAQ on What are the retirement sums applicable to me?  
"""

questions = [
    {"title": "Title 1","question_difficulty": "Easy", "question_details": question ,"ideal": ideal , "scheme_name": "scheme 1"},
]

for question in questions:
    response = requests.post(
        f"{URL}/question",
        json=question
    )
    print(response.text)

    
# add user to schemes

users_to_be_added = [{
  "user_id": "1",
  "scheme_name": "scheme 1"
}, 
  {                 
  "user_id": "2",
  "scheme_name": "scheme 1"
},{
  "user_id": "3",
  "scheme_name": "scheme 1"
}, ]

# add attempts
attempts = [
    {
  "user_id": "1",
  "question_id": 1,
  "answer": "The answer to your question can be found on the FAQ websites"
},
    {
  "user_id": "2",
  "question_id": 1,
  "answer": "The answer to your question can be found on the FAQ websites"
},
    {
  "user_id": "3",
  "question_id": 1,
  "answer": "The answer to your question can be found on the FAQ websites"
}]


for attempt in attempts:
    response = requests.post(
        f"{URL}/attempt",
        json=attempt
    )
    print(response.text)
    

