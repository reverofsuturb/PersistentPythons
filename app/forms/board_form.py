from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired , Length

class BoardForm(FlaskForm):
    board_name = StringField('Board Name', validators=[DataRequired(message="Board Name is required") , Length(min=0 , max=50 , message="Name cannot exceed 50 characters")])
