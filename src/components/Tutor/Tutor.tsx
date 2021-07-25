import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { useHistory } from "react-router";
import { Label } from "../common";
import "./Tutor.scss";

export const Tutor: React.FC<ITutor> = ({
  name,
  avatar,
  address,
  major,
  rating,
}) => {
  const history = useHistory();

  return (
    <div className="tutor-item">
      <div className="tutor-item__image">
        <img
          src={
            avatar ||
            "https://p.bigstockphoto.com/vVu7XprxSayr867oA3KQ_bigstock-Colorful-fruit-pattern-of-fres-282127069.jpg"
          }
          alt=""
        />
      </div>
      <div className="tutor-item__info">
        <div className="tutor-item__header">
          <p className="tutor-item__name">{name}</p>
          <div className="tutor-item__rating">
            <span>{rating} </span>
            <AiFillStar size={20} color="#EEA320" />
          </div>
        </div>

        <Label
          icon={<ImLocation2 size={16} />}
          title={
            
            <p className="tutor-item__title">
              {address?.length < 30
                ? address
                : address?.substring(0, 30) + "..."}
            </p>
            
          }
        />
        <Label
          icon={<GiBookCover size={16} />}
          title={
            <span className="tutor-item__title">
              {major?.map((item: any, index: number) => {
                return <span key={index}> {item.item} .</span>;
              })}
            </span>
          }
        />

        <Label
          icon={<FaGraduationCap size={16} />}
          title={
            <span className="tutor-item__title">
              {major?.map((item: any, index: number) => {
                return <span key={index}> {item.item} .</span>;
              })}
            </span>
          }
        />
      </div>
    </div>
  );
};
