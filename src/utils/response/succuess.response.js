export const succuessResponse = ({
  res,
  data,
  message = "Success",
  status = 200,
}) => {
  return res.status(status).json({
    message,
    data,
  });
};
