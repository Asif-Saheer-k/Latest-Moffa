import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useHistory } from "react-router-dom";

const Product = ({ location, product }) => {
  const history = useHistory();
  const { pathname } = location;
  useEffect(() => {
    if (!product) {
      history.push("/not-found");
    }
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Moffa | Product Page</title>
        <meta name="description" content="Product page of thepaaki website" />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {product && (
          <>
            {/* product description with image */}
            <ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
            />

            {/* product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={product.shortDescription}
              product={product}
            />

            {/* related product slider */}
            <RelatedProductSlider
              spaceBottomClass="pb-95"
              category={product.category[0]}
            />
          </>
        )}
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      (single) => single.id === itemId
    )[0],
  };
};

export default connect(mapStateToProps)(Product);
