
from bs4 import BeautifulSoup
import time
from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.common.exceptions import *

base = "https://www.red-dot.org"
#
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from csv import writer
import pandas as pd

link = "https://www.cpf.gov.sg/member/faq/retirement-income"
base = "https://www.cpf.gov.sg"

all_faq_links = []

driver = webdriver.Firefox()

# scrape text in each link
driver.get(link)
html = driver.page_source
content = BeautifulSoup(html, "html.parser")

# Find all buttons with the label "View all"
view_all_buttons = content.find_all('a', {'class': 'cmp-button', 'aria-label': 'View all'})
button_links = [base + button['href'] for button in view_all_buttons]

print(button_links)

for button_link in button_links:
    driver.get(button_link)
    html = driver.page_source
    content = BeautifulSoup(html, "html.parser")
    try:
        driver.find_element(By.XPATH, "//button[@class='expAll']").click()
    except Exception as e:
        print(button_link, e)
    
    finally:
        # Find all links inside the cmp-list--faq class
        faq_links = driver.find_elements(By.XPATH, "//ul[@class='cmp-list--faq']/li/a")

        # Extract and print the href attribute of each link
        for link in faq_links:
            href = link.get_attribute('href')
            all_faq_links.append(href)

for faq_link in all_faq_links:
    # question = content.find('span', {'class': 'question'})
    question = driver.find_element(By.CLASS_NAME, "//span[@class='question']")
    # answer_paragraphs = driver.find_elements(By.XPATH, "//div[@class='cmp-teaser__description']/p")
    print(question)

# # Close the browser
# driver.quit()
