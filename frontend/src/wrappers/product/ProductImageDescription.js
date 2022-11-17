import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
// import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
  user,

}) => {

  // const [offer, setOffer] = useState();
  const wishlistItem = wishlistItems.filter(
    (wishlistItem) => wishlistItem.id === product.id
  )[0];
  const compareItem = compareItems.filter(
    (compareItem) => compareItem.id === product.id
  )[0];
  const { addToast } = useToasts();
  const date = new Date().toLocaleDateString();
  var offer = null;
  product.Deal.map((items) => {

    if (items.date == date) {         
      offer = items.offer;
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

  return (
    <div
      className={`shop-area mt-5 ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6"> */}
      {/* product image gallery */}
      {galleryType === "leftThumb" ? (
        <ProductImageGallerySideThumb product={product} thumbPosition="left" />
      ) : galleryType === "rightThumb" ? (
        <ProductImageGallerySideThumb product={product} />
      ) : galleryType === "fixedImage" ? (
        <ProductImageFixed product={product} />
      ) : (
        <ProductImageGallery
          product={product}
          discountedPrice={discountedPrice}
          currency={currency}
          finalDiscountedPrice={finalDiscountedPrice}
          finalProductPrice={finalProductPrice}
          cartItems={cartItems}
          wishlistItem={wishlistItem}
          compareItem={compareItem}
          addToast={addToast}
          wholesaler={wholesaler}
        />
      )}
      {/* </div> */}
      {/* <div className="col-lg-6 col-md-6">
            product description info
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
            /> */}
      {/* </div> */}
      {/* </div>
      </div> */}
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array,
  user:PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
    user: state.userData.user,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
