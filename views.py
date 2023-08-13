from bs4 import BeautifulSoup
from django.shortcuts import render
from django.http import HttpResponse
import requests
import os
from . import urls
import json  # Import the json module

def home(req):

    def find_prices(medicine):
        print("suiii")
        os.makedirs("images", exist_ok=True)
        html_text = requests.get(f'https://www.walgreens.com/search/results.jsp?Ntt={medicine}').text
        html_text2 = requests.get(f'https://www.cvs.com/search?searchTerm={medicine}/')
        soup = BeautifulSoup(html_text, 'lxml')
        sections = soup.find_all('ul', class_='product-container')
        divs = soup.find_all('li', class_='item card card__product')
        divs2 = soup.find_all('li', class_='item owned-brands')
        sale_status = 'Normal Price'

        products = []  # Create a list to store product dictionaries

        for section in sections:
            for div in divs:
                images = div.find_all('img')
                product_name_tag = div.find('strong', class_='description')
                brand_name = div.find('div', class_='brand')
                price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                if price is None:
                    price = div.find('span', 'product__price font__sixteen color__text-red')
                    sale_status = "On Sale"
                for img in images:
                    src = img['src']
                    break
                anchor_tags = div.find('a')
                hrefs = anchor_tags['href']

                if product_name_tag is None or brand_name is None or price is None or src is None or anchor_tags is None:
                    continue
                else:
                    product = {
                        'product_name': product_name_tag.text,
                        'brand_name': brand_name.text,
                        'price': price.text,
                        'sale_status': sale_status,
                        'url': f'https://www.walgreens.com/{hrefs}',
                        'image_url': src
                    }
                    products.append(product)

            for div in divs2:
                images = div.find_all('img')
                product_name_tag = div.find('strong', class_='description')
                brand_name = div.find('div', class_='brand')
                price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                if price is None:
                    price = div.find('span', 'product__price font__sixteen color__text-red')
                    sale_status = "On Sale"
                for img in images:
                    src = img['src']
                    break
                anchor_tags = div.find('a')
                hrefs = anchor_tags['href']

                if product_name_tag is None or brand_name is None or price is None or src is None or anchor_tags is None:
                    break
                else:
                    product = {
                        'product_name': product_name_tag.text,
                        'brand_name': brand_name.text,
                        'price': price.text,
                        'sale_status': sale_status,
                        'url': f'https://www.walgreens.com/{hrefs}',
                        'image_url': src
                    }
                    products.append(product)

        with open('homepage/product_details.json', 'w') as json_file:  # Write JSON data to a file
            json.dump(products, json_file, indent=4)

    find_prices(urls.peth)

    return HttpResponse('<h1> ran </h1>')
