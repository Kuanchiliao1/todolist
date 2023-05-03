const crudMethods = (object) => {
  const setProperty = (property, value) => {
    object[property] = value;
  };

  const getProperty = (property) => object[property];

  const getObj = () => [object, 'example'];

  const markDeleted = () => {
    object.deleted = true;
  };

  return { setProperty, getProperty, getObj, markDeleted };
};

export default crudMethods;
