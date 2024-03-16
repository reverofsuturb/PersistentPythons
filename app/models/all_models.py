from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey, String, Integer, Float, Boolean, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime


current_date = datetime.now().date()

card_user = db.Table(
    "card_users",
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("card_id", db.ForeignKey("cards.id"), primary_key=True),
)


class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    board_name = db.Column(db.String(255), nullable=False, unique=True)


class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    labels = db.Column(db.String(255))
    notification = db.Column(db.Boolean)
    description = db.Column(db.Text(255))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    checklist = db.Column(db.String(255), default=None)


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, ForeignKey("boards.id"))
    user_id = db.Column(db.Integer, ForeignKey("users.id"))
    title = db.Column(db.String(255), nullable=False)


class CardImage(db.Model):
    __tablename__ = "card_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, ForeignKey("cards.id"), nullable=False)
    url = db.Column(db.String(1000), nullable=False)
    cover = db.Column(db.Boolean, nullable=False)


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    card_id = db.Column(db.Integer, ForeignKey("cards.id"), nullable=False)
    body = db.Column(db.Text(255), nullable=False)
