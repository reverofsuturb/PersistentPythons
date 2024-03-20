from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text


def seed_boards():
    board1 = Board(user_id=1, board_name="Taco Palace")
    board2 = Board(user_id=2, board_name="Orange Chicken")
    board3 = Board(user_id=3, board_name="Organization Fun")
    board4 = Board(user_id=1, board_name="Legend Frank")
    board5 = Board(user_id=2, board_name="Steak Sauce Frontier")
    board6 = Board(user_id=1, board_name="Pizza Kingdom")
    board7 = Board(user_id=2, board_name="Burger Empire")
    board8 = Board(user_id=3, board_name="Sushi Universe")
    board9 = Board(user_id=1, board_name="Pasta Galaxy")
    board10 = Board(user_id=2, board_name="Salad Oasis")

    all_boards = [board1, board2, board3, board4, board5, board6, board7, board8, board9, board10]

    [db.session.add(board) for board in all_boards]
    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
