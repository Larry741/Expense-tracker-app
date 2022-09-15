const User = require("./user.mongo");

export async function saveUser(userData) {
  return await User.create(userData);
}

export const getUserByEmail = async (id) => {
  return await User.findOne({
    _id: id,
  })
    .select("_id name password")
    .lean();
};

export const getUserExpenseData = async (email) => {
  const { expenses } = await User.findOne({
    _id: email,
  })
    .select("expenses")
    .lean();

  return expenses;
};

export const postUserExpenseData = async (email, expensedata) => {
  return await User.findOneAndUpdate(
    {
      _id: email,
    },
    { expenses: expensedata },
    { upsert: true }
  );
};