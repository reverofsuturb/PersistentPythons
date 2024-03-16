from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        user_id=1,
        card_id=1,
        body="Everyone is wonderful, life is truly majestic COMMENT 1",
    )
    comment2 = Comment(
        user_id=2,
        card_id=2,
        body="Everyone is wonderful, life is truly majestic COMMENT 2",
    )
    comment3 = Comment(
        user_id=3,
        card_id=3,
        body="Everyone is wonderful, life is truly majestic COMMENT 3",
    )
    comment4 = Comment(
        user_id=1,
        card_id=4,
        body="Everyone is wonderful, life is truly majestic COMMENT 4",
    )
    comment5 = Comment(
        user_id=2,
        card_id=5,
        body="Everyone is wonderful, life is truly majestic COMMENT 5",
    )


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
