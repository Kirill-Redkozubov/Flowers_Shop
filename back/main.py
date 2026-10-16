from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, select
from pathlib import Path

from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, Session

DB_PATH = Path(__file__).parent / "bouquets.db"
engine = create_engine(f"sqlite:///{DB_PATH}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Bouquet(BaseModel):
    model_config = {'from_attributes': True}

    id: int
    name: str
    price: int
    discountSum: int
    oldPrice: int
    photo: str | None = None
    link: str | None = None


class Base(DeclarativeBase):
    pass


class Card(Base):
    __tablename__ = "bouquets"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    price: Mapped[int]
    oldPrice: Mapped[int]
    discountSum: Mapped[int]
    photo: Mapped[str | None]
    link: Mapped[str | None]


def get_session():
    with Session(engine) as session:
        yield session


@app.get("/api/cards", response_model=list[Bouquet])
def get_cards(session: Session = Depends(get_session)):
    rows = session.scalars(select(Card).limit(10)).all()
    return rows


@app.get("/api/bouquets/{bouquet_id}", response_model=Bouquet)
def get_bouquet(bouquet_id: int, session: Session = Depends(get_session)):
    card = session.get(Card, bouquet_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Букет не найден")
    return card

