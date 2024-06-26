from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, CardImage
from sqlalchemy import select


card_images_routes = Blueprint("card_image", __name__)


@card_images_routes.route("", methods=["GET"])
@login_required
def get_card_images():
    stmt = select(CardImage)
    images = []
    for row in db.session.execute(stmt):
        results = row.CardImage
        results_info = {
            "id": results.id,
            "card_id": results.card_id,
            "image_file": results.image_file,
        }
        images.append(results_info)
    return jsonify(images)


@card_images_routes.route("/<int:cards_id>", methods=["GET"])
@login_required
def view_card_images(cards_id):
    stmt = select(CardImage).where(CardImage.card_id == cards_id)

    card_images_list = []

    for row in db.session.execute(stmt):
        results = row.CardImage
        results_info = {
            "id": results.id,
            "card_id": results.card_id,
            "image_file": results.image_file,
        }

        card_images_list.append(results_info)
    return jsonify(card_images_list)
