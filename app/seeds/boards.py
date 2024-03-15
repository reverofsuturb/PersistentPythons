from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    board1 = Board(user_id=1, board_name="Taco Palace")
    board2 = Board(user_id=2, board_name="Orange Chicken")
    board3 = Board(user_id=3, board_name="Organization Fun")
    board4 = Board(user_id=1, board_name="Legend Frank")
    board5 = Board(user_id=2, board_name="Steak Sauce Frontier")

    all_boards = [board1, board2, board3, board4, board5]

    [db.session.add(board) for board in all_boards]
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
