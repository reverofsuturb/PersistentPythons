from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired  , Length

class CommentForm(FlaskForm):
    # user_id = IntegerField("User ID", validators=[DataRequired()])
    # card_id = IntegerField("Card ID", validators=[DataRequired()])
    body = TextAreaField("Body", validators=[DataRequired() , Length(max=100, message="Cannot exceed 100 characters")])
