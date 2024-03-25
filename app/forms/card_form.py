from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, DateField 
from wtforms.validators import DataRequired , Length

class CardForm(FlaskForm):
    # list_id = StringField('List ID', validators=[DataRequired()])
    # user_id = StringField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired() , Length(max=50, message="Cannot exceed 50 characters")])
    labels = StringField('Labels')
    notification = BooleanField('Notification')
    description = TextAreaField('Description' , validators=[Length(max=200 , message="Cannot exceed 200 characters")])
    start_date = DateField('Start Date')
    end_date = DateField('End Date')
    checklist = StringField('Checklist')
