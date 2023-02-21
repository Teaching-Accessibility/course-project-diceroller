import { DiceRoller } from "dice-roller-parser";

export default rollParser = (rollQuery) => {
  // Should be able to work on arbitrarily large strings (probably set limit somewhere else though)
  // Split by spaces, go through sequentially
  // call rollDice on all strings with "d"
  // If operand.match(/^d$/), just convert to int
  // If operator, do some math

    const diceRoller = new DiceRoller();
    console.log(rollQuery);
    const roll = diceRoller.roll(rollQuery);
    console.log(roll)
    return roll;
};

//temporary implementation. Should soon replace rollParser() as the default return format.
//Returns a formatted subsection of the diceRoller object.
export const rollParserFmt = (rollQuery) => {
  const diceRoller = new DiceRoller();
  const diceRolls = diceRoller.roll(rollQuery);
  const sum = diceRoller.rollValue(rollQuery)

  //split query into substrings to include in dice groups
  const queryArray = rollQuery.split("+");

  //consruct an array of each group of dice results (3d6, 2d10, etc.)
  result = []
  for (i in diceRolls.dice){

    //construct an array of each die roll in that group
    var group = diceRolls.dice[i]
    diceResults = []
    for (j in group.rolls){
      var die = group.rolls[j]
      diceResults.push(
        {dieResult: die.roll,
          critical: die.critical,
          type: die.die
        }
      )
    }

    result.push(
      {sum: group.value,
        query: queryArray[i],
        rolls: diceResults
      }
    );
  }

  return {total: sum,
          query: rollQuery,
          result: result};
}

//Simple interface function for diceRoller.rollValue()
//Returns the total rolled value for a query.
export const rollParserValue = (rollQuery) => {
  const diceRoller = new DiceRoller();
  const total = diceRoller.rollValue(rollQuery)
  return total
}

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
