import Modal from "react-native-modal";

export default class UserEdit {
  render() {
    let { eitedUser, onSave, onCancel, isVisible } = this.props;
    let fields = [];
    let editablePropeerties = ["name"];
    if (user) {
      fields = Object.keys(user)
        .filter(key => editablePropeerties.indexOf(key) !== -1)
        .map(key => {
          return {
            type: "text",
            name: key,
            placeholder: key,
            value: user[key]
          };
        });
    }
    return (
      <Modal isVisible={isVisible}>
        <Container style={{ flex: 1 }}>
          <Formik
            onSubmit={(values, actions) => {
              onSave(user, values);
            }}
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
                <Form>
                  {fields.map((field, index) => {
                    let hasError =
                      errors[field.name] && errors[field.name].length > 0;
                    return (
                      <Item
                        key={field.name}
                        floatingLabel
                        success={!hasError}
                        error={hasError}
                      >
                        <Label>{field.name}</Label>
                        <Input
                          id={field.name}
                          // placeholder={field.value}
                          type={field.type}
                          onChangeText={text => {
                            setFieldValue(field.name, text);
                          }}
                          value={field.value}
                          // onBlur={handleBlur}
                          required={field.required}
                        />
                        {errors[field.name] &&
                          touched[field.name] && (
                            <Text>{errors[field.name]}</Text>
                          )}
                      </Item>
                    );
                  })}
                  <Button
                    onPress={event => {
                      handleSubmit(event);
                    }}
                    // disabled={isSubmitting}
                  >
                    <Text>Save</Text>
                  </Button>
                  <Button
                    onPress={event => {
                      onCancel(event);
                    }}
                    // disabled={isSubmitting}
                  >
                    <Text>Cancel</Text>
                  </Button>
                </Form>
              );
            }}
          />
        </Container>
      </Modal>
    );
  }
}
