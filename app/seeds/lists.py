from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    list1 = List(
        board_id=1,
        user_id=1,
        title="Good Times",
    )
    list2 = List(
        board_id=2,
        user_id=2,
        title="Yellow Suitcase",
    )
    list3 = List(
        board_id=3,
        user_id=3,
        title="Insubordination Ants",
    )
    list4 = List(
        board_id=4,
        user_id=1,
        title="Critical Menus",
    )
    list5 = List(
        board_id=5,
        user_id=2,
        title="This may be too much",
    )
    list6 = List(
        board_id=6,
        user_id=1,
        title="Adventure Time",
    )
    list7 = List(
        board_id=7,
        user_id=2,
        title="Mystery Box",
    )
    list8 = List(
        board_id=8,
        user_id=3,
        title="Journey Ahead",
    )
    list9 = List(
        board_id=9,
        user_id=1,
        title="Creative Minds",
    )
    list10 = List(
        board_id=10,
        user_id=2,
        title="Bright Ideas",
    )
    list11 = List(
        board_id=1,
        user_id=3,
        title="Future Plans",
    )
    list12 = List(
        board_id=2,
        user_id=1,
        title="Past Memories",
    )
    list13 = List(
        board_id=3,
        user_id=2,
        title="Present Moments",
    )
    list14 = List(
        board_id=4,
        user_id=3,
        title="Dream Projects",
    )
    list15 = List(
        board_id=5,
        user_id=1,
        title="Wishful Thinking",
    )

    all_lists = [list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12, list13, list14, list15]
    [db.session.add(list) for list in all_lists]
    db.session.commit()


def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
