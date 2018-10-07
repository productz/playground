import React from "react";
import { toJS } from "mobx";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import moonlighter from "./moonlighter.jpg";
import nook from "./nook.jpg";
import House from "./House";
import FormFields from "../Forms/Forms";

let styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 750,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  textField: {
    margin: "1em 0"
  }
});

class HouseEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  render() {
    console.log("rerender house edit");
    let { house, onSave, onCancel, classes } = this.props;
    let fields = [];
    let images = [
      { name: "Nook", image: nook },
      { name: "Moonlighter", image: moonlighter }
    ];
    let image;
    let editableProperties = [
      "name",
      "description",
      "bedrooms",
      "baths",
      "size"
    ];
    if (house) {
      image = images.find(({ name }) => name === house.name);
      fields = Object.keys(house)
        .filter(key => editableProperties.indexOf(key) !== -1)
        .map(key => {
          return {
            type: "text",
            name: key,
            placeholder: key,
            value: house[key]
          };
        });
    }
    return (
      <Card className={classes.layout} style={{ flex: 1 }}>
        <CardMedia>
          <img width="500px" height="auto" src={image && image.image} />
        </CardMedia>
        <CardContent>
          <Formik
            onSubmit={(values, actions) => {
              onSave(house, values);
            }}
            initialValues={toJS(house)}
            enableReinitialize={true}
            render={({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              validateForm,
              submitForm
            }) => {
              return (
                <form>
                  <FormFields fields={fields} />
                  {fields.map((field, index) => {
                    let hasError =
                      errors[field.name] && errors[field.name].length > 0;
                    return (
                      <div key={field.name}>
                        <TextField
                          id={field.name}
                          label={field.name}
                          type={field.type}
                          onChange={event => {
                            setFieldValue(field.name, event.target.value);
                          }}
                          fullWidth={true}
                          multiline={field.name === "description"}
                          className={classes.textField}
                          // onBlur={handleBlur}
                          value={values[field.name]}
                          required={field.required}
                        />
                        {errors[field.name] &&
                          touched[field.name] && <p>{errors[field.name]}</p>}
                      </div>
                    );
                  })}
                  <CardActions>
                    <Button
                      onClick={event => {
                        handleSubmit(event);
                      }}
                      // disabled={isSubmitting}
                    >
                      <p>Save</p>
                    </Button>
                    <Button
                      onClick={event => {
                        onCancel(event);
                      }}
                      // disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </CardActions>
                </form>
              );
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(HouseEdit);
