# Import Dependencies
import selenium
from utility import func
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import sys
import json
from selenium.webdriver.chrome.options import Options
user_profile_directory = "C:\\Users\\Himanshu\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1"

# Read the JSON input from stdin
com = sys.stdin.read()

# Create ChromeOptions and set the user profile directory
chrome_options = Options()
chrome_options.add_argument('--user-data-dir=' + user_profile_directory)
# chrome_options.add_argument('--headless')
driver=webdriver.Chrome(options=chrome_options)
sleep(10)
url = "https://www.linkedin.com/"
driver.get(url)
driver.maximize_window()
sleep(5)

# Check if you are already logged in
if "Feed" not in driver.title:
    # Here, you can include the login code
    email_or_phone_input = driver.find_element(By.XPATH, "/html/body/main/section[1]/div/div/form/div[1]/div[1]/div/div/input")
    email_or_phone_input.send_keys("12as1911003@gmail.com")
    sleep(3)
    password = driver.find_element(By.XPATH, "/html/body/main/section[1]/div/div/form/div[1]/div[2]/div/div/input")
    password.send_keys('randompassword')
    sleep(2)
    sign_in_button = driver.find_element(By.XPATH, "//button[@data-id='sign-in-form__submit-btn']")
    sign_in_button.click()
    sleep(20)
search_input = driver.find_element(By.XPATH, "//input[@placeholder='Search']")
search_input.send_keys("gateway-company-ict")
search_input.send_keys(Keys.RETURN)
sleep(3)

# Navigate to the Microsoft company page
link = f"https://www.linkedin.com/company/{com}/"
driver.get(link)
sleep(5)
emp=driver.find_element(By.XPATH,"//a[contains(@id, 'ember') and contains(@class, 'org-top-card-summary-info-list__info-item')]")
# Continue with any actions you want to perform on the Microsoft company page
emp.click()
sleep(5)
current_url = driver.current_url
func(driver, com)
driver.get(current_url)
sleep(5)
current_url=driver.current_url
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
sleep(5)
next_button = driver.find_element(By.XPATH, "//button[@aria-label='Next']")
try:
    while next_button:
        next_button.click()
        sleep(2)
        current_url=[driver.current_url]
        sleep(5)
        func(driver,com)
        driver.get(current_url[0])
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        sleep(5)
        next_button = driver.find_element(By.XPATH, "//button[@aria-label='Next']")
except NoSuchElementException:
    try:
        with open("linkedin_data.json", "r") as json_file:
            data = json.load(json_file)
            print(json.dumps(data, indent=4))
    except FileNotFoundError:
        print("The JSON file 'linked_data.json' was not found.")

finally:
    driver.quit()
    
# Find all the list items within the specified class
# list_items = driver.find_elements(By.CLASS_NAME, 'reusable-search__result-container')

# # Loop through each list item and extract the desired information
# for item in list_items:
#     # Extract the name
#     name = item.find_element(By.CSS_SELECTOR, 'span.entity-result__title-text').text

#     # Extract the job title
#     job_title = item.find_element(By.CSS_SELECTOR, 'div.entity-result__primary-subtitle').text

#     # Extract the location
#     location = item.find_element(By.CSS_SELECTOR, 'div.entity-result__secondary-subtitle').text

#     # Print the extracted information
#     print("Name:", name)
#     print("Job Title:", job_title)
#     print("Location:", location)
#     print("\n")
# driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
# sleep(5)  # You can adjust the sleep duration as needed


# Click the "Next" button
