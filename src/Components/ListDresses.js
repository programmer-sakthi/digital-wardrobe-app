import React from "react";
import classes from "./ListDresses.module.css";
import { Card } from "./Card";

// image imports
import otto_shirt from "../images/otto_shirt.jpg";
import parka_avenue_shirt from "../images/park_avenue_shirt.jpg";
import levis_pant from "../images/levis_pant.jpeg"
import calvin_kelin_pant from "../images/calvin_kelin_pant.webp"



// card props - imgSrc,imgAlt,title,description,buttonText,link

const dressList = [
  {
    id: 0,
    dresses: [],
  },
  {
    id: 1,
    dresses: [
      {
        imgSrc: otto_shirt,
        imageAlt: "Otto shirt",
        title: "Otto Shirt",
        description: "White color shirt",
        buttonText: "More Info",
        link: "ottostore.com",
      },
      {
        imgSrc: parka_avenue_shirt,
        imageAlt: "Park Avenue shirt",
        title: "Park Avenue Shirt",
        description: "Checked",
        buttonText: "More Info",
        link: "ottostore.com",
      },
    ],
  },
  {
    id: 2,
    dresses: [
      {
        imgSrc: levis_pant,
        imageAlt: "Levis Pant",
        title: "Levis Pant",
        description: "Jeans",
        buttonText: "More Info",
        link: "ottostore.com",
      },
    ],
  },
  {
    id: 3,
    dresses: [
      {
        imgSrc: "../images/otto_shirt.jpg",
        imageAlt: "Otto shirt",
        title: "Otto Shirt",
        description: "White color shirt",
        buttonText: "More Info",
        link: "ottostore.com",
      },
      {
        imgSrc: "../images/otto_shirt.jpg",
        imageAlt: "Otto shirt",
        title: "Otto Shirt",
        description: "White color shirt",
        buttonText: "More Info",
        link: "ottostore.com",
      },
    ],
  },
  {
    id: 4,
    dresses: [
      {
        imgSrc: "../images/otto_shirt.jpg",
        imageAlt: "Otto shirt",
        title: "Otto Shirt",
        description: "White color shirt",
        buttonText: "More Info",
        link: "ottostore.com",
      },
    ],
  },
  {
    id: 5,
    dresses: [
      {
        imgSrc: "../images/otto_shirt.jpg",
        imageAlt: "Otto shirt",
        title: "Otto Shirt",
        description: "White color shirt",
        buttonText: "More Info",
        link: "ottostore.com",
      },
    ],
  },
];

function ListDresses(props) {
  const filtered = dressList.find((ele) => {
    return ele.id === props.id;
  });
  console.log(filtered);

  return (
    <div className={classes.container}>
      
        {filtered.dresses.map((ele) => {
          return <Card {...ele} />;
        })}
    </div>
  );
}

export default ListDresses;
