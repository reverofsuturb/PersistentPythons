from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey, String, Integer, Float, Boolean, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models import User


current_date = datetime.now().date()

card_user = db.Table(
    "card_users",
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("card_id", db.ForeignKey("cards.id"), primary_key=True),
)
if environment == "production":
    card_user.schema = SCHEMA
## add some join tables


class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    board_name = db.Column(db.String(255), nullable=False, unique=True)

    lists = relationship("List", backref="board", cascade="all, delete-orphan")

    def to_dict(self):
        return {"id": self.id, "user_id": self.user_id, "board_name": self.board_name}


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)

    cards_in_list = db.relationship(
        "Card", back_populates="list", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "board_id": self.board_id,
            "user_id": self.user_id,
            "title": self.title,
        }


class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("lists.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    title = db.Column(db.String(255), nullable=False)
    labels = db.Column(db.String(255), nullable=True)
    notification = db.Column(db.Boolean, nullable=True)
    description = db.Column(db.String(2000), nullable=True)
    start_date = db.Column(db.String, nullable=True)
    end_date = db.Column(db.String, nullable=True)
    checklist = db.Column(db.String(255), default=None, nullable=True)
    cover_photo = db.Column(db.String, default=None, nullable=True)
    # EDIT THIS DOWN BELOW CHAOS?
    list = db.relationship("List", back_populates="cards_in_list")
    comments = db.relationship(
        "Comment", back_populates="comments_rel", cascade="all, delete-orphan"
    )
    images = db.relationship(
        "CardImage", back_populates="card_images_rel", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "user_id": self.user_id,
            "title": self.title,
            "labels": self.labels,
            "notification": self.notification,
            "description": self.description,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "checklist": self.checklist,
            "cover_photo": self.cover_photo,
        }


class CardImage(db.Model):
    __tablename__ = "card_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False
    )
    image_file = db.Column(db.String(), nullable=False)
    card_images_rel = db.relationship("Card", back_populates="images")

    def __init__(self, card_id, image_file):
        self.card_id = card_id
        self.image_file = image_file

    def to_dict(self):
        return {
            "id": self.id,
            "card_id": self.card_id,
            "image_file": self.image_file,
        }


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    card_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")), nullable=False
    )
    body = db.Column(db.String(2000), nullable=False)
    comments_rel = db.relationship("Card", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "card_id": self.card_id,
            "body": self.body,
        }
