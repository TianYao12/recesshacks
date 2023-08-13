from bs4 import BeautifulSoup
import requests
import pandas as pd
import matplotlib.pyplot as plt
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time

'''
def LaunchBrowser(medicine):
    os.environ['PATH'] += r"C:\Selenium-Drivers"
    options = Options()
    options.add_experimental_option('detach', True)
    driver = webdriver.Chrome(options=options)

    driver.implicitly_wait(5)
    driver.get('https://shop.shoppersdrugmart.ca/?lang=en')
    search_bar = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, 'text')))
    
    search_bar.click()
    search_bar.send_keys(medicine)

    search_bar.send_keys(Keys.RETURN)
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located(By.TAG_NAME, 'p'))
    current_url = driver.current_url
    print(current_url)
    return current_url
    while True:
        pass


def find_meds(url):
    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text,'lxml')

    prices = soup.find('span')
    #price = prices.text
    print(prices)
    #for price in prices:
    #    print(1)
    #    price_content = price.text
    #    print(price_content)
    #    with open(f'Recess-Hacks/meds.csv', 'w') as f:
    #        f.write(price_content.text)


#medicine = input("What meds do you need: ")
url = LaunchBrowser("Advil")
find_meds(url)
'''
'''
with open(f'Recess-Hacks/prices.csv', 'w') as f:
    f.write('')
def find_prices(medicine):
    os.makedirs("images", exist_ok=True)
    html_text = requests.get(f'https://www.walgreens.com/search/results.jsp?Ntt={medicine}').text
    soup = BeautifulSoup(html_text,'lxml')
    prices = soup.find_all('span', class_='product__price font__sixteen wag-inline-txt')
    price_values = []
    for price in prices:
        price_value = float(price.text.replace('$', ''))
        price_values.append(price_value)


    with open(f'Recess-Hacks/prices.csv', 'a') as f:
        for price in prices:
            f.write(f'{price.text}\n')
'''
with open('Recess-Hacks/product_details.csv', 'w') as f:
    f.write('')

def find_prices(medicine):
    os.makedirs("images", exist_ok=True)
    html_text = requests.get(f'https://www.walgreens.com/search/results.jsp?Ntt={medicine}').text
    soup = BeautifulSoup(html_text,'lxml')
    sections = soup.find_all('ul', class_='product-container')
    divs = soup.find_all('li', class_='item card card__product')
    divs2 = soup.find_all('li', class_='item owned-brands')
    sale_status = ''

    with open('Recess-Hacks/product_details.csv', 'a') as f:
        for section in sections:

            divs = soup.find_all('li', class_='item card card__product')
            divs2 = soup.find_all('li', class_='item owned-brands')

            for div in divs:
                product_name_tag = div.find('strong', class_='description')
                f.write(f'{product_name_tag.text}, ')

                brand_name = div.find('div', class_='brand')
                f.write(f'{brand_name.text}, ')

                price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                if price == None:
                    price = div.find('span', 'product__price font__sixteen color__text-red')
                    sale_status = "On Sale"
                else:
                    f.write(f'{price.text} \n')

            for div in divs2:
                product_name_tag = div.find('strong', class_='description')
                f.write(f'{product_name_tag.text}, ')

                brand_name = div.find('div', class_='brand')
                f.write(f'{brand_name.text}, ')

                price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                if price == None:
                    price = div.find('span', 'product__price font__sixteen color__text-red')
                    sale_status = "On Sale"
                else:
                    f.write(f'{price.text}, \n')

medicine = input("Enter the meds you need: ")
find_prices(medicine)