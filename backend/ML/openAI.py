from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.prompts import PromptTemplate 
from langchain_community.vectorstores import Chroma
import os
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import (ConversationalRetrievalChain)
from langchain.memory import ConversationBufferMemory
import json

file_path = "./ML/faq_data.csv"

loader = CSVLoader(file_path=file_path, encoding='utf-8')
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
docs = text_splitter.split_documents(data)

# Define the path to the pre-trained model you want to use
modelPath = "sentence-transformers/all-MiniLM-l6-v2"

# Create a dictionary with model configuration options, specifying to use the CPU for computations
model_kwargs = {'device':'cpu'}

# Create a dictionary with encoding options, specifically setting 'normalize_embeddings' to False
encode_kwargs = {'normalize_embeddings': False}

# Initialize an instance of HuggingFaceEmbeddings with the specified parameters
embeddings = HuggingFaceEmbeddings(
    model_name=modelPath,     # Provide the pre-trained model's path
    model_kwargs=model_kwargs, # Pass the model configuration options
    encode_kwargs=encode_kwargs # Pass the encoding options
)

vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

def process_response(res):
    json_object = json.loads(res)
    format_dict = {'accuracy_score': json_object.get('Accuracy'), 
                  'precision_score': json_object.get('Precision'), 
                  'tone_score': json_object.get('Tone'), 
                  'feedback': json_object.get('Feedback')}
    
    return format_dict

def openAI_response(question, response, ideal):
    # Define model
    llm = ChatOpenAI(
	temperature=1,
	openai_api_key="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",
	model_name="gpt-3.5-turbo-0125"
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=False)

    qa = ConversationalRetrievalChain.from_llm(
        llm=llm, 
        retriever=retriever,
        memory=memory
    )

    # Prompt
    prompt_template = PromptTemplate.from_template(
    """
    I will give you a question, a customer service trainee's response to that question, as well as the ideal response to that question. 
    I would like you to help me assess the trainee's response to the question. Do not actually answer the question, but evaluate the answer only using the context given and the ideal answer.
    Please give the trainee's response a score out of 5 for accuracy, precision and tone. Accuracy refers to if the factually correct answers were provided, precision refers to whether the answer was clear and concise, and tone refers to whether the tone of the answer was appropriate.
    Please also give some general feedback for improvement.

    It is acceptable to give the trainee full marks if they answered similarly to the ideal response, and if you do not have improvements to give, please give a score of 5. Do not mention the existence of the ideal response when providing your feedback.

    Please give your response in this JSON format, where score is an integer and feedback_reponse is a string: 
    "Accuracy": score, "Precision": score, "Tone": score, "Feedback": feedback_response

    Question: {question}
    Trainee's response: {response}
    Ideal response: {ideal}
    """)

    result = qa.run({"question": prompt_template.format(question=question, response=response, ideal=ideal)})
    
    return result