import React from "react";
import withHocs from "./queryHocCategories";

class CategoryPage extends React.Component {
  handleSearch = () => {
    const { data } = this.props;
    const { filter } = "tech";

    data.fetchMore({
      variables: { filter },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  };
  render() {
    const { data = {} } = this.props;
    console.log(data);
    return <h1>CategoruPage</h1>;
  }
}

export default withHocs(CategoryPage);
