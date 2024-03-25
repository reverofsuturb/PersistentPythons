from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    board_name = StringField('Board Name', validators=[DataRequired(message="Board name is required"), Length(min=5 , max=50, message="Board name cannot be less than 5,or exceed 50 characters")])
