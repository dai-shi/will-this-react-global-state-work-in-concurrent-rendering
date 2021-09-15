const fs = require('fs');

const libraries = {
  'react-redux': '<a href="https://react-redux.js.org">react-redux</a>',
  'redux-use-mutable-source': '<a href="https://redux.js.org">redux</a> (w/ useMutableSource)',
  'reactive-react-redux': '<a href="https://github.com/dai-shi/reactive-react-redux">reactive-react-redux</a>',
  'react-tracked': '<a href="https://react-tracked.js.org">react-tracked</a>',
  constate: '<a href="https://github.com/diegohaz/constate">constate</a>',
  zustand: '<a href="https://github.com/pmndrs/zustand">zustand</a>',
  'react-hooks-global-state': '<a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a>',
  'use-context-selector': '<a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)',
  'use-subscription': '<a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)',
  simplux: '<a href="https://github.com/MrWolfZ/simplux">simplux</a>',
  'apollo-client': '<a href="https://github.com/apollographql/apollo-client">apollo-client</a>',
  recoil: '<a href="https://recoiljs.org">recoil</a>',
  jotai: '<a href="https://github.com/pmndrs/jotai">jotai</a>',
  effector: '<a href="https://github.com/zerobias/effector">effector</a>',
  'react-rxjs': '<a href="https://react-rxjs.org">react-rxjs</a>',
  valtio: '<a href="https://github.com/pmndrs/valtio">valtio</a>',
  proxily: '<a href="https://github.com/selsamman/proxily">proxily</a>',
};

function wrap(content, tag) { return `<${tag}>${content}</${tag}>`; }
function check(status) { return status === 'failed' ? ':x:' : ':white_check_mark:'; }

// Get results into an array of test with a 2nd dimension by test/fail
const results = JSON.parse(fs.readFileSync('./outfile.json', 'utf8'));
const testResults = [];
results.testResults[0].assertionResults.forEach((result, ix) => {
  const testNumber = Math.floor(ix / 6);
  testResults[testNumber] = testResults[testNumber] || [];
  testResults[testNumber][ix % 6] = { status: result.status, title: result.ancestorTitles[0] };
});

// Format table for substitution in outfile
let sub = '';
testResults.forEach((result) => {
  const th = wrap(libraries[result[0].title], 'th');
  const tds = result.map((test) => `\t\t${wrap(check(test.status), 'td')}\n`).join('');
  sub += `\t<tr>\n\t\t${th}\n${tds}\t</tr>\n`;
});

// Find first and last line of raw results
let first = 0;
let last = 0;
function note(line, ix) {
  if (line.match(/[✓✕]/)) {
    if (!first) first = ix - 6;
    last = ix;
  }
  // eslint-disable-next-line no-control-regex
  return line.replace(/..\r/g, '').replace(/\[.../g, '').substr(5);
}

// Read and process raw results
const resultsRaw = fs.readFileSync('./outfile_raw.txt', 'utf8');
let lines = resultsRaw.split(/\n\r|\n/).map((l, i) => note(l.substr(0), i));
lines = lines.slice(first, last + 1);
lines = lines.filter((line, ix) => ix % 3 === 0);

// Update readme
let readme = fs.readFileSync('./README.md', 'utf8');
readme = readme.replace(/<table>([\s\S]*?)<\/table>/,
  `<table>\n<tr><th>Test</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr>\r${sub}\n</table>`);
readme = readme.replace(/<details>([\s\S]*?)<\/details>/,
  `<details>\n<summary>Raw Output</summary>\n\n\`\`\`\n${lines.join('\n')}\n\n\`\`\`\n</details>`);

console.log(readme);
fs.writeFileSync('./README.md', readme);
