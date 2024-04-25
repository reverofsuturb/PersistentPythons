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
	card_image11 = CardImage(
		card_id = 7,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space11.jpg',
	
	)
	card_image12 = CardImage(
		card_id = 8,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space12.jpg',
	
	)
	card_image13 = CardImage(
		card_id = 9,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space13.jpg',
	
	)
	card_image14 = CardImage(
		card_id = 10,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space14.jpg',
	
	)
	card_image15 = CardImage(
		card_id = 12,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space15.jpg',
	
	)
	card_image16 = CardImage(
		card_id = 13,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space16.jpg',
	
	)
	card_image17 = CardImage(
		card_id = 14,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space17.jpg',
	
	)
	card_image18 = CardImage(
		card_id = 15,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space18.jpg',
	
	)
	card_image19 = CardImage(
		card_id = 19,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space19.jpg',
	
	)
	card_image20 = CardImage(
		card_id = 20,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space20.jpg',
	
	)
	card_image21 = CardImage(
		card_id = 21,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space21.jpg',
	
	)
	card_image22 = CardImage(
		card_id = 22,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space22.jpg',
	
	)
	card_image23 = CardImage(
		card_id = 23,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space23.jpg',
	
	)
	card_image24 = CardImage(
		card_id = 24,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space24.jpg',
	
	)
	card_image25 = CardImage(
		card_id = 25,
		image_file = 'https://tech-trist-open.s3.us-east-2.amazonaws.com/space25.jpg',
	
	)

	all_card_images =[card_image1, card_image2, card_image3, card_image4, card_image5, card_image6, card_image7, card_image8, card_image9, card_image10, card_image11 , card_image12 , card_image13 , card_image14, card_image15 , card_image16, card_image17, card_image18, card_image19, card_image20, card_image21, card_image22, card_image23, card_image24, card_image25]
	[db.session.add(card_image) for card_image in all_card_images]
	db.session.commit()

def undo_card_images():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.card_images RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM card_images"))

	db.session.commit()
