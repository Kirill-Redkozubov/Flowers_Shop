from fastapi import FastAPI

app = FastAPI()

bouquets = [
    {"id": 1, "name": "Букет красных роз", "price": 4950},
    {"id": 2, "name": "Белые лилии", "price": 5450},
    {"id": 3, "name": "Весеннее настроение", "price": 3950},
    {"id": 4, "name": "Нежные пионы", "price": 6450},
    {"id": 5, "name": "Солнечные подсолнухи", "price": 3450},
    {"id": 6, "name": "Изысканная орхидея", "price": 7950},
    {"id": 7, "name": "Пастельная гармония", "price": 4250},
    {"id": 8, "name": "Садовая классика", "price": 4750},
]

@app.get('/api/bouquets')
def get_bouquets():
    return bouquets

