from bs4 import BeautifulSoup
import requests
import os

with open('./product_details.csv', 'w') as f:
    f.write('')

def find_prices(medicine):
    os.makedirs("images", exist_ok=True)
    html_text = requests.get(f'https://www.walgreens.com/search/results.jsp?Ntt={medicine}').text
    soup = BeautifulSoup(html_text,'lxml')
    sections = soup.find_all('ul', class_='product-container')
    divs = soup.find_all('li', class_='item card card__product')
    divs2 = soup.find_all('li', class_='item owned-brands')
    sale_status = 'Normal Price'

    with open('./product_details.csv', 'a') as f:

            for section in sections:
                for div in divs:
                    images = div.find_all('img')
                    product_name_tag = div.find('strong', class_='description')
                    brand_name = div.find('div', class_='brand')
                    price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                    if price == None:
                        price = div.find('span', 'product__price font__sixteen color__text-red')
                        sale_status = "On Sale"
                    for img in images:
                        src = img['src']
                        break
                    anchor_tags = div.find('a')
                    hrefs = anchor_tags['href']

                    if product_name_tag == None or brand_name == None or price == None or src == None or anchor_tags == None:
                        continue
                    else:
                        f.write(f'"{product_name_tag.text}", ')
                        f.write(f'"{brand_name.text}", ')
                        f.write(f'{price.text}, ')
                        f.write(f'{sale_status}, ')
                        f.write(f'https://www.walgreens.com/{hrefs}, ')
                        f.write(f'{src} \n')


                for div in divs2:
                    images = div.find_all('img')
                    product_name_tag = div.find('strong', class_='description')
                    brand_name = div.find('div', class_='brand')
                    price = div.find('span', 'product__price font__sixteen wag-inline-txt')
                    if price == None:
                        price = div.find('span', 'product__price font__sixteen color__text-red')
                        sale_status = "On Sale"
                    for img in images:
                        src = img['src']
                        break
                    anchor_tags = div.find('a')
                    hrefs = anchor_tags['href']

                    if product_name_tag == None or brand_name == None or price == None or src == None or anchor_tags == None:
                        break
                    else:
                        f.write(f'"{product_name_tag.text}", ')
                        f.write(f'"{brand_name.text}", ')
                        f.write(f'{price.text}, ')
                        f.write(f'{sale_status}, ')
                        f.write(f'https://www.walgreens.com/{hrefs}, ')
                        f.write(f'{src} \n')

medicine = input("Enter the meds you need: ")
find_prices(medicine)