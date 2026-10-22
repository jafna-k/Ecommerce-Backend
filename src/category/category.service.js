// // import Category from "./category.model.js";

// // export const createCategory = async (data) => {
// //   const { name, description } = data;

// //   if (!name || !description) {
// //     throw new Error("Name and description are required");
// //   }

// //   const existingCategory = await Category.findOne({
// //     name: name.trim(),
// //   });

// //   if (existingCategory) {
// //     throw new Error("Category already exists");
// //   }

// //   return await Category.create({
// //     name: name.trim(),
// //     description: description.trim(),
// //   });
// // };


// // export const getCategories = async () => {
// //   return await Category.find().sort({ createdAt: -1 });
// // };


// // export const getCategoryById = async (id) => {
// //   const category = await Category.findById(id);

// //   if (!category) {
// //     throw new Error("Category not found");
// //   }

// //   return category;
// // };


// // export const updateCategory = async (id, data) => {
// //   const { name, description } = data;

// //   const category = await Category.findByIdAndUpdate(
// //     id,
// //     {
// //       name,
// //       description,
// //     },
// //     {
// //       new: true,
// //       runValidators: true,
// //     }
// //   );

// //   if (!category) {
// //     throw new Error("Category not found");
// //   }

// //   return category;
// // };


// // export const deleteCategory = async (id) => {
// //   const category = await Category.findByIdAndDelete(id);

// //   if (!category) {
// //     throw new Error("Category not found");
// //   }

// //   return {
// //     message: "Category deleted successfully",
// //   };
// // };



// import Category from "./category.model.js";

// // Create category
// export const createCategory = async (data) => {
//   const { name, description, image = "" } = data;

//   if (!name?.trim() || !description?.trim()) {
//     throw new Error("Name and description are required");
//   }

//   const existingCategory = await Category.findOne({
//     name: name.trim(),
//   });

//   if (existingCategory) {
//     throw new Error("Category already exists");
//   }

//   return await Category.create({
//     name: name.trim(),
//     description: description.trim(),
//     image,
//     status: data.status || "active",
//   });
// };

// // Get all categories
// export const getCategories = async () => {
//   return await Category.find().sort({ createdAt: -1 });
// };

// // Get category by ID
// export const getCategoryById = async (id) => {
//   const category = await Category.findById(id);

//   if (!category) {
//     throw new Error("Category not found");
//   }

//   return category;
// };

// // Update category
// export const updateCategory = async (id, data) => {
//   const category = await Category.findById(id);

//   if (!category) {
//     throw new Error("Category not found");
//   }

//   if (data.name !== undefined) {
//     const name = data.name.trim();

//     if (!name) {
//       throw new Error("Category name is required");
//     }

//     const existingCategory = await Category.findOne({
//       name,
//       _id: { $ne: id },
//     });

//     if (existingCategory) {
//       throw new Error("Category already exists");
//     }

//     category.name = name;
//   }

//   if (data.description !== undefined) {
//     const description = data.description.trim();

//     if (!description) {
//       throw new Error("Category description is required");
//     }

//     category.description = description;
//   }

//   // Update image only when a new image is provided.
//   if (data.image !== undefined) {
//     category.image = data.image;
//   }

//   if (data.status !== undefined) {
//     category.status = data.status;
//   }

//   await category.save();

//   return category;
// };

// // Delete category
// export const deleteCategory = async (id) => {
//   const category = await Category.findByIdAndDelete(id);

//   if (!category) {
//     throw new Error("Category not found");
//   }

//   return {
//     message: "Category deleted successfully",
//   };
// };




import Category from "./category.model.js";

// Create category
export const createCategory = async (data) => {
  const { name, description, image = "" } = data;

  if (!name?.trim() || !description?.trim()) {
    throw new Error("Name and description are required");
  }

  const existingCategory = await Category.findOne({
    name: name.trim(),
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  return await Category.create({
    name: name.trim(),
    description: description.trim(),
    image,
    status: data.status || "active",
  });
};

// Get all categories
export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

// Get category by ID
export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// Update category
export const updateCategory = async (id, data) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (data.name !== undefined) {
    const name = data.name.trim();

    if (!name) {
      throw new Error("Category name is required");
    }

    const existingCategory = await Category.findOne({
      name,
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    category.name = name;
  }

  if (data.description !== undefined) {
    const description = data.description.trim();

    if (!description) {
      throw new Error("Category description is required");
    }

    category.description = description;
  }

  if (data.image !== undefined) {
    category.image = data.image;
  }

  if (data.status !== undefined) {
    category.status = data.status;
  }

  await category.save();

  return category;
};

// Delete category
export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return {
    message: "Category deleted successfully",
  };
};
