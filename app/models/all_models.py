from .db import db, environment, SCHEMA
from sqlalchemy import ForeignKey, String, Integer, Float, Boolean, Date, Text
from sqlalchemy.orm import relationship
from datetime import datetime


current_date = datetime.now().date()


class Board(db.Model):
	__tablename__ = 'boards'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
	board_name = db.Column(db.String(255), nullable=False, unique=True)




class Card(db.Model):
	__tablename__ = 'cards'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key = True)
	list_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
	user_id = db.Column(db.Integer,  ForeignKey('users.id'), nullable=False)
	title = db.Column(db.String(255), nullable=False)
	labels = db.Column(db.String(250))
	notification = db.Column(db.Boolean)
	description = db.Column(db.Text(250))
	start_date = db.Column(db.Date)
	end_date = db.Column(db.Date)
	checklist = db.Column(db.String(255), default=None, unique=True) # nani?




class List(db.Model):
	__tablename__ = 'lists'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	board_id = db.Column(db.Integer, ForeignKey('boards.id'))
	user_id = db.Column(db.Integer, ForeignKey('users.id'))
	updated = db.Column(db.Date, onupdate = current_date)
	title = db.Column(db.String(250), nullable=False, unique=True)
