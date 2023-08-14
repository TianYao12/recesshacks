from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json

def main(request):
    return HttpResponse("hello")

from bs4 import BeautifulSoup
import requests
from django.http import JsonResponse

def scrape_data(request, search_query):
    html_text = requests.get(f'https://www.walgreens.com/search/results.jsp?Ntt={search_query}').text
    html_text2 = requests.get(f'https://www.healthwarehouse.com/solr/result/?q={search_query}').text
    soup = BeautifulSoup(html_text, 'lxml')
    soup2 = BeautifulSoup(html_text2, 'lxml')
    sections = soup.find_all('ul', class_='product-container')
    divs = soup.find_all('li', class_='item card card__product')
    divs2 = soup.find_all('li', class_='item owned-brands')
    health_warehouse_divs = soup2.find_all('li', class_="clearfix")
    sale_status = 'Normal Price'

    scraped_data = []

    for div in health_warehouse_divs:
        images = div.find_all('img')
        for img in images:
            src = img['src']
        product_name_tag = div.find('div', class_="quantity")
        product_a = product_name_tag.find('a')
        product_href = product_a['href']

        if product_name_tag is not None:
            new_name = product_name_tag.text.replace(f'<div class="quantity"><h3><a href="{product_href}">', '').replace('</a></h3></div>', '')
        price = div.find('div', class_='col-xs-12 col-sm-2 productPrice').text
        new_price = price.replace('<h3>', '').replace('<span>As low as</span>', '').replace('</h3>', '')
        true_price = new_price.replace("As low as", '')
        anchor_tags = div.find('a')
        hrefs = anchor_tags['href']

        if src is not None and product_name_tag is not None and true_price is not None and hrefs is not None:
            scraped_data.append({
                'name': new_name,
                'price': true_price,
                'url': hrefs,
                'image': src,
            })

    # Similar logic for the other sections

    return JsonResponse({'scraped_data': scraped_data})

