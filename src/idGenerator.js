const idGenerator = () => {
  let id = 0;

  return () => {
    id++;
  };
};

const createId = idGenerator();

export default createId;
