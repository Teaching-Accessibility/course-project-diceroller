export default [
  { name: "Custom" },
  {
    name: "D&D 5e",
    dice: ["d20", "d12", "d10", "d8", "d6", "d4", "d100", "flat"],
    savedRolls: [
      { id: 1, name: "Crossbow Attack", dice: "1d20 + 5" },
      { id: 2, name: "Crossbow Damage", dice: "1d6 + 3" },
      { id: 3, name: "Dexterity Saving Throw", dice: "1d20 + 4" },
    ],
  },
  {
    name: "Powered by the Apocalypse",
    dice: ["d6"],
    savedRolls: [{ id: 1, name: "Core", dice: "2d6" }],
  },
  {
    name: "Kids on Stuff",
    dice: ["d20", "d12", "d10", "d8", "d6", "d4"],
    savedRolls: [
      { id: 1, name: "Grit", dice: "1d20", modifiers: ["exploding"] },
      { id: 2, name: "Charm", dice: "1d12", modifiers: ["exploding"] },
      { id: 3, name: "Fight", dice: "1d10", modifiers: ["exploding"] },
      { id: 4, name: "Flight", dice: "1d8", modifiers: ["exploding"] },
      { id: 5, name: "Brains", dice: "1d6", modifiers: ["exploding"] },
      { id: 6, name: "Brawn", dice: "1d4", modifiers: ["exploding"] },
    ],
  },
];
