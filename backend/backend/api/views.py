from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import csv

def main(request):
    return HttpResponse("hello")


def get_product_details(request):
    medicine = request.GET.get('medicine')
    product_details = []

    with open('./product_details.csv', 'r') as f:
        csv_reader = csv.DictReader(f)
        for row in csv_reader:
            if medicine.lower() in row['product_name'].lower():
                product_details.append({
                    'product_name': row['product_name'],
                    'brand_name': row['brand_name'],
                    'price': row['price'],
                    'sale_status': row['sale_status'],
                    'url': row['url'],
                    'image_src': row['image_src'],
                })

    return JsonResponse(product_details, safe=False)
