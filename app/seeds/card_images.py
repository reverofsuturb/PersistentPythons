from app.models import db, CardImage, environment, SCHEMA
from sqlalchemy.sql import text


def card_images_seeds():

	card_image1 = CardImage(
		card_id = 1,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space1.jpg',
	
	)
	card_image2 = CardImage(
		card_id = 2,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space10.jpg',
		
	)
	card_image3 = CardImage(
		card_id = 3,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space2.jpg',
		
	)
	card_image4 = CardImage(
		card_id = 4,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space3.png',
	
	)
	card_image5 = CardImage(
		card_id = 5,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space4.webp',
		
	)
	card_image6 = CardImage(
		card_id = 6,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space5.webp',
	
	)
	card_image7 = CardImage(
		card_id = 11,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space6.jpg',
	
	)
	card_image8 = CardImage(
		card_id = 16,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space7.jpg',
		
	)
	card_image9 = CardImage(
		card_id = 7,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space8.webp',
	
	)
	card_image10 = CardImage(
		card_id = 18,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space9.webp',
	
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
