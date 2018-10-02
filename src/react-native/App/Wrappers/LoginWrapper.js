import React, { Children } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
});

class LoginWrapper extends React.Component {
  render() {
    const { classes, children, backgroundImage } = this.props;
    return (
      <React.Fragment>
        <main
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"100%",
            height:"1000px",
            objectFit:"cover"
          }}
        >
          {children}
        </main>
      </React.Fragment>
    );
  }
}

LoginWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginWrapper);
