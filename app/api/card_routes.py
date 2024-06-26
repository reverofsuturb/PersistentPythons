from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Board, List, User, Card, CardImage, Comment
from app.forms import CardForm, CardImageForm, CommentForm
from sqlalchemy import select
from app.api.aws import upload_file_to_s3, get_unique_filename


card_routes = Blueprint("card", __name__)


@card_routes.route("", methods=["GET"])
@login_required
def view_cards():
    stmt = select(Card).where(Card.user_id == current_user.id)

    cards_list = []

    for row in db.session.execute(stmt):
        results = row.Card
        results_info = {
            "id": results.id,
            "list_id": results.list_id,
            "user_id": results.user_id,
            "title": results.title,
            "labels": results.labels,
            "notification": results.notification,
            "description": results.description,
            "start_date": results.start_date,
            "end_date": results.end_date,
            "checklist": results.checklist,
            "cover_photo": results.cover_photo
        }
        cards_list.append(results_info)

    return jsonify({"Cards": cards_list})


@card_routes.route("/<int:card_id>", methods=["GET", "PUT"])
@login_required
def edit_card(card_id):
    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()

    if card is None:
        return jsonify({"Error": "Card not found"}), 404

    if card.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403
    if request.method == "PUT":
        form = CardForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            card.title = form.title.data
            card.labels = form.labels.data
            card.notification = form.notification.data
            card.description = form.description.data
            card.start_date = form.start_date.data
            card.end_date = form.end_date.data
            card.checklist = form.checklist.data
            card.cover_photo= form.cover_photo.data

            db.session.add(card)
            db.session.commit()

            return jsonify(card.to_dict())
        return jsonify({"errors": form.errors}), 400
    return jsonify(card.to_dict())


@card_routes.route("/<int:card_id>/cover", methods=["PUT"])
@login_required
def patch_card(card_id):
    cover_photo = request.get_json()

    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()
    if card is None:
        return jsonify({"Error": "Card not found"}), 404

    if card.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403


    if cover_photo:
        card.cover_photo = cover_photo
        db.session.add(card)
        db.session.commit()
        return jsonify(card.to_dict())
    return jsonify({"errors": "No cover photo, edit unsuccessful"}), 400


@card_routes.route("/<int:card_id>", methods=["DELETE"])
@login_required
def delete_card(card_id):
    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()

    if card is None:
        return jsonify({"Error": "Card not found"}), 404

    if card.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403

    db.session.delete(card)
    db.session.commit()

    return jsonify(card.to_dict())


@card_routes.route("/<int:card_id>/card_image", methods=["GET", "POST"])
@login_required
def post_card_image(card_id):
    stmt = select(Card).where(Card.id == card_id)
    card = db.session.execute(stmt).scalar_one()
    if card is None:
        return jsonify({"Error": "Image not found"}), 404

    if card.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403

    form = CardImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["image_file"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(dir(upload))
        print(upload)

        if "url" not in upload:
            return jsonify({"errors": [upload]}), 400

        url = upload["url"]
        new_image = CardImage(card_id, image_file=url)

        db.session.add(new_image)
        db.session.commit()
        return jsonify(url)

    if form.errors:
        print(form.errors)
        return jsonify({"errors": form.errors}), 400


@card_routes.route("/<int:card_id>/comments", methods=["GET", "POST"])
@login_required
def get_comments(card_id):
    if request.method == "GET":
        comments_list = []
        stmt = (
            select(Comment).join(Comment.comments_rel).where(Comment.card_id == card_id)
        )

        comment = db.session.execute(stmt)

        for row in comment:
            results = row.Comment
            results_info = {
                "id": results.id,
                "card_id": results.card_id,
                "user_id": results.user_id,
                "body": results.body,
            }
            comments_list.append(results_info)

        return jsonify({"Comments": comments_list})

    elif request.method == "POST":
        form = CommentForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            comment = Comment(
                card_id=card_id,
                user_id=current_user.id,
                body=form.body.data,
            )
            db.session.add(comment)
            db.session.commit()

            return jsonify(comment.to_dict())

        return jsonify({"errors": form.errors}), 400


@card_routes.route("/<int:card_id>/comments/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(card_id, comment_id):
    stmt = select(Comment).where(Comment.id == comment_id)
    comment = db.session.execute(stmt).scalar_one()

    if comment is None:
        return jsonify({"Error": "Comment not found"}), 404

    if comment.user_id != current_user.id:
        return jsonify({"Not Authorized": "Forbidden"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"Comment Deleted": comment.to_dict()})
