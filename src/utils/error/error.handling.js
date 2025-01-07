export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const globalErrorHandler = (error, req, res, next) => {
  if (process.env.MOOD === "DEV") {
    console.log(error);
    return res.status(error.cause || 500).json({ message: error.message , stack : error.stack });
  } else {
    return res.status(error.cause || 500).json({ message: error.message , stack : error.stack });
  }
};

export const generateErrorsDetails = (error) => {
  return error.details.map((error) => {
    return {
      message : error.message,
      path : error.path,
    }
  })
  }
