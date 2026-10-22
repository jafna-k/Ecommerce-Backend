
// import {
//   createCategory,
//   getCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// } from "./category.service.js";

// import Category from "./category.model.js";

// export const create = async (req, res) => {
//   try {
//     const category = await createCategory(req.body);
//     return res.status(201).json(category);
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// export const getAll = async (req, res) => {
//   try {
//     const categories = await getCategories();
//     return res.status(200).json(categories);
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// export const getOne = async (req, res) => {
//   try {
//     const category = await getCategoryById(req.params.id);
//     return res.status(200).json(category);
//   } catch (error) {
//     return res.status(404).json({
//       message: error.message,
//     });
//   }
// };

// export const update = async (req, res) => {
//   try {
//     const category = await updateCategory(
//       req.params.id,
//       req.body
//     );

//     return res.status(200).json(category);
//   } catch (error) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// export const remove = async (req, res) => {
//   try {
//     const result = await deleteCategory(req.params.id);
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(404).json({
//       message: error.message,
//     });
//   }
// };

// // Activate / Deactivate category
// export const toggleStatus = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     category.status =
//       category.status === "active" ? "inactive" : "active";

//     await category.save();

//     return res.status(200).json({
//       success: true,
//       message:
//         category.status === "active"
//           ? "Category activated successfully"
//           : "Category deactivated successfully",
//       data: category,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Unable to update category status",
//     });
//   }
// };



import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.service.js";

import Category from "./category.model.js";

const prepareCategoryData = (req, isUpdate = false) => {
  const data = { ...req.body };

  if (req.file) {
    data.image = `/uploads/categories/${req.file.filename}`;
  } else if (isUpdate) {
    // Keep the existing image when no new image is uploaded.
    delete data.image;
  }

  return data;
};

// Create category
export const create = async (req, res) => {
  try {
    const data = prepareCategoryData(req);
    const category = await createCategory(data);

    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get all categories
export const getAll = async (req, res) => {
  try {
    const categories = await getCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get category by ID
export const getOne = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    return res.status(200).json(category);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// Update category
export const update = async (req, res) => {
  try {
    const data = prepareCategoryData(req, true);

    const category = await updateCategory(
      req.params.id,
      data
    );

    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Delete category
export const remove = async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// Activate / Deactivate category
export const toggleStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    category.status =
      category.status === "active" ? "inactive" : "active";

    await category.save();

    return res.status(200).json({
      success: true,
      message:
        category.status === "active"
          ? "Category activated successfully"
          : "Category deactivated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to update category status",
    });
  }
};