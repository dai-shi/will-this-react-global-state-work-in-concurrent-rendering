const fs = require('fs');

const libraries = {
  'react-redux': '<a href="https://react-redux.js.org">react-redux</a>',
  zustand: '<a href="https://github.com/pmndrs/zustand">zustand</a>',
  'react-tracked': '<a href="https://react-tracked.js.org">react-tracked</a>',
  constate: '<a href="https://github.com/diegohaz/constate">constate</a>',
  'react-hooks-global-state': '<a href="https://github.com/dai-shi/react-hooks-global-state">react-hooks-global-state</a>',
  'use-context-selector': '<a href="https://github.com/dai-shi/use-context-selector">use-context-selector</a> (w/ useReducer)',
  'use-subscription': '<a href="https://github.com/facebook/react/tree/master/packages/use-subscription">use-subscription</a> (w/ redux)',
  'apollo-client': '<a href="https://github.com/apollographql/apollo-client">apollo-client</a>',
  recoil: '<a href="https://recoiljs.org">recoil</a>',
  recoil_UNSTABLE: '<a href="https://recoiljs.org">recoil (UNSTABLE)</a>',
  jotai: '<a href="https://github.com/pmndrs/jotai">jotai</a>',
  'jotai-versioned-write': '<a href="https://github.com/pmndrs/jotai">jotai (experimental versioned write)</a>',
  'use-atom': '<a href="https://github.com/dai-shi/use-atom">use-atom</a>',
  valtio: '<a href="https://github.com/pmndrs/valtio">valtio</a>',
  effector: '<a href="https://github.com/zerobias/effector">effector</a>',
  'react-rxjs': '<a href="https://react-rxjs.org">react-rxjs</a>',
  simplux: '<a href="https://github.com/MrWolfZ/simplux">simplux</a>',
};

const numTests = 10;

function wrap(content, tag) { return `<${tag}>${content}</${tag}>`; }
function check(status) { return status === 'failed' ? ':x:' : ':white_check_mark:'; }

// Get results into an array of test with a 2nd dimension by test/fail
const results = JSON.parse(fs.readFileSync('./outfile.json', 'utf8'));
const testResults = [];
results.testResults[0].assertionResults.forEach((result, ix) => {
  const testNumber = Math.floor(ix / numTests);
  testResults[testNumber] = testResults[testNumber] || [];
  testResults[testNumber][ix % numTests] = {
    status: result.status,
    title: result.ancestorTitles[0],
  };
});

// Format table for substitution in outfile
let sub = '';
testResults.forEach((result) => {
  if (!libraries[result[0].title]) {
    console.info('no library entry for', result[0].title);
    return;
  }
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
readme = readme.replace(
  /<table>([\s\S]*?)<\/table>/,
  `<table>\n<tr><th>Test</th>${Array.from(Array(numTests).keys()).map((i) => `<th>${i + 1}</th>`).join('')}</tr>\n${sub}\n</table>`,
);
readme = readme.replace(
  /<details>([\s\S]*?)<\/details>/,
  `<details>\n<summary>Raw Output</summary>\n\n\`\`\`\n${lines.join('\n')}\n\n\`\`\`\n</details>`,
);

fs.writeFileSync('./README.md', readme);
