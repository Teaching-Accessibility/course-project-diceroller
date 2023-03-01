import { DiceRoller } from "dice-roller-parser";

export default rollParser = (rollQuery) => {
  // Should be able to work on arbitrarily large strings (probably set limit somewhere else though)
  // Split by spaces, go through sequentially
  // call rollDice on all strings with "d"
  // If operand.match(/^d$/), just convert to int
  // If operator, do some math

  const diceRoller = new DiceRoller();
  if (rollQuery) {
    const roll = diceRoller.roll(rollQuery);
    return roll;
  }
};

//temporary implementation. Should soon replace rollParser() as the default return format.
//Returns a formatted subsection of the diceRoller object.
export const rollParserFmt = (rollQuery) => {
  console.log(rollQuery)

  const diceRoller = new DiceRoller();

  if (rollQuery) {

    //check if the roll is only a flat modifer and convert it to a value instead of parsing it
    if(/^\d+$/.test(rollQuery)){
      var result_number = Number(rollQuery)
      return {sum: result_number, diceGroups: ["flat"], rollQuery}
    }

    const result = diceRoller.roll(rollQuery);
    // Group by dice groups, i.e. 2d6, 1d20, 5
    if (result.type === "die") {
      return { sum: result.value, diceGroups: [getRollGroup(result)], rollQuery };
    } else if (result.type === "expressionroll") {
      const diceGroups = result.dice.map((rollGroup) => getRollGroup(rollGroup));
      const sum = result.value;
      return { sum, diceGroups, ops: result.ops, rollQuery };
    } else {
      throw `Unhandled result type: ${result.type}`;
    }
  }
  return null;
};

const getRollGroup = (rollGroup) => {
  const sum = rollGroup.value;
  const type = rollGroup.type;
  if (rollGroup.type === "die") {
    const query = rollGroup.count.value + "d" + rollGroup.die.value;
    const rolls = getRolls(rollGroup.rolls);
    return { query, sum, rolls, type };
  } else if (rollGroup.type === "number") {
    return { sum, type };
  } else {
    throw `Unrecognized roll group type: ${rollGroup.type}`;
  }
};

const getRolls = (rolls) => rolls.map((roll) => ({ value: roll.roll, critical: roll.critical }));

//Simple interface function for diceRoller.rollValue()
//Returns the total rolled value for a query.

export const rollParserValue = (rollQuery) => {
  //check for numberical inputs

  const diceRoller = new DiceRoller();
  if (rollQuery) {
    const total = diceRoller.rollValue(rollQuery);
    return total;
  }
};

// Param: Roll a die or set of a single kind of dice. Always returns an array for rolls
// Example: 1d6, 2d8, 1dF, 1d9
export const rollDice = (dice) => {
  // Probably gonna be a kind of roll that doesn't use d
  // Eventually account for weirder dice like fudge/fate
  // Eventually return additional array with information like max/min numbers rolled, thresholds

  const components = dice.split("d");
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
  return { rolls, sum, query: dice };
};

// Generates number between 1 and max, inclusive
const getRandInt = (max) => {
  if (max < 1) {
    throw `Invalid upper bound passed to getRandInt: ${max}`;
  }
  return Math.floor(Math.random() * max) + 1;
};
