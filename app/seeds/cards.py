from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_cards():

    card1 = Card(
        list_id=1,
        user_id=1,
        title="Important Stuff",
        labels="Dope",
        notification=True,
        description="Everything is great I love life",
        start_date=date.today(),
        end_date=date.today(),
        checklist="Check",
    )
    card2 = Card(
        list_id=2,
        user_id=2,
        title="Semi-Important Things",
        labels="Not Dope",
        notification=False,
        description="Everything is not great, however, life is bearable",
        start_date=date.today(),
        end_date=date.today(),
        checklist="Not Check",
    )
    card3 = Card(
        list_id=3,
        user_id=3,
        title="assert",
        labels="async",
        notification=False,
        description="def all that",
        start_date=date.today(),
        end_date=date.today(),
        checklist="Shrood",
    )
    card4 = Card(
        list_id=4,
        user_id=2,
        title="Confusion",
        labels="Put One Here",
        notification=False,
        description="Because I hate notifications",
        start_date=date.today(),
        end_date=date.today(),
        checklist=" ",
    )
    card5 = Card(
        list_id=5,
        user_id=1,
        title="Living Freely",
        labels="It is what it is",
        notification=True,
        description="Alert me always",
        start_date=date.today(),
        end_date=date.today(),
        checklist=" ",
    )
    all_cards = [card1, card2, card3, card4, card5]
    [db.session.add(card) for card in all_cards]
    db.session.commit()


def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
