from .db import db, environment, SCHEMA
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
## add some join tables

class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    board_name = db.Column(db.String(255), nullable=False, unique=True)

    lists = relationship('List', backref='board')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'board_name': self.board_name
        }


class List(db.Model):
    __tablename__ = "lists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, ForeignKey("boards.id"))
    user_id = db.Column(db.Integer, ForeignKey("users.id"))
    title = db.Column(db.String(255), nullable=False)

    cards_in_list = db.relationship('Card', back_populates='list')

    def to_dict(self):
        return {
            'id': self.id,
            'board_id': self.board_id,
            'user_id': self.user_id,
            'title': self.title
        }


class Card(db.Model):
    __tablename__ = "cards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, ForeignKey("lists.id"), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    labels = db.Column(db.String(255))
    notification = db.Column(db.Boolean)
    description = db.Column(db.Text(255))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    checklist = db.Column(db.String(255), default=None)
# EDIT THIS DOWN BELOW CHAOS?
    list = db.relationship('List', back_populates='cards_in_list')
    comments = db.relationship('Comment', back_populates='comments_rel')

    def to_dict(self):
        return {
            'id': self.id,
            'list_id': self.list_id,
            'user_id': self.user_id,
            'title': self.title,
            'labels': self.labels,
            'notification': self.notification,
            'description': self.description,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'checklist': self.checklist
        }



class CardImage(db.Model):
    __tablename__ = "card_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, ForeignKey("cards.id"), nullable=False)
    url = db.Column(db.String(1000), nullable=False)
    cover = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.card_id,
            'url': self.url,
            'cover': self.cover
        }


class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    card_id = db.Column(db.Integer, ForeignKey("cards.id"), nullable=False)
    body = db.Column(db.Text(255), nullable=False)
    comments_rel = db.relationship('Card', back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'body': self.body
        }
