from selenium.webdriver.common.by import By
from time import sleep

def func(driver,com):
    list_items = driver.find_elements(By.CLASS_NAME, 'reusable-search__result-container')

    # Create or open a text file in append mode
    with open('linkedin_data.txt', 'a', encoding='utf-8') as file:
        # Loop through each list item and extract the desired information
        for item in list_items:
            # Extract the name
            name = item.find_element(By.CSS_SELECTOR, 'span.entity-result__title-text').text

            profile_url = item.find_element(By.CSS_SELECTOR, 'a.app-aware-link').get_attribute('href')

            # Extract the job title
            job_title = item.find_element(By.CSS_SELECTOR, 'div.entity-result__primary-subtitle').text

            # Extract the location
            location = item.find_element(By.CSS_SELECTOR, 'div.entity-result__secondary-subtitle').text

            # Write the extracted information to the text file
            file.write(f"Name: {name}\n")
            file.write(f"Job Title: {job_title}\n")
            file.write(f"Location: {location}\n\n")
            file.write(f"Profile url: {profile_url}\n\n")
            file.write(f"Company name: {com}")

    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    sleep(5)  # You can adjust the sleep duration as needed
