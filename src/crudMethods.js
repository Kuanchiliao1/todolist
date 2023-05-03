const crudMethods = (object) => {
  const setProperty = (property, value) => {
    object[property] = value;
  };

  const getProperty = (property) => object[property];

  const getObject = () => object;

  const markDeleted = () => {
    object.deleted = true;
  };

  return { setProperty, getProperty, getObject, markDeleted };
};

export default crudMethods;
