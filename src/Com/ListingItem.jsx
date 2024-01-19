import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

// <MdEditSquare />

const ListingItem = ({ listing, id,onEdit,onDelete}) => {
  const formattedDate = listing.timestamp ? (
    <Moment
      className="absolute top-2 left-2 bg-blue-500 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
      fromNow
    >
      {listing.timestamp.toDate()}
    </Moment>
  ) : null;

  const formattedPrice =
    listing.type === "rent"
      ? `₹${
          listing.offer
            ? listing.discountprice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularprice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }/month`
      : `₹${listing.regularprice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        {formattedDate && <p>{formattedDate}</p>}
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <FaLocationDot className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>
          <p className="text-blue-500 mt-2 font-semibold">{formattedPrice}</p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-orange-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEditSquare
          className="absolute bottom-2 right-7 h-4 cursor-pointer text-gray-500 "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
};

export default ListingItem;
