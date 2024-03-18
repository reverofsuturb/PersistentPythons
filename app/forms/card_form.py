from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, DateField
from wtforms.validators import DataRequired

class CardForm(FlaskForm):
    # list_id = StringField('List ID', validators=[DataRequired()])
    # user_id = StringField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    labels = StringField('Labels')
    notification = BooleanField('Notification')
    description = TextAreaField('Description')
    start_date = DateField('Start Date')
    end_date = DateField('End Date')
    checklist = StringField('Checklist')
