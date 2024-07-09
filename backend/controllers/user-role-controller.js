const catchAsync = require("../utils/catch-async");
const {
  getUserRoleService,
  getAllUserRolesService,
  createUserRoleService,
  deleteUserRoleService,
  updateUserRoleService,
  updateSpecificUserRoleService,
} = require("../services/user-role-service");

exports.getAllUserRoles = catchAsync(async (req, res, next) => {
  const query = req.query;
  const { userRoles, totalRoles } = await getAllUserRolesService(query);

  res.status(200).json({
    message: "Getting the userRoles is successful.",
    data: {
      userRoles,
      totalRoles,
    },
  });
});

exports.getUserRole = catchAsync(async (req, res, next) => {
  const userRole = await getUserRoleService(req.params.id);

  res.status(200).json({
    message: "Getting the userRole  is successful.",
    data: userRole,
  });
});

exports.createUserRole = catchAsync(async (req, res, next) => {
  const userRole = await createUserRoleService(req.body);

  res.status(200).json({
    message: "Creating userRole is successful.",
    data: userRole,
  });
});

exports.updateUserRole = catchAsync(async (req, res, next) => {
  const userRole = await updateUserRoleService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the userRole is successful",
    data: {
      userRole,
    },
  });
});

exports.updateSpecificUserRole = catchAsync(async (req, res, userId, next) => {
  const updatedUserRole = await updateSpecificUserRoleService(userId);

  res.status(200).json({
    message: "Updating the userRole is successful",
    data: {
      updatedUserRole,
    },
  });
});

exports.deleteUserRole = catchAsync(async (req, res, next) => {
  await deleteUserRoleService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
