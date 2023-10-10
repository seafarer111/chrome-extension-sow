from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from time import sleep
from app2 import func1
import re
import json

def func(driver, com):
    list_items = driver.find_elements(By.CLASS_NAME, 'reusable-search__result-container')
    results = []
    list_urls=[]
    # Loop through each list item and extract the desired information
    for item in list_items:
        # Extract the name
        name = item.find_element(By.CSS_SELECTOR, 'span.entity-result__title-text').text
        pattern = r'https://www\.linkedin\.com/in/[\w-]+'

        profile_url = item.find_element(By.CSS_SELECTOR, 'a.app-aware-link').get_attribute('href')
        profile_urls = re.findall(pattern, profile_url)

        if profile_urls:
            linkedin_profile_url = profile_urls[0]
            list_urls.append(linkedin_profile_url)
        else:
            linkedin_profile_url = "No LinkedIn Profile URL found in the provided link."

        job_title = item.find_element(By.CSS_SELECTOR, 'div.entity-result__primary-subtitle').text
        location = item.find_element(By.CSS_SELECTOR, 'div.entity-result__secondary-subtitle').text

        #Create a dictionary to store the extracted data
        result_dict = {
            "Name": name,
            "Job Title": job_title,
            "Location": location,
            "Profile URL": linkedin_profile_url,
            "Company Name": com,
        }

        results.append(result_dict)

    for url in list_urls:
        driver.get(url)
        sleep(10)
        page_source = driver.page_source
        res=func1(page_source)
        about_xpaths = [
            '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[4]/div[3]/div/div/div/span[1]',
            '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[3]/div[3]/div/div/div/span[2]',
            '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[2]/div[3]/div/div/div/span[1]'
        ]

        # Iterate through the list of "About" sections and collect their text
        with open('linkedin_data.json', 'a', encoding='utf-8') as json_file:
            for about_xpath in about_xpaths:
                try:
                    about = driver.find_element(By.XPATH, about_xpath)
                except NoSuchElementException:
                    about=''

            res["About"]=about

            json.dump(res, json_file, ensure_ascii=False, indent=4)
    sleep(5)
