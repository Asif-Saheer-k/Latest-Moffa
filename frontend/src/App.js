import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopBannerPage = lazy(() => import("./pages/shop/shop-banner-products"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
// const BannerProducts = lazy(() => import("./pages/shop-product/PoductPageforBanner"));
// const ProductTabLeft = lazy(() =>
//   import("./pages/shop-product/ProductTabLeft")
// );
// const ProductTabRight = lazy(() =>
//   import("./pages/shop-product/ProductTabRight")
// );
// const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
// const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
// const ProductFixedImage = lazy(() =>
//   import("./pages/shop-product/ProductFixedImage")
// );

// blog pages
// const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
// const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
// const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
// const BlogDetailsStandard = lazy(() =>
//   import("./pages/blog/BlogDetailsStandard")
// );

// other pages
const MyOrders = lazy(() => import("./pages/other/MyOrders"));
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Register = lazy(() => import("./pages/other/Register"));
const OTPverification = lazy(() => import("./pages/other/Otp"));
const OTPLogin = lazy(() => import("./pages/other/Otp-login"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const NotFound = lazy(() => import("./pages/other/NotFound"));
const ReturnPolicy = lazy(() => import("./pages/other/Returns"));
const PrivacyPolicy = lazy(() => import("./pages/other/PrivacyPolicy"));
const Success = lazy(() => import("./pages/other/Success"));
const ErrorPage = lazy(() => import("./pages/other/Error"));
const TermsAndConditions = lazy(() =>
  import("./pages/other/TermsAndCondition")
);
const ShippingPolicy = lazy(() => import("./pages/other/ShipingPolicy"));
const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* Homepages */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFurnitureThree}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/banner-product/:id"}
                  render={(routeProps) => (
                    <ShopBannerPage
                      {...routeProps}
                      key={routeProps.match.params.id}
                    />
                  )}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-orders"}
                  component={MyOrders}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                {/* login page */}
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />
                {/* reagister page */}
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />
                {/* OTP verification page */}
                <Route
                  path={process.env.PUBLIC_URL + "/Otp-verification"}
                  component={OTPverification}
                />
                <Route
                  path={
                    process.env.PUBLIC_URL + "/Otp-login-verification/:phone"
                  }
                  component={OTPverification}
                />

                {/* OTP Login Page */}
                <Route
                  path={process.env.PUBLIC_URL + "/otp-login"}
                  component={OTPLogin}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/success"}
                  component={Success}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/error"}
                  component={ErrorPage}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/Return-Policy"}
                  component={ReturnPolicy}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/Privacy-Policy"}
                  component={PrivacyPolicy}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/Terms-Conditions"}
                  component={TermsAndConditions}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/shipping-policy"}
                  component={ShippingPolicy}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/api/user/callback"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
