from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    list1 = List(
        board_id=1,
        user_id=1,
        updated="2024/09/03",
        title="Good Times",
    )
    list2 = List(
        board_id=2,
        user_id=2,
        updated="2024/08/12",
        title="Yellow Suitcase",
    )
    list3 = List(
        board_id=3,
        user_id=3,
        updated="2024/09/18",
        title="Insubordination Ants",
    )
    list4 = List(
        board_id=4,
        user_id=1,
        updated="2024/07/03",
        title="Critical Menus",
    )
    list5 = List(
        board_id=5,
        user_id=2,
        updated="2024/06/02",
        title="This may be too much",
    )

    all_lists = [list1, list2, list3, list4, list5]
    [db.session.add(list) for list in all_lists]
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()    