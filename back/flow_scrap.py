from curl_cffi import requests
import pandas as pd
import time

items = []
try:
    for page in range(1, 101):
        r = requests.get(
            "https://clientweb.flowwow.com/apiuser/products/search/",
            params={
                "property": '{"range_group_ids":[1],"city":60}',
                "filters": "{}",
                "limit": 60,
                "currency": "RUB",
                "lang": "ru",
                "page": page,
            },
            impersonate="chrome",
        )
        page_items = r.json()["data"]["items"]
        if not page_items:
            print("товары закончились на странице", page)
            break
        items += page_items
        print(page, len(items))
        time.sleep(2)
finally:
    pd.json_normalize(items).to_csv("bouquets.csv", index=False, encoding="utf-8-sig")
    print("сохранено:", len(items))