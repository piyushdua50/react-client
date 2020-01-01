import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function withLoaderAndMessage(Component) {
  return class WithLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading, dataLength } = this.props;
      if (loading === true && dataLength) {
        return (
          <div align="center">
            <CircularProgress size={48} />
          </div>
        );
      }
      if (loading === false && dataLength) {
        return (
          <div align="center">
            <Component {...this.props} />
          </div>
        );
      }
      if (loading === true && !dataLength) {
        return (
          <div align="center">
            <CircularProgress size={48} />
          </div>
        );
      }
      return (
        <div align="center">
          <h1>Oops!! No more Trainees</h1>
        </div>
      );
    }
  };
}

export default withLoaderAndMessage;
