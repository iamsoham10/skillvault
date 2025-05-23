const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const imageUploadService = require("../services/imageUploadService");
const asyncHandler = require("express-async-handler");

const getUserController = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const userData = await userService.getUser(user_id);
  res.status(200).json({ success: true, data: userData });
});

const createUserController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await userService.createUser({ username, email, password });
  res.status(201).json({
    success: true,
    message: "User created successfully",
    newUser: newUser,
  });
});

const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const newToken = await userService.loginUser({ email, password }, res);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: newToken,
  });
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }
  const newAccessToken = await tokenService.refreshAccessToken({
    refreshToken,
  });
  res.status(200).json({
    success: true,
    message: "New Access token genereated",
    newAccessToken,
  });
});

const otpVerificationController = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const verifiedUser = await userService.verifyOTP({ email, otp }, res);
  res.status(200).json({
    success: true,
    message: "User verified successfully",
    user: verifiedUser,
  });
});

const imageUploadController = asyncHandler(async (req, res) => {
  const { user_id } = req.body;
  const imageFile = req.file;
  if (!imageFile || !user_id) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide both image and user_id",
      });
  }
  const imageUploadResult = await imageUploadService.uploadToCloudinary(
    req,
    res
  );
  // console.log(imageUploadResult);
  const imageUrl = imageUploadResult.secure_url;
  // console.log("imageUrl", imageUrl);
  const imageUploadFinal = await userService.updateUserProfilePicture(
    user_id,
    imageUrl
  );
  res
    .status(200)
    .json({
      success: true,
      message: "Image uploaded successfully",
      imageUploadFinal,
    });
});

module.exports = {
  getUserController,
  createUserController,
  loginUserController,
  refreshTokenController,
  otpVerificationController,
  imageUploadController,
};
