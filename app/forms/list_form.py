from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    # board_id = IntegerField('Board ID', validators=[DataRequired()])
    # user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(message="Title is required") , Length( max=50 ,  message="Title cannot exceed 50 characters")])
