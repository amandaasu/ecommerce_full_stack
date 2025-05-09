const buildQuery = ({ type, search, sku, price }) => {
  const query = {};

  if (type) {
    query.type = { $regex: type, $options: "i" };
  }

  if (sku) {
    query.variantSKU = { $regex: sku, $options: "i" };
  }

  if (search) {
    query.$or = [{ title: { $regex: search, $options: "i" } }, { variantSKU: { $regex: search, $options: "i" } }];
  }

  if (price) {
    const operators = {
      "=": "$eq",
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
    };

    const priceMatch = price.match(/(>=|<=|=|>|<)(\d+)/);
    if (priceMatch) {
      const operator = operators[priceMatch[1]];
      const value = parseFloat(priceMatch[2]);
      query.variantPrice = { [operator]: value };
    }
  }

  return query;
};

module.exports = { buildQuery };
