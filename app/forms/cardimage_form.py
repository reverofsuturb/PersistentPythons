from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class CardImageForm(FlaskForm):
    card_id = IntegerField("Card ID", validators=[DataRequired()])
    url = StringField("Image URL")
    cover = BooleanField("Is this going to be the cover photo?", default=False)
