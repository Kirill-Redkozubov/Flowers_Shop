from fastapi import FastAPI, HTTPException, Depends, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, select, func
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

# validation for one card
class Bouquet(BaseModel):
    model_config = {'from_attributes': True}

    id: int
    name: str
    price: int
    discountSum: int
    oldPrice: int
    photo: str | None = None
    link: str | None = None

# validation for cards with general count
class BouquetPage(BaseModel):
    items: list[Bouquet]
    total: int


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


@app.get("/api/bouquets", response_model=BouquetPage)
def get_bouquets(
    limit: int = Query(12, ge=1, le=100),
    offset: int = Query(0, ge=0),
    session: Session = Depends(get_session),
):
    total = session.scalar(select(func.count()).select_from(Card))
    items = session.scalars(select(Card).order_by(Card.id).limit(limit).offset(offset)).all()
    return BouquetPage(items=[Bouquet.model_validate(item) for item in items], total=total)

@app.get("/api/bouquets", response_model=BouquetPage)
def get_bouquets(
    limit: int = Query(12, ge=1, le=100),
    offset: int = Query(0, ge=0),
    session: Session = Depends(get_session),
):
    total = session.scalar(select(func.count()).select_from(Card))
    stmt = select(Card).order_by(Card.id).limit(limit).offset(offset)
    items = session.scalars(stmt).all()
    return {"items": items, "total": total}


@app.get("/api/bouquets/{bouquet_id}", response_model=Bouquet)
def get_bouquet(bouquet_id: int, session: Session = Depends(get_session)):
    card = session.get(Card, bouquet_id)
    if card is None:
        raise HTTPException(status_code=404, detail="Букет не найден")
    return card

