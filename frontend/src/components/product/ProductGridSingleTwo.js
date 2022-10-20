import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { useHistory } from "react-router-dom";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
  user,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [Deal, setDeal] = useState(null);
  const { addToast } = useToasts();
  const history = useHistory();
  const date = new Date().toLocaleDateString();
  var offer = null;
  console.log(product,"DCDXXXX");
  product.Deal.map((items) => {
    console.log(items.date,date);
    if (items.date == date) {
      offer = items.offer;
      console.log(offer,"FDCCCCCCCCC");
    }
  });
  var finalProductPrice;
  var finalDiscountedPrice;
  var wholesaler=false;
  if (user?.user == true || user == null) {
    if(offer){
      var discountedPrice = getDiscountPrice(product.price,offer).toFixed(0);
    }else if(product.discount){
      var discountedPrice = getDiscountPrice(product.price, product.discount).toFixed(0);
    }else{
      var discountedPrice = null;
    }
    finalProductPrice = product.price;
    finalDiscountedPrice = discountedPrice;
  } else {
    wholesaler=true
    finalProductPrice = product.price;
    finalDiscountedPrice = product.wholesaler;
  }
  const singlePage = () => {
    window.location.href=`${process.env.PUBLIC_URL}/product/${product.id}`
  };
  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ""
          } ${colorClass ? colorClass : ""} `}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img className="default-img"  src={product.image[0].url} alt="" />
              {product.image.length > 1 ? (
                <img className="hover-img" src={product.image[1].url} alt="" />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {wholesaler ? (
                  ""
                ) :  (
                  <>
                    {product.discount ? (
                      <span className="pink">-{product.discount}%</span>
                    ) : (
                      <>
                        {offer ? <span className="pink">-{offer}%</span> : ""}
                      </>
                    )}
                    {offer ? (
                      <>
                        <span className="purple text-warnin">Deal</span>
                      </>
                    ) : (
                      <>
                        {product.new ? <span className="purple">New</span> : ""}
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Buy now"
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link onClick={singlePage} title="Select options">
                  <i className="fa fa-cog"></i>
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => addToCart(product, addToast)}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>

              {/* <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                onClick={() => addToCompare(product, addToast)}
              >
                <i className="fa fa-retweet"></i>
              </button> */}
            </div>
          </div>
          <div className="product-content-2">
            <div
              className={`title-price-wrap-2 ${
                titlePriceClass ? titlePriceClass : ""
              }`}
            >
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                  {product.name}
                </Link>
              </h3>
              <div className="price-2">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>₹{finalDiscountedPrice}</span>{" "}
                    <span className="old">₹{finalProductPrice}</span>
                  </Fragment>
                ) : (
                  <span>₹{finalProductPrice} </span>
                )}
              </div>
            </div>
            <div className="pro-wishlist-2">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => addToWishlist(product, addToast)}
              >
                <i className="fa fa-heart-o" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingleTwo;
