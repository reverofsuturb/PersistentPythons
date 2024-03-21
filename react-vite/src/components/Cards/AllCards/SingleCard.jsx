import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import OpenModalButton from "../../OpenModalButton";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import AllComments from "../Comments/AllComments";
import PostComment from "../Comments/PostComment";
import "./SingleCard.css";

export default function SingleCard({ card, list }) {
  console.log("🚀 ~ SingleCard ~ list:", list.title)
  console.log("🚀 ~ SingleCard ~ card:", card)
  const dispatch = useDispatch();

  return (
    <>
      <div className="cardcontainer">

        <div className="photocover">

          <div>
            Photo cover
          </div>

        </div>


        <div className="sc-container">

          <div className="leftside">
              <h2 className="sc-title">Card Title:{card.title}</h2>
              <h2 className="sc-title">In list: {list.title}</h2>

              <div className="label-notif-container">
                <div className="sc-row">Labels: {card.labels}</div>
                <div className="sc-row">Notification: {card.notification}</div>
              </div>

              <div className="description-container">
                <div className="logo">
                  logo
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

              {/* <div className="sc-row">Start Date: {card.start_date}</div>
              <div className="sc-row">End Date: {card.end_date}</div> */}
              <div className="sc-row">Checklist: {card.checklist}</div>
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
                  <div>Add to card</div>
                  <div>Members</div>
                  <div>Labels</div>
                  <div>Checklist</div>
                  <div>Dates</div>
                  <div>Attachment</div>
                  <div>Cover</div>
                  <div>Copy</div>
                  <div>Archive</div>

            </div>

        </div>

      </div>
    </>
  );
}
