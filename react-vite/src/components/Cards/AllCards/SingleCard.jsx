import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import PostComment from "../Comments/PostComment";
import { thunkGetAllComments } from "../../../store/comments";
import { FaRegFileAlt, FaRegStickyNote, FaRegCheckSquare } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';

import "./SingleCard.css";
import { thunkEditCard, thunkGetCard } from "../../../store/cards";

export default function SingleCard({ card, list }) {
  const cardState = useSelector((state) => state.card)
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description)
  const [labels, setlabels] = useState(card.labels)
  const [notif, setNotif] = useState(card.notification)
  const [editTitle, setEditTitle] = useState(false)
  const [editLabels, setEditLabels] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editNotif, setEditNotif] = useState(false);

  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (cardState?.title) setTitle(cardState.title)

    dispatch(thunkGetCard(card.id))
    dispatch(thunkGetAllComments(card.id))
  }, [dispatch, cardState])

  const handleEdit = () => {
    return (
      <OpenModalButton
        buttonText={"Edit Card"}
        modalComponent={<EditCard card={card} list={list} />}
      />
    )
  }

  const handleNotifChange = (e) => {
    setNotif(!notif)
    handleSubmit(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editCards = {
      title,
      description,
      labels,
      notification: notif
    }

    const res = await dispatch(thunkEditCard(card.id, editCards));

    if (res && res.errors) {
      return setErrors(res.errors);
    }

    setEditTitle(false);
    setEditLabels(false)
    setEditNotif(false)
    setEditDescription(false)
  }




  return (
    <>
      <div className="cardcontainer">

        <div className="photocover">

          {/* <div>
            Photo cover
          </div> */}

        </div>

        <div className="titlescont">
          <div style={{marginTop:'5px'}} className="logo">
            <FaRegFileAlt />
          </div>

          <div>
            {editTitle === false ? (
              <h1 onDoubleClick={() => setEditTitle(true)} style={{marginBottom: '0px' }} className="sc-title">{title}</h1>
            ):(
              <form className="edit-card-form" onSubmit={handleSubmit}>
              <label htmlFor="title">
                <input
                  className="eb-lists-input"
                  type="text"
                  value={title}
                  onBlur={handleSubmit}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors?.title && <p className="p-error">{errors.title}</p>}
              </label>
            </form>
            )}
              <div className="sc-title" style={{ fontSize: '12px', margin: '0px' }}>In list: {list.title}</div>
          </div>


        </div>

        <div className="sc-container">

          <div className="leftside">

              <div className="label-notif-container">
                <div>
                  {editLabels === false ? (
                    <div onDoubleClick={() => setEditLabels(true)} className="sc-row">
                      Labels: {card.labels ? card.labels : null}
                    </div>
                  ) : (
                    <form className="edit-card-form" onSubmit={handleSubmit}>
                      <label htmlFor="labels">
                        <input
                          className="eb-lists-input"
                          type="text"
                          value={labels}
                          onBlur={handleSubmit}
                          onChange={(e) => setlabels(e.target.value)}
                        />
                        {errors?.labels && <p className="p-error">{errors.labels}</p>}
                      </label>
                    </form>
                  )}
                </div>

              <div
                onClick={(e) => handleNotifChange(e)}
                className="sc-row"
                style={{ backgroundColor: notif ? 'lightblue' : 'transparent' }}
              >
                {notif ? "Notify me!" : "Don't notify me."}
              </div>


              </div>

              <div className="description-container">
                <div className="logo">
                <FaRegStickyNote />
                </div>
                <div className="fillthespace">
                  <div className="editanddescription">
                    <div>
                      Description
                    </div>
                    <button>
                      Edit
                    </button>
                  </div>
                    {editDescription === false ? (
                      <div onDoubleClick={() => setEditDescription(true)} className="sc-row">{description}</div>
                    ) : (
                      <form className="edit-card-form" onSubmit={handleSubmit}>
                        <label htmlFor="description">
                          <textarea
                            className="ed-card-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          {errors?.description && <p className="p-error">{errors.description}</p>}
                        </label>
                        <button type="submit">Submit</button>
                      </form>
                    )}
                </div>
              </div>

              <div className="attachments-container">
                <div className="logo">
                  <MdImage />
                </div>
                <div>
                  Attachments container goes here:
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
              <div className="postcommentcont"><PostComment card={card} /></div>
              <div>
                {card.id && (
                  <div>
                    <OpenModalButton
                      buttonText={"Edit Card"}
                      modalComponent={<EditCard card={card} list={list} />}
                    />

                    <OpenModalButton
                      buttonText={"Delete Card"}
                      modalComponent={<DeleteCard card={card} list={list} />}
                    />
                  </div>
                )}
              </div>
              <div>
                <AllComments card={card} />
              </div>
            </div>

            <div className="rightside">
            <h5 style={{ marginBottom: '0'}}>Add to card</h5>
                  <div className="buttonsincard">Members</div>
                  {card.labels ? null : <div className="buttonsincard">Labels</div>}
                  <div className="buttonsincard">Checklist</div>
                  <div className="buttonsincard">Dates</div>
                  <div className="buttonsincard">Attachment</div>
                  <h5 style={{ marginBottom: '0', marginTop: '50px' }}>Action</h5>

                  <div className="buttonsincard">Cover</div>
                  <div className="buttonsincard">Copy</div>
                  <div onClick={handleEdit} className="buttonsincard">Edit Card</div>
                  <div className="buttonsincard">Archive</div>

            </div>

        </div>

      </div>
    </>
  );
}
