export default rollParser = rollQuery => {
  // Should be able to work on arbitrarily large strings (probably set limit somewhere else though)
  // Split by spaces, go through sequentially
  // call rollDice on all strings with "d"
  // If operand.match(/^d$/), just convert to int
  // If operator, do some math
};

// Param: Roll a die or set of a single kind of dice. Always returns an array for rolls
// Example: 1d6, 2d8, 1dF, 1d9
export const rollDice = dice => {
  // Probably gonna be a kind of roll that doesn't use d
  // Eventually account for weirder dice like fudge/fate
  // Eventually return additional array with information like max/min numbers rolled, thresholds
  const components = dice.split('d');
  if (components.length !== 2) {
    throw `Incorrect die string passed to rollDie: ${dice}`;
  }
  const [quantity, type] = components;
  const rolls = [];
  let sum = 0;
  for (let i = 0; i < quantity; i++) {
    const roll = getRandInt(type);
    rolls.push(roll);
    sum += roll;
  }
  return {rolls, sum, query: dice};
};

// Generates number between 1 and max, inclusive
const getRandInt = max => {
  if (max < 1) {
    throw `Invalid upper bound passed to getRandInt: ${max}`;
  }
  return Math.floor(Math.random() * max) + 1;
};
