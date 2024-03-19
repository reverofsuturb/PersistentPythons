from app.models import db, CardImage, environment, SCHEMA
from sqlalchemy.sql import text


def card_images_seeds():

	card_image1 = CardImage(
		card_id = 1,
		url = 'https://imgur.com/hHKSn9N.jpg',
		cover = True,
	)
	card_image2 = CardImage(
		card_id = 1,
		url = 'https://imgur.com/10WPEMV.jpg',
		cover = False,
	)
	card_image3 = CardImage(
		card_id = 2,
		url = 'https://imgur.com/9xzJhaP.jpg',
		cover = False,
	)
	card_image4 = CardImage(
		card_id = 2,
		url = 'https://imgur.com/xTfhFLE.jpg',
		cover = True,
	)
	card_image5 = CardImage(
		card_id = 3,
		url = 'https://imgur.com/Mdqz9LC.jpg',
		cover = False,
	)
	card_image6 = CardImage(
		card_id = 3,
		url = 'https://imgur.com/Mdqz9LC.jpg',
		cover = True,
	)
	card_image7 = CardImage(
		card_id = 4,
		url = 'https://imgur.com/evZ2BFG.jpg',
		cover = True,
	)
	card_image8 = CardImage(
		card_id = 4,
		url = 'https://imgur.com/mPMqcuo.jpg',
		cover = False,
	)
	card_image9 = CardImage(
		card_id = 5,
		url = 'https://imgur.com/pc3n1bh.jpg',
		cover = True,
	)
	card_image10 = CardImage(
		card_id = 2,
		url = 'https://imgur.com/lab35Jz.jpg',
		cover = True,
	)

	all_card_images =[card_image1, card_image2, card_image3, card_image4, card_image5, card_image6, card_image7, card_image8, card_image9, card_image10]
	[db.session.add(card_image) for card_image in all_card_images]
	db.session.commit()

def undo_card_images():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.card_images RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM card_images"))

	db.session.commit()
