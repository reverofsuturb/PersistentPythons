from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class BoardForm(FlaskForm):
    board_name = StringField('Board Name', validators=[DataRequired(message="Board name is required"), Length(max=50, message="Board name cannot exceed 50 characters")])
