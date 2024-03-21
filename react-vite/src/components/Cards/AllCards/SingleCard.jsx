import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import PostComment from "../Comments/PostComment";
import { FaRegFileAlt, FaRegStickyNote, FaRegCheckSquare } from 'react-icons/fa';
import { MdImage } from 'react-icons/md';

import "./SingleCard.css";

export default function SingleCard({ card, list }) {
  console.log("🚀 ~ SingleCard ~ list:", list.title)
  console.log("🚀 ~ SingleCard ~ card:", card)
  const dispatch = useDispatch();

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
              <h1 style={{marginBottom: '0px' }} className="sc-title">{card.title}</h1>
              <div className="sc-title" style={{ fontSize: '12px', margin: '0px' }}>In list: {list.title}</div>
          </div>
        </div>

        <div className="sc-container">

          <div className="leftside">

              <div className="label-notif-container">
                <div className="sc-row">Labels: {card.labels}</div>
                <div className="sc-row">Notification: {card.notification}</div>
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
                  <div className="sc-row">Description: {card.description}</div>
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
                  <div className="buttonsincard">Labels</div>
                  <div className="buttonsincard">Checklist</div>
                  <div className="buttonsincard">Dates</div>
                  <div className="buttonsincard">Attachment</div>
                  <h5 style={{ marginBottom: '0', marginTop: '50px' }}>Action</h5>

                  <div className="buttonsincard">Cover</div>
                  <div className="buttonsincard">Copy</div>
                  <div className="buttonsincard">Archive</div>

            </div>

        </div>

      </div>
    </>
  );
}
