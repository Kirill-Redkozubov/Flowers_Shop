from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class Bouquet(BaseModel):
    id: int
    name: str
    price: int
    description: str = ''

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


bouquets = [
    {"id": 1, "name": "Букет красных роз", "price": 4950},
    {"id": 2, "name": "Белые лилии", "price": 5450},
    {"id": 3, "name": "Весеннее настроение", "price": 3950, "description": "Классика для особого повода"},
    {"id": 4, "name": "Нежные пионы", "price": 6450},
    {"id": 5, "name": "Солнечные подсолнухи", "price": 3450, "description": "Классика для особого повода"},
    {"id": 6, "name": "Изысканная орхидея", "price": 7950, "description": "Классика для особого повода"},
    {"id": 7, "name": "Пастельная гармония", "price": 4250},
    {"id": 8, "name": "Садовая классика", "price": 4750},
]

@app.get("/api/bouquets", response_model=list[Bouquet])
def get_bouquets():
    return bouquets

@app.get('/api/bouquets/{bouquet_id}', response_model=Bouquet)
def get_bouquet(bouquet_id: int):
    for bouquet in bouquets:
        if bouquet['id'] == bouquet_id:
            return bouquet
    raise HTTPException(status_code=404, detail='Букет не найден')

