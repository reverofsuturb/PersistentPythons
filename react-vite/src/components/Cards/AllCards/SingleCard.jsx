import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import PostComment from "../Comments/PostComment";
import { thunkGetAllComments } from "../../../store/comments";
import {
  FaRegFileAlt,
  FaRegStickyNote,
  FaRegCheckSquare,
} from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { thunkEditCard, thunkGetCard } from "../../../store/cards";
import { thunkGetCardImage } from "../../../store/card_images";

import "./SingleCard.css";
import PostCardImage from "./PostCardImage";
import GetImagesForCards from "./GetCardImage";

export default function SingleCard({ card, list }) {
  const cardState = useSelector((state) => state.cards[card.id]);
  const cardImagesObj = useSelector((state) => state.cardImages);
  const cardImages = Object.values(cardImagesObj);
  const [uploading, isUploading] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(
    card.description ? card.description : ""
  );
  const [labels, setLabels] = useState(card.labels);

  const [notif, setNotif] = useState(card.notification);
  const [editTitle, setEditTitle] = useState(false);
  const [editLabels, setEditLabels] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editNotif, setEditNotif] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cardState?.title) setTitle(cardState.title);
    if (cardState?.notification) setNotif(cardState.notification);
    if (cardState?.labels) setLabels(cardState.labels);

    dispatch(thunkGetCard(card.id));
    dispatch(thunkGetAllComments(card.id));
    dispatch(thunkGetCardImage(card.id));
  }, [dispatch, notif]);

  // const handleEdit = () => {
  //   return (
  //     <OpenModalButton
  //       buttonText={"Edit Card"}
  //       modalComponent={<EditCard card={card} list={list} />}
  //     />
  //   );
  // };

  const handleNotifChange = (e) => {
    handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editCards = {
      title,
      description,
      labels,
      notification: !notif,
    };

    const res = await dispatch(thunkEditCard(card.id, editCards));

    if (res && res.errors) {
      return setErrors(res.errors);
    }

    setNotif(!notif);
    setEditTitle(false);
    setEditLabels(false);
    setEditNotif(false);
    setEditDescription(false);
  };
  const handleButtonClick = () => {
    alert("Feature coming soon");
  };
  return (
    <>
      <div className="cardcontainer">
        <div className="photocovercontainer">
          <img
            className="photocover"
            src={cardImages?.length && cardImages[0][0]?.image_file}
            alt="card image"
          />
        </div>

        <div className="titlescont">
          <div style={{ marginTop: "5px" }} className="logo">
            <FaRegFileAlt />
          </div>

          <div>
            {editTitle === false ? (
              <h1
                onDoubleClick={() => setEditTitle(true)}
                style={{ marginBottom: "0px" }}
                className="sc-title"
              >
                {title}
              </h1>
            ) : (
              <form className="edit-card-form" onSubmit={handleSubmit}>
                <label htmlFor="title">
                  <input
                    className="eb-lists-input"
                    type="text"
                    value={title}
                    onBlur={handleSubmit}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                  />
                  {errors?.title && <p className="p-error">{errors.title}</p>}
                </label>
              </form>
            )}
            <div
              className="sc-title"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              In list: {list?.title}
            </div>
          </div>
        </div>

        <div className="sc-container">
          <div className="leftside">
            <div className="label-notif-container">
              <div>
                {editLabels === false ? (
                  <div
                    onDoubleClick={() => setEditLabels(true)}
                    className="sc-row"
                  >
                    Labels: {labels ? labels : null}
                  </div>
                ) : (
                  <form className="edit-card-form" onSubmit={handleSubmit}>
                    <label htmlFor="labels">
                      <input
                        className="eb-lists-input"
                        type="text"
                        value={labels}
                        onBlur={handleSubmit}
                        onChange={(e) => setLabels(e.target.value)}
                      />
                      {errors?.labels && (
                        <p className="p-error">{errors.labels}</p>
                      )}
                    </label>
                  </form>
                )}
              </div>

              <div
                onClick={(e) => handleNotifChange(e)}
                className="sc-row"
                style={{ backgroundColor: notif ? "lightblue" : "transparent" }}
              >
                {notif ? "Notify me!" : "Don't notify me."}
              </div>
            </div>

            {description && (
              <div className="description-container">
                <div className="logo">
                  <FaRegStickyNote />
                </div>

                <div className="fillthespace">
                  <div className="editanddescription">
                    <div>Description</div>
                    <button onClick={() => setEditDescription(true)}>
                      Edit
                    </button>
                  </div>
                  {editDescription === false ? (
                    <div
                      onDoubleClick={() => setEditDescription(true)}
                      className="sc-row"
                    >
                      {description}
                    </div>
                  ) : (
                    <form className="edit-card-form" onSubmit={handleSubmit}>
                      <label htmlFor="description">
                        <textarea
                          className="ed-card-input"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter description"
                        />
                        {errors?.description && (
                          <p className="p-error">{errors.description}</p>
                        )}
                      </label>
                      <button type="submit">Submit</button>
                      <button
                        onClick={() => setEditDescription(false)}
                        type="submit"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            <div className="attachments-container">
              <div className="logo">
                <MdImage />
              </div>
              <div>
                <GetImagesForCards card={card} />
              </div>
            </div>

            {/* <div className="sc-row">Start Date: {card.start_date}</div>
              <div className="sc-row">End Date: {card.end_date}</div> */}
            <div className="checklist-container">
              <div className="logo">
                <FaRegCheckSquare />
              </div>
              <div className="sc-row">Checklist: {card.checklist}</div>
            </div>
            <div className="postcommentcont">
              <PostComment card={card} />
            </div>

            <div>
              <AllComments card={card} />
            </div>
          </div>

          <div className="rightside">
            <h5 style={{ marginBottom: "0" }}>Add to card</h5>
            <button onClick={handleButtonClick} className="buttonsincard">
              Members
            </button>
            {labels ? (
              <></>
            ) : (
              <button
                onClick={() => setEditLabels(true)}
                className="buttonsincard"
              >
                Labels
              </button>
            )}
            {description ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  setDescription(" ");
                  setEditDescription(true);
                }}
                className="buttonsincard"
              >
                Add Description
              </button>
            )}
            <button onClick={handleButtonClick} className="buttonsincard">
              Checklist
            </button>
            <button onClick={handleButtonClick} className="buttonsincard">
              Dates
            </button>
            <OpenModalButton
              className="buttonsincard"
              buttonText={"Add Image"}
              modalComponent={
                <PostCardImage card={card} isUploading={isUploading} />
              }
            />
            <h5 style={{ marginBottom: "0", marginTop: "50px" }}>Action</h5>
            <button onClick={handleButtonClick} className="buttonsincard">
              Cover
            </button>
            <button onClick={handleButtonClick} className="buttonsincard">
              Copy
            </button>
            <OpenModalButton
              className="buttonsincard"
              buttonText={"Delete Card"}
              modalComponent={<DeleteCard card={card} list={list} />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
