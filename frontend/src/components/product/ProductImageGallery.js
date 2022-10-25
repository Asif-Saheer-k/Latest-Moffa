import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import Rating from "./sub-components/ProductRating";
import axios from "axios";

const ProductImageGallery = ({
  product,
  discountedPrice,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  addToast,
  addToCart,
  addToWishlist,
  wholesaler,
  user,
}) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [colorImage, setColorImage] = useState(null);
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };
  const date = new Date().toLocaleDateString();
  var offer = null;
  product.Deal.map((items) => {
    if (items.date == date) {
      offer = items.offer;
      console.log(offer, "FDCVVVVBBBBB");
    }
  });

  const CartAddingFunction = async (
    product,
    addToast,
    quantityCount,
    selectedProductColor,
    selectedProductSize
  ) => {
    addToCart(
      product,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    );

    if (user) {
      const userId = user.CUST_ID;
      const ProId = product.id;
      const color = selectedProductColor;
      const size = selectedProductSize;
      console.log(size, color);
      try {
        const { data } = await axios.post("/api/user/add-to-cart", {
          userId,
          ProId,
          color,
          size,
        });
        console.log(data);
      } catch (error) {}
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product-large-image-wrapper">
              {product.discount || product.new ? (
                <div className="product-img-badges">
                  {wholesaler ? (
                    ""
                  ) : (
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
                          {product.new ? (
                            <span className="purple">New</span>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
              <LightgalleryProvider>
                {colorImage !== null ? (
                  <div className="single-image">
                    <img src={colorImage} className="img-fluid" alt="" />
                  </div>
                ) : (
                  <Swiper {...gallerySwiperParams}>
                    {product.image &&
                      product.image.map((single, key) => {
                        return (
                          <div key={key}>
                            <LightgalleryItem group="any" src={single.url}>
                              <button>
                                <i className="pe-7s-expand1"></i>
                              </button>
                            </LightgalleryItem>
                            <div className="single-image">
                              <img
                                src={single.url}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                  </Swiper>
                )}
              </LightgalleryProvider>
            </div>
            <div
              className="product-small-image-wrapper mt-15"
              onClick={() => {
                setColorImage(null);
              }}
            >
              <Swiper {...thumbnailSwiperParams}>
                {product.image &&
                  product.image.map((single, key) => {
                    return (
                      <div key={key}>
                        <div className="single-image">
                          <img src={single.url} className="img-fluid" alt="" />
                        </div>
                      </div>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product-details-content ml-70">
              <h2>{product.name}</h2>
              <div className="product-details-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>₹{finalDiscountedPrice}</span>{" "}
                    {finalProductPrice && (
                      <span className="old">₹{finalProductPrice}</span>
                    )}
                  </Fragment>
                ) : (
                  <span>₹{finalProductPrice} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pro-details-list">
                <p>{product.shortDescription}</p>
              </div>

              {product.variation ? (
                <div className="pro-details-size-color">
                  <div className="pro-details-color-wrap">
                    <span>Color</span>
                    <div className="pro-details-color-content">
                      {product.variation.map((single, key) => {
                        return (
                          <label
                            style={{ backgroundColor: single.color }}
                            className={`pro-details-color-content--single ${single.color}`}
                            key={key}
                            onClick={() => {
                              setColorImage(single.image);
                            }}
                          >
                            <input
                              type="radio"
                              value={single.color}
                              name="product-color"
                              checked={
                                single.color === selectedProductColor
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductColor(single.color);
                                setSelectedProductSize(single.size[0].name);
                                setProductStock(single.size[0].stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pro-details-size">
                    <span>Size</span>
                    <div className="pro-details-size-content">
                      {product.variation &&
                        product.variation.map((single) => {
                          return single.color === selectedProductColor
                            ? single.size.map((singleSize, key) => {
                                return (
                                  <label
                                    className={`pro-details-size-content--single`}
                                    key={key}
                                  >
                                    <input
                                      type="radio"
                                      value={singleSize.name}
                                      checked={
                                        singleSize.name === selectedProductSize
                                          ? "checked"
                                          : ""
                                      }
                                      onChange={() => {
                                        setSelectedProductSize(singleSize.name);
                                        setProductStock(singleSize.stock);
                                        setQuantityCount(1);
                                      }}
                                    />
                                    <span className="size-name">
                                      {singleSize.name}
                                    </span>
                                  </label>
                                );
                              })
                            : "";
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.affiliateLink ? (
                <div className="pro-details-quality">
                  <div className="pro-details-cart btn-hover ml-0">
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount < productStock - productCartQty
                            ? quantityCount + 1
                            : quantityCount
                        )
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {product.hidden == false ? (
                      <>
                        {productStock && productStock > 0 ? (
                          <button
                            onClick={(e) =>
                              CartAddingFunction(
                                product,
                                addToast,
                                quantityCount,
                                selectedProductColor,
                                selectedProductSize
                              )
                            }
                            disabled={productCartQty >= productStock}
                          >
                            {" "}
                            Add To Cart{" "}
                          </button>
                        ) : (
                          <button disabled>Out of Stock</button>
                        )}
                      </>
                    ) : (
                      <button disabled>Out of Stock</button>
                    )}
                  </div>
                  <div className="pro-details-wishlist">
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
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="pro-details-compare">
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
                      <i className="pe-7s-shuffle" />
                    </button> */}
                    {/* <RWebShare/> */}
                  </div>
                </div>
              )}
              {product.category ? (
                <div className="pro-details-meta">
                  <span>Categories :</span>
                  <ul>
                    {product.category.map((single, key) => {
                      return (
                        <li key={key}>
                          <Link
                            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                          >
                            {single}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}
              {product.tag ? (
                <div className="pro-details-meta">
                  <span>Tags :</span>
                  <ul>
                    {product.tag.map((single, key) => {
                      return (
                        <li key={key}>
                          <Link
                            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                          >
                            {single}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="pro-details-social">
                <ul>
                  <li>
                    <a href=" https://wa.me/+918848572454" target="_blank">
                      <i
                        className="fa fa-whatsapp"
                        style={{ fontSize: "30px", color: "green" }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
  user: PropTypes.object,
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.userData.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductImageGallery);
