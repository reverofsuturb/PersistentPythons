from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, TextAreaField, IntegerField
from wtforms.validators import DataRequired , Length

class CardForm(FlaskForm):
    # list_id = StringField('List ID', validators=[DataRequired()])
    # user_id = StringField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired() , Length(max=20, message="Cannot exceed 20 characters")])
    labels = StringField('Labels')
    notification = BooleanField('Notification')
    description = TextAreaField('Description' , validators=[Length(max=100 , message="Cannot exceed 100 characters")])
    start_date = StringField('Start Date')
    end_date = StringField('End Date')
    checklist = StringField('Checklist')
    cover_photo = StringField('Cover Photo')
