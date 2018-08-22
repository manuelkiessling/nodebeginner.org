import { connect } from "react-redux";
import List from "../presentational/List"

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  };
};

const ListContainer = connect(mapStateToProps, null)(List);

export default ListContainer;
