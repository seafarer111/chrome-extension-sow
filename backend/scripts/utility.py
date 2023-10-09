from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from time import sleep
from app2 import func1
import re

def func(driver,com):
    list_items = driver.find_elements(By.CLASS_NAME, 'reusable-search__result-container')

    # Create or open a text file in append mode
    with open('linkedin_data.txt', 'a', encoding='utf-8') as file:
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
                linkedin_profile_url="No LinkedIn Profile URL found in the provided link."
            job_title = item.find_element(By.CSS_SELECTOR, 'div.entity-result__primary-subtitle').text
            location = item.find_element(By.CSS_SELECTOR, 'div.entity-result__secondary-subtitle').text
            file.write(f"Name: {name}\n")
            file.write(f"Job Title: {job_title}\n")
            file.write(f"Location: {location}\n\n")
            file.write(f"Profile url: {linkedin_profile_url}\n\n")
            file.write(f"Company name: {com}")
        for i in list_urls:
            driver.get(i)
            sleep(10)
            page_source = driver.page_source
            func1(page_source)

            about_xpaths = [
                    '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[4]/div[3]/div/div/div/span[1]',
                    '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[3]/div[3]/div/div/div/span[2]',
                    '/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[2]/div[3]/div/div/div/span[1]'
            ]

            about_data = []

                    # Iterate through the list of "About" sections and collect their text
            for i, about_xpath in enumerate(about_xpaths):
                try:
                    about = driver.find_element(By.XPATH, about_xpath)
                    about_data.append(about.text)
                except NoSuchElementException:
                    pass

            with open('data.txt', 'a', encoding='utf-8') as file:
                file.write(f"About:\n")
                file.write(" | ".join(about_data) + "\n\n")
            break
    sleep(5)
