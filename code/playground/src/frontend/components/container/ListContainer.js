import React from "react";
import { connect } from "react-redux";
import List from "../presentational/List"

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedListContainer = ({ articles }) => (
    <List articles={articles} />
);

const ListContainer = connect(mapStateToProps, null)(ConnectedListContainer);

export default ListContainer;
