/**
 * Created by sergey on 11.06.2017.
 */
const matrixSize = 40;
const lineLength = matrixSize - 1;

const testState = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
const makeZeroFilledArray = (size) => new Array(size).fill().map(()=> new Array(size).fill(0));

const generateInitState = (size, initValues) => {
  let state = makeZeroFilledArray(matrixSize);
  for(const initValue of initValues){
    state[initValue[0]][initValue[1]] = 1;
  }
  return state;
};

const convertArrayToString = arr =>
  arr.reduce(
    (prev, curr) => prev + curr.reduce(
      (prev, curr) => prev+(curr === 0 ? ' ' : '#'), '')+'\n',
    '');

const defineDirections = (i, j, lineLength) => ({
  n:  (lineLength + i - 1) % lineLength,
  s: (lineLength + i + 1) % lineLength,
  w: (lineLength + j - 1) % lineLength,
  e: (lineLength + j + 1) % lineLength,
});

const lifeStep = (state) => {
  let nextState = makeZeroFilledArray(matrixSize);
  for(let i =  0; i < matrixSize; i++){
    for(let j = 0; j < matrixSize; j++){
      const {n, s, w, e} = defineDirections(i,j, lineLength);
      const neighbours = [
        state[n][j],
        state[s][j],
        state[i][w],
        state[i][e],
        state[s][e],
        state[s][w],
        state[n][w],
        state[n][e]
      ];
      const neighboursNumber = neighbours.filter(el => el === 1).length;
      if(state[i][j] === 0 && neighboursNumber === 3)
        nextState[i][j] = 1;
      else if(state[i][j] === 1 && (neighboursNumber === 2 || neighboursNumber === 3))
        nextState[i][j] = 1;
    }
  }
  return nextState;
};

const checkDirection = (size, lineLength, i, j) => {
  let state = makeZeroFilledArray(size);
  const {n, s, w, e} = defineDirections(i, j, size);
  console.log(n, s, w, e);
  state[n][j] = 1;
  state[s][j] = 1;
  state[i][w] = 1;
  state[i][e] = 1;
  state[s][e] = 1;
  state[s][w] = 1;
  state[n][w] = 1;
  state[n][e] = 1;
  const stringifiedState = convertArrayToString(state);
  const neighbours = [ state[w][j], state[e][j], state[i][n], state[i][s], state[w][n], state[w][s], state[e][n], state[e][s] ];
  const neighboursNumber = neighbours.filter(el => el === 1).length;
  console.log(state);
  console.log(neighboursNumber);
};

const runLife = (size) => {
  const glider = [[size/2,size/2],[size/2,size/2+1],[size/2,size/2+2],[size/2-1,size/2+2],[size/2-2,size/2+1]];
  const els = [
    [size/2, size/2], [size/2,size/2-1],[size/2,size/2+1],[size/2-1,size/2],
    [size/2, size/2+6], [size/2,size/2+5],[size/2,size/2+7],[size/2-1,size/2+6],
    [size/2, size/2+12], [size/2,size/2+11],[size/2,size/2+13],[size/2-1,size/2+12],
    [size/2, size/2-6], [size/2,size/2-7],[size/2,size/2-5],[size/2-1,size/2-6]
  ]
  let state = generateInitState(size, els);
  setInterval(() => {
    console.log('\033[2J');
    const stringifiedState = convertArrayToString(state);
    console.log(new Array(size).join('-'));
    console.log(stringifiedState);
    console.log(new Array(size).join('-'));
    state = lifeStep(state);
  }, 150);
};

runLife(matrixSize);
// checkDirection(10, 9, 3, 4);
// console.log(convertArrayToString(lifeStep(testState)));
